// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'dart:io';

import 'package:http/http.dart' as http;
import 'dart:convert';
//import 'package:shared_preferences/shared_preferences.dart';

class EntregaTrabalhosApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/entrega-trabalhos';

  Future<Map<String, dynamic>> criarEntregaTrabalho({required int idTrabalho, required int idFormando, required File ficheiro}) async {
    try {
      /* final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      } */

      final response = await http.post(
        Uri.parse('$urlAPI/create'),
        body: jsonEncode({
          'id_trabalho_et': idTrabalho,
          'id_formando_et': idFormando,
          'caminho_et': ficheiro,
        }),
        headers: {
          /* 'Authorization': 'Bearer $token', */
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 201) {
        print('Trabalho entregue: ${response.body}');
        final data = jsonDecode(response.body);
        return data;
      }

      print('Erro no criaçao: ${response.statusCode} - ${response.body}');
      throw Exception('Erro ao criar entrega trabalhos!');
    } catch (error) {
      print('Erro ao criar entrega trabalhos: $error');
      throw error;
    }
  }
}