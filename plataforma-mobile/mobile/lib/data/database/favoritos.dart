import 'package:sqflite/sqflite.dart';

Future<void> createFavoritosTable(Database db) async {
  await db.execute('''
    CREATE TABLE IF NOT EXISTS FAVORITOS (
      ID_FAVORITO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_FORMANDO INTEGER NOT NULL,
      ID_CURSO INTEGER NOT NULL,
      FOREIGN KEY (ID_FORMANDO) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
    );
  ''');
}