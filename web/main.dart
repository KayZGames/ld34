import 'package:ld34/client.dart';

void main() {
  querySelector('#loading').style.display = 'none';
  (querySelector('#startGame') as ButtonElement).style.display = 'inline-block';
  querySelector('#startGame').onClick.listen((_) {
    querySelector('#story').style.opacity = '0.0';
    querySelector('#game').style.opacity = '1.0';
    Timer(Duration(seconds: 1),
        () => querySelector('#story').style.display = 'none');
    Game().start();
  });
}
