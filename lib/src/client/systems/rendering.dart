part of client;

class PlayerRenderingSystem extends CircleRenderingSystem {
  PlayerRenderingSystem(RenderingContext gl)
      : super(gl, Aspect.getAspectForAllOf([Player]));
}

class AiRenderingSystem extends CircleRenderingSystem {
  AiRenderingSystem(RenderingContext gl)
      : super(gl, Aspect.getEmpty().exclude([Player]));
}

class CircleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> pm;
  Mapper<Size> sm;
  Mapper<Color> cm;
  Mapper<Orientation> om;
  WebGlViewProjectionMatrixManager vpmm;

  Float32List items;
  Uint16List indices;
  List<Attrib> attribsutes;

  final int verticeCount = 32;
  final int valuesPerItem = 6;

  CircleRenderingSystem(RenderingContext gl, Aspect aspect)
      : super(gl, aspect.allOf([Position, Size, Color, Orientation])) {
    attribsutes = [new Attrib('aPosition', 2), new Attrib('aColor', 4)];
  }

  @override
  void processEntity(int index, Entity entity) {
    var p = pm[entity];
    var s = sm[entity];
    var c = cm[entity];
    var o = om[entity];

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
      items[offset + valuesPerItem + valuesPerItem * i] =
          p.x + s.radius * cos(o.angle + 2 * PI * i / verticeCount);
      items[offset + valuesPerItem + valuesPerItem * i + 1] =
          p.y + s.radius * sin(o.angle + 2 * PI * i / verticeCount);
      items[offset + valuesPerItem + valuesPerItem * i + 2] = c.r;
      items[offset + valuesPerItem + valuesPerItem * i + 3] = c.g;
      items[offset + valuesPerItem + valuesPerItem * i + 4] = c.b;
      var alphaFactor = (i - verticeCount ~/ 2).abs() / 16;
      items[offset + valuesPerItem + valuesPerItem * i + 5] =
          c.a + 0.5 * alphaFactor * alphaFactor;

      indices[indicesOffset + i * 3] = itemOffset;
      indices[indicesOffset + i * 3 + 1] = itemOffset + 1 + i;
      indices[indicesOffset + i * 3 + 2] = itemOffset + 2 + i;
    }
    var i = (6 / 16 * verticeCount).truncate();
    items[offset + valuesPerItem + valuesPerItem * i] =
        p.x + s.radius * 1.1 * cos(o.angle + 2 * PI * i / verticeCount);
    items[offset + valuesPerItem + valuesPerItem * i + 1] =
        p.y + s.radius * 1.1 * sin(o.angle + 2 * PI * i / verticeCount);
    i = (10 / 16 * verticeCount).truncate();
    items[offset + valuesPerItem + valuesPerItem * i] =
        p.x + s.radius * 1.1 * cos(o.angle + 2 * PI * i / verticeCount);
    items[offset + valuesPerItem + valuesPerItem * i + 1] =
        p.y + s.radius * 1.1 * sin(o.angle + 2 * PI * i / verticeCount);

    indices[indicesOffset + verticeCount * 3 - 1] = itemOffset + 1;
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

class ParticleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> pm;
  Mapper<Color> cm;
  WebGlViewProjectionMatrixManager vpmm;

  Float32List positions;
  Float32List colors;

  ParticleRenderingSystem(RenderingContext gl)
      : super(gl, Aspect.getAspectForAllOf([Position, Particle, Color]));

  @override
  void processEntity(int index, Entity entity) {
    var p = pm[entity];
    var c = cm[entity];

    var pOffset = index * 2;
    var cOffset = index * 4;

    positions[pOffset] = p.x;
    positions[pOffset + 1] = p.y;

    colors[cOffset] = c.r;
    colors[cOffset + 1] = c.g;
    colors[cOffset + 2] = c.b;
    colors[cOffset + 3] = c.a;
  }

  @override
  void render(int length) {
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uViewProjection'),
        false, vpmm.create2dViewProjectionMatrix().storage);

    buffer('aPosition', positions, 2);
    buffer('aColor', colors, 4);

    gl.drawArrays(POINTS, 0, length);
  }

  @override
  void updateLength(int length) {
    positions = new Float32List(length * 2);
    colors = new Float32List(length * 4);
  }

  @override
  String get vShaderFile => 'ParticleRenderingSystem';
  @override
  String get fShaderFile => 'ParticleRenderingSystem';
}
