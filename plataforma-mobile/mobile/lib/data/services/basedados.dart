import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class Basedados {
  static const bdsoftskills = "bdsoftskills.db";
  final int versao = 1;
  static Database? _basededados;
  final bool estado = false;

  Future<Database> get basededados async {
    if(_basededados != null) {
      return _basededados!;
    }
    _basededados = await _initDatabase();
    return _basededados!;
  } 
  _initDatabase() async {
    String path = join(await getDatabasesPath(), bdsoftskills);
    return await openDatabase(path,
      version: versao, onCreate: _onCreate);
  }
  Future _onCreate (Database db, int version) async {
    //DDL - Criação das Tabelas da Base de Dados
    Future<void> criartabelas() async {
    Database db = await basededados;

    await db.execute('''
    CREATE TABLE IF NOT EXISTS CATEGORIA (
      ID_CATEGORIA INTEGER PRIMARY KEY AUTOINCREMENT,
      NOME_CAT TEXT NOT NULL,
      DESCRICAO_CAT TEXT
    )''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS AREA (
      ID_AREA INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_CATEGORIA INTEGER NOT NULL,
      NOME_AREA TEXT NOT NULL,
      DESCRICAO_AR TEXT,
      FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIA(ID_CATEGORIA)
    )''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS TOPICO (
      ID_TOPICO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_AREA INTEGER NOT NULL,
      NOME_TOPICO TEXT NOT NULL,
      DESCRICAO_TOP TEXT,
      FOREIGN KEY (ID_AREA) REFERENCES AREA(ID_AREA)
    )''');

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
      AUTEN2FAT INTEGER,
      ISFORMANDO INTEGER,
      ISFORMADOR INTEGER,
      ISGESTOR_ADMINISTRADOR INTEGER
    )''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS S_S_O (
      ID_SSO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      EMAIL_SSO TEXT NOT NULL,
      TOKEN TEXT NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR)
    )''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS "2FA" (
      ID_2FA INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      CODIGO TEXT NOT NULL,
      DATA_FA TEXT NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR)
    )''');

    await db.execute('''
    CREATE TABLE GESTOR_ADMINISTRADOR (
      ID_GESTOR_ADMINISTRADOR INTEGER PRIMARY KEY AUTOINCREMENT,
      FOREIGN KEY (ID_GESTOR_ADMINISTRADOR) REFERENCES UTILIZADOR (ID_UTILIZADOR)''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS CURSOS (
      ID_CURSO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_GESTOR_ADMINISTRADOR INTEGER NOT NULL,
      ID_TOPICO INTEGER NOT NULL,      
      NOME_CURSO TEXT NOT NULL,
      DESCRICAO_CURSO TEXT NOT NULL,
      NUMERO_VAGAS INTEGER,
      DATA_INICIO_CURSO TEXT NOT NULL,
      DATA_FIM_CURSO TEXT NOT NULL,
      ESTADO INTEGER NOT NULL,
      IDIOMA TEXT NOT NULL,
      HORAS_CURSO REAL NOT NULL,
      CONTADOR_FORMANDOS INTEGER NOT NULL,
      IMAGEM TEXT,
      ISASSINCRONO INTEGER,
      ISSINCRONO INTEGER,
      FOREIGN KEY (ID_TOPICO) REFERENCES TOPICO(ID_TOPICO),
      FOREIGN KEY (ID_GESTOR_ADMINISTRADOR) REFERENCES GESTOR_ADMINISTRADOR(ID_GESTOR_ADMINISTRADOR)
    )''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS ASSINCRONO (
      ID_CURSO_ASSINCRONO INTEGER PRIMARY KEY AUTOINCREMENT,
      FOREIGN KEY (ID_CURSO_ASSINCRONO) REFERENCES CURSOS(ID_CURSO)
    );''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS AULAS (
      ID_AULA INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_CURSO INTEGER NOT NULL,
      DATA_AULA TEXT NOT NULL,
      NOME_AULA TEXT NOT NULL,
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO)
    )''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS CONTEUDOS_PARTILHADO (
      ID_CONTEUDOS_PARTILHADO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_TOPICO INTEGER NOT NULL,
      DESCRICAO_CP TEXT,
      DATA_CRIACAO_CP TEXT NOT NULL,
      FOREIGN KEY (ID_TOPICO) REFERENCES TOPICO(ID_TOPICO),
    )''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS POST (
      ID_POST INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_UTILIZADOR INTEGER NOT NULL,
      ID_CONTEUDOS_PARTILHADO INTEGER NOT NULL,
      TEXTO_POST TEXT NOT NULL,
      CONTADOR_LIKES_POST INTEGER NOT NULL,
      CONTADOR_COMENTARIOS INTEGER NOT NULL,
      FOREIGN KEY (ID_UTILIZADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR),
      FOREIGN KEY (ID_CONTEUDOS_PARTILHADO) REFERENCES CONTEUDOS_PARTILHADO(ID_CONTEUDOS_PARTILHADO)
    )''');

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
    )''');

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
      ID_FORMADOR           INTEGER         NOT NULL,
      ESPECIALIDADES        TEXT,
      EXPERIENCIA           TEXT,
      PRIMARY KEY (ID_FORMADOR),
      FOREIGN KEY (ID_FORMADOR) REFERENCES UTILIZADOR(ID_UTILIZADOR)
    );
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS FORMANDOS (
      ID_FORMANDO           INTEGER         NOT NULL,
      PERCURSO_FORMATIVO    TEXT,
      PRIMARY KEY (ID_FORMANDO),
      FOREIGN KEY (ID_FORMANDO) REFERENCES UTILIZADOR(ID_UTILIZADOR)
    );
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS INSCRICOES (
      ID_INSCRICAO INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_FORMANDO INTEGER NOT NULL,
      ID_CURSO INTEGER NOT NULL,
      DATA_LIMITE TEXT NOT NULL,
      DATA_INICIO_INSC TEXT NOT NULL,
      STATUS_INSCRICAO INTEGER NOT NULL,
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO),
      FOREIGN KEY (ID_FORMANDO) REFERENCES FORMANDOS(ID_FORMANDO)
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
    CREATE TABLE OCORRENCIAS_EDICOES (
      ID_CURSO INTEGER NOT NULL,
      NR_OCORRENCIA INTEGER NOT NULL,
      DATA_ULT_OCORRENCIA TEXT NOT NULL,
      PRIMARY KEY (ID_CURSO, NR_OCORRENCIA),
      FOREIGN KEY (ID_CURSO) REFERENCES CURSOS (ID_CURSO)
    );
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS SINCRONO (
      ID_CURSO_SINCRONO        INTEGER       NOT NULL,
      ID_FORMADOR              INTEGER       NOT NULL,
      PRIMARY KEY (ID_CURSO_SINCRONO),
      FOREIGN KEY (ID_FORMADOR) REFERENCES FORMADORES(ID_FORMADOR),
      FOREIGN KEY (ID_CURSO_SINCRONO) REFERENCES CURSOS(ID_CURSO)
    );
  ''');

  await db.execute('''
    CREATE TABLE IF NOT EXISTS RESULTADOS (
      ID_RESUL INTEGER PRIMARY KEY AUTOINCREMENT,
      ID_FORMANDO INTEGER NOT NULL,
      ID_CURSO_SINCRONO INTEGER NOT NULL,
      RESUL REAL NOT NULL,
      FOREIGN KEY (ID_CURSO_SINCRONO) REFERENCES SINCRONO(ID_CURSO_SINCRONO),
      FOREIGN KEY (ID_FORMANDO) REFERENCES FORMANDOS(ID_FORMANDO)
    )
  ''');
  }
}




  // DML - Inserção de Dados
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
  String dataNasc, String email, String? dataAtiv, int? auten2Fat, int? isformando, int? isformador, int? isadministrador) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO UTILIZADOR (
      NOME_UTILIZADOR, PASSWORD_UTIL, DATA_CRIACAO_UTILIZ,
      TELEMOVEL, GENERO, MORADA, PAIS, DATA_NASC, EMAIL,
      DATA_ATIV_UTILI, AUTEN2FAT, ISFORMANDO, ISFORMADOR, ISGESTOR_ADMINISTRADOR
    ) VALUES ("$nome", "$password", "$dataCriacao", "$telemovel", "$genero", "$morada", "$pais", "$dataNasc", "$email", "$dataAtiv", "$auten2Fat", "$isformando", "$isformador", "$isadministrador")
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

  Future<void> inserirGestorAdministrador() async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO GESTOR_ADMINISTRADOR (ID_GESTOR_ADMINISTRADOR)
    SELECT ID_UTILIZADOR 
    FROM UTILIZADOR 
    WHERE ISGESTOR_ADMINISTRADOR = 1
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
  String? imagem, int? isassincrono, int? issincrono}) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO CURSOS (
      ID_TOPICO, ID_UTILIZADOR, ID_GESTOR_ADMINISTRADOR, ID_CATEGORIA,
      ID_AREA, NOME_CURSO, DESCRICAO_CURSO, NUMERO_VAGAS, DATA_INICIO_CURSO,
      DATA_FIM_CURSO, TIPO_CURSO, ESTADO, IDIOMA, HORAS_CURSO,
      CONTADOR_FORMANDOS, IMAGEM, ISASSINCRONO, ISSINCRONO
    )
    VALUES ("$idTopico", "$idUtilizador", "$idGestorAdministrador", "$idCategoria", "$idArea", "$nomeCurso",
    "$descricaoCurso", "$numeroVagas", "$dataInicio", "$dataFim", "$tipoCurso", "$estado", "$idioma", "$horasCurso", "$contadorFormandos", "$imagem", "$isassincrono", "$issincrono")
  ''');
  }

  Future<void> inserirCursoAssincrono() async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO ASSINCRONO (ID_CURSO_ASSINCRONO)
    SELECT ID_CURSO
    FROM CURSOS
    WHERE ISASSINCRONO = true;
  ''');
  }

  Future<void> inserirAula({required int idCurso, required String dataAula, required String nomeAula,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO AULAS (ID_CURSO, DATA_AULA, NOME_AULA) VALUES ("$idCurso", "$dataAula", "$nomeAula")
  ''');
  }

  Future<void> inserirConteudoPartilhado({required int idTopico, String? descricaoCp, required String dataCriacaoCp,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO CONTEUDOS_PARTILHADO (ID_TOPICO, DESCRICAO_CP, DATA_CRIACAO_CP)
    VALUES ("$idTopico", "$descricaoCp", "$dataCriacaoCp")
  ''');
  }

  Future<void> inserirPost({required int idUtilizador, required int idConteudosPartilhado, required String textoPost,
  required int contadorLikes,
  required int contadorComentarios,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO POST (
      ID_UTILIZADOR, ID_CONTEUDOS_PARTILHADO, TEXTO_POST,
      CONTADOR_LIKES_POST, CONTADOR_COMENTARIOS
    ) VALUES ("$idUtilizador", "$idConteudosPartilhado", "$textoPost", "$contadorLikes", "$contadorComentarios")
  ''');
  }

  Future<void> inserirNotificacaoPost({required int idCurso, required int idPost,
  required int idUtilizador,
  required String dataHoraNotificacao,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO NOTIFICACOES_POST (
      ID_CURSO, ID_POST, ID_UTILIZADOR, DATA_HORA_NOTIFICACAOCP
    ) VALUES ("$idCurso", "$idPost", "$idUtilizador", "$dataHoraNotificacao")
  ''');
  }

  Future<void> inserirAvaliacao({
  required int idPost,
  required int idUtilizador,
  required bool avaliacao,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO AVALIACOES (
      ID_POST, ID_UTILIZADOR, AVALIACAO
    ) VALUES ("$idPost", "$idUtilizador", "$avaliacao")
  ''');
  }

  Future<void> inserirComentario({
  required int idPost,
  required int idUtilizador,
  required int idAvaliacao,
  required String textoComentario,
  required int contadorLikes,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO COMENTARIO (
      ID_POST, ID_UTILIZADOR, ID_AVALIACAO, TEXTO_COMENTARIO, CONTADOR_LIKES_COM
    ) VALUES ("$idPost", "$idUtilizador", "$idAvaliacao", "$textoComentario", "$contadorLikes")
  ''');
  }

  Future<void> inserirTipoFormato(String formato) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO TIPO_FORMATO (FORMATO) VALUES ("$formato")
  ''');
  }

  Future<void> inserirConteudo({
  required int idAula,
  required int idFormato,
  required String conteudo,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO CONTEUDOS (ID_AULA, ID_FORMATO, CONTEUDO) VALUES ("$idAula", "$idFormato", "$conteudo")
  ''');
  }

  Future<void> inserirTipoDenuncia(String tipoDenuncia) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO TIPO_DENUNCIA (TIPO_DENUNCIA) VALUES ("$tipoDenuncia")
  ''');
  }

  Future<void> inserirDenuncia({
  required int idComentario,
  required int idUtilizador,
  required int idPost,
  required int idTipoDenuncia,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO DENUNCIA (
      ID_COMENTARIO, ID_UTILIZADOR, ID_POST, ID_TIPO_DENUNCIA
    ) VALUES ("$idComentario", "$idUtilizador", "$idPost", "$idTipoDenuncia")
  ''');
  }

  Future<void> inserirFormador() async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO FORMADORES (ID_FORMADOR, ESPECIALIDADES, EXPERIENCIA)
    SELECT ID_UTILIZADOR, ?, ?
    FROM UTILIZADOR 
    WHERE ISFORMADOR = 1
    LIMIT 1
  ''', ['Gestão de Projetos', 'Mais de 5 anos em gestão de equipas']);
  }

  Future<void> inserirFormando() async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO FORMANDOS (ID_FORMANDO, PERCURSO_FORMATIVO)
    SELECT ID_UTILIZADOR, ?
    FROM UTILIZADOR
    WHERE ISFORMANDO = 1
    LIMIT 1
  ''', ['Curso de Liderança e Gestão']);
  }

  Future<void> inserirInscricao({
  required int idFormando,
  required int idCurso,
  required String dataLimite,
  required String dataInicio,
  required int status,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO INSCRICOES (
      ID_FORMANDO, ID_CURSO, DATA_LIMITE,
      DATA_INICIO_INSC, STATUS_INSCRICAO
    ) VALUES ("$idFormando", "$idCurso", "$dataLimite", "$dataInicio", "$status")
  ''');
  }

  Future<void> inserirNotificacaoCurso({
  required int idUtilizador,
  required int idCurso,
  required String dataHoraNotificacao,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO NOTIFICACOES_CURSO (
      ID_UTILIZADOR, ID_CURSO, DATA_HORA_NOTIFICACAOCURSO
    ) VALUES ("$idUtilizador", "$idCurso", "$dataHoraNotificacao")
  ''');
  }

  Future<void> inserirOcorrenciaEdicao({
  required int nrOcorrencia,
  required int idCurso,
  required String data_ult_ocorrencia,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO OCORRENCIAS_EDICOES (
      NR_OCORRENCIA, ID_CURSO, DATA_ULT_OCORRENCIA) VALUES ("$nrOcorrencia", "$idCurso", "$data_ult_ocorrencia")
  ''');
  }

  Future<void> inserirCursoSincrono() async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO SINCRONO (ID_CURSO_SINCRONO, ID_FORMADOR)
  SELECT ID_CURSO, 3
  FROM CURSOS
  WHERE ISSINCRONO = 1
  LIMIT 1
  ''',);
  }

  Future<void> inserirResultado({
  required int idFormando,
  required int idCursoSincrono,
  required double resultado,
  }) async {
  Database db = await basededados;
  await db.rawInsert('''
    INSERT INTO RESULTADOS (
      ID_FORMANDO, ID_CURSO_SINCRONO, RESUL
    ) VALUES ("$idFormando", "$idCursoSincrono", "$resultado")
  ''');
  }




  // DML - Listar os Dados
  Future<List<Map<String, dynamic>>> obterCategorias() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM CATEGORIA');
  }

  Future<List<Map<String, dynamic>>> obterAreas() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM AREA');
  }

  Future<List<Map<String, dynamic>>> obterTopicos() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM TOPICO');
  }

  Future<List<Map<String, dynamic>>> obterUtilizadores() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM UTILIZADOR');
  }

  Future<List<Map<String, dynamic>>> obterSSO() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM S_S_O');
  }

  Future<List<Map<String, dynamic>>> obter2FA() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM "2FA"');
  }

  Future<List<Map<String, dynamic>>> obterAdministrador() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM GESTOR_ADMINISTRADOR');
  }

  Future<List<Map<String, dynamic>>> obterCursos() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM CURSOS');
  }

  Future<List<Map<String, dynamic>>> obterAssincrono() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM ASSINCRONO');
  }

  Future<List<Map<String, dynamic>>> obterAulas() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM AULAS');
  }

  Future<List<Map<String, dynamic>>> obterConteudoPartilhado() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM CONTEUDOS_PARTILHADO');
  }

  Future<List<Map<String, dynamic>>> obterPost() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM POST');
  }

  Future<List<Map<String, dynamic>>> obterNotificacoesPost() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM NOTIFICACOES_POST');
  }

  Future<List<Map<String, dynamic>>> obterAvaliacoes() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM AVALIACOES');
  }

  Future<List<Map<String, dynamic>>> obterComentarios() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM COMENTARIO');
  }

  Future<List<Map<String, dynamic>>> obterTipoFormato() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM TIPO_FORMATO');
  }

  Future<List<Map<String, dynamic>>> obterConteudos() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM CONTEUDOS');
  }

  Future<List<Map<String, dynamic>>> obterTipoDenuncia() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM TIPO_DENUNCIA');
  }

  Future<List<Map<String, dynamic>>> obterDenuncia() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM DENUNCIA');
  }

  Future<List<Map<String, dynamic>>> obterFormadores() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM FORMADORES');
  }

  Future<List<Map<String, dynamic>>> obterFormandos() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM FORMANDOS');
  }

  Future<List<Map<String, dynamic>>> obterInscricoes() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM INSCRICOES');
  }

  Future<List<Map<String, dynamic>>> obterNotificacoesCurso() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM NOTIFICACOES_CURSO');
  }

  Future<List<Map<String, dynamic>>> obterOcorrenciasEdicoes() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM OCORRENCIAS_EDICOES');
  }

  Future<List<Map<String, dynamic>>> obterSincrono() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM SINCRONO');
  }

  Future<List<Map<String, dynamic>>> obterResultados() async {
  final db = await basededados;
  return await db.rawQuery('SELECT * FROM RESULTADOS');
  }

}

