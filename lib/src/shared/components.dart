part of shared;


class Position extends Component {
  double x, y;
  Position(this.x, this.y);
}

class Size extends Component {
  double radius;
  Size(this.radius);
}

class Color extends Component {
  double r, g, b, a;
  Color(this.r, this.g, this.b, this.a);
}