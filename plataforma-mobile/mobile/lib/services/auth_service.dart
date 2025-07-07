import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AuthService extends ChangeNotifier {
  bool _initialized = false;
  bool _loggedIn   = false;
  String? _token;

  bool get isInitialized => _initialized;
  bool get isLoggedIn   => _loggedIn;
  String? get token => _token;

  // corre na Splash
  Future<void> init() async {
    final prefs    = await SharedPreferences.getInstance();
    final remember = prefs.getBool('rememberMe') ?? false;
    final token    = prefs.getString('token');

    if (remember && token != null && !JwtDecoder.isExpired(token)) {
      _loggedIn = true;
      _token = token;
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
    notifyListeners();
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('rememberMe');
    _loggedIn = false;
    _token = null;
    notifyListeners();
  }
}

final authService = AuthService();
