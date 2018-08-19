part of shared;

class Size extends Component {
  double radius, realRadius;

  Size(double radius)
      : radius = radius,
        realRadius = radius;
}

class Thruster extends Component {
  bool left, right;
  Thruster()
      : left = false,
        right = false;
}

class Velocity extends Component {
  double angle;
  double value;
  double rotational;

  Velocity(this.value, this.angle, this.rotational);
}

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
    this.wobbleFactor = List.filled(circleFragments, 1.0);
  }
}

class CellWall extends Component {
  List<double> strengthFactor;
  double baseStrength;
  CellWall(this.baseStrength) {
    this.strengthFactor = List.filled(circleFragments, 1.0);
  }
}
