// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'package:http/http.dart' as http;
import 'package:mobile/data/database/cache_database.dart';
import 'dart:convert';

import 'package:mobile/utils/verifica_internet.dart';
//import 'package:shared_preferences/shared_preferences.dart';

class TrabalhosApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/trabalhos';

  Future<List<Map<String, dynamic>>> getTrabalhosCurso(int cursoId) async {
    final cacheKey = 'trabalhos_curso_$cursoId';

    final hasConnection = await temInternet();

    if (hasConnection) {
      try {
        /* final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        } */

        final response = await http.get(
          Uri.parse('$urlAPI/getTrabalhosCursos/$cursoId'),
          /* headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          }, */
        );

        if (response.statusCode == 200) {
          print('Trabalhos encontradas: ${response.body}');
          final List<dynamic> data = jsonDecode(response.body);
          final aulas = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, aulas);
          return aulas;
        }

        throw Exception('Erro ao encontrar aulas!');
      } catch (error) {
        print('Erro ao encontrar aulas: $error');
        throw error;
      }  
    }
    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return List<Map<String, dynamic>>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }
}