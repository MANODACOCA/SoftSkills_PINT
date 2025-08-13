// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'package:http/http.dart' as http;
import 'package:mobile/data/cache_database.dart';
import 'dart:convert';

import 'package:mobile/utils/verifica_internet.dart';
//import 'package:shared_preferences/shared_preferences.dart';

class InscricaoApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/inscricoes';

  Future<Map<String, dynamic>> criarInscricao(Map<String,dynamic> inscricao) async {
    try {
      /* final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      } */

      final response = await http.post(
        Uri.parse('$urlAPI/create'),
        body: jsonEncode(inscricao),
        headers: {
          /* 'Authorization': 'Bearer $token', */
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 201) {
        print('Aulas encontradas: ${response.body}');
        final data = jsonDecode(response.body);
        return data;
      }

      print('Erro no criaçao: ${response.statusCode} - ${response.body}');
      throw Exception('Erro ao encontrar aulas!');
    } catch (error) {
      print('Erro ao encontrar aulas: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> getInscricao(int id_formando, int id_curso) async {
    final cacheKey = 'curso_inscrito_user_${id_formando}_curso_$id_curso';
    final hasConnection = await temInternet();

    if(hasConnection) {
      try {
        /* final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        } */

      final uri = Uri.parse('$urlAPI/get').replace(queryParameters: {
        'id_formando': id_formando.toString(),
        'id_curso': id_curso.toString(),
      });

      final response = await http.get(
        uri,
        /* headers: {
          'Authorization': 'Bearer $token',
          'Accept': 'application/json',
        }, */
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        await ApiCache.guardarDados(cacheKey, {'data': data});
        return data;
      }

        throw Exception('Erro ao encontrar inscrição');
      } catch (error) {
        print('Erro ao encontrar inscrição!');
        throw error;
      }
    }
    try {
      final cached = await ApiCache.lerDados(cacheKey);
      if (cached != null) {
        return Map<String, dynamic>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }
}