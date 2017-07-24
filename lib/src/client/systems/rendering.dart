part of client;

class PlayerRenderingSystem extends CircleRenderingSystem {
  Mapper<CellWall> cwm;

  final int verticeCount = circleFragments * 2;
  final int trianglePerFragment = 3;

  PlayerRenderingSystem(RenderingContext gl)
      : super(gl, new Aspect.forAllOf([Player, CellWall]));

  @override
  void processEntity(int index, Entity entity) {
    var p = pm[entity];
    var s = sm[entity];
    var c = cm[entity];
    var o = om[entity];
    var w = wm[entity];
    var cw = cwm[entity];

    var itemOffset = index * (verticeCount + 1);
    var offset = index * (verticeCount + 1) * valuesPerItem;
    var indicesOffset = index * verticeCount * 3 * trianglePerFragment;

    items[offset] = p.x;
    items[offset + 1] = p.y;
    items[offset + 2] = c.r;
    items[offset + 3] = c.g;
    items[offset + 4] = c.b;
    items[offset + 5] = c.a / 2;
    for (int i = 0; i < circleFragments; i++) {
      var baseOffset = offset + valuesPerItem + valuesPerItem * i;
      var radius = (s.radius - cw.baseStrength * cw.strengthFactor[i]) *
          w.wobbleFactor[i];
      var angle = o.angle + 2 * PI * i / circleFragments;
      createCircleVertex(
          baseOffset, p, radius, angle, c, i, indicesOffset, itemOffset);
      items[baseOffset + 5] /= w.wobbleFactor[i];

      // inner triangle
      indices[indicesOffset + i * 9] = itemOffset;
      indices[indicesOffset + i * 9 + 1] = itemOffset + 1 + i;
      indices[indicesOffset + i * 9 + 2] = itemOffset + 2 + i;

      baseOffset = offset +
          valuesPerItem +
          valuesPerItem * i +
          circleFragments * valuesPerItem;
      radius = s.radius * w.wobbleFactor[i];
      createCircleVertex(
          baseOffset, p, radius, angle, c, i, indicesOffset, itemOffset);
      items[baseOffset + 5] = 1.0 * cw.strengthFactor[i];

      // triangle 1 of cell wall
      indices[indicesOffset + i * 9 + 3] = itemOffset + 1 + i;
      indices[indicesOffset + i * 9 + 4] = itemOffset + circleFragments + 1 + i;
      indices[indicesOffset + i * 9 + 5] = itemOffset + circleFragments + 2 + i;
      // triangle 2 of cell wall
      indices[indicesOffset + i * 9 + 6] = itemOffset + 1 + i;
      indices[indicesOffset + i * 9 + 7] = itemOffset + 2 + i;
      indices[indicesOffset + i * 9 + 8] = itemOffset + circleFragments + 2 + i;
    }
    createThrusters(offset, s, w, cw, o, p);

    indices[indicesOffset + circleFragments * 9 - 1] =
        itemOffset + circleFragments + 1;
    indices[indicesOffset + circleFragments * 9 - 2] = itemOffset + 1;
    indices[indicesOffset + circleFragments * 9 - 4] =
        itemOffset + circleFragments + 1;
    indices[indicesOffset + circleFragments * 9 - 7] = itemOffset + 1;
  }

  void createThrusters(
      int offset, Size s, Wobble w, CellWall cw, Orientation o, Position p) {
    var i = (3 / 8 * circleFragments).truncate();
    createThruster(offset, i, s, w, cw, o, p);
    i = (5 / 8 * circleFragments).truncate();
    createThruster(offset, i, s, w, cw, o, p);
  }

  void createThruster(int offset, int i, Size s, Wobble w, CellWall cw,
      Orientation o, Position p) {
    var baseOffset = offset + valuesPerItem + valuesPerItem * i;
    var radius =
        (s.radius - cw.baseStrength * cw.strengthFactor[i]) * w.wobbleFactor[i];
    var angle = o.angle + 2 * PI * i / circleFragments;
    items[baseOffset] = p.x + radius * 1.1 * cos(angle);
    items[baseOffset + 1] = p.y + radius * 1.1 * sin(angle);

    baseOffset = offset +
        valuesPerItem +
        valuesPerItem * i +
        circleFragments * valuesPerItem;
    radius = s.radius * w.wobbleFactor[i];
    items[baseOffset] = p.x + radius * 1.1 * cos(angle);
    items[baseOffset + 1] = p.y + radius * 1.1 * sin(angle);
  }

