part of shared;

class GameStateManager extends Manager {
  int width, height;
}

class WebGlViewProjectionMatrixManager extends Manager {
  GameStateManager gsm;

  Matrix4 create2dViewProjectionMatrix() {
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
    var factor = gsm.width/gsm.height;
    if (factor > 4/3) {
      width = height * factor;
    } else {
      height = width / factor;
    }
    setOrthographicMatrix(twodOrthographicMatrix, -width/2, width/2, -height/2, height/2, 250, -250);

//  return threedViewProjextionMatrix * camera.three + twodOrthographicMatrix * camera.two;
    return twodOrthographicMatrix;
  }
}