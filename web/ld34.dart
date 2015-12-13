import 'package:ld34/client.dart';
void main() {
  querySelector('#startGame').onClick.listen((_) {
    querySelector('#story').style.opacity = '0.0';
    querySelector('#game').style.opacity = '1.0';
    new Timer(new Duration(seconds: 1), () => querySelector('#story').style.display = 'none');
    new Game().start();
  });
}
