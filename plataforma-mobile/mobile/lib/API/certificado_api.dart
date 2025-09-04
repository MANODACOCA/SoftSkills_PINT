import 'package:http/http.dart' as http;

class CertificadoApi {
  static const _base = 'https://softskills-api.onrender.com/certificados';

  Uri buildUri(int cursoId, int formandoId) =>
      Uri.parse('$_base/gerar/$cursoId/$formandoId');

  Future<String> geraCertificado(int cursoId, int formandoId) async {
    try {
      final res = await http.get(
        buildUri(cursoId, formandoId),
        headers: {'Accept': 'text/html'},
      );
      if (res.statusCode == 200) return res.body;
      throw Exception('Erro ao gerar certificado (HTTP ${res.statusCode})');
    } catch (e) {
      throw Exception('Erro de conexão: $e');
    }
  }
}
