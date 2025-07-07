// ignore_for_file: constant_identifier_names
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/utils/verifica_internet.dart';
import 'package:mobile/data/database/cache_database.dart';

class ForumAPI {
  static const String API_URL = 'https://softskills-api.onrender.com/conteudos_partilhado';
  static const String API_URL_POST = 'https://softskills-api.onrender.com/posts';

  static Future<List<dynamic>> listConteudosPartilhado({String ordenar = "Mais Recentes", String search = "",}) async {
    final cacheKey = 'forum_list';
    final hasConnection = await temInternet();

    if(hasConnection) {
      try {
        var url = '$API_URL/list?ordenar=$ordenar';
        if (search.isNotEmpty) {
          url += '&search=${Uri.encodeComponent(search)}';
        }
        final response = await http.get(Uri.parse(url));
        if (response.statusCode == 200) {
          print('Response: ${response.body}');
          final lista = jsonDecode(response.body);
          await ApiCache.guardarDados(cacheKey, lista);
          return lista;
        }
          throw Exception('Erro ao procurar fóruns!');
        } catch (apiError) {
          print('Erro ao procurar fóruns! $apiError');
        }
    }
    try{
      final cached = await ApiCache.lerDados(cacheKey);
        if(cached != null) {
          return List<dynamic>.from(cached);
        } else {
          throw Exception('Sem internet e sem dados guardados localmente');
        }
      } catch (cacheError) {
        print('Erro ao ler cache: $cacheError');
        throw Exception('Sem internet e não foi possivel acede à cache');
    }
  }

  static Future<Map<String, dynamic>> getConteudosPartilhado(String id) async {
    try {
      final response = await http.get(Uri.parse('$API_URL/get/$id'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao buscar Conteúdo Partilhado!');
      }
    } catch (e) {
      print('Erro ao buscar Conteúdo Partilhado! $e');
      rethrow;
    }
  }

  static Future<Map<String, dynamic>> createConteudosPartilhado(
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$API_URL/create'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao criar Conteúdo Partilhado!');
      }
    } catch (e) {
      print('Erro ao criar Conteúdo Partilhado! $e');
      rethrow;
    }
  }

  static Future<Map<String, dynamic>> updateConteudosPartilhado(
    String id,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await http.put(
        Uri.parse('$API_URL/update/$id'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao atualizar Conteúdo Partilhado!');
      }
    } catch (e) {
      print('Erro ao atualizar Conteúdo Partilhado! $e');
      rethrow;
    }
  }

  static Future<Map<String, dynamic>> deleteConteudosPartilhado(
    String id,
  ) async {
    try {
      final response = await http.delete(Uri.parse('$API_URL/delete/$id'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao excluir Conteúdo Partilhado!');
      }
    } catch (e) {
      print('Erro ao excluir Conteúdo Partilhado! $e');
      rethrow;
    }
  }

  static Future<int> forumContagem() async {
    try {
      final response = await http.get(Uri.parse('$API_URL/count'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao contar o número de tópicos no fórum!');
      }
    } catch (e) {
      print('Erro ao contar o número de tópicos no fórum! $e');
      rethrow;
    }
  }

  //PARTE DOS POSTS DO FORUNS

  static Future<Map<String, dynamic>> getPostForum(String idForum) async {
    try {
      final url = '$API_URL_POST/get/posts?id_conteudos_partilhado=$idForum';
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao obter os dados do Post!');
      }
    } catch (e) {
      print('Erro ao obter os dados do Post: $e');
      rethrow;
    }
  }
}
