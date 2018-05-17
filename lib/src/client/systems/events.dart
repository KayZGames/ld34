import 'dart:html';
import 'package:gamedev_helpers/gamedev_helpers.dart';
import 'package:ld34/shared.dart';

part 'events.g.dart';

@Generate(
  GenericInputHandlingSystem,
  allOf: [
    Thruster,
    Player,
  ],
  manager: [
    CameraManager,
  ],
)
class InputHandlingSystem extends _$InputHandlingSystem {
  CanvasElement canvas;

  bool leftClick = false, rightClick = false, lockCamera = false;
  InputHandlingSystem(this.canvas);

  @override
  void initialize() {
    super.initialize();
    canvas.onMouseDown.listen(handleMouseDown);
    canvas.onMouseUp.listen(handleMouseUp);
    canvas.onContextMenu.listen((event) => event.preventDefault());
  }

  @override
  void processEntity(Entity entity) {
    var t = thrusterMapper[entity];
    t.left = keyState[KeyCode.F] ?? leftClick;
    t.right = keyState[KeyCode.J] ?? rightClick;
    if (isPressed(KeyCode.F4)) {
      cameraManager.lockCamera = !cameraManager.lockCamera;
      unpress[KeyCode.F4] = true;
    }
  }

  void handleMouseDown(MouseEvent event) {
    if (event.button == 0) {
      leftClick = true;
    }
    if (event.button == 2) {
      rightClick = true;
    }
  }

  void handleMouseUp(MouseEvent event) {
    if (event.button == 0) {
      leftClick = false;
    }
    if (event.button == 2) {
      rightClick = false;
    }
  }
}
