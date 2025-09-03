// ignore_for_file: constant_identifier_names

import 'dart:convert';
import 'package:http/http.dart' as http;

class PedidosforumApi {
  static const String API_PEDIDOS_FORUM =
      'https://softskills-api.onrender.com/pedidos-forum';


  Future<dynamic> createPedidoForum({required String forumNovo, required int formandoId}) async {
    try { 
      /* final prefs = await SharedPreferences.getInstance(); 
      final token = prefs.getString('token'); 
      if (token == null) { 
        throw Exception('Sessão expirada: token inexistente'); 
      } */ 
      final response = await http.post( 
        Uri.parse('$API_PEDIDOS_FORUM/create'),
        body: jsonEncode({'novo_forum': forumNovo, 'id_formando': formandoId}), 
        headers: { /* 'Authorization': 'Bearer $token', */ 'Content-Type': 'application/json', }, 
      ); 
      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        return data; 
      } 
      print('Erro no criaçao: ${response.statusCode} - ${response.body}'); 
      throw Exception('Erro ao encontrar aulas!'); 
    } catch (error) { 
      print('Erro ao encontrar aulas: $error'); 
      rethrow; 
    }
  }

}
