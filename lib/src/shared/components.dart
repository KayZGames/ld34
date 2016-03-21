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
  double radius, realRadius;

  Size(double radius)
      : radius = radius,
        realRadius = radius;
}

class Color extends Component {
  double r, g, b, a, l, realAlpha, realR, realG, realB;

  Color(this.r, this.g, this.b, double a)
      : a = a,
        realAlpha = a {
    this.l = rgbToHsl(r, g, b)[2];
    this.realR = this.r;
    this.realG = this.g;
    this.realB = this.b;
  }

  Color.fromHsl(double h, double s, this.l, this.a) {
    var rgb = hslToRgb(h, s, l);
    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
    this.realR = this.r;
    this.realG = this.g;
    this.realB = this.b;
    this.realAlpha = a;
  }

  void setLightness(double lightness) {
    var hsl = rgbToHsl(r, g, b);
    hsl[2] = lightness;
    var rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];
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

class Particle extends Component {}

class ThrusterParticle extends Component {}

class Player extends Component {}

class Ai extends Component {}

class Food extends Component {}

class Growing extends Component {
  double targetRadius, speed;
  Growing(this.targetRadius, this.speed);
}

class Lifetime extends Component {
  double timeLeft, timeMax;

  Lifetime(double timeMax)
      : timeLeft = timeMax,
        timeMax = timeMax;
}

class EatenBy extends Component {
  Entity eater;
  EatenBy(this.eater);
}
class CollisionWith extends Component {
  Entity collider;
  CollisionWith(this.collider);
}

class Wobble extends Component {
  List<double> wobbleFactor;
  Wobble() {
    this.wobbleFactor = new List.filled(circleFragments, 1.0);
  }
}

class CellWall extends Component {
  List<double> strengthFactor;
  double baseStrength;
  CellWall(this.baseStrength) {
    this.strengthFactor = new List.filled(circleFragments, 1.0);
  }
}