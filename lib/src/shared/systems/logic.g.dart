// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'logic.dart';

// **************************************************************************
// Generator: SystemGenerator
// **************************************************************************

abstract class _$ThrusterHandlingSystem extends EntityProcessingSystem {
  Mapper<Velocity> velocityMapper;
  Mapper<Thruster> thrusterMapper;
  Mapper<Orientation> orientationMapper;
  _$ThrusterHandlingSystem()
      : super(new Aspect.empty()..allOf([Velocity, Thruster, Orientation]));
  @override
  void initialize() {
    super.initialize();
    velocityMapper = new Mapper<Velocity>(Velocity, world);
    thrusterMapper = new Mapper<Thruster>(Thruster, world);
    orientationMapper = new Mapper<Orientation>(Orientation, world);
  }
}

abstract class _$ThrusterCellWallWeakeningSystem
    extends EntityProcessingSystem {
  Mapper<CellWall> cellWallMapper;
  Mapper<Thruster> thrusterMapper;
  _$ThrusterCellWallWeakeningSystem()
      : super(new Aspect.empty()..allOf([CellWall, Thruster]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = new Mapper<CellWall>(CellWall, world);
    thrusterMapper = new Mapper<Thruster>(Thruster, world);
  }
}

abstract class _$EatenByVelocitySystem extends EntityProcessingSystem {
  Mapper<EatenBy> eatenByMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  _$EatenByVelocitySystem()
      : super(new Aspect.empty()..allOf([EatenBy, Velocity, Position, Size]));
  @override
  void initialize() {
    super.initialize();
    eatenByMapper = new Mapper<EatenBy>(EatenBy, world);
    velocityMapper = new Mapper<Velocity>(Velocity, world);
    positionMapper = new Mapper<Position>(Position, world);
    sizeMapper = new Mapper<Size>(Size, world);
  }
}

abstract class _$MovementSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  _$MovementSystem() : super(new Aspect.empty()..allOf([Position, Velocity]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = new Mapper<Position>(Position, world);
    velocityMapper = new Mapper<Velocity>(Velocity, world);
  }
}

abstract class _$ThrusterParticleEmissionSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Thruster> thrusterMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Wobble> wobbleMapper;
  _$ThrusterParticleEmissionSystem()
      : super(new Aspect.empty()
          ..allOf([
            Position,
            Orientation,
            Thruster,
            Velocity,
            Size,
            Color,
            Wobble
          ]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = new Mapper<Position>(Position, world);
    orientationMapper = new Mapper<Orientation>(Orientation, world);
    thrusterMapper = new Mapper<Thruster>(Thruster, world);
    velocityMapper = new Mapper<Velocity>(Velocity, world);
    sizeMapper = new Mapper<Size>(Size, world);
    colorMapper = new Mapper<Color>(Color, world);
    wobbleMapper = new Mapper<Wobble>(Wobble, world);
  }
}

abstract class _$ThrusterParticleColorModificationSystem
    extends EntityProcessingSystem {
  Mapper<ThrusterParticle> thrusterParticleMapper;
  Mapper<Color> colorMapper;
  Mapper<Lifetime> lifetimeMapper;
  _$ThrusterParticleColorModificationSystem()
      : super(new Aspect.empty()..allOf([ThrusterParticle, Color, Lifetime]));
  @override
  void initialize() {
    super.initialize();
    thrusterParticleMapper =
        new Mapper<ThrusterParticle>(ThrusterParticle, world);
    colorMapper = new Mapper<Color>(Color, world);
    lifetimeMapper = new Mapper<Lifetime>(Lifetime, world);
  }
}

abstract class _$ExpirationSystem extends EntityProcessingSystem {
  Mapper<Lifetime> lifetimeMapper;
  _$ExpirationSystem() : super(new Aspect.empty()..allOf([Lifetime]));
  @override
  void initialize() {
    super.initialize();
    lifetimeMapper = new Mapper<Lifetime>(Lifetime, world);
  }
}

abstract class _$HeartbeatSystem extends EntityProcessingSystem {
  Mapper<Color> colorMapper;
  Mapper<Size> sizeMapper;
  TagManager tagManager;
  _$HeartbeatSystem()
      : super(new Aspect.empty()
          ..allOf([Color, Size])
          ..exclude([Particle]));
  @override
  void initialize() {
    super.initialize();
    colorMapper = new Mapper<Color>(Color, world);
    sizeMapper = new Mapper<Size>(Size, world);
    tagManager = world.getManager(TagManager);
  }
}

abstract class _$FoodCollectionSystem extends EntitySystem {
  Mapper<Food> foodMapper;
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  TagManager tagManager;
  _$FoodCollectionSystem()
      : super(new Aspect.empty()
          ..allOf([Food, Position, Size])
          ..exclude([EatenBy, CollisionWith]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = new Mapper<Food>(Food, world);
    positionMapper = new Mapper<Position>(Position, world);
    sizeMapper = new Mapper<Size>(Size, world);
    tagManager = world.getManager(TagManager);
  }
}

abstract class _$EntityInteractionSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Wobble> wobbleMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<CollisionWith> collisionWithMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<CellWall> cellWallMapper;
  Mapper<EatenBy> eatenByMapper;
  TagManager tagManager;
  _$EntityInteractionSystem()
      : super(new Aspect.empty()
          ..allOf(
              [Position, Size, Wobble, Orientation, CollisionWith, Velocity]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = new Mapper<Position>(Position, world);
    sizeMapper = new Mapper<Size>(Size, world);
    wobbleMapper = new Mapper<Wobble>(Wobble, world);
    orientationMapper = new Mapper<Orientation>(Orientation, world);
    collisionWithMapper = new Mapper<CollisionWith>(CollisionWith, world);
    velocityMapper = new Mapper<Velocity>(Velocity, world);
    cellWallMapper = new Mapper<CellWall>(CellWall, world);
    eatenByMapper = new Mapper<EatenBy>(EatenBy, world);
    tagManager = world.getManager(TagManager);
  }
}

abstract class _$StillBeingEatenCheckerSystem extends EntityProcessingSystem {
  Mapper<EatenBy> eatenByMapper;
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  _$StillBeingEatenCheckerSystem()
      : super(new Aspect.empty()..allOf([EatenBy, Position, Size]));
  @override
  void initialize() {
    super.initialize();
    eatenByMapper = new Mapper<EatenBy>(EatenBy, world);
    positionMapper = new Mapper<Position>(Position, world);
    sizeMapper = new Mapper<Size>(Size, world);
  }
}

abstract class _$DigestiveSystem extends EntityProcessingSystem {
  Mapper<EatenBy> eatenByMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  _$DigestiveSystem()
      : super(new Aspect.empty()
          ..allOf([EatenBy, Size, Color, Position, Velocity]));
  @override
  void initialize() {
    super.initialize();
    eatenByMapper = new Mapper<EatenBy>(EatenBy, world);
    sizeMapper = new Mapper<Size>(Size, world);
    colorMapper = new Mapper<Color>(Color, world);
    positionMapper = new Mapper<Position>(Position, world);
    velocityMapper = new Mapper<Velocity>(Velocity, world);
  }
}

abstract class _$FoodGrowingSystem extends EntityProcessingSystem {
  Mapper<Food> foodMapper;
  Mapper<Size> sizeMapper;
  Mapper<Growing> growingMapper;
  Mapper<Position> positionMapper;
  TagManager tagManager;
  CameraManager cameraManager;
  _$FoodGrowingSystem()
      : super(new Aspect.empty()
          ..allOf([Food, Size, Growing])
          ..exclude([EatenBy]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = new Mapper<Food>(Food, world);
    sizeMapper = new Mapper<Size>(Size, world);
    growingMapper = new Mapper<Growing>(Growing, world);
    positionMapper = new Mapper<Position>(Position, world);
    tagManager = world.getManager(TagManager);
    cameraManager = world.getManager(CameraManager);
  }
}

abstract class _$DamacreatSpawner extends VoidEntitySystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  TagManager tagManager;
  GroupManager groupManager;
  CameraManager cameraManager;
  @override
  void initialize() {
    super.initialize();
    positionMapper = new Mapper<Position>(Position, world);
    sizeMapper = new Mapper<Size>(Size, world);
    tagManager = world.getManager(TagManager);
    groupManager = world.getManager(GroupManager);
    cameraManager = world.getManager(CameraManager);
  }
}

abstract class _$FarAwayEntityDestructionSystem extends EntitySystem {
  Mapper<Position> positionMapper;
  TagManager tagManager;
  CameraManager cameraManager;
  _$FarAwayEntityDestructionSystem()
      : super(new Aspect.empty()
          ..allOf([Position])
          ..exclude([Particle, Lifetime]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = new Mapper<Position>(Position, world);
    tagManager = world.getManager(TagManager);
    cameraManager = world.getManager(CameraManager);
  }
}

abstract class _$WobbleSystem extends EntityProcessingSystem {
  Mapper<Wobble> wobbleMapper;
  _$WobbleSystem() : super(new Aspect.empty()..allOf([Wobble]));
  @override
  void initialize() {
    super.initialize();
    wobbleMapper = new Mapper<Wobble>(Wobble, world);
  }
}

abstract class _$CellWallSystem extends EntityProcessingSystem {
  Mapper<CellWall> cellWallMapper;
  _$CellWallSystem() : super(new Aspect.empty()..allOf([CellWall]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = new Mapper<CellWall>(CellWall, world);
  }
}
