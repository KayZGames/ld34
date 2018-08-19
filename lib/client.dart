library client;

import 'dart:html';
export 'dart:html';
import 'package:ld34/shared.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;
export 'package:gamedev_helpers/gamedev_helpers.dart';
//part 'src/client/systems/name.dart';
import 'src/client/systems/events.dart';
import 'src/client/systems/rendering.dart';

class Game extends GameBase {
  Game() : super.noAssets('ld34', '#game', webgl: true, depthTest: false) {
    world.addManager(CameraManager());
    world.addManager(WebGlViewProjectionMatrixManager());
    world.addManager(TagManager());
    world.addManager(GroupManager());
    handleResize(window.innerWidth, window.innerHeight);
    window.onResize
        .listen((_) => handleResize(window.innerWidth, window.innerHeight));
  }

  void createEntities() {
    var tm = world.getManager<TagManager>();
    var player = addEntity([
      Position(0.0, 0.0),
      Size(20.0),
      Color.fromHsl(random.nextDouble(), 0.9, 0.6, 0.4),
      Thruster(),
      Orientation(pi / 2),
      Velocity(0.0, 0.0, 0.0),
      Player(),
      Wobble(),
      CellWall(5.0)
    ]);
    tm.register(player, playerTag);

    for (int i = 0; i < 1000; i++) {
      world.createAndAddEntity([
        Position(-1000.0 + random.nextDouble() * 2000,
            -1000.0 + random.nextDouble() * 2000),
        Particle(),
        Color.fromHsl(random.nextDouble(), 1.0, 1.0, 1.0),
      ]);
    }
  }

  Map<int, List<EntitySystem>> getSystems() {
    return {
      GameBase.rendering: [
        MovementSystem(),
        HeartbeatSystem(),
        WebGlCanvasCleaningSystem(gl),
        BackgroundRenderingSystemLayer0(gl),
//        new BackgroundRenderingSystemLayer1(gl),
//        new BackgroundRenderingSystemLayer2(gl),
        ThrusterParticleColorModificationSystem(),
        FoodRenderingSystem(gl),
        ParticleRenderingSystem(gl),
        AiRenderingSystem(gl),
        PlayerRenderingSystem(gl),
        BackgroundRenderingSystemLayer3(gl),
        InputHandlingSystem(canvas),
        ThrusterHandlingSystem(),
        ThrusterCellWallWeakeningSystem(),
        EatenByVelocitySystem(),
        FoodGrowingSystem(),
        FoodCollectionSystem(),
        StillBeingEatenCheckerSystem(),
        DigestiveSystem(),
        ExpirationSystem(),
        ThrusterParticleEmissionSystem(),
        FarAwayEntityDestructionSystem(),
        DamacreatSpawner(),
        WobbleSystem(),
        CellWallSystem(),
        EntityInteractionSystem(),
//        new FpsPrintingSystem()
      ],
      GameBase.physics: []
    };
  }

  void handleResize(int width, int height) {
    width = max(800, width);
    height = max(600, height);
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '${width}px';
    canvas.style.height = '${height}px';
    gl.viewport(0, 0, width, height);
    world.getManager<CameraManager>()
      ..width = width
      ..height = height;
  }
}
