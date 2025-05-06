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

    await db.execute('''
      
    ''');
  }
}