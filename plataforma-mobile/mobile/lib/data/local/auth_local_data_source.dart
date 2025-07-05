import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthLocalDataSource {
  final _storage = const FlutterSecureStorage();
  static const _kAccess = 'access_token';

  Future<void> saveToken(String token) async {
    await _storage.write(key: _kAccess, value: token);
  }

  Future<String?> readToken() async {
    return await _storage.read(key: _kAccess);
  }

  Future<void> clear() async {
    await _storage.delete(key: _kAccess);
  }
}
