uniform mat4 uViewProjection;
uniform vec2 uPlayerPos;
attribute vec2 aPosition;
attribute vec4 aColor;
varying vec4 vColor;

void main() {
    vec2 pos = aPosition + 2000.0 * floor((vec2(1000.0, 1000.0) - aPosition + uPlayerPos) / 2000.0);
    gl_Position = uViewProjection * vec4(pos, 0.0, 1.0);
    gl_PointSize = 1.0;
    vColor = aColor;
}