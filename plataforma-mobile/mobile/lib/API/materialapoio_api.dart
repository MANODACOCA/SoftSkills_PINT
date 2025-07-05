// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'package:http/http.dart' as http;
import 'dart:convert';
//import 'package:shared_preferences/shared_preferences.dart';

class MaterialApoioApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/material_apoio';

  Future<List<Map<String, dynamic>>> getMaterialApoioCurso(int cursoId) async {
    try {
      /* final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      } */

      final response = await http.get(
        Uri.parse('$urlAPI/material-apoio/$cursoId'),
        /* headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        }, */
      );

      if (response.statusCode == 200) {
        print('Materiais encontrados: ${response.body}');
        final List<dynamic> data = jsonDecode(response.body);
        final materiais = data.cast<Map<String, dynamic>>();
        return materiais;
      }

      throw Exception('Erro ao encontrar material de apoio!');
    } catch (error) {
      print('Erro ao encontrar material de apoio: $error');
      throw error;
    }
  }
}