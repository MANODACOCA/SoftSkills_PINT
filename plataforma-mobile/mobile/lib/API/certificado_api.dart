import 'package:http/http.dart' as http;

class CertificadoApi {
  static const urlAPI = 'https://softskills-api.onrender.com/certificados';

  Future<String> geraCertificado(int cursoId, int formandoId) async {
    try {
      final data = await http.get(Uri.parse(
        '$urlAPI/gerar/$cursoId/$formandoId'),
        headers: {'Accept': 'text/html',}
      );
      if(data.statusCode == 200) {
        return data.body;
      } else {
        throw Exception('Erro ao gerar certificado');
      }
    } catch(e) {
      throw Exception('Erro de conexão $e');
    }
  }
}