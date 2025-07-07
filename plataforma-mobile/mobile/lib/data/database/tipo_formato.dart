import 'package:sqflite/sqflite.dart';

Future<void> createTipoFormatoTable(Database db) async {
  await db.execute('''
    CREATE TABLE IF NOT EXISTS TIPO_FORMATO (
      ID_FORMATO INTEGER PRIMARY KEY AUTOINCREMENT,
      FORMATO TEXT NOT NULL
    );
  ''');
}
