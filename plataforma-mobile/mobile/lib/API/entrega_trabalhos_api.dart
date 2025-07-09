// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:mime/mime.dart';
import 'package:mobile/data/cache_database.dart';
import 'package:mobile/utils/verifica_internet.dart';

class EntregaTrabalhosApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/entrega-trabalhos';

  Future<Map<String, dynamic>> getEntregaTrabalho(int idTrabalho, int idUser) async {
    final cacheKey = 'get_trabalho_${idTrabalho}_$idUser';

    final hasConnection = await temInternet();

    if(hasConnection) {
      try {
          /* final prefs = await SharedPreferences.getInstance();
          final token = prefs.getString('token');
        
          if (token == null) {
            throw Exception('Sessão expirada: token inexistente');
          } */
          
          final response = await http.get(
            Uri.parse('$urlAPI/get/$idTrabalho/$idUser'),
            /* headers: {
              'Authorization': 'Bearer $token',
              'Content-Type': 'application/json',
            }, */
          );
          if (response.statusCode == 200) {
            print('Curso encontrado: ${response.body}');
            final trabalhoEntregue = jsonDecode(response.body);
            await ApiCache.guardarDados(cacheKey, trabalhoEntregue);
            return trabalhoEntregue;
          }
          throw Exception('Erro ao encontrar trabalho entregue!');
        } catch (apiError) {
          print('Erro na API: $apiError');
        }
    }

    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return Map<String, dynamic>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }

  Future<Map<String, dynamic>> criarEntregaTrabalho({
    required int idTrabalho,
    required int idFormando,
    required File ficheiro,
  }) async {
    try {
      final uri = Uri.parse('$urlAPI/create');

      final mimeType = lookupMimeType(ficheiro.path) ?? 'application/octet-stream';
      final splitMime = mimeType.split('/');

      final request = http.MultipartRequest('POST', uri)
        ..fields['id_trabalho_et'] = idTrabalho.toString()
        ..fields['id_formando_et'] = idFormando.toString()
        ..files.add(
          await http.MultipartFile.fromPath(
            'ficheiro',
            ficheiro.path,
            contentType: MediaType(splitMime[0], splitMime[1]),
          ),
        )
        ..headers.addAll({
          'Accept': 'application/json',
        });

      final response = await request.send();
      final responseBody = await response.stream.bytesToString();

      if (response.statusCode == 201) {
        print('Trabalho entregue: $responseBody');
        return jsonDecode(responseBody) as Map<String, dynamic>;
      } else {
        print('Erro no envio: ${response.statusCode} - $responseBody');
        throw Exception('Erro ao criar entrega de trabalho');
      }
    } catch (error) {
      print('Erro ao criar entrega trabalhos: $error');
      throw error;
    }
  }

  Future<void> deleteEntregaTrabalho({ required int idTrabalho, required int idFormando}) async {
    try {
      final response = await http.delete(
        Uri.parse('$urlAPI/delete/$idTrabalho/$idFormando'),
        headers: {
          'Accept': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        print('Entrega de trabalho apagada com sucesso');
      } else {
        print('Erro ao apagar entrega: ${response.statusCode} - ${response.body}');
        throw Exception('Erro ao apagar entrega de trabalho');
      }
    } catch (e) {
      print('Erro ao apagar entrega de trabalho: $e');
      rethrow;
    }
  }

}
