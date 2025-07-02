// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class CursosApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/cursos';

  Future<Map<String, dynamic>> getCurso(int id) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      }

      final response = await http.get(
        Uri.parse('$urlAPI/get/$id'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );
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

  Future<List<Map<String, dynamic>>> listCursos() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      }

      final response = await http.get(
        Uri.parse('$urlAPI/list'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        print('Cursos encontrados: ${response.body}');
        final List<dynamic> data = jsonDecode(response.body);
        final cursos = data.cast<Map<String, dynamic>>();
        return cursos;
      }
      
      throw Exception('Erro ao encontrar curso!');
    } catch (error) {
      print('Erro ao encontrar cursos: $error');
      throw error;
    }
  }

  Future<List<Map<String, dynamic>>> courseForYou() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      }

      final response = await http.get(
        Uri.parse('$urlAPI/cursos-destaque/top8foryou'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        print('Cursos encontrados para si: ${response.body}');
        final List<dynamic> data = jsonDecode(response.body);
        final cursos = data.cast<Map<String, dynamic>>();
        return cursos;
      }

      throw Exception('Erro ao encontrar cursos para si!');
    } catch (error) {
      print('Erro ao encontrar cursos para si: $error');
      throw error;
    }
  }

  Future<List<Map<String, dynamic>>> coursePopular() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      }

      final response = await http.get(
        Uri.parse('$urlAPI/cursos-destaque/top8popular'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        print('Cursos populares encontrados: ${response.body}');
        final List<dynamic> data = jsonDecode(response.body);
        final cursos = data.cast<Map<String, dynamic>>();
        return cursos;
      }

      throw Exception('Erro ao encontrar cursos populares!');
    } catch (error) {
      print('Erro ao encontrar cursos populares: $error');
      throw error;
    }
  }

  Future<List<Map<String, dynamic>>> coursesNews() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      }

      final response = await http.get(
        Uri.parse('$urlAPI/cursos-destaque/top8news'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        print('Cursos novos encontrados: ${response.body}');
        final List<dynamic> data = jsonDecode(response.body);
        final cursos = data.cast<Map<String, dynamic>>();
        return cursos;
      }

      throw Exception('Erro ao encontrar cursos novos!');
    } catch (error) {
      print('Erro ao encontrar cursos novos: $error');
      throw error;
    }
  }
}