  @override
  void updateLength(int length) {
    items = new Float32List(length * (verticeCount + 1) * valuesPerItem);
    indices =
        new Uint16List(length * circleFragments * 3 * trianglePerFragment);
  }
}

class AiRenderingSystem extends CircleRenderingSystem {
  AiRenderingSystem(RenderingContext gl)
      : super(gl, new Aspect.forAllOf([Ai]));
}

class FoodRenderingSystem extends CircleRenderingSystem {
  FoodRenderingSystem(RenderingContext gl)
      : super(gl, new Aspect.forAllOf([Food])..exclude([Ai]));

  void processEntity(int index, Entity entity) {
    super.processEntity(index, entity);
    var offset = index * (verticeCount + 1) * valuesPerItem;
    var c = cm[entity];
    items[offset + 5] = c.a;
  }
}

class CircleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> pm;
  Mapper<Size> sm;
  Mapper<Color> cm;
  Mapper<Orientation> om;
  Mapper<Wobble> wm;
  WebGlViewProjectionMatrixManager vpmm;

  Float32List items;
  Uint16List indices;
  List<Attrib> attribsutes;

  final int verticeCount = circleFragments;
  final int valuesPerItem = 6;

  CircleRenderingSystem(RenderingContext gl, Aspect aspect)
      : super(gl, aspect..allOf([Position, Size, Color, Orientation, Wobble])) {
    attribsutes = [new Attrib('aPosition', 2), new Attrib('aColor', 4)];
  }

  @override
  void processEntity(int index, Entity entity) {
    var p = pm[entity];
    var s = sm[entity];
    var c = cm[entity];
    var o = om[entity];
    var w = wm[entity];

    var itemOffset = index * (verticeCount + 1);
    var offset = index * (verticeCount + 1) * valuesPerItem;
    var indicesOffset = index * verticeCount * 3;

    items[offset] = p.x;
    items[offset + 1] = p.y;
    items[offset + 2] = c.r;
    items[offset + 3] = c.g;
    items[offset + 4] = c.b;
    items[offset + 5] = c.a / 2;
    for (int i = 0; i < verticeCount; i++) {
      var baseOffset = offset + valuesPerItem + valuesPerItem * i;
      var radius = s.radius * w.wobbleFactor[i];
      var angle = o.angle + 2 * PI * i / verticeCount;
      createCircleVertex(
          baseOffset, p, radius, angle, c, i, indicesOffset, itemOffset);

      indices[indicesOffset + i * 3] = itemOffset;
      indices[indicesOffset + i * 3 + 1] = itemOffset + 1 + i;
      indices[indicesOffset + i * 3 + 2] = itemOffset + 2 + i;
    }

    indices[indicesOffset + verticeCount * 3 - 1] = itemOffset + 1;
  }

  void createCircleVertex(int baseOffset, Position p, double radius,
      double angle, Color c, int i, int indicesOffset, int itemOffset) {
    items[baseOffset] = p.x + radius * cos(angle);
    items[baseOffset + 1] = p.y + radius * sin(angle);
    items[baseOffset + 2] = c.r;
    items[baseOffset + 3] = c.g;
    items[baseOffset + 4] = c.b;
    var alphaFactor = (i - circleFragments ~/ 2).abs() / (circleFragments ~/ 2);
    items[baseOffset + 5] = c.a + 0.5 * alphaFactor * alphaFactor;
  }

  @override
  void render(int length) {
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uViewProjection'),
        false, vpmm.create2dViewProjectionMatrix().storage);

    bufferElements(attribsutes, items, indices);
    gl.drawElements(TRIANGLES, indices.length, UNSIGNED_SHORT, 0);
  }

  @override
  void updateLength(int length) {
    items = new Float32List(length * (verticeCount + 1) * valuesPerItem);
    indices = new Uint16List(length * verticeCount * 3);
  }

  @override
  String get vShaderFile => 'PositionRenderingSystem';

  @override
  String get fShaderFile => 'PositionRenderingSystem';
}


