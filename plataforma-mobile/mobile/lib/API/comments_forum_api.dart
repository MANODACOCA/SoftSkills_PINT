// ignore_for_file: constant_identifier_names

import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart' as p;
import 'package:http_parser/http_parser.dart';

class ComentarioAPI {
  static const String API_URL_COMENTARIOS =
      'https://softskills-api.onrender.com/comentario';
  static const String API_URL_LIKES =
      'https://softskills-api.onrender.com/likes-comentario';

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

  Future<List<Map<String,dynamic>>> getComentariosByPost(int idPost) async {
    try {
      final response = await http.get(
        Uri.parse('$API_URL_COMENTARIOS/get/comentarios?id_post=$idPost'),
      );
      if (response.statusCode == 200) {
        print('Response: ${response.body}');
        final List<dynamic> data = jsonDecode(response.body);
        final comentario = data.cast<Map<String, dynamic>>();
        return comentario;
      } else {
        throw Exception('Erro ao buscar Comentários do post!');
      }
    } catch (e) {
      print('Erro ao buscar Comentários do post! $e');
      rethrow;
    }
  }

  /* static Future<dynamic> createComentario(Map<String, dynamic> formData) async {
    try {
      final response = await http.post(
        Uri.parse('$API_URL_COMENTARIOS/create'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(formData),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        print('Comentario criado com sucesso: ${response.body}');
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao criar Comentário!');
      }
    } catch (e) {
      print('Erro ao criar Comentário! $e');
      rethrow;
    }
  } */

  static Future<dynamic> createComentario({
    required String textoComentario,
    required int userId,
    required int postId,
    File? ficheiro,
  }) async {
    final dio = Dio();
    final url = '$API_URL_COMENTARIOS/create';

    final formData = FormData.fromMap({
      'texto_comentario': textoComentario,
      'id_utilizador': userId,
      'id_post': postId,
      'id_formato': '1',
      if (ficheiro != null)
        'ficheiro': await MultipartFile.fromFile(
          ficheiro.path,
          filename: p.basename(ficheiro.path),
          contentType: _getMimeTypeFromExtension(ficheiro.path),
        ),
    });

    try {
      final response = await dio.post(
        url,
        data: formData,
        options: Options(headers: {'Content-Type': 'multipart/form-data'}),
      );

      print('STATUS: ${response.statusCode}');
      print('BODY: ${response.data}');

      if (response.statusCode == 200 || response.statusCode == 201) {
        return response.data;
      } else {
        throw Exception('Erro ao criar Comentário! Código ${response.statusCode}');
      }
    } catch (e) {
      print('Erro ao criar Comentário! $e');
      rethrow;
    }
  }



  static Future<dynamic> updateComentario(
    String id,
    Map<String, dynamic> data,
  ) async {
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

   Future<dynamic> deleteComentario(String id) async {
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

   Future<dynamic> likeComentario(
    String idComentario,
    int idUtilizador,
  ) async {
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

  Future<dynamic> unlikeComentario(
    String idComentario,
    int idUtilizador,
  ) async {
    try {
      await http.put(
        Uri.parse('$API_URL_COMENTARIOS/deleteLike/$idComentario'),
      );
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

  Future<bool> jaDeuLike(
    String idComentario,
    int idUtilizador,
  ) async {
    try {
      final response = await http.get(
        Uri.parse('$API_URL_LIKES/get/$idComentario/$idUtilizador'),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else if (response.statusCode == 404) {
        return false;
      } else {
        throw Exception(
          'Erro inesperado ao verificar se deu like no Comentario!',
        );
      }
    } catch (e) {
      print('Erro inesperado ao verificar se deu like no Comentario! $e');
      rethrow;
    }
  }

    static MediaType _getMimeTypeFromExtension(String filePath) {
    final ext = p.extension(filePath).toLowerCase();
    switch (ext) {
      case '.pdf':
        return MediaType('application', 'pdf');
      case '.jpg':
      case '.jpeg':
        return MediaType('image', 'jpeg');
      case '.png':
        return MediaType('image', 'png');
      case '.doc':
        return MediaType('application', 'msword');
      case '.docx':
        return MediaType(
          'application',
          'vnd.openxmlformats-officedocument.wordprocessingml.document',
        );
      case '.xls':
        return MediaType('application', 'vnd.ms-excel');
      case '.xlsx':
        return MediaType(
          'application',
          'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
      default:
        return MediaType('application', 'octet-stream');
    }
  }
}
