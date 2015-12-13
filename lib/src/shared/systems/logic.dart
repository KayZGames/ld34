part of shared;

class ThrusterHandlingSystem extends EntityProcessingSystem {
  Mapper<Velocity> vm;
  Mapper<Thruster> tm;
  Mapper<Orientation> om;

  final double speed = 20.0;

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

class EatenByVelocitySystem extends EntityProcessingSystem {
  Mapper<Velocity> vm;
  Mapper<EatenBy> ebm;

  EatenByVelocitySystem()
      : super(Aspect.getAspectForAllOf([EatenBy, Velocity]));

  @override
  void processEntity(Entity entity) {
    var v = vm[entity];
    var eb = ebm[entity];
    var veb = vm[eb.eater];

    var currentX = v.value * cos(v.angle);
    var currentY = v.value * sin(v.angle);

    var eaterX = veb.value * cos(veb.angle);
    var eaterY = veb.value * sin(veb.angle);

    var factor = world.delta * 0.8;

    var nextX = (1.0 - factor) * currentX + factor * eaterX;
    var nextY = (1.0 - factor) * currentY + factor * eaterY;

    v.angle = atan2(nextY, nextX);
    v.value = nextX / cos(v.angle);
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
  Mapper<Color> cm;

  ThrusterParticleEmissionSystem()
      : super(Aspect.getAspectForAllOf(
            [Position, Orientation, Thruster, Velocity, Size, Color]));

  @override
  void processEntity(Entity entity) {
    var p = pm[entity];
    var o = om[entity];
    var t = tm[entity];
    var v = vm[entity];
    var s = sm[entity];
    var c = cm[entity];

    var leftThrusterAngle = o.angle + 6 / 8 * PI;
    var rightThrusterAngle = o.angle - 6 / 8 * PI;
    if (t.left) {
      spawnThrusterParticles(p, s, v, c, leftThrusterAngle, o, 1);
    }
    if (t.right) {
      spawnThrusterParticles(p, s, v, c, rightThrusterAngle, o, -1);
    }
  }

  void spawnThrusterParticles(Position p, Size s, Velocity v, Color c,
      double thrusterAngle, Orientation o, int direction) {
    var x1 = p.x + s.radius * 1.1 * cos(thrusterAngle);
    var y1 = p.y + s.radius * 1.1 * sin(thrusterAngle);
    var x2 =
        p.x + s.radius * 1.0 * cos(thrusterAngle + direction * 1 / 16 * PI);
    var y2 =
        p.y + s.radius * 1.0 * sin(thrusterAngle + direction * 1 / 16 * PI);
    var thrusterSpeed = 1.1 * v.rotational * s.radius;
    var vx = v.value * cos(v.angle) +
        50.0 * cos(o.angle - PI) +
        thrusterSpeed * cos(thrusterAngle + PI / 2);
    var vy = v.value * sin(v.angle) +
        50.0 * sin(o.angle - PI) +
        thrusterSpeed * sin(thrusterAngle + PI / 2);

    var velocityAngle = atan2(vy, vx);
    var speed = vx / cos(velocityAngle);
    for (int i = 0; i < s.radius / 10; i++) {
      var posFactor = random.nextDouble();
      world.createAndAddEntity([
        new Position(x1 + posFactor * (x2 - x1),
            y1 + posFactor * (y2 - y1)),
        new Particle(),
        new ThrusterParticle(),
        new Color(c.r, c.g, c.b, 1.0),
        new Lifetime(1.0 + 2.0 * random.nextDouble()),
        new Velocity(speed * 0.9 + random.nextDouble() * 0.2,
            velocityAngle - PI / 64 + random.nextDouble() * PI / 32, 0.0)
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

    c.r = 0.99 * c.r + 0.01 * l.timeLeft / l.timeMax;
    c.g = 0.99 * c.g + 0.01 * l.timeLeft / l.timeMax;
    c.b = 0.99 * c.b + 0.01 * l.timeLeft / l.timeMax;
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

  HeartbeatSystem()
      : super(Aspect.getAspectForAllOf([Color, Size]).exclude([Particle]));

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

class FoodCollectionSystem extends EntitySystem {
  TagManager tm;
  Mapper<Position> pm;
  Mapper<Size> sm;

  FoodCollectionSystem()
      : super(Aspect
            .getAspectForAllOf([Food, Position, Size]).exclude([EatenBy]));

  @override
  void processEntities(Iterable<Entity> entities) {
    var playerEntity = tm.getEntity(playerTag);
    var playerPos = pm[playerEntity];
    var playerSize = sm[playerEntity];
    entities.where((food) {
      var foodPos = pm[food];
      var foodSize = sm[food];
      var distX = playerPos.x - foodPos.x;
      var distY = playerPos.y - foodPos.y;
      return sqrt(distX * distX + distY * distY) <
          playerSize.radius - foodSize.radius;
    }).forEach((food) {
      food
        ..addComponent(new EatenBy(playerEntity))
        ..removeComponent(Growing)
        ..changedInWorld();
    });
  }

  @override
  bool checkProcessing() => true;
}

class StillBeingEatenCheckerSystem extends EntityProcessingSystem {
  Mapper<EatenBy> ebm;
  Mapper<Position> pm;
  Mapper<Size> sm;

  bool changes = false;

  StillBeingEatenCheckerSystem()
      : super(Aspect.getAspectForAllOf([EatenBy, Position, Size]));

  @override
  void processEntity(Entity entity) {
    var p = pm[entity];
    var s = sm[entity];
    var eb = ebm[entity];
    var ep = pm[eb.eater];
    var es = sm[eb.eater];

    var distX = ep.x - p.x;
    var distY = ep.y - p.y;

    if (sqrt(distX * distX + distY * distY) > es.radius - s.radius) {
      entity
        ..removeComponent(EatenBy)
        ..changedInWorld();
      changes = true;
    }
  }

  @override
  void end() {
    if (changes) {
      world.processEntityChanges();
      changes = false;
    }
  }
}

class DigestiveSystem extends EntityProcessingSystem {
  Mapper<EatenBy> ebm;
  Mapper<Size> sm;
  Mapper<Position> pm;
  Mapper<Color> cm;

  DigestiveSystem()
      : super(Aspect.getAspectForAllOf([EatenBy, Size, Color, Position]));

  @override
  void processEntity(Entity entity) {
    var s = sm[entity];
    var eb = ebm[entity];
    var es = sm[eb.eater];

    var remaining = s.realRadius - world.delta * es.realRadius / 20;
    var eatenArea = PI * s.realRadius * s.realRadius;
    if (remaining > 0.0) {
      eatenArea -= PI * remaining * remaining;
      s.realRadius = remaining;
      var p = pm[entity];
      var ec = cm[eb.eater];
      var hsl = rgbToHsl(ec.r, ec.g, ec.b);
      for (int i = 0; i < s.realRadius; i++) {
        var angle = random.nextDouble() * 2 * PI;
        world.createAndAddEntity([
          new Particle(),
          new Position(
              p.x + s.realRadius * cos(angle), p.y + s.realRadius * sin(angle)),
          new Color.fromHsl(hsl[0], hsl[1] + 0.1, hsl[2] + 0.1, 1.0),
          new Lifetime(0.1)
        ]);
      }
    } else {
      entity.deleteFromWorld();
    }
    var eaterArea = PI * es.realRadius * es.realRadius + eatenArea;
    es.realRadius = sqrt(eaterArea / PI);
  }
}

class FoodGrowingSystem extends EntityProcessingSystem {
  Mapper<Size> sm;
  Mapper<Growing> gm;
  TagManager tm;
  Mapper<Position> pm;
  GameStateManager gsm;

  double totalFood = 0.0;

  FoodGrowingSystem()
      : super(
            Aspect.getAspectForAllOf([Food, Size, Growing]).exclude([EatenBy]));

  @override
  void processEntity(Entity entity) {
    var s = sm[entity];
    var g = gm[entity];

    var currentFood = PI * s.realRadius * s.realRadius + world.delta * g.speed;
    totalFood += currentFood;

    s.realRadius = sqrt(currentFood / PI);

    if (s.realRadius >= g.targetRadius) {
      entity
        ..removeComponent(Growing)
        ..changedInWorld();
    }
  }

  @override
  void end() {
    if (totalFood < 500.0) {
      var p = pm[tm.getEntity(playerTag)];
      world.createAndAddEntity([
        new Position(p.x - gsm.width + random.nextDouble() * gsm.width * 2,
            p.y - gsm.height + random.nextDouble() * gsm.height * 2),
        new Size(0.1),
        new Color.fromHsl(0.35, 0.4, 0.4, 1.0),
        new Food(),
        new Growing(
            1.0 + random.nextDouble() * 10.0, 1.0 + random.nextDouble() * 4),
        new Orientation(0.0),
        new Velocity(0.0, 0.0, 0.0)
      ]);
    }
    totalFood = 0.0;
  }
}

class DamacreatSpawner extends VoidEntitySystem {
  TagManager tm;
  GroupManager gm;
  Mapper<Position> pm;
  Mapper<Size> sm;
  GameStateManager gsm;

  @override
  void processSystem() {
    var count = gm.getEntities(damacreatGroup).length;
    var playerEntity = tm.getEntity(playerTag);
    var p = pm[playerEntity];
    var s = sm[playerEntity];
    var x = gsm.width / 2 * (2.5 * random.nextDouble()) *
        (random.nextBool() ? 1 : -1);
    var y = gsm.height / 2 * (2.5 * random.nextDouble()) *
        (random.nextBool() ? 1 : -1);
    var damacreat = world.createAndAddEntity([
      new Position(p.x + x, p.y + y),
      new Size(0.1),
      new Color.fromHsl(random.nextDouble(), 0.8, 0.5, 0.2),
      new Food(),
      new Ai(),
      new Growing(s.realRadius * (0.8 + 0.8 * random.nextDouble()), s.realRadius + 50 - count/11),
      new Orientation(0.0),
      new Velocity(random.nextDouble() * 25.0, 2 * PI * random.nextDouble(),
          (random.nextBool() ? random.nextDouble() * 0.1 : 0.0))
    ]);
    gm.add(damacreat, damacreatGroup);
  }

  bool checkProcessing() => sm[tm.getEntity(playerTag)].realRadius > 21.0 && gm.getEntities(damacreatGroup).length < 500;
}

class FarAwayEntityDestructionSystem extends EntitySystem {
  TagManager tm;
  Mapper<Position> pm;
  GameStateManager gsm;

  FarAwayEntityDestructionSystem()
      : super(
            Aspect.getAspectForAllOf([Position]).exclude([Particle, Lifetime]));

  @override
  void processEntities(Iterable<Entity> entities) {
    var playerPos = pm[tm.getEntity(playerTag)];
    entities.where((entity) {
      var p = pm[entity];
      return (playerPos.x - p.x).abs() > gsm.width * 4 ||
          (playerPos.y - p.y).abs() > gsm.height * 4;
    }).forEach((entity) => entity.deleteFromWorld());
  }

  @override
  bool checkProcessing() => true;
}
