import 'package:sqflite/sqflite.dart';

Future<void> createAulasTable(Database db) async {
  await db.execute('''
    CREATE TABLE IF NOT EXISTS AULAS (
      ID_AULA INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_CURSO INTEGER NOT NULL,
      DATA_AULA TEXT NOT NULL,
      NOME_AULA TEXT NOT NULL,
      CAMINHO_URL TEXT,
      TEMPO_DURACAO TEXT CHECK (length(TEMPO_DURACAO) > 0),
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
    );
  ''');
}
