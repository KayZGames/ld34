// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rendering.dart';

// **************************************************************************
// Generator: SystemGenerator
// **************************************************************************

abstract class _$PlayerRenderingSystem extends CircleRenderingSystem {
  Mapper<Player> playerMapper;
  Mapper<CellWall> cellWallMapper;
  _$PlayerRenderingSystem(RenderingContext2 gl)
      : super(gl, new Aspect.empty()..allOf([Player, CellWall]));
  @override
  void initialize() {
    super.initialize();
    playerMapper = new Mapper<Player>(Player, world);
    cellWallMapper = new Mapper<CellWall>(CellWall, world);
  }
}

abstract class _$AiRenderingSystem extends CircleRenderingSystem {
  Mapper<Ai> aiMapper;
  _$AiRenderingSystem(RenderingContext2 gl)
      : super(gl, new Aspect.empty()..allOf([Ai]));
  @override
  void initialize() {
    super.initialize();
    aiMapper = new Mapper<Ai>(Ai, world);
  }
}

abstract class _$FoodRenderingSystem extends CircleRenderingSystem {
  Mapper<Food> foodMapper;
  _$FoodRenderingSystem(RenderingContext2 gl)
      : super(
            gl,
            new Aspect.empty()
              ..allOf([Food])
              ..exclude([Ai]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = new Mapper<Food>(Food, world);
  }
}

abstract class _$CircleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Wobble> wobbleMapper;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  _$CircleRenderingSystem(RenderingContext2 gl, Aspect aspect)
      : super(gl, aspect..allOf([Position, Size, Color, Orientation, Wobble]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = new Mapper<Position>(Position, world);
    sizeMapper = new Mapper<Size>(Size, world);
    colorMapper = new Mapper<Color>(Color, world);
    orientationMapper = new Mapper<Orientation>(Orientation, world);
    wobbleMapper = new Mapper<Wobble>(Wobble, world);
    webGlViewProjectionMatrixManager =
        world.getManager(WebGlViewProjectionMatrixManager);
  }
}

abstract class _$BackgroundRenderingSystemBase
    extends VoidWebGlRenderingSystem {
  Mapper<Position> positionMapper;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  TagManager tagManager;
  CameraManager cameraManager;
  _$BackgroundRenderingSystemBase(RenderingContext2 gl) : super(gl);
  @override
  void initialize() {
    super.initialize();
    positionMapper = new Mapper<Position>(Position, world);
    webGlViewProjectionMatrixManager =
        world.getManager(WebGlViewProjectionMatrixManager);
    tagManager = world.getManager(TagManager);
    cameraManager = world.getManager(CameraManager);
  }
}
