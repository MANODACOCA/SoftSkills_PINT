// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:image_picker/image_picker.dart';
import 'package:http_parser/http_parser.dart';
import 'package:mime/mime.dart';
import 'package:mobile/data/database/cache_database.dart';
import 'package:mobile/utils/verifica_internet.dart';

class UtilizadoresApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/utilizador';

  Future<Map<String, dynamic>> getUtilizador(int id) async {
    final cacheKey = 'utilizador_$id';

    final hasConnection = await temInternet();

    if (hasConnection) {
      try {
        final response = await http.get(Uri.parse('$urlAPI/get/$id'));
        if (response.statusCode == 200) {
          print('Utilizador encontrado: ${response.body}');
          final utilizador = jsonDecode(response.body);
          await ApiCache.guardarDados(cacheKey, utilizador);
          return utilizador;
        }
        throw Exception('Erro ao buscar Utilizador!');
      } catch (error) {
        print('Erro ao buscar Utilizador: $error');
        throw error;
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

  Future<Map<String, dynamic>> createUtilizador(
    String nomeUtilizador,
    String email,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$urlAPI/create'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'nome_utilizador': nomeUtilizador, 'email': email}),
      );
      if (response.statusCode == 201) {
        print('Utilizador criado com sucesso: ${response.body}');
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao criar Utilizador!');
    } catch (error) {
      print('Erro ao criar Utilizador: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> updateUtilizador(
    String id,
    Map<String, dynamic> data,
  ) async {
    try {
      final uri = Uri.parse('$urlAPI/update/$id');
      final response = await http.put(
        uri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );
      if (response.statusCode == 200) {
        print('Erro no update: ${response.statusCode} - ${response.body}');
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao atualizar Utilizador!');
    } catch (error) {
      print('Erro ao atualizar Utilizador: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> alterarImgPerfil(
    String id,
    ImageSource source,
  ) async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: source, imageQuality: 75);

    if (pickedFile == null) {
      throw Exception('Nenhuma imagem selecionada');
    }

    final mimeType = lookupMimeType(pickedFile.path) ?? 'image/jpeg';
    final typeSplit = mimeType.split('/');

    final uri = Uri.parse(
      'https://softskills-api.onrender.com/utilizador/alterar-imgperfil/$id',
    );

    final request =
        http.MultipartRequest('POST', uri)
          ..files.add(
            await http.MultipartFile.fromPath(
              'imagem',
              pickedFile.path,
              filename: pickedFile.name,
              contentType: MediaType(typeSplit[0], typeSplit[1]),
            ),
          )
          ..headers.addAll({'Accept': 'application/json'});

    final res = await request.send();
    final body = await res.stream.bytesToString();

    if (res.statusCode != 200) {
      throw Exception('Erro ao enviar imagem: $body');
    }
    return jsonDecode(body) as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> deleteUtilizador(String id) async {
    try {
      final response = await http.delete(Uri.parse('$urlAPI/delete/$id'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao excluir Utilizador!');
    } catch (error) {
      print('Erro ao excluir Utilizador: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      print('Tentando efetuar login com email: $email e password: $password');
      final response = await http.post(
        Uri.parse('$urlAPI/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao efetuar login!');
    } catch (error) {
      throw error;
    }
  }

  Future<Map<String, dynamic>> alterarPassword(
    String email,
    String novaPassword,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$urlAPI/alterar-password'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'novaPassword': novaPassword}),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao alterar a password!');
    } catch (error) {
      print('Erro ao alterar a password: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> esqueceuPassword(String email) async {
    try {
      final response = await http.post(
        Uri.parse('$urlAPI/esqueceu-password'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email}),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao efetuar esquecer password!');
    } catch (error) {
      print('Erro ao efetuar esquecer password: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> verificarCodigo(
    String email,
    String codigo,
  ) async {
    try {
      final response = await http.post(
        Uri.parse('$urlAPI/verificar-codigo'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'codigo': codigo}),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao validar codigo 2FA!');
    } catch (error) {
      print('Erro ao validar codigo 2FA: $error');
      throw error;
    }
  }

  String? getUserIdFromToken(String token) {
    try {
      final parts = token.split('.');
      if (parts.length != 3) return null;
      final payload = utf8.decode(
        base64Url.decode(base64Url.normalize(parts[1])),
      );
      final payloadMap = json.decode(payload);
      final id = payloadMap['id'];
      if (id == null) return null;
      return id.toString();
    } catch (e) {
      return null;
    }
  }
}
