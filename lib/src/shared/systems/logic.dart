import 'package:dartemis/dartemis.dart';

import 'package:gamedev_helpers/gamedev_helpers_shared.dart' hide Velocity;
import 'package:ld34/shared.dart';

part 'logic.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    Velocity,
    Thruster,
    Orientation,
  ],
)
class ThrusterHandlingSystem extends _$ThrusterHandlingSystem {
  final double speed = 20.0;

  @override
  void processEntity(Entity entity) {
    var v = velocityMapper[entity];
    var t = thrusterMapper[entity];
    var o = orientationMapper[entity];

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

@Generate(
  EntityProcessingSystem,
  allOf: [
    CellWall,
    Thruster,
  ],
)
class ThrusterCellWallWeakeningSystem
    extends _$ThrusterCellWallWeakeningSystem {
  final double cellWallWeakeningFactor = 0.95;

  @override
  void processEntity(Entity entity) {
    var t = thrusterMapper[entity];
    var cw = cellWallMapper[entity];
    var leftThrusterIndex = (3 / 8 * circleFragments).truncate();
    var rightThrusterIndex = (5 / 8 * circleFragments).truncate();
    if (t.left) {
      cw.strengthFactor[leftThrusterIndex] *= cellWallWeakeningFactor;
      cw.strengthFactor[leftThrusterIndex + 1] *= cellWallWeakeningFactor;
    }
    if (t.right) {
      cw.strengthFactor[rightThrusterIndex] *= cellWallWeakeningFactor;
      cw.strengthFactor[rightThrusterIndex - 1] *= cellWallWeakeningFactor;
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    EatenBy,
    Velocity,
    Position,
    Size,
  ],
)
class EatenByVelocitySystem extends _$EatenByVelocitySystem {
  @override
  void processEntity(Entity entity) {
    var v = velocityMapper[entity];
    var p = positionMapper[entity];
    var s = sizeMapper[entity];
    var eb = eatenByMapper[entity];
    var veb = velocityMapper[eb.eater];
    var pem = positionMapper[eb.eater];
    var sem = sizeMapper[eb.eater];

    var distX = p.x - pem.x;
    var distY = p.y - pem.y;
    var dist = sqrt(distX * distX + distY * distY);

    var currentX = v.value * cos(v.angle);
    var currentY = v.value * sin(v.angle);

    var eaterX = veb.value * cos(veb.angle);
    var eaterY = veb.value * sin(veb.angle);

    var angle = atan2(distY, distX);

    var circularX = veb.rotational * cos(pi / 2 + angle) * dist * 0.8 +
        veb.rotational.abs() * cos(pi + angle) * dist;
    var circularY = veb.rotational * sin(pi / 2 + angle) * dist * 0.8 +
        veb.rotational.abs() * sin(pi + angle) * dist;

    var factor = world.delta * 0.8;
    var circularFactor = world.delta * (1.0 - s.radius / sem.radius) * 0.5;

    var nextX = (1.0 - factor) * currentX +
        factor * eaterX +
        circularFactor * circularX;
    var nextY = (1.0 - factor) * currentY +
        factor * eaterY +
        circularFactor * circularY;

    v.angle = atan2(nextY, nextX);
    v.value = nextX / cos(v.angle);
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Position,
    Velocity,
  ],
)
class MovementSystem extends _$MovementSystem {
  @override
  void processEntity(Entity entity) {
    var p = positionMapper[entity];
    var v = velocityMapper[entity];

    p.x += v.value * cos(v.angle) * world.delta;
    p.y += v.value * sin(v.angle) * world.delta;
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Position,
    Orientation,
    Thruster,
    Velocity,
    Size,
    Color,
    Wobble,
  ],
)
class ThrusterParticleEmissionSystem extends _$ThrusterParticleEmissionSystem {
  @override
  void processEntity(Entity entity) {
    var p = positionMapper[entity];
    var o = orientationMapper[entity];
    var t = thrusterMapper[entity];
    var v = velocityMapper[entity];
    var s = sizeMapper[entity];
    var c = colorMapper[entity];
    var w = wobbleMapper[entity];

    var leftThrusterAngle = o.angle + 3 / 4 * pi;
    var rightThrusterAngle = o.angle - 3 / 4 * pi;

    if (t.left) {
      spawnThrusterParticles(p, s, v, c, leftThrusterAngle, o, w, 1);
    }
    if (t.right) {
      spawnThrusterParticles(p, s, v, c, rightThrusterAngle, o, w, -1);
    }
  }

  void spawnThrusterParticles(Position p, Size s, Velocity v, Color c,
      double thrusterAngle, Orientation o, Wobble w, int direction) {
    var w1, w2;
    if (direction == 1) {
      var leftThrusterIndex = (3 / 8 * circleFragments).truncate();
      w1 = w.wobbleFactor[leftThrusterIndex];
      w2 = w.wobbleFactor[leftThrusterIndex + 1];
    } else {
      var rightThrusterIndex = (5 / 8 * circleFragments).truncate();
      w1 = w.wobbleFactor[rightThrusterIndex];
      w2 = w.wobbleFactor[rightThrusterIndex - 1];
    }

    var x1 = p.x + s.radius * 1.1 * cos(thrusterAngle) * w1;
    var y1 = p.y + s.radius * 1.1 * sin(thrusterAngle) * w1;
    var x2 = p.x +
        s.radius *
            1.0 *
            cos(thrusterAngle + direction * 1 / (circleFragments ~/ 2) * pi) *
            w2;
    var y2 = p.y +
        s.radius *
            1.0 *
            sin(thrusterAngle + direction * 1 / (circleFragments ~/ 2) * pi) *
            w2;
    var thrusterSpeed = 1.1 * v.rotational * s.radius;
    var vx = v.value * cos(v.angle) -
        50.0 * cos(o.angle) +
        thrusterSpeed * cos(thrusterAngle + pi / 2);
    var vy = v.value * sin(v.angle) -
        50.0 * sin(o.angle) +
        thrusterSpeed * sin(thrusterAngle + pi / 2);

    var velocityAngle = atan2(vy, vx);
    var speed = vx / cos(velocityAngle);
    var hsl = rgbToHsl(c.r, c.g, c.b);
    hsl[2] += 0.1;
    hsl[1] += 0.3;
    var rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    for (int i = 0; i < s.radius / 10; i++) {
      var posFactor = random.nextDouble();
      world.createAndAddEntity([
        Position(x1 + posFactor * (x2 - x1), y1 + posFactor * (y2 - y1)),
        Particle(),
        ThrusterParticle(),
        Color(rgb[0], rgb[1], rgb[2], 1.0),
        Lifetime(1.0 + 2.0 * random.nextDouble()),
        Velocity(speed * 0.9 + random.nextDouble() * 0.2,
            velocityAngle - pi / 64 + random.nextDouble() * pi / 32, 0.0)
      ]);
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    ThrusterParticle,
    Color,
    Lifetime,
  ],
)
class ThrusterParticleColorModificationSystem
    extends _$ThrusterParticleColorModificationSystem {
  @override
  void processEntity(Entity entity) {
    var c = colorMapper[entity];
    var l = lifetimeMapper[entity];

    var hsl = rgbToHsl(c.realR, c.realG, c.realB);
    hsl[0] = hsl[0] - 0.2 * (1.0 - l.timeLeft / l.timeMax);
    hsl[1] = hsl[1] * l.timeLeft / l.timeMax;
    hsl[2] = hsl[2] * l.timeLeft / l.timeMax;
    var rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

    c.r = rgb[0];
    c.g = rgb[1];
    c.b = rgb[2];
    c.a = l.timeLeft / l.timeMax;
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Lifetime,
  ],
)
class ExpirationSystem extends _$ExpirationSystem {
  @override
  void processEntity(Entity entity) {
    var l = lifetimeMapper[entity];

    l.timeLeft -= world.delta;
    if (l.timeLeft <= 0.0) {
      entity.deleteFromWorld();
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Color,
    Size,
  ],
  exclude: [
    Particle,
  ],
  manager: [
    TagManager,
  ],
)
class HeartbeatSystem extends _$HeartbeatSystem {
  double playerRadius;

  @override
  void begin() {
    var playerEntity = tagManager.getEntity(playerTag);
    playerRadius = sizeMapper[playerEntity].realRadius;
  }

  @override
  void processEntity(Entity entity) {
    var c = colorMapper[entity];
    var s = sizeMapper[entity];

    var factor = cos(sin(time * 3 * playerRadius / s.realRadius) +
        time * 3 * playerRadius / s.realRadius);
    factor = 0.9875 + 0.025 * factor;
    c.setLightness(c.l * factor * 1.05);
    c.a = c.realAlpha - 0.1 * factor;
    s.radius = s.realRadius * factor;
  }
}

@Generate(
  EntitySystem,
  allOf: [
    Food,
    Position,
    Size,
  ],
  exclude: [
    EatenBy,
    CollisionWith,
  ],
  manager: [
    TagManager,
  ],
)
class FoodCollectionSystem extends _$FoodCollectionSystem {
  @override
  void processEntities(Iterable<Entity> entities) {
    var playerEntity = tagManager.getEntity(playerTag);
    var playerPos = positionMapper[playerEntity];
    var playerSize = sizeMapper[playerEntity];
    entities.where((food) {
      var foodPos = positionMapper[food];
      var foodSize = sizeMapper[food];
      var distX = playerPos.x - foodPos.x;
      var distY = playerPos.y - foodPos.y;
      var distSqr = distX * distX + distY * distY;
      var radiusSum = playerSize.radius + foodSize.radius;
      return distSqr < radiusSum * radiusSum;
    }).forEach((food) {
      food
        ..addComponent(CollisionWith(playerEntity))
        ..changedInWorld();
    });
  }

  @override
  bool checkProcessing() => true;
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Position,
    Size,
    Wobble,
    Orientation,
    CollisionWith,
    Velocity,
  ],
  manager: [
    TagManager,
  ],
  mapper: [
    CellWall,
    EatenBy,
  ],
)
class EntityInteractionSystem extends _$EntityInteractionSystem {
  double angleToSegmentFactor = circleFragments / (2 * pi);

  @override
  void processEntity(Entity entity) {
    var colliderEntity = collisionWithMapper[entity].collider;
    var colliderPos = positionMapper[colliderEntity];
    var colliderSize = sizeMapper[colliderEntity];
    var colliderWobble = wobbleMapper[colliderEntity];
    var colliderOrientation = orientationMapper[colliderEntity];
    var colliderCellWall = cellWallMapper[colliderEntity];

    var entityPos = positionMapper[entity];
    var entitySize = sizeMapper[entity];
    var distX = -colliderPos.x + entityPos.x;
    var distY = -colliderPos.y + entityPos.y;
    var angle = atan2(distY, distX) - colliderOrientation.angle;
    var fragment = (angle * angleToSegmentFactor).round();
    var sizeRelation = entitySize.radius / colliderSize.radius;
    var fragmentRange = (sizeRelation * circleFragments ~/ 4).round();

    var radiusSum = colliderSize.radius + entitySize.radius;
    var dist = sqrt(distX * distX + distY * distY);
    var distRelation = (radiusSum - dist) / entitySize.radius;
    if (dist < colliderSize.radius - entitySize.radius) {
      if (!eatenByMapper.has(entity)) {
        entity
          ..addComponent(EatenBy(colliderEntity))
          ..removeComponent<Growing>()
          ..changedInWorld();
      }
    } else if (dist < colliderSize.radius) {
      entity
        ..addComponent(EatenBy(colliderEntity))
        ..removeComponent<Growing>()
        ..changedInWorld();
      var additionalDistRelation =
          (dist + entitySize.radius - colliderSize.radius) /
              colliderSize.radius;
      for (int i = -fragmentRange + 1; i <= fragmentRange; i++) {
        var fragmentIndex = (fragment + i) % circleFragments;
        var old = colliderWobble.wobbleFactor[fragmentIndex];
        colliderWobble.wobbleFactor[fragmentIndex] = max(
            old,
            1.0 +
                additionalDistRelation *
                    (1 - (i * i) / (fragmentRange * fragmentRange)));
      }
    } else if (dist < colliderSize.radius + entitySize.radius / 2 &&
        !eatenByMapper.has(entity)) {
      var additionalDistRelation =
          (dist + entitySize.radius - colliderSize.radius) /
              colliderSize.radius;
      var pressingEnvelopedRatio =
          (radiusSum - dist - entitySize.radius / 2) / (entitySize.radius / 2);
      pressingEnvelopedRatio *= pressingEnvelopedRatio;
      for (int i = -fragmentRange + 1; i <= fragmentRange; i++) {
        var fragmentIndex = (fragment + i) % circleFragments;
        var old = colliderWobble.wobbleFactor[fragmentIndex];
        var enveloped = max(
            old,
            1.0 +
                additionalDistRelation *
                    (1 - (i * i) / (fragmentRange * fragmentRange)));
        var pressing = min(
            old,
            1.0 -
                sizeRelation *
                    distRelation *
                    (1 -
                        (i * i * i * i).abs() /
                            (fragmentRange *
                                    fragmentRange *
                                    fragmentRange *
                                    fragmentRange)
                                .abs()));

        colliderWobble.wobbleFactor[fragmentIndex] =
            pressingEnvelopedRatio * enveloped +
                (1.0 - pressingEnvelopedRatio) * pressing;
        colliderCellWall.strengthFactor[fragmentIndex] = 1.0 -
            distRelation *
                (1 -
                    (i * i * i).abs() /
                        (fragmentRange * fragmentRange * fragmentRange).abs());
      }
    } else if (dist < radiusSum && !eatenByMapper.has(entity)) {
      var v = velocityMapper[entity];
      var factor = 0.9 * world.delta;
      v.rotational = v.rotational * (1.0 - factor) -
          velocityMapper[colliderEntity].rotational *
              factor *
              (1 - sizeRelation);
      for (int i = -fragmentRange + 1; i <= fragmentRange; i++) {
        var fragmentIndex = (fragment + i) % circleFragments;
        var old = colliderWobble.wobbleFactor[fragmentIndex];
        colliderWobble.wobbleFactor[fragmentIndex] = min(
            old,
            1.0 -
                sizeRelation *
                    distRelation *
                    (1 -
                        (i * i * i * i).abs() /
                            (fragmentRange *
                                    fragmentRange *
                                    fragmentRange *
                                    fragmentRange)
                                .abs()));
        colliderCellWall.strengthFactor[fragmentIndex] = 1.0 -
            distRelation *
                (1 -
                    (i * i * i).abs() /
                        (fragmentRange * fragmentRange * fragmentRange).abs());
      }
    } else if (dist > radiusSum + entitySize.radius ||
        dist > 2 * colliderSize.radius) {
      entity
        ..removeComponent<CollisionWith>()
        ..changedInWorld();
    } else if (eatenByMapper.has(entity)) {
      var additionalDistRelation =
          (dist + entitySize.radius - colliderSize.radius) /
              colliderSize.radius;
      for (int i = -fragmentRange + 1; i <= fragmentRange; i++) {
        var fragmentIndex = (fragment + i) % circleFragments;
        var old = colliderWobble.wobbleFactor[fragmentIndex];
        colliderWobble.wobbleFactor[fragmentIndex] = max(
            old,
            1.0 +
                additionalDistRelation *
                    (1 -
                        (i * i * i).abs() /
                            (fragmentRange * fragmentRange * fragmentRange)
                                .abs()));
        colliderCellWall.strengthFactor[fragmentIndex] = 1.0 -
            additionalDistRelation *
                (1 -
                    (i * i * i).abs() /
                        (fragmentRange * fragmentRange * fragmentRange).abs());
      }
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    EatenBy,
    Position,
    Size,
  ],
)
class StillBeingEatenCheckerSystem extends _$StillBeingEatenCheckerSystem {
  bool changes = false;

  @override
  void processEntity(Entity entity) {
    var p = positionMapper[entity];
    var s = sizeMapper[entity];
    var eb = eatenByMapper[entity];
    var ep = positionMapper[eb.eater];
    var es = sizeMapper[eb.eater];

    var distX = ep.x - p.x;
    var distY = ep.y - p.y;

    if (sqrt(distX * distX + distY * distY) > es.radius + s.radius + s.radius) {
      entity
        ..removeComponent<EatenBy>()
        ..removeComponent<CollisionWith>()
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

@Generate(
  EntityProcessingSystem,
  allOf: [
    EatenBy,
    Size,
    Color,
    Position,
    Velocity,
  ],
)
class DigestiveSystem extends _$DigestiveSystem {
  @override
  void processEntity(Entity entity) {
    var s = sizeMapper[entity];
    var v = velocityMapper[entity];
    var eb = eatenByMapper[entity];
    var es = sizeMapper[eb.eater];

    var remaining = s.realRadius - world.delta * es.realRadius / 20;
    var eatenArea = pi * s.realRadius * s.realRadius;
    if (remaining > 0.0) {
      eatenArea -= pi * remaining * remaining;
      s.realRadius = remaining;
      var p = positionMapper[entity];
      var ec = colorMapper[eb.eater];
      var hsl = rgbToHsl(ec.r, ec.g, ec.b);
      for (int i = 0; i < s.realRadius; i++) {
        var angle = random.nextDouble() * 2 * pi;
        world.createAndAddEntity([
          Particle(),
          Position(
              p.x + s.realRadius * cos(angle), p.y + s.realRadius * sin(angle)),
          Velocity(0.5 * v.value, v.angle, 0.0),
          Color.fromHsl(hsl[0], hsl[1] + 0.1, hsl[2] + 0.1, 1.0),
          Lifetime(0.1)
        ]);
      }
    } else {
      entity.deleteFromWorld();
    }
    var eaterArea = pi * es.realRadius * es.realRadius + eatenArea;
    es.realRadius = sqrt(eaterArea / pi);
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Food,
    Size,
    Growing,
  ],
  mapper: [
    Position,
  ],
  exclude: [
    EatenBy,
  ],
  manager: [
    TagManager,
    CameraManager,
  ],
)
class FoodGrowingSystem extends _$FoodGrowingSystem {
  double totalFood = 0.0;

  @override
  void processEntity(Entity entity) {
    var s = sizeMapper[entity];
    var g = growingMapper[entity];

    var currentFood = pi * s.realRadius * s.realRadius + world.delta * g.speed;
    totalFood += currentFood;

    s.realRadius = sqrt(currentFood / pi);

    if (s.realRadius >= g.targetRadius) {
      entity
        ..removeComponent<Growing>()
        ..changedInWorld();
    }
  }

  @override
  void end() {
    if (totalFood < 500.0) {
      var p = positionMapper[tagManager.getEntity(playerTag)];
      world.createAndAddEntity([
        Position(
            p.x -
                cameraManager.width +
                random.nextDouble() * cameraManager.width * 2,
            p.y -
                cameraManager.height +
                random.nextDouble() * cameraManager.height * 2),
        Size(0.1),
        Color.fromHsl(0.35, 0.4, 0.4, 1.0),
        Food(),
        Growing(
            1.0 + random.nextDouble() * 10.0, 1.0 + random.nextDouble() * 4),
        Orientation(0.0),
        Velocity(0.0, 0.0, 0.0),
        Wobble()
      ]);
    }
    totalFood = 0.0;
  }
}

@Generate(
  VoidEntitySystem,
  mapper: [
    Position,
    Size,
  ],
  manager: [
    TagManager,
    GroupManager,
    CameraManager,
  ],
)
class DamacreatSpawner extends _$DamacreatSpawner {
  @override
  void processSystem() {
    var count = groupManager.getEntities(damacreatGroup).length;
    var playerEntity = tagManager.getEntity(playerTag);
    var p = positionMapper[playerEntity];
    var s = sizeMapper[playerEntity];
    var x = cameraManager.width /
        2 *
        (2.5 * random.nextDouble()) *
        (random.nextBool() ? 1 : -1);
    var y = cameraManager.height /
        2 *
        (2.5 * random.nextDouble()) *
        (random.nextBool() ? 1 : -1);
    var angle = 2 * pi * random.nextDouble();
    var damacreat = world.createAndAddEntity([
      Position(p.x + x, p.y + y),
      Size(0.1),
      Color.fromHsl(random.nextDouble(), 0.8, 0.5, 0.2),
      Food(),
      Ai(),
      Thruster(),
      Growing(s.realRadius * (0.8 + 0.8 * random.nextDouble()),
          s.realRadius + 50 - count / 11),
      Orientation(angle),
      Velocity(random.nextDouble() * 25.0, angle,
          (random.nextBool() ? random.nextDouble() * 0.1 : 0.0)),
      Wobble()
    ]);
    groupManager.add(damacreat, damacreatGroup);
  }

  bool checkProcessing() =>
      sizeMapper[tagManager.getEntity(playerTag)].realRadius > 21.0 &&
      groupManager.getEntities(damacreatGroup).length < 500;
}

@Generate(
  EntitySystem,
  allOf: [
    Position,
  ],
  exclude: [
    Particle,
    Lifetime,
  ],
  manager: [
    TagManager,
    CameraManager,
  ],
)
class FarAwayEntityDestructionSystem extends _$FarAwayEntityDestructionSystem {
  @override
  void processEntities(Iterable<Entity> entities) {
    var playerPos = positionMapper[tagManager.getEntity(playerTag)];
    entities.where((entity) {
      var p = positionMapper[entity];
      return (playerPos.x - p.x).abs() > cameraManager.width * 4 ||
          (playerPos.y - p.y).abs() > cameraManager.height * 4;
    }).forEach((entity) => entity.deleteFromWorld());
  }

  @override
  bool checkProcessing() => true;
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Wobble,
  ],
)
class WobbleSystem extends _$WobbleSystem {
  @override
  void processEntity(Entity entity) {
    var w = wobbleMapper[entity];

    var wobbleFactor = w.wobbleFactor;
    for (int i = 0; i < wobbleFactor.length; i++) {
      wobbleFactor[i] = 0.2 + 0.8 * wobbleFactor[i];
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    CellWall,
  ],
)
class CellWallSystem extends _$CellWallSystem {
  @override
  void processEntity(Entity entity) {
    var cw = cellWallMapper[entity];

    var strengthFactor = cw.strengthFactor;
    for (int i = 0; i < strengthFactor.length; i++) {
      strengthFactor[i] =
          1.0 + (strengthFactor[i] - 1.0) * (1 - 0.999 * world.delta);
    }
  }
}
