part of shared;

class Position extends Component {
  double x, y;
  Position(this.x, this.y);
}

class Orientation extends Component {
  double angle;
  Orientation(this.angle);
}

class Size extends Component {
  double radius;
  Size(this.radius);
}

class Color extends Component {
  double r, g, b, a;
  Color(this.r, this.g, this.b, this.a);
  Color.fromHsl(double h, double s, double l, this.a) {
    var rgb = hslToRgb(h, s, l);
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
  }
}

class Thruster extends Component {
  bool left, right;
}

class Velocity extends Component {
  double angle;
  double value;
  double rotational;
  Velocity(this.value, this.angle, this.rotational);
}

class ThrusterParticle extends Component {}

class Lifetime extends Component {
  double timeLeft, timeMax;
  Lifetime(double timeMax)
      : timeLeft = timeMax,
        timeMax = timeMax;
}
