part of client;


class InputHandlingSystem extends GenericInputHandlingSystem {
  CanvasElement canvas;
  Mapper<Thruster> tm;
  GameStateManager gsm;

  bool leftClick, rightClick, lockCamera;
  InputHandlingSystem(this.canvas) : super(Aspect.getAspectForAllOf([Thruster, Player]));

  @override
  void initialize() {
    super.initialize();
    canvas.onMouseDown.listen(handleMouseDown);
    canvas.onMouseUp.listen(handleMouseUp);
    canvas.onContextMenu.listen((event) => event.preventDefault());
  }

  @override
  void processEntity(Entity entity) {
    var t = tm[entity];
    t.left = keyState[KeyCode.F] || leftClick;
    t.right = keyState[KeyCode.J] || rightClick;
    if (isPressed(KeyCode.F4)) {
      gsm.lockCamera = !gsm.lockCamera;
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