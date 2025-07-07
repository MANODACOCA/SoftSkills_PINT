/* import 'dart:io';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:sqflite/sqflite.dart';
import '../../API/cursos_api.dart';
import '../model/curso.dart';
import '../model/base_dados.dart';

class CursosRepository {
  final CursosApi api = CursosApi();

  Future<List<Curso>> listarCursos() async {
    final net = await Connectivity().checkConnectivity();
    final db = await BaseDados.instance.database;

    if (net == ConnectivityResult.none) {
      final resultado = await db.query('CURSOS');
      return resultado.map((e) => Curso.fromMap(e)).toList();
    } else {
      final resposta = await api.listCursos();
      for (final item in resposta) {
        final curso = Curso.fromJson(item);
        await db.insert('CURSOS', curso.toMap(), conflictAlgorithm: ConflictAlgorithm.replace);
      }
      return resposta.map((e) => Curso.fromJson(e)).toList();
    }
  }

  Future<Curso> getCurso(int id) async {
    final net = await Connectivity().checkConnectivity();
    final db = await BaseDados.instance.database;

    if (net == ConnectivityResult.none) {
      final resultado = await db.query('CURSOS', where: 'ID_CURSO = ?', whereArgs: [id]);
      if (resultado.isNotEmpty) {
        return Curso.fromMap(resultado.first);
      } else {
        throw Exception('Curso não encontrado offline');
      }
    } else {
      final data = await api.getCurso(id);
      final curso = Curso.fromJson(data);
      await db.insert('CURSOS', curso.toMap(), conflictAlgorithm: ConflictAlgorithm.replace);
      return curso;
    }
  }

  Future<void> updateCurso(int id, Map<String, dynamic> dados) async {
    final net = await Connectivity().checkConnectivity();
    final db = await BaseDados.instance.database;

    if (net != ConnectivityResult.none) {
      await api.updateCurso(id, dados);
    }

    await db.update(
      'CURSOS',
      dados,
      where: 'ID_CURSO = ?',
      whereArgs: [id],
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<Curso>> cursosParaTi() async {
    final net = await Connectivity().checkConnectivity();
    final db = await BaseDados.instance.database;

    if (net == ConnectivityResult.none) {
      final resultado = await db.query('CURSOS');
      return resultado.map((e) => Curso.fromMap(e)).toList();
    } else {
      final resposta = await api.courseForYou();
      for (final item in resposta) {
        final curso = Curso.fromJson(item);
        await db.insert('CURSOS', curso.toMap(), conflictAlgorithm: ConflictAlgorithm.replace);
      }
      return resposta.map((e) => Curso.fromJson(e)).toList();
    }
  }

  Future<List<Curso>> cursosPopulares() async {
    final net = await Connectivity().checkConnectivity();
    final db = await BaseDados.instance.database;

    if (net == ConnectivityResult.none) {
      final resultado = await db.query('CURSOS');
      return resultado.map((e) => Curso.fromMap(e)).toList();
    } else {
      final resposta = await api.coursePopular();
      for (final item in resposta) {
        final curso = Curso.fromJson(item);
        await db.insert('CURSOS', curso.toMap(), conflictAlgorithm: ConflictAlgorithm.replace);
      }
      return resposta.map((e) => Curso.fromJson(e)).toList();
    }
  }

  Future<List<Curso>> cursosNovos() async {
    final net = await Connectivity().checkConnectivity();
    final db = await BaseDados.instance.database;

    if (net == ConnectivityResult.none) {
      final resultado = await db.query('CURSOS');
      return resultado.map((e) => Curso.fromMap(e)).toList();
    } else {
      final resposta = await api.coursesNews();
      for (final item in resposta) {
        final curso = Curso.fromJson(item);
        await db.insert('CURSOS', curso.toMap(), conflictAlgorithm: ConflictAlgorithm.replace);
      }
      return resposta.map((e) => Curso.fromJson(e)).toList();
    }
  }
} 
*/