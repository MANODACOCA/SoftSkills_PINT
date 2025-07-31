// ignore_for_file: constant_identifier_names
import 'dart:io';

import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/utils/verifica_internet.dart';
import 'package:mobile/data/cache_database.dart';
import 'package:path/path.dart' as p;

class ForumAPI {
  static const String API_URL =
      'https://softskills-api.onrender.com/conteudos_partilhado';
  static const String API_URL_POST =
      'https://softskills-api.onrender.com/posts';
  static const String API_URL_TIPO_DENUNCIA =
      'https://softskills-api.onrender.com/tipo_denuncia';
  static const String API_URL_DENUNCIA =
      'https://softskills-api.onrender.com/denuncia';

  static Future<List<dynamic>> listConteudosPartilhado({
    String ordenar = "Mais Recentes",
    String search = "",
  }) async {
    final cacheKey = 'forum_list';
    final hasConnection = await temInternet();

    if (hasConnection) {
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
    try {
      final cached = await ApiCache.lerDados(cacheKey);
      if (cached != null) {
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

  static Future<List<dynamic>> listPost() async {
    try {
      final response = await http.get(
        Uri.parse('https://softskills-api.onrender.com/posts/list'),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao ir buscar lista de Post!');
      }
    } catch (e) {
      print('Erro ao ir buscar lista de Post! $e');
      rethrow;
    }
  }

  static Future<dynamic> getPost(
    String id, {
    String ordenar = "Mais Recentes",
  }) async {
    try {
      final url =
          'https://softskills-api.onrender.com/posts/get/posts?id_conteudos_partilhado=$id&ordenar=$ordenar';
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao buscar Post!');
      }
    } catch (e) {
      print('Erro ao buscar Post! $e');
      rethrow;
    }
  }

  static Future<dynamic> createPost({
    required String textoPost,
    required String userId,
    required String forumId,
    File? ficheiro, // Apenas um ficheiro
  }) async {
    final uri = Uri.parse('https://softskills-api.onrender.com/posts/create');
    var request = http.MultipartRequest('POST', uri);

    // Campos simples (form-data)
    request.fields['texto_post'] = textoPost;
    request.fields['id_utilizador'] = userId;
    request.fields['id_conteudos_partilhado'] = forumId;
    request.fields['id_formato'] = '1'; // valor fixo como no frontend web

    // Enviar apenas 1 ficheiro (se fornecido)
    if (ficheiro != null) {
      final fileName = p.basename(ficheiro.path);
      request.files.add(
        await http.MultipartFile.fromPath(
          'ficheiro', // nome do campo esperado pela API
          ficheiro.path,
          filename: fileName,
        ),
      );
    }

    try {
      final streamedResponse = await request.send();
      final responseBody = await streamedResponse.stream.bytesToString();

      print('STATUS: ${streamedResponse.statusCode}');
      print('BODY: $responseBody');

      if (streamedResponse.statusCode == 200 ||
          streamedResponse.statusCode == 201) {
        return jsonDecode(responseBody);
      } else {
        throw Exception(
          'Erro ao criar Post! Código ${streamedResponse.statusCode}',
        );
      }
    } catch (e) {
      print('Erro ao criar Post! $e');
      rethrow;
    }
  }

  static Future<dynamic> updatePost(
    String id,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await http.put(
        Uri.parse('https://softskills-api.onrender.com/posts/update/$id'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao atualizar Post!');
      }
    } catch (e) {
      print('Erro ao atualizar Post! $e');
      rethrow;
    }
  }

  Future<dynamic> deletePost(String id) async {
    try {
      final response = await http.delete(
        Uri.parse('https://softskills-api.onrender.com/posts/delete/$id'),
      );
      print('Status: ${response.statusCode}');
      print('Body: ${response.body}');
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao excluir Post!');
      }
    } catch (e) {
      print('Erro ao excluir Post! $e');
      rethrow;
    }
  }

  //PARTE DOS LIKES DO FORUNS

  Future<dynamic> putLike(String idPost, int idUtilizador) async {
    try {
      await http.put(
        Uri.parse('https://softskills-api.onrender.com/posts/addLike/$idPost'),
      );
      final response = await http.post(
        Uri.parse('https://softskills-api.onrender.com/likes-post/create'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'id_post': idPost, 'id_utilizador': idUtilizador}),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao adicionar like no Post!');
      }
    } catch (e) {
      print('Erro ao adicionar like no Post! $e');
      rethrow;
    }
  }

  Future<dynamic> deleteLike(String idPost, int idUtilizador) async {
    try {
      await http.put(
        Uri.parse(
          'https://softskills-api.onrender.com/posts/deleteLike/$idPost',
        ),
      );
      final response = await http.delete(
        Uri.parse('https://softskills-api.onrender.com/likes-post/delete'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'id_post': idPost, 'id_utilizador': idUtilizador}),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Erro ao eliminar like no Post!');
      }
    } catch (e) {
      print('Erro ao eliminar like no Post! $e');
      rethrow;
    }
  }

  Future<dynamic> jaDeuLike(String idPost, int idUtilizador) async {
    try {
      final response = await http.get(
        Uri.parse(
          'https://softskills-api.onrender.com/likes-post/get/$idPost/$idUtilizador',
        ),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else if (response.statusCode == 404) {
        return false;
      } else {
        throw Exception('Erro inesperado ao verificar se deu like no Post!');
      }
    } catch (e) {
      print('Erro inesperado ao verificar se deu like no Post! $e');
      rethrow;
    }
  }

  Future<List<Map<String, dynamic>>> listDenuncias() async {
    try {
      /* final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      } */

      final response = await http.get(
        Uri.parse('$API_URL_TIPO_DENUNCIA/list'),
        /* headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        }, */
      );
      if (response.statusCode == 200) {
        print('Tipo de denuncias encontradas: ${response.body}');
        final List<dynamic> data = jsonDecode(response.body);
        final denuncias = data.cast<Map<String, dynamic>>();
        return denuncias;
      }

      throw Exception('Erro ao encontrar tipo denuncia!');
    } catch (error) {
      print('Erro ao encontrar cursos: $error');
      throw Exception(error);
    }
  }

  Future<Map<String, dynamic>> criarDenuncia(
    Map<String, dynamic> denuncia,
  ) async {
    try {
      /* final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      } */

      final response = await http.post(
        Uri.parse('$API_URL_DENUNCIA/create'),
        body: jsonEncode(denuncia),
        headers: {
          /* 'Authorization': 'Bearer $token', */
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 201) {
        print('Denucia encontradas: ${response.body}');
        final data = jsonDecode(response.body);
        return data;
      }

      print('Erro no criaçao: ${response.statusCode} - ${response.body}');
      throw Exception('Erro ao criar Denucia!');
    } catch (error) {
      print('Erro ao criar Denucia: $error');
      throw Exception(error);
    }
  }
}
