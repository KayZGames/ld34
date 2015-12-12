part of client;


class InputHandlingSystem extends GenericInputHandlingSystem {
  CanvasElement canvas;
  Mapper<Thruster> tm;

  bool leftClick, rightClick;
  InputHandlingSystem(this.canvas) : super(Aspect.getAspectForAllOf([Thruster]));

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