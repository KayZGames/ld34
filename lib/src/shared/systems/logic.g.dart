// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'logic.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$ThrusterHandlingSystem extends EntityProcessingSystem {
  Mapper<Velocity> velocityMapper;
  Mapper<Thruster> thrusterMapper;
  Mapper<Orientation> orientationMapper;
  _$ThrusterHandlingSystem()
      : super(Aspect.empty()..allOf([Velocity, Thruster, Orientation]));
  @override
  void initialize() {
    super.initialize();
    velocityMapper = Mapper<Velocity>(world);
    thrusterMapper = Mapper<Thruster>(world);
    orientationMapper = Mapper<Orientation>(world);
  }
}

abstract class _$ThrusterCellWallWeakeningSystem
    extends EntityProcessingSystem {
  Mapper<CellWall> cellWallMapper;
  Mapper<Thruster> thrusterMapper;
  _$ThrusterCellWallWeakeningSystem()
      : super(Aspect.empty()..allOf([CellWall, Thruster]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = Mapper<CellWall>(world);
    thrusterMapper = Mapper<Thruster>(world);
  }
}

abstract class _$EatenByVelocitySystem extends EntityProcessingSystem {
  Mapper<EatenBy> eatenByMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  _$EatenByVelocitySystem()
      : super(Aspect.empty()..allOf([EatenBy, Velocity, Position, Size]));
  @override
  void initialize() {
    super.initialize();
    eatenByMapper = Mapper<EatenBy>(world);
    velocityMapper = Mapper<Velocity>(world);
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
  }
}

abstract class _$MovementSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  _$MovementSystem() : super(Aspect.empty()..allOf([Position, Velocity]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    velocityMapper = Mapper<Velocity>(world);
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
      : super(Aspect.empty()
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
    positionMapper = Mapper<Position>(world);
    orientationMapper = Mapper<Orientation>(world);
    thrusterMapper = Mapper<Thruster>(world);
    velocityMapper = Mapper<Velocity>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    wobbleMapper = Mapper<Wobble>(world);
  }
}

abstract class _$ThrusterParticleColorModificationSystem
    extends EntityProcessingSystem {
  Mapper<ThrusterParticle> thrusterParticleMapper;
  Mapper<Color> colorMapper;
  Mapper<Lifetime> lifetimeMapper;
  _$ThrusterParticleColorModificationSystem()
      : super(Aspect.empty()..allOf([ThrusterParticle, Color, Lifetime]));
  @override
  void initialize() {
    super.initialize();
    thrusterParticleMapper = Mapper<ThrusterParticle>(world);
    colorMapper = Mapper<Color>(world);
    lifetimeMapper = Mapper<Lifetime>(world);
  }
}

abstract class _$ExpirationSystem extends EntityProcessingSystem {
  Mapper<Lifetime> lifetimeMapper;
  _$ExpirationSystem() : super(Aspect.empty()..allOf([Lifetime]));
  @override
  void initialize() {
    super.initialize();
    lifetimeMapper = Mapper<Lifetime>(world);
  }
}

abstract class _$HeartbeatSystem extends EntityProcessingSystem {
  Mapper<Color> colorMapper;
  Mapper<Size> sizeMapper;
  TagManager tagManager;
  _$HeartbeatSystem()
      : super(Aspect.empty()
          ..allOf([Color, Size])
          ..exclude([Particle]));
  @override
  void initialize() {
    super.initialize();
    colorMapper = Mapper<Color>(world);
    sizeMapper = Mapper<Size>(world);
    tagManager = world.getManager<TagManager>();
  }
}

abstract class _$FoodCollectionSystem extends EntitySystem {
  Mapper<Food> foodMapper;
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  TagManager tagManager;
  _$FoodCollectionSystem()
      : super(Aspect.empty()
          ..allOf([Food, Position, Size])
          ..exclude([EatenBy, CollisionWith]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    tagManager = world.getManager<TagManager>();
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
      : super(Aspect.empty()
          ..allOf(
              [Position, Size, Wobble, Orientation, CollisionWith, Velocity]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    wobbleMapper = Mapper<Wobble>(world);
    orientationMapper = Mapper<Orientation>(world);
    collisionWithMapper = Mapper<CollisionWith>(world);
    velocityMapper = Mapper<Velocity>(world);
    cellWallMapper = Mapper<CellWall>(world);
    eatenByMapper = Mapper<EatenBy>(world);
    tagManager = world.getManager<TagManager>();
  }
}

abstract class _$StillBeingEatenCheckerSystem extends EntityProcessingSystem {
  Mapper<EatenBy> eatenByMapper;
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  _$StillBeingEatenCheckerSystem()
      : super(Aspect.empty()..allOf([EatenBy, Position, Size]));
  @override
  void initialize() {
    super.initialize();
    eatenByMapper = Mapper<EatenBy>(world);
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
  }
}

abstract class _$DigestiveSystem extends EntityProcessingSystem {
  Mapper<EatenBy> eatenByMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  _$DigestiveSystem()
      : super(
            Aspect.empty()..allOf([EatenBy, Size, Color, Position, Velocity]));
  @override
  void initialize() {
    super.initialize();
    eatenByMapper = Mapper<EatenBy>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    positionMapper = Mapper<Position>(world);
    velocityMapper = Mapper<Velocity>(world);
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
      : super(Aspect.empty()
          ..allOf([Food, Size, Growing])
          ..exclude([EatenBy]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    sizeMapper = Mapper<Size>(world);
    growingMapper = Mapper<Growing>(world);
    positionMapper = Mapper<Position>(world);
    tagManager = world.getManager<TagManager>();
    cameraManager = world.getManager<CameraManager>();
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
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    tagManager = world.getManager<TagManager>();
    groupManager = world.getManager<GroupManager>();
    cameraManager = world.getManager<CameraManager>();
  }
}

abstract class _$FarAwayEntityDestructionSystem extends EntitySystem {
  Mapper<Position> positionMapper;
  TagManager tagManager;
  CameraManager cameraManager;
  _$FarAwayEntityDestructionSystem()
      : super(Aspect.empty()
          ..allOf([Position])
          ..exclude([Particle, Lifetime]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    tagManager = world.getManager<TagManager>();
    cameraManager = world.getManager<CameraManager>();
  }
}

abstract class _$WobbleSystem extends EntityProcessingSystem {
  Mapper<Wobble> wobbleMapper;
  _$WobbleSystem() : super(Aspect.empty()..allOf([Wobble]));
  @override
  void initialize() {
    super.initialize();
    wobbleMapper = Mapper<Wobble>(world);
  }
}

abstract class _$CellWallSystem extends EntityProcessingSystem {
  Mapper<CellWall> cellWallMapper;
  _$CellWallSystem() : super(Aspect.empty()..allOf([CellWall]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = Mapper<CellWall>(world);
  }
}
