// ignore_for_file: constant_identifier_names

import 'dart:convert';
import 'package:http/http.dart' as http;

class ComentarioAPI {
  static const String API_URL_COMENTARIOS = 'https://softskills-api.onrender.com/comentario';
  static const String API_URL_LIKES = 'https://softskills-api.onrender.com/likes-comentario';

  static Future<List<dynamic>> listComentario() async {
    try {
      final response = await http.get(Uri.parse('$API_URL_COMENTARIOS/list'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao buscar lista de Comentários!');
      }
    } catch (e) {
      print('Erro ao buscar lista de Comentários! $e');
      rethrow;
    }
  }

  static Future<List<dynamic>> getComentariosByPost(String idPost) async {
    try {
      final response = await http.get(
        Uri.parse('$API_URL_COMENTARIOS/get/comentarios?id_post=$idPost'),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao buscar Comentários do post!');
      }
    } catch (e) {
      print('Erro ao buscar Comentários do post! $e');
      rethrow;
    }
  }

  static Future<dynamic> createComentario(Map<String, dynamic> formData) async {
    try {
      final response = await http.post(
        Uri.parse('$API_URL_COMENTARIOS/create'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(formData),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao criar Comentário!');
      }
    } catch (e) {
      print('Erro ao criar Comentário! $e');
      rethrow;
    }
  }

  static Future<dynamic> updateComentario(String id, Map<String, dynamic> data) async {
    try {
      final response = await http.put(
        Uri.parse('$API_URL_COMENTARIOS/update/$id'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao atualizar Comentário!');
      }
    } catch (e) {
      print('Erro ao atualizar Comentário! $e');
      rethrow;
    }
  }

  static Future<dynamic> deleteComentario(String id) async {
    try {
      final response = await http.delete(
        Uri.parse('$API_URL_COMENTARIOS/delete/$id'),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao excluir Comentário!');
      }
    } catch (e) {
      print('Erro ao excluir Comentário! $e');
      rethrow;
    }
  }

  static Future<dynamic> likeComentario(String idComentario, String idUtilizador) async {
    try {
      await http.put(Uri.parse('$API_URL_COMENTARIOS/addLike/$idComentario'));
      final response = await http.post(
        Uri.parse('$API_URL_LIKES/create'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'id_comentario': idComentario,
          'id_utilizador': idUtilizador,
        }),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao dar like no Comentário!');
      }
    } catch (e) {
      print('Erro ao dar like no Comentário! $e');
      rethrow;
    }
  }

  static Future<dynamic> unlikeComentario(String idComentario, String idUtilizador) async {
    try {
      await http.put(Uri.parse('$API_URL_COMENTARIOS/deleteLike/$idComentario'));
      final response = await http.delete(
        Uri.parse('$API_URL_LIKES/delete'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'id_comentario': idComentario,
          'id_utilizador': idUtilizador,
        }),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao remover like do Comentário!');
      }
    } catch (e) {
      print('Erro ao remover like do Comentário! $e');
      rethrow;
    }
  }

  static Future<dynamic> jaDeuLike(String idComentario, String idUtilizador) async {
    try {
      final response = await http.get(
        Uri.parse('$API_URL_LIKES/get/$idComentario/$idUtilizador'),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else if (response.statusCode == 404) {
        return false;
      } else {
        throw Exception('Erro inesperado ao verificar se deu like no Comentario!');
      }
    } catch (e) {
      print('Erro inesperado ao verificar se deu like no Comentario! $e');
      rethrow;
    }
  }
}