// ignore_for_file: constant_identifier_names

import 'dart:convert';
import 'package:http/http.dart' as http;

class PedidosforumApi {
  static const String API_PEDIDOS_FORUM =
      'https://softskills-api.onrender.com/pedidos-forum';


  static Future<dynamic> createPedidoForum({required String forumNovo, required int formandoId}) async {
    final url = '$API_PEDIDOS_FORUM/create';

    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'forumNovo': forumNovo,
          'formandoId': formandoId,
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return response.body.isEmpty ? null : jsonDecode(response.body);
      } else {
        throw Exception('Erro ao criar pedido de fórum! Código ${response.statusCode}');
      }
    } catch (e) {
      print('Erro ao criar pedido de fórum! $e');
      rethrow;
    }
  }
}