class BackgroundRenderingSystemBase extends VoidWebGlRenderingSystem {
  WebGlViewProjectionMatrixManager vpmm;
  TagManager tm;
  Mapper<Position> pm;
  CameraManager cm;

  double offsetX = -500000 + random.nextDouble() * 1000000.0;
  double offsetY = -500000 + random.nextDouble() * 1000000.0;
  Float32List rgb = new Float32List.fromList([0.0, 0.0, 0.0]);
  double parallaxFactor = 1.0;

  BackgroundRenderingSystemBase(RenderingContext gl) : super(gl);

  @override
  void render() {
    var p = pm[tm.getEntity(playerTag)];
    var zoom = 1.0;
    var size = max(cm.width, cm.height) / zoom;
    var px = p.x * parallaxFactor;
    var py = p.y * parallaxFactor;
    Float32List background = new Float32List.fromList([
      -size / 2 + px + offsetX,
      -size / 2 + py + offsetY,
      -size / 2 + px + offsetX,
      size / 2 + py + offsetY,
      size / 2 + px + offsetX,
      size / 2 + py + offsetY,
      size / 2 + px + offsetX,
      -size / 2 + py + offsetY
    ]);
    var viewProjectionMatrix =
        vpmm.create2dViewProjectionMatrixForPosition(px, py);
    viewProjectionMatrix.translate(px, py);
    viewProjectionMatrix.scale(zoom, zoom);
    viewProjectionMatrix.translate(-px, -py);
    viewProjectionMatrix.translate(-offsetX, -offsetY);

    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uViewProjection'),
        false, viewProjectionMatrix.storage);
    gl.uniform4f(gl.getUniformLocation(program, 'uDimension'),
        cm.width.toDouble(), cm.height.toDouble(), 0.0, 0.0);
    gl.uniform4f(
        gl.getUniformLocation(program, 'uPosition'), p.x, p.y, 0.0, 0.0);
    gl.uniform3fv(gl.getUniformLocation(program, 'uRgb'), rgb);
    gl.uniform1f(gl.getUniformLocation(program, 'uTime'), time);
    buffer('aPosition', background, 2);
    gl.drawArrays(TRIANGLE_FAN, 0, 4);
  }

  @override
  String get vShaderFile => 'BackgroundRenderingSystem';
  @override
  String get fShaderFile => 'BackgroundRenderingSystem';
}

class BackgroundRenderingSystemLayer0 extends BackgroundRenderingSystemBase {
  BackgroundRenderingSystemLayer0(RenderingContext gl) : super(gl) {
    rgb[0] = random.nextDouble();
    rgb[1] = random.nextDouble();
    rgb[2] = random.nextDouble();
    parallaxFactor = 0.8;
  }
}

class BackgroundRenderingSystemLayer1 extends BackgroundRenderingSystemBase {
  BackgroundRenderingSystemLayer1(RenderingContext gl) : super(gl) {
    rgb[0] = random.nextDouble();
    rgb[1] = random.nextDouble();
    rgb[2] = random.nextDouble();
  }
}

class BackgroundRenderingSystemLayer2 extends BackgroundRenderingSystemBase {
  BackgroundRenderingSystemLayer2(RenderingContext gl) : super(gl) {
    rgb[0] = random.nextDouble();
    rgb[1] = random.nextDouble();
    rgb[2] = random.nextDouble();
  }
}

class BackgroundRenderingSystemLayer3 extends BackgroundRenderingSystemBase {
  BackgroundRenderingSystemLayer3(RenderingContext gl) : super(gl) {
    rgb[0] = random.nextDouble();
    rgb[1] = random.nextDouble();
    rgb[2] = random.nextDouble();
    parallaxFactor = 1.2;
  }
}