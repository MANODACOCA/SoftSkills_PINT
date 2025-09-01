import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:http/http.dart' as http;
import 'user.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;

  User? get user => _user;
  String? get token => _token;

  void setUser(User user, {String? token}) async {
    _user = user;
    if (token != null) {
      _token = token;
    }

    final fcmToken = await FirebaseMessaging.instance.getToken();
    if (fcmToken != null) {
      await http.post(
        Uri.parse("https://softskills-api.onrender.com/devices_fcm/save-token"),
        body: {"id_utilizador": user.id.toString(), "token": fcmToken},
      );
    }

    FirebaseMessaging.instance.onTokenRefresh.listen((newToken) {
      http.post(
        Uri.parse("https://softskills-api.onrender.com/devices_fcm/save-token"),
        body: {"id_utilizador": user.id.toString(), "token": newToken},
      );
    });

    notifyListeners();
  }

  void setToken(String token) {
    _token = token;
    notifyListeners();
  }

  void logout() async {
    if (_user != null) {
      final fcmToken = await FirebaseMessaging.instance.getToken();
      if (fcmToken != null) {
        await http.post(
          Uri.parse("https://softskills-api.onrender.com/devices_fcm/delete-token"),
          body: {"id_utilizador": user!.id.toString(), "token": fcmToken},
        );
      }
    }

    _user = null;
    _token = null;
    notifyListeners();
  }
}
