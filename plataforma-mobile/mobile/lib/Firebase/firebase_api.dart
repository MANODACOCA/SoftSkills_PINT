// ignore_for_file: non_constant_identifier_names

import 'package:firebase_messaging/firebase_messaging.dart';

Future<void> handleBackgroundMessage(RemoteMessage message) async {
  print('Title: ${message.notification?.title}');
  print('Body: ${message.notification?.body}');
  print('Payload: ${message.data}');
}

class FirebaseAPI {
  final _firebaseMessaging = FirebaseMessaging.instance;

  Future<void> initNotifications() async {
    await _firebaseMessaging.requestPermission();
    final TCMToken = await _firebaseMessaging.getToken();
    print('============================');
    print('Token: $TCMToken');
    print('============================');
    FirebaseMessaging.onBackgroundMessage(handleBackgroundMessage);
  }
}
