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
  Game() : super.noAssets('ld34', '#game', 800, 600, webgl: true) {
    world.addManager(new GameStateManager());
    world.addManager(new WebGlViewProjectionMatrixManager());
    handleResize(window.innerWidth, window.innerHeight);
    window.onResize
        .listen((_) => handleResize(window.innerWidth, window.innerHeight));
  }

  void createEntities() {
    addEntity([
      new Position(0.0, 0.0),
      new Size(25.0),
      new Color(1.0, 0.0, 0.0, 0.2),
      new Thruster(),
      new Orientation(0.0),
      new Velocity(5.0, 1.0, 0.0)
    ]);
    addEntity([
      new Position(20.0, 0.0),
      new Size(5.0),
      new Color(0.0, 1.0, 0.0, 0.2),
      new Orientation(0.0)
    ]);
    addEntity([
      new Position(50.0, 0.0),
      new Size(20.0),
      new Color(0.0, 0.0, 1.0, 0.2),
      new Orientation(0.0)
    ]);
    addEntity([
      new Position(100.0, 100.0),
      new Size(10.0),
      new Color(1.0, 1.0, 1.0, 0.2),
      new Orientation(0.0)
    ]);
    addEntity([
      new Position(-20.0, -20.0),
      new Size(7.5),
      new Color(0.1, 0.1, 0.1, 0.2),
      new Orientation(0.0)
    ]);
  }

  Map<int, List<EntitySystem>> getSystems() {
    return {
      GameBase.rendering: [
        new MovementSystem(),
        new WebGlCanvasCleaningSystem(ctx),
        new CircleRenderingSystem(ctx),
        new InputHandlingSystem(canvas),
        new ThrusterHandlingSystem(),
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
    (ctx as RenderingContext).viewport(0, 0, width, height);
    (world.getManager(GameStateManager) as GameStateManager)
      ..width = width
      ..height = height;
  }
}
