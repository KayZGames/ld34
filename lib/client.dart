library client;

import 'dart:html';
export 'dart:html';
import 'dart:typed_data';
import 'dart:web_gl';
import 'package:ld34/shared.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';
export 'package:gamedev_helpers/gamedev_helpers.dart';
//part 'src/client/systems/name.dart';
part 'src/client/systems/events.dart';
part 'src/client/systems/rendering.dart';

class Game extends GameBase {
  Game() : super.noAssets('ld34', '#game', webgl: true, depthTest: false) {
    world.addManager(new CameraManager());
    world.addManager(new WebGlViewProjectionMatrixManager());
    world.addManager(new TagManager());
    world.addManager(new GroupManager());
    handleResize(window.innerWidth, window.innerHeight);
    window.onResize
        .listen((_) => handleResize(window.innerWidth, window.innerHeight));
  }

  void createEntities() {
    var tm = world.getManager(TagManager) as TagManager;
    var player = addEntity([
      new Position(0.0, 0.0),
      new Size(20.0),
      new Color.fromHsl(random.nextDouble(), 0.9, 0.6, 0.4),
      new Thruster(),
      new Orientation(PI/2),
      new Velocity(0.0, 0.0, 0.0),
      new Player(),
      new Wobble(),
      new CellWall(5.0)
    ]);
    tm.register(player, playerTag);

    for (int i = 0; i < 1000; i++) {
      world.createAndAddEntity([
        new Position(-1000.0 + random.nextDouble() * 2000, -1000.0 + random.nextDouble() * 2000),
        new Particle(),
        new Color.fromHsl(random.nextDouble(), 1.0, 1.0, 1.0),
      ]);
    }
  }

  Map<int, List<EntitySystem>> getSystems() {
    return {
      GameBase.rendering: [
        new MovementSystem(),
        new HeartbeatSystem(),
        new WebGlCanvasCleaningSystem(gl),
        new BackgroundRenderingSystemLayer0(gl),
//        new BackgroundRenderingSystemLayer1(gl),
//        new BackgroundRenderingSystemLayer2(gl),
        new ThrusterParticleColorModificationSystem(),
        new FoodRenderingSystem(gl),
        new ParticleRenderingSystem(gl),
        new AiRenderingSystem(gl),
        new PlayerRenderingSystem(gl),
        new BackgroundRenderingSystemLayer3(gl),
        new InputHandlingSystem(canvas),
        new ThrusterHandlingSystem(),
        new ThrusterCellWallWeakeningSystem(),
        new EatenByVelocitySystem(),
        new FoodGrowingSystem(),
        new FoodCollectionSystem(),
        new StillBeingEatenCheckerSystem(),
        new DigestiveSystem(),
        new ExpirationSystem(),
        new ThrusterParticleEmissionSystem(),
        new FarAwayEntityDestructionSystem(),
        new DamacreatSpawner(),
        new WobbleSystem(),
        new CellWallSystem(),
        new EntityInteractionSystem(),
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
    (world.getManager(CameraManager) as CameraManager)
      ..width = width
      ..height = height;
  }
}
