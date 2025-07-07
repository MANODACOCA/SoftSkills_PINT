import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'aulas.dart';
import 'cat_area_top.dart';
import 'conteudos.dart';
import 'cursos.dart';
import 'inscricoes.dart';
import 'material_apoio.dart';
import 'tipo_formato.dart';
import 'trabalhos.dart';
import 'utilizador.dart';
import 'favoritos.dart';

class BaseDados {
  static final BaseDados instance = BaseDados._init();
  static Database? _database;

  BaseDados._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('plataforma.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);
    return await openDatabase(path, version: 1, onCreate: _createDB);
  }

  Future _createDB(Database db, int version) async {
    await createTipoFormatoTable(db);
    await createUtilizadorTable(db);
    await createCategoriaAreaTopicoTables(db);
    await createCursosTables(db);
    await createAulasTable(db);
    await createConteudosTable(db);
    await createMaterialApoioTable(db);
    await createFavoritosTable(db);
    await createInscricoesTable(db);
    await createTrabalhosResultadosTables(db);
  }

  Future close() async {
    final db = await instance.database;
    db.close();
  }
}
