import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'dart:async';
import 'package:mobile/provider/auth_provider.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

class AuthService extends ChangeNotifier {
  bool _initialized = false;
  bool _loggedIn = false;
  String? _token;
  Timer? _tokenTimer;

  bool get isInitialized => _initialized;
  bool get isLoggedIn => _loggedIn;
  String? get token => _token;

  // corre na Splash
  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    final remember = prefs.getBool('rememberMe') ?? false;
    final token = prefs.getString('token');

    if (remember && token != null && !JwtDecoder.isExpired(token)) {
      _loggedIn = true;
      _token = token;
      _startTokenTimer();
    } else {
      _loggedIn = false;
      _token = null;
    }
    _initialized = true;
    notifyListeners();
  }

  // chama depois de um login bem-sucedido
  Future<void> login(String token, bool rememberMe) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
    await prefs.setBool('rememberMe', rememberMe);
    _loggedIn = true;
    _token = token;
    _startTokenTimer();
    notifyListeners();
  }

  Future<void> logout({AuthProvider? authProvider}) async {
    _tokenTimer?.cancel();

    final prefs = await SharedPreferences.getInstance();
    final fcmToken = prefs.getString('fcmToken');
    final userId = prefs.getString('userId');

    if (userId != null && fcmToken != null) {
      await http.delete(
        Uri.parse(
          "https://softskills-api.onrender.com/devices_fcm/delete-token",
        ),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "id_utilizador": userId,
          "token": fcmToken,
        }),
      );
    }

    if (authProvider != null) {
      await authProvider.logout();
    }
    await prefs.remove('token');
    await prefs.remove('rememberMe');
    _loggedIn = false;
    _token = null;
    notifyListeners();
    navigatorKey.currentState?.pushNamedAndRemoveUntil(
      '/login',
      (route) => false,
    );
  }

  void _startTokenTimer() {
    _tokenTimer?.cancel();
    _tokenTimer = Timer.periodic(const Duration(seconds: 60), (_) {
      if (_token == null || JwtDecoder.isExpired(_token!)) {
        logout();
      }
    });
  }
}

final authService = AuthService();
