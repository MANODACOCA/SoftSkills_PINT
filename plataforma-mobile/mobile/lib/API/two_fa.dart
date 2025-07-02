import 'dart:convert';
import 'package:http/http.dart' as http;

const String apiUrl = 'https://softskills-api.onrender.com/twofa';

class TwofaApi {
  Future<List<dynamic>> listTwofa() async {
    try {
      final response = await http.get(Uri.parse('$apiUrl/list'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Erro ao ir buscar lista de TWOFA!');
      }
    } catch (e) {
      print('Erro ao ir buscar lista de TWOFA!');
      rethrow;
    }
  }

  Future<Map<String, dynamic>> getTwofa(String id) async {
    try {
      final response = await http.get(Uri.parse('$apiUrl/get/$id'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Erro ao buscar TWOFA!');
      }
    } catch (e) {
      print('Erro ao buscar TWOFA!');
      rethrow;
    }
  }

  Future<Map<String, dynamic>> createTwofa(Map<String, dynamic> data) async {
    try {
      final response = await http.post(
        Uri.parse('$apiUrl/create'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(data),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return json.decode(response.body);
      } else {
        throw Exception('Erro ao criar TWOFA!');
      }
    } catch (e) {
      print('Erro ao criar TWOFA!');
      rethrow;
    }
  }

  Future<Map<String, dynamic>> updateTwofa(String id, Map<String, dynamic> data) async {
    try {
      final response = await http.put(
        Uri.parse('$apiUrl/update/$id'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(data),
      );
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Erro ao atualizar TWOFA!');
      }
    } catch (e) {
      print('Erro ao atualizar TWOFA!');
      rethrow;
    }
  }

  Future<Map<String, dynamic>> deleteTwofa(String id) async {
    try {
      final response = await http.delete(Uri.parse('$apiUrl/delete/$id'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Erro ao excluir TWOFA!');
      }
    } catch (e) {
      print('Erro ao excluir TWOFA!');
      rethrow;
    }
  }
}
