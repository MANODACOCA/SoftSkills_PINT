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
  
  Future<void> criartabelas() async {
  Database db = await basededados;

  await db.execute('''
    CREATE TABLE IF NOT EXISTS CATEGORIA (
      ID_CATEGORIA INTEGER PRIMARY KEY AUTOINCREMENT,
      NOME_CAT TEXT NOT NULL,
      DESCRICAO_CAT TEXT
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS AREA (
      ID_AREA INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_CATEGORIA INTEGER NOT NULL,
      NOME_AREA TEXT NOT NULL,
      DESCRICAO_AR TEXT,
      FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIA(ID_CATEGORIA)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS TOPICO (
      ID_TOPICO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_AREA INTEGER NOT NULL,
      NOME_TOPICO TEXT NOT NULL,
      DESCRICAO_TOP TEXT,
      FOREIGN KEY (ID_AREA) REFERENCES AREA(ID_AREA)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS UTILIZADOR (
      ID_UTILIZADOR INTEGER PRIMARY KEY AUTOINCREMENT,
      NOME_UTILIZADOR TEXT NOT NULL,
      PASSWORD_UTIL TEXT NOT NULL,
      DATA_CRIACAO_UTILIZ TEXT NOT NULL,
      TELEMOVEL INTEGER,
      GENERO INTEGER NOT NULL,
      MORADA TEXT NOT NULL,
      PAIS TEXT NOT NULL,
      DATA_NASC TEXT NOT NULL,
      EMAIL TEXT NOT NULL,
      DATA_ATIV_UTILI TEXT,
      AUTEN2FAT INTEGER
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS S_S_O (
      ID_SSO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      EMAIL_SSO TEXT NOT NULL,
      TOKEN TEXT NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS "2FA" (
      ID_2FA INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      CODIGO TEXT NOT NULL,
      DATA_FA TEXT NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR)
    )
  ''');

  await db.execute('''
  CREATE TABLE IF NOT EXISTS GESTOR_ADMINISTRADOR (
    ID_UTILIZADOR INTEGER NOT NULL,
    ID_GESTOR_ADMINISTRADOR INTEGER NOT NULL,
    NOME_UTILIZADOR TEXT NOT NULL,
    PASSWORD_UTIL TEXT NOT NULL,
    DATA_CRIACAO_UTILIZ TEXT NOT NULL,
    TELEMOVEL INTEGER,
    GENERO INTEGER NOT NULL,
    MORADA TEXT NOT NULL,
    PAIS TEXT NOT NULL,
    DATA_NASC TEXT NOT NULL,
    EMAIL TEXT NOT NULL,
    DATA_ATIV_UTILI TEXT,
    AUTEN2FAT INTEGER,
    PRIMARY KEY (ID_UTILIZADOR, ID_GESTOR_ADMINISTRADOR),
    FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR)
  )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS CURSOS (
      ID_CURSO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_TOPICO INTEGER NOT NULL,
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_GESTOR_ADMINISTRADOR INTEGER NOT NULL,
      ID_CATEGORIA INTEGER NOT NULL,
      ID_AREA INTEGER NOT NULL,
      NOME_CURSO TEXT NOT NULL,
      DESCRICAO_CURSO TEXT NOT NULL,
      NUMERO_VAGAS INTEGER,
      DATA_INICIO_CURSO TEXT NOT NULL,
      DATA_FIM_CURSO TEXT NOT NULL,
      TIPO_CURSO INTEGER NOT NULL,
      ESTADO INTEGER NOT NULL,
      IDIOMA TEXT NOT NULL,
      HORAS_CURSO REAL NOT NULL,
      CONTADOR_FORMANDOS INTEGER NOT NULL,
      IMAGEM TEXT,
      FOREIGN KEY (ID_TOPICO) REFERENCES TOPICO(ID_TOPICO),
      FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIA(ID_CATEGORIA),
      FOREIGN KEY (ID_AREA) REFERENCES AREA(ID_AREA),
      FOREIGN KEY (ID_UTILIZADOR, ID_GESTOR_ADMINISTRADOR) 
        REFERENCES GESTOR_ADMINISTRADOR(ID_UTILIZADOR, ID_GESTOR_ADMINISTRADOR)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS ASSINCRONO (
      ID_CURSO INTEGER NOT NULL,
      ID_CURSO_ASSINCRONO INTEGER NOT NULL,
      ID_TOPICO INTEGER NOT NULL,
      ID_GESTOR_ADMINISTRADOR INTEGER NOT NULL,
      ID_CATEGORIA INTEGER NOT NULL,
      ID_AREA INTEGER NOT NULL,
      NOME_CURSO TEXT NOT NULL,
      DESCRICAO_CURSO TEXT NOT NULL,
      NUMERO_VAGAS INTEGER,
      DATA_INICIO_CURSO TEXT NOT NULL,
      DATA_FIM_CURSO TEXT NOT NULL,
      TIPO_CURSO INTEGER NOT NULL,
      ESTADO INTEGER NOT NULL,
      IDIOMA TEXT NOT NULL,
      HORAS_CURSO REAL NOT NULL,
      CONTADOR_FORMANDOS INTEGER NOT NULL,
      IMAGEM TEXT,
      PRIMARY KEY (ID_CURSO, ID_CURSO_ASSINCRONO),
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
    );
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS AULAS (
      ID_AULA INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_CURSO INTEGER NOT NULL,
      DATA_AULA TEXT NOT NULL,
      NOME_AULA TEXT NOT NULL,
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS CONTEUDOS_PARTILHADO (
      ID_AREA_CONHECIMENTO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_AREA INTEGER NOT NULL,
      ID_TOPICO INTEGER NOT NULL,
      ID_CATEGORIA INTEGER NOT NULL,
      DESCRICAO_CP TEXT,
      DATA_CRIACAO_CP TEXT NOT NULL,
      FOREIGN KEY (ID_AREA) REFERENCES AREA(ID_AREA),
      FOREIGN KEY (ID_TOPICO) REFERENCES TOPICO(ID_TOPICO),
      FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIA(ID_CATEGORIA)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS POST (
      ID_POST INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_AREA_CONHECIMENTO INTEGER NOT NULL,
      TEXTO_POST TEXT NOT NULL,
      CONTADOR_LIKES_POST INTEGER NOT NULL,
      CONTADOR_COMENTARIOS INTEGER NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      FOREIGN KEY (ID_AREA_CONHECIMENTO) REFERENCES CONTEUDOS_PARTILHADO(ID_AREA_CONHECIMENTO)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS NOTIFICACOES_POST (
      ID_NOTIFICACAO_POST INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_CURSO INTEGER NOT NULL,
      ID_POST INTEGER NOT NULL,
      ID_UTILIZADOR INTEGER NOT NULL,
      DATA_HORA_NOTIFICACAOCP TEXT NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO),
      FOREIGN KEY (ID_POST) REFERENCES POST(ID_POST)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS AVALIACOES (
      ID_AVALIACAO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_POST INTEGER NOT NULL,
      ID_UTILIZADOR INTEGER NOT NULL,
      AVALIACAO INTEGER NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      FOREIGN KEY (ID_POST) REFERENCES POST(ID_POST)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS COMENTARIO (
      ID_COMENTARIO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_POST INTEGER NOT NULL,
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_AVALIACAO INTEGER NOT NULL,
      TEXTO_COMENTARIO TEXT NOT NULL,
      CONTADOR_LIKES_COM INTEGER NOT NULL,
      FOREIGN KEY (ID_POST) REFERENCES POST(ID_POST),
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      FOREIGN KEY (ID_AVALIACAO) REFERENCES AVALIACOES(ID_AVALIACAO)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS TIPO_FORMATO (
      ID_FORMATO INTEGER PRIMARY KEY AUTOINCREMENT,
      FORMATO TEXT NOT NULL
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS CONTEUDOS (
      ID_CONTEUDO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_AULA INTEGER NOT NULL,
      ID_FORMATO INTEGER NOT NULL,
      CONTEUDO TEXT NOT NULL,
      FOREIGN KEY (ID_AULA) REFERENCES AULAS(ID_AULA),
      FOREIGN KEY (ID_FORMATO) REFERENCES TIPO_FORMATO(ID_FORMATO)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS TIPO_DENUNCIA (
      ID_TIPO_DENUNCIA INTEGER PRIMARY KEY AUTOINCREMENT,
      TIPO_DENUNCIA TEXT NOT NULL
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS DENUNCIA (
      ID_DENUNCIA INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_COMENTARIO INTEGER NOT NULL,
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_POST INTEGER NOT NULL,
      ID_TIPO_DENUNCIA INTEGER NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      FOREIGN KEY (ID_TIPO_DENUNCIA) REFERENCES TIPO_DENUNCIA(ID_TIPO_DENUNCIA),
      FOREIGN KEY (ID_POST) REFERENCES POST(ID_POST),
      FOREIGN KEY (ID_COMENTARIO) REFERENCES COMENTARIO(ID_COMENTARIO)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS FORMADORES (
      ID_UTILIZADOR         INTEGER         NOT NULL,
      ID_FORMADOR           INTEGER         NOT NULL,
      NOME_UTILIZADOR       TEXT            NOT NULL,
      PASSWORD_UTIL         TEXT            NOT NULL,
      DATA_CRIACAO_UTILIZ   TEXT            NOT NULL,
      TELEMOVEL             INTEGER,
      GENERO                INTEGER         NOT NULL,
      MORADA                TEXT            NOT NULL,
      PAIS                  TEXT            NOT NULL,
      DATA_NASC             TEXT            NOT NULL,
      EMAIL                 TEXT            NOT NULL,
      DATA_ATIV_UTILI       TEXT,
      AUTEN2FAT             INTEGER,
      ESPECIALIDADES        TEXT,
      EXPERIENCIA           TEXT,
      PRIMARY KEY (ID_UTILIZADOR, ID_FORMADOR),
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR)
    );
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS FORMANDOS (
      ID_UTILIZADOR         INTEGER         NOT NULL,
      ID_FORMANDO           INTEGER         NOT NULL,
      NOME_UTILIZADOR       TEXT            NOT NULL,
      PASSWORD_UTIL         TEXT            NOT NULL,
      DATA_CRIACAO_UTILIZ   TEXT            NOT NULL,
      TELEMOVEL             INTEGER,
      GENERO                INTEGER         NOT NULL,
      MORADA                TEXT            NOT NULL,
      PAIS                  TEXT            NOT NULL,
      DATA_NASC             TEXT            NOT NULL,
      EMAIL                 TEXT            NOT NULL,
      DATA_ATIV_UTILI       TEXT,
      AUTEN2FAT             INTEGER,
      PERCURSO_FORMATIVO    TEXT,
      PRIMARY KEY (ID_UTILIZADOR, ID_FORMANDO),
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR)
    );
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS INSCRICOES (
      ID_INSCRICAO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_FORMANDO INTEGER NOT NULL,
      ID_CURSO INTEGER NOT NULL,
      DATA_LIMITE TEXT NOT NULL,
      DATA_INICIO_INSC TEXT NOT NULL,
      STATUS_INSCRICAO INTEGER NOT NULL,
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO),
      FOREIGN KEY (ID_UTILIZADOR, ID_FORMANDO) REFERENCES FORMANDOS(ID_UTILIZADOR, ID_FORMANDO)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS NOTIFICACOES_CURSO (
      ID_NOTIFICACAO_CURSOS INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_CURSO INTEGER NOT NULL,
      DATA_HORA_NOTIFICACAOCURSO TEXT NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS OCORRENCIAS_EDICOES (
      NR_OCORRENCIA INTEGER PRIMARY KEY,
      ID_CURSO INTEGER NOT NULL,
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
    )
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS SINCRONO (
      ID_CURSO                 INTEGER       NOT NULL,
      ID_CURSO_SINCRONO        INTEGER       NOT NULL,
      ID_UTILIZADOR            INTEGER       NOT NULL,
      ID_FORMADOR              INTEGER       NOT NULL,
      ID_TOPICO                INTEGER       NOT NULL,
      ID_GESTOR_ADMINISTRADOR  INTEGER       NOT NULL,
      ID_CATEGORIA             INTEGER       NOT NULL,
      ID_AREA                  INTEGER       NOT NULL,
      NOME_CURSO               TEXT          NOT NULL,
      DESCRICAO_CURSO          TEXT          NOT NULL,
      NUMERO_VAGAS             INTEGER,
      DATA_INICIO_CURSO        TEXT          NOT NULL,
      DATA_FIM_CURSO           TEXT          NOT NULL,
      TIPO_CURSO               INTEGER       NOT NULL,
      ESTADO                   INTEGER       NOT NULL,
      IDIOMA                   TEXT          NOT NULL,
      HORAS_CURSO              REAL          NOT NULL,
      CONTADOR_FORMANDOS       INTEGER       NOT NULL,
      IMAGEM                   TEXT,
      N_MAX_FORM               INTEGER       NOT NULL,
      PRIMARY KEY (ID_CURSO, ID_CURSO_SINCRONO),
      FOREIGN KEY (ID_UTILIZADOR, ID_FORMADOR) REFERENCES FORMADORES(ID_UTILIZADOR, ID_FORMADOR),
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
    );
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS RESULTADOS (
      ID_RESUL INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_FORMANDO INTEGER NOT NULL,
      ID_CURSO INTEGER NOT NULL,
      ID_CURSO_SINCRONO INTEGER NOT NULL,
      RESUL REAL NOT NULL,
      FOREIGN KEY (ID_CURSO, ID_CURSO_SINCRONO) REFERENCES SINCRONO(ID_CURSO, ID_CURSO_SINCRONO),
      FOREIGN KEY (ID_UTILIZADOR, ID_FORMANDO) REFERENCES FORMANDOS(ID_UTILIZADOR, ID_FORMANDO)
    )
  ''');
  }

  Future<void> inserirCategoria(String nomeCat, String descricaoCat) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO CATEGORIA (NOME_CAT, DESCRICAO_CAT) VALUES ("$nomeCat", "$descricaoCat")
  ''');
  }

  Future<void> inserirArea(int idCategoria, String nomeArea, String descricaoAr) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO AREA (ID_CATEGORIA, NOME_AREA, DESCRICAO_AR) VALUES ("$idCategoria", "$nomeArea", "$descricaoAr")
  ''');
  }

  Future<void> inserirTopico(int idArea, String nomeTopico, String descricaoTop) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO TOPICO (ID_AREA, NOME_TOPICO, DESCRICAO_TOP) VALUES ("$idArea", "$nomeTopico", "$descricaoTop")
  ''');
  }

  Future<void> inserirUtilizador(String nome, String password, String dataCriacao, int? telemovel, int genero, String morada, String pais,
  String dataNasc, String email, String? dataAtiv, int? auten2Fat) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO UTILIZADOR (
      NOME_UTILIZADOR, PASSWORD_UTIL, DATA_CRIACAO_UTILIZ,
      TELEMOVEL, GENERO, MORADA, PAIS, DATA_NASC, EMAIL,
      DATA_ATIV_UTILI, AUTEN2FAT
    ) VALUES ("$nome", "$password", "$dataCriacao", "$telemovel", "$genero", "$morada", "$pais", "$dataNasc", "$email", "$dataAtiv", "$auten2Fat")
  ''');
  }

  Future<void> inserirSSO(int idUtilizador, String email, String token) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO S_S_O (ID_UTILIZADOR, EMAIL_SSO, TOKEN)
    VALUES ("$idUtilizador", "$email", "$token")
  ''');
  }

  Future<void> inserir2FA(int idUtilizador, String codigo, String dataFa) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO "2FA" (ID_UTILIZADOR, CODIGO, DATA_FA)
    VALUES ("$idUtilizador", "$codigo", "$dataFa")
  ''');
  }

  Future<void> inserirGestorAdministrador({required int idUtilizador, required int idGestorAdministrador,
  required String nome,
  required String password,
  required String dataCriacao,
  int? telemovel,
  required int genero,
  required String morada,
  required String pais,
  required String dataNasc,
  required String email,
  String? dataAtivacao,
  int? auten2Fat,}) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO GESTOR_ADMINISTRADOR (
      ID_UTILIZADOR, ID_GESTOR_ADMINISTRADOR, NOME_UTILIZADOR,
      PASSWORD_UTIL, DATA_CRIACAO_UTILIZ, TELEMOVEL, GENERO,
      MORADA, PAIS, DATA_NASC, EMAIL, DATA_ATIV_UTILI, AUTEN2FAT
    )
    VALUES ("$idUtilizador", "$idGestorAdministrador", "$nome", "$password", "$dataCriacao", "$telemovel", "$genero",
    "$morada", "$pais", "$dataNasc", "$email", "$dataAtivacao", "$auten2Fat")
  ''');
  }

  Future<void> inserirCurso({required int idTopico, required int idUtilizador, required int idGestorAdministrador,
  required int idCategoria,
  required int idArea,
  required String nomeCurso,
  required String descricaoCurso,
  int? numeroVagas,
  required String dataInicio,
  required String dataFim,
  required int tipoCurso,
  required int estado,
  required String idioma,
  required double horasCurso,
  required int contadorFormandos,
  String? imagem,}) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO CURSOS (
      ID_TOPICO, ID_UTILIZADOR, ID_GESTOR_ADMINISTRADOR, ID_CATEGORIA,
      ID_AREA, NOME_CURSO, DESCRICAO_CURSO, NUMERO_VAGAS, DATA_INICIO_CURSO,
      DATA_FIM_CURSO, TIPO_CURSO, ESTADO, IDIOMA, HORAS_CURSO,
      CONTADOR_FORMANDOS, IMAGEM
    )
    VALUES ("$idTopico", "$idUtilizador", "$idGestorAdministrador", "$idCategoria", "$idArea", "$nomeCurso",
    "$descricaoCurso", "$numeroVagas", "$dataInicio", "$dataFim", "$tipoCurso", "$estado", "$idioma", "$horasCurso", "$contadorFormandos", "$imagem")
  ''');
  }

  




}