// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'package:http/http.dart' as http;
import 'dart:convert';

class CursosApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/cursos';

  Future<Map<String, dynamic>> getCurso(String id) async {
    try {
      final response = await http.get(Uri.parse('$urlAPI/get/$id'));
      if (response.statusCode == 200) {
        print('Curso encontrado: ${response.body}');
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao encontrar curso!');
    } catch (error) {
      print('Erro ao encontrar curso: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> listCursos() async {
    try {
      final response = await http.get(Uri.parse('$urlAPI/list'));
      if (response.statusCode == 200) {
        print('Cursos encontrados: ${response.body}');
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao encontrar curso!');
    } catch (error) {
      print('Erro ao encontrar cursos: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> courseForYou() async {
    try {
      final response = await http.get(Uri.parse('$urlAPI/cursos-destaque/top8foryou'));
      if (response.statusCode == 200) {
        print('Cursos encontrados para si: ${response.body}');
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao encontrar cursos para si!');
    } catch (error) {
      print('Erro ao encontrar cursos para si: $error');
      throw error;
    }
  }
}