part of shared;

class GameStateManager extends Manager {
  int width, height;
  bool lockCamera;
}

class WebGlViewProjectionMatrixManager extends Manager {
  Mapper<Position> pm;
  Mapper<Orientation> om;
  GameStateManager gsm;
  TagManager tm;

  Matrix4 create2dViewProjectionMatrix() {
    var playerEntity = tm.getEntity(playerTag);
    var p = pm[playerEntity];
    var o = om[playerEntity];
    var angle = 0.0;
    var viewMatrix = new Matrix4.identity();
    var projMatrix = new Matrix4.identity();
    setViewMatrix(
        viewMatrix,
        new Vector3(400.0 + 100 * sin(angle), 550.0, -150.0),
        new Vector3(400.0, 200.0, 150.0),
        new Vector3(0.0, -1.0, 0.0));
    setPerspectiveMatrix(projMatrix, PI / 2, 4 / 3, 1, 1000);
    var threedViewProjextionMatrix = projMatrix * viewMatrix;
    var twodOrthographicMatrix = new Matrix4.identity();
    var width = 800;
    var height = 600;
    var factor = gsm.width / gsm.height;
    if (factor > 4 / 3) {
      width = height * factor;
    } else {
      height = width / factor;
    }
    setOrthographicMatrix(twodOrthographicMatrix, p.x - width / 2,
        p.x + width / 2, p.y - height / 2, p.y + height / 2, 250, -250);
    if (gsm.lockCamera) {
      twodOrthographicMatrix.translate(p.x, p.y);
      twodOrthographicMatrix.rotate(
          new Vector3(0.0, 0.0, 1.0), (PI / 2 - o.angle) % (2 * PI));
      twodOrthographicMatrix.translate(-p.x, -p.y);
    }

//  return threedViewProjextionMatrix * camera.three + twodOrthographicMatrix * camera.two;
    return twodOrthographicMatrix; // * rotationMatrix;
  }
}
