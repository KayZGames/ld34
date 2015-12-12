uniform mat4 uViewProjection;
attribute vec4 aPosition;
attribute vec4 aColor;
varying vec4 vColor;

void main() {
  gl_Position = uViewProjection * aPosition;
  gl_PointSize = 1.0;
  vColor = aColor;
}