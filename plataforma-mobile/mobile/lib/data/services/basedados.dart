import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class Basedados {
  static const bdsoftskills = "bdsoftskills.db";
  final int versao = 1;
  static Database? _basededados;
  final bool estado = false;

  Future<Database> get basededados async {
    if(_basededados != null)
      return _basededados!;
    
    _basededados = await _initDatabase();
    return _basededados!;
  } 
  _initDatabase() async {
    String path = join(await getDatabasesPath(), bdsoftskills);
    return await openDatabase(path,
      version: versao, onCreate: _onCreate);
  }
  Future _onCreate (Database db, int version) async {
    
  }

  Future<void> createTables() async {
  Database db = await basededados;

  // Criação da tabela UTILIZADOR
  await db.execute('''
    CREATE TABLE IF NOT EXISTS UTILIZADOR (
      ID_UTILIZADOR INTEGER PRIMARY KEY AUTOINCREMENT,
      NOME_UTILIZADOR TEXT NOT NULL,
      PASSWORD_UTIL TEXT NOT NULL,
      DATA_CRIACAO_UTILIZ TEXT NOT NULL,
      TELEMOVEL INTEGER NULL,
      GENERO INTEGER NOT NULL,
      MORADA TEXT NOT NULL,
      PAIS TEXT NOT NULL,
      DATA_NASC TEXT NOT NULL,
      EMAIL TEXT NOT NULL,
      DATA_ATIV_UTILI TEXT NULL,
      AUTEN2FAT INTEGER NULL
    )
  ''');

  // Criação da tabela FORMANDOS com relação à UTILIZADOR
  await db.execute('''
    CREATE TABLE IF NOT EXISTS FORMANDOS (
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_FORMANDO INTEGER PRIMARY KEY AUTOINCREMENT,
      NOME_UTILIZADOR TEXT NOT NULL,
      PASSWORD_UTIL TEXT NOT NULL,
      DATA_CRIACAO_UTILIZ TEXT NOT NULL,
      TELEMOVEL INTEGER NULL,
      GENERO INTEGER NOT NULL,
      MORADA TEXT NOT NULL,
      PAIS TEXT NOT NULL,
      DATA_NASC TEXT NOT NULL,
      EMAIL TEXT NOT NULL,
      DATA_ATIV_UTILI TEXT NULL,
      AUTEN2FAT INTEGER NULL,
      PERCURSO_FORMATIVO TEXT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      PRIMARY KEY (ID_UTILIZADOR, ID_FORMANDO)
    )
  ''');

    // Tabela FORMADORES
  await db.execute('''
    CREATE TABLE IF NOT EXISTS FORMADORES (
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_FORMADOR INTEGER PRIMARY KEY AUTOINCREMENT,
      NOME_UTILIZADOR TEXT NOT NULL,
      PASSWORD_UTIL TEXT NOT NULL,
      DATA_CRIACAO_UTILIZ TEXT NOT NULL,
      TELEMOVEL INTEGER NULL,
      GENERO INTEGER NOT NULL,
      MORADA TEXT NOT NULL,
      PAIS TEXT NOT NULL,
      DATA_NASC TEXT NOT NULL,
      EMAIL TEXT NOT NULL,
      DATA_ATIV_UTILI TEXT NULL,
      AUTEN2FAT INTEGER NULL,
      ESPECIALIDADES TEXT NULL,
      EXPERIENCIA TEXT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      PRIMARY KEY (ID_UTILIZADOR, ID_FORMADOR)
    )
  ''');


}
  }