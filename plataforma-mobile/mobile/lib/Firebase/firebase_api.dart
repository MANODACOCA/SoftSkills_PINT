// ignore_for_file: non_constant_identifier_names

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:mobile/Firebase/flutter_notificartions.dart';

Future<void> handleBackgroundMessage(RemoteMessage message) async {
  print('============================');
  print('Title: ${message.notification?.title}');
  print('Body: ${message.notification?.body}');
  print('Payload: ${message.data}');
  print('============================');
}

class FirebaseAPI {
  final _firebaseMessaging = FirebaseMessaging.instance;

  Future<void> initNotifications() async {
    await _firebaseMessaging.requestPermission();

    final fcmToken = await FirebaseMessaging.instance.getToken();
    print('============================');
    print('Token: $fcmToken');
    print('============================');

    print('============================');
    print('Registrando listener onMessage...');
    print('============================');

    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      print('============================');
      print('Mensagem RECEBIDA em foreground');
      print('Title: ${message.notification?.title}');
      print('Body: ${message.notification?.body}');
      print('Data: ${message.data}');
      print('============================');
      showLocalNotification(message);
    });
  }
}
