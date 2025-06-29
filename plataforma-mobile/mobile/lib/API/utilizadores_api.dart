// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'package:http/http.dart' as http;
import 'dart:convert';

class UtilizadoresApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/utilizador';

  Future<List<dynamic>> listUtilizador() async {
    try {
      final response = await http.get(Uri.parse('$urlAPI/list'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao buscar lista de Utilizador!');
    } catch (error) {
      print('Erro ao buscar lista de Utilizador: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> getUtilizador(String id) async {
    try {
      final response = await http.get(Uri.parse('$urlAPI/get/$id'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao buscar Utilizador!');
    } catch (error) {
      print('Erro ao buscar Utilizador: $error');
      throw error;
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
      final response = await http.put(
        Uri.parse('$urlAPI/update/$id'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );
      if (response.statusCode == 200) {
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
    List<int> fileBytes,
    String fileName,
  ) async {
    try {
      var request = http.MultipartRequest(
        'POST',
        Uri.parse('$urlAPI/alterar-imgperfil/$id'),
      );
      request.files.add(
        http.MultipartFile.fromBytes('imagem', fileBytes, filename: fileName),
      );

      final response = await request.send();
      final responseData = await response.stream.bytesToString();

      if (response.statusCode == 200) {
        return jsonDecode(responseData);
      }
      throw Exception('Erro ao atualizar imagem de perfil!');
    } catch (error) {
      print('Erro ao atualizar imagem de perfil: $error');
      throw error;
    }
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

  Future<int> utilizadoresContagem() async {
    try {
      final response = await http.get(Uri.parse('$urlAPI/count'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      throw Exception('Erro ao contar o numero de utilizadores!');
    } catch (error) {
      print('Erro ao contar o numero de utilizadores: $error');
      throw error;
    }
  }
}
