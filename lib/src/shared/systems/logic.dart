part of shared;

class ThrusterHandlingSystem extends EntityProcessingSystem {
  Mapper<Velocity> vm;
  Mapper<Thruster> tm;
  Mapper<Orientation> om;

  final double speed = 10.0;

  ThrusterHandlingSystem()
      : super(Aspect.getAspectForAllOf([Velocity, Thruster, Orientation]));

  @override
  void processEntity(Entity entity) {
    var v = vm[entity];
    var t = tm[entity];
    var o = om[entity];

    if (t.left && t.right) {
      var currentX = v.value * cos(v.angle);
      var currentY = v.value * sin(v.angle);

      var additionalX = cos(o.angle) * world.delta * speed;
      var additionalY = sin(o.angle) * world.delta * speed;

      var nextX = currentX + additionalX;
      var nextY = currentY + additionalY;

      v.angle = atan2(nextY, nextX);
      v.value = nextX / cos(v.angle);
    } else if (t.left) {
      v.rotational -= world.delta * 5;
    } else if (t.right) {
      v.rotational += world.delta * 5;
    }
    o.angle += v.rotational * world.delta;
  }
}

class MovementSystem extends EntityProcessingSystem {
  Mapper<Position> pm;
  Mapper<Velocity> vm;

  MovementSystem() : super(Aspect.getAspectForAllOf([Position, Velocity]));

  @override
  void processEntity(Entity entity) {
    var p = pm[entity];
    var v = vm[entity];

    p.x += v.value * cos(v.angle) * world.delta;
    p.y += v.value * sin(v.angle) * world.delta;
  }
}

class ThrusterParticleEmissionSystem extends EntityProcessingSystem {
  Mapper<Position> pm;
  Mapper<Orientation> om;
  Mapper<Thruster> tm;
  Mapper<Velocity> vm;
  Mapper<Size> sm;

  ThrusterParticleEmissionSystem()
      : super(Aspect.getAspectForAllOf(
            [Position, Orientation, Thruster, Velocity, Size]));

  @override
  void processEntity(Entity entity) {
    var p = pm[entity];
    var o = om[entity];
    var t = tm[entity];
    var v = vm[entity];
    var s = sm[entity];

    var leftThrusterAngle = o.angle + 6 / 8 * PI;
    var rightThrusterAngle = o.angle - 6 / 8 * PI;
    if (t.left) {
      spawnThrusterParticles(p, s, v, leftThrusterAngle, o);
    }
    if (t.right) {
      spawnThrusterParticles(p, s, v, rightThrusterAngle, o);
    }
  }

  void spawnThrusterParticles(Position p, Size s, Velocity v, double thrusterAngle, Orientation o) {
    var x = p.x + s.radius * 1.1 * cos(thrusterAngle);
    var y = p.y + s.radius * 1.1 * sin(thrusterAngle);
    var thrusterSpeed = 1.1 * v.rotational * s.radius;
    var vx = v.value * cos(v.angle) + 25.0 * cos(o.angle - PI) + thrusterSpeed * cos(thrusterAngle + PI/2);
    var vy = v.value * sin(v.angle) + 25.0 * sin(o.angle - PI) + thrusterSpeed * sin(thrusterAngle + PI/2);

    var velocityAngle = atan2(vy, vx);
    var speed = vx / cos(velocityAngle);
    for (int i = 0; i < 5; i++) {
      world.createAndAddEntity([
        new Position(x, y),
        new Particle(),
        new ThrusterParticle(),
        new Color(1.0, 1.0, 0.0, 1.0),
        new Lifetime(0.5 + random.nextDouble()),
        new Velocity(speed * 0.9 + random.nextDouble() * 0.2, velocityAngle - PI/16 + random.nextDouble() * PI/8, 0.0)
      ]);
    }
  }
}

class ThrusterParticleColorModificationSystem extends EntityProcessingSystem {
  Mapper<Color> cm;
  Mapper<Lifetime> lm;

  ThrusterParticleColorModificationSystem()
      : super(Aspect.getAspectForAllOf([ThrusterParticle, Color, Lifetime]));

  @override
  void processEntity(Entity entity) {
    var c = cm[entity];
    var l = lm[entity];

    c.r = 1.0;
    c.g = l.timeLeft / l.timeMax;
    c.a = l.timeLeft / l.timeMax;
  }
}

class ExpirationSystem extends EntityProcessingSystem {
  Mapper<Lifetime> lm;

  ExpirationSystem() : super(Aspect.getAspectForAllOf([Lifetime]));

  @override
  void processEntity(Entity entity) {
    var l = lm[entity];

    l.timeLeft -= world.delta;
    if (l.timeLeft <= 0.0) {
      entity.deleteFromWorld();
    }
  }
}

class HeartbeatSystem extends EntityProcessingSystem {
  TagManager tm;
  Mapper<Color> cm;
  Mapper<Size> sm;

  double playerRadius;

  HeartbeatSystem() : super(Aspect.getAspectForAllOf([Color, Size]).exclude([Particle]));

  @override
  void begin() {
    var playerEntity = tm.getEntity(playerTag);
    playerRadius = sm[playerEntity].realRadius;
  }

  @override
  void processEntity(Entity entity) {
    var c = cm[entity];
    var s = sm[entity];

    var factor = sin(time * 5 * playerRadius / s.realRadius);
    factor = 1.0 + 0.025 * max(-0.2, factor * factor * factor);
    c.setLightness(c.l * factor * 1.05);
    c.a = c.realAlpha - 0.1 * factor;
    s.radius = s.realRadius * factor;
  }
}
