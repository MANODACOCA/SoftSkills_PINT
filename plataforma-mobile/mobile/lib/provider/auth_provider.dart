import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'user.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;


  User? get user => _user;
  String? get token => _token;

  Future<void> setUser(User user, {String? token}) async {
    _user = user;
    if (token != null) {
      _token = token;
    }

    final fcmToken = await FirebaseMessaging.instance.getToken();

    final uri = Uri.https('softskills-api.onrender.com', '/devices_fcm/get', {
      'id_utilizador': user.id.toString(),
      'token': fcmToken,
    });

    final jaRegistouDevice = await http.get(uri);

    if (fcmToken != null) {
      //guarda na SharedPreferences
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('fcmToken', fcmToken);
      await prefs.setString('userId', user.id.toString());

      if (jaRegistouDevice.statusCode != 200) {
        await http.post(
          Uri.parse(
            "https://softskills-api.onrender.com/devices_fcm/save-token",
          ),
          body: {"id_utilizador": user.id.toString(), "token": fcmToken},
        );
      }
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

  Future logout() async {
    _user = null;
    _token = null;
    notifyListeners();
  }
}
