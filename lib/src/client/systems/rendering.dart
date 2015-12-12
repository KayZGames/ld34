part of client;



class CircleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> pm;
  Mapper<Size> sm;
  Mapper<Color> cm;
  WebGlViewProjectionMatrixManager vpmm;

  Float32List items;
  Uint16List indices;
  List<Attrib> attribsutes;

  final int verticeCount = 32;
  final int valuesPerItem = 6;

  CircleRenderingSystem(RenderingContext gl)
      : super(gl, Aspect.getAspectForAllOf([Position, Size, Color])) {
    attribsutes = [new Attrib('aPosition', 2), new Attrib('aColor', 4)];
  }

  @override
  void processEntity(int index, Entity entity) {
    var p = pm[entity];
    var s = sm[entity];
    var c = cm[entity];

    var itemOffset = index * (verticeCount + 1);
    var offset = index * (verticeCount + 1) * valuesPerItem;
    var indicesOffset = index * verticeCount * 3;

    items[offset] = p.x;
    items[offset + 1] = p.y;
    items[offset + 2] = c.r;
    items[offset + 3] = c.g;
    items[offset + 4] = c.b;
    items[offset + 5] = 0.0;
    for (int i = 0; i < verticeCount; i++) {
      items[offset + valuesPerItem + valuesPerItem * i] =
          p.x + s.radius * sin(2 * PI * i / verticeCount);
      items[offset + valuesPerItem + valuesPerItem * i + 1] =
          p.y + s.radius * cos(2 * PI * i / verticeCount);
      items[offset + valuesPerItem + valuesPerItem * i + 2] = c.r;
      items[offset + valuesPerItem + valuesPerItem * i + 3] = c.g;
      items[offset + valuesPerItem + valuesPerItem * i + 4] = c.b;
      items[offset + valuesPerItem + valuesPerItem * i + 5] = c.a;

      indices[indicesOffset + i * 3] = itemOffset;
      indices[indicesOffset + i * 3 + 1] = itemOffset + 1 + i;
      indices[indicesOffset + i * 3 + 2] = itemOffset + 2 + i;
    }
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
