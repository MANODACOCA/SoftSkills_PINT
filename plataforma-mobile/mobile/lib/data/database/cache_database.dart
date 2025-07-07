import 'dart:convert';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class ApiCache {
  static Future<Database> get _db async {
    final path = join(await getDatabasesPath(), 'api_cache.db');
    return openDatabase(
      path,
      version: 1,
      onCreate: (db, _) async {
        await db.execute('''
          CREATE TABLE cache (
            key TEXT PRIMARY KEY,
            json TEXT,
            updated_at INTEGER
          );
        ''');
      },
    );
  }

  static Future<void> guardarDados(String chave, dynamic dados) async {
    final db = await _db;
    await db.insert(
      'cache',
      {
        'key': chave,
        'json': jsonEncode(dados),
        'updated_at': DateTime.now().millisecondsSinceEpoch,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  static Future<dynamic> lerDados(String chave) async {
    final db = await _db;
    final resultado = await db.query(
      'cache',
      where: 'key = ?',
      whereArgs: [chave],
      limit: 1,
    );
    if (resultado.isEmpty) return null;
    return jsonDecode(resultado.first['json'] as String);
  }
}
