// ignore_for_file: constant_identifier_names
import 'package:http/http.dart' as http;
import 'dart:convert';

class ForumAPI {
  static const String API_URL = 'https://softskills-api.onrender.com/conteudos_partilhado';

  static Future<List<dynamic>> listConteudosPartilhado({String ordenar = "Mais Recentes", String search = ""}) async {
    try {
      var url = '$API_URL/list?ordenar=$ordenar';
      if (search.isNotEmpty) {
        url += '&search=${Uri.encodeComponent(search)}';
      }
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        print('Response: ${response.body}');
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao procurar fóruns!');
      }
    } catch (e) {
      print('Erro ao procurar fóruns! $e');
      rethrow;
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

  static Future<Map<String, dynamic>> createConteudosPartilhado(Map<String, dynamic> data) async {
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

  static Future<Map<String, dynamic>> updateConteudosPartilhado(String id, Map<String, dynamic> data) async {
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

  static Future<Map<String, dynamic>> deleteConteudosPartilhado(String id) async {
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
}