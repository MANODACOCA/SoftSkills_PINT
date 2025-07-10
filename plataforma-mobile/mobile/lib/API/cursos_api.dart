// ignore_for_file: use_rethrow_when_possible, depend_on_referenced_packages

import 'package:http/http.dart' as http;
import 'package:mobile/data/cache_database.dart';
import 'package:mobile/utils/verifica_internet.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class CursosApi {
  static const String urlAPI = 'https://softskills-api.onrender.com/cursos';

  Future<Map<String, dynamic>> updateCurso(int cursoId, Map<String,dynamic> curso) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
    
      if (token == null) {
        throw Exception('Sessão expirada: token inexistente');
      }

      final response = await http.put(
        Uri.parse('$urlAPI/update/$cursoId'),
        body: jsonEncode(curso),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        print('Estado de inscrição encontrado: ${response.body}');
        final data = jsonDecode(response.body);
        return data;
      }

      print('Erro no update: ${response.statusCode} - ${response.body}');
      throw Exception('Erro ao encontrar estado da inscrição!');
    } catch (error) {
      print('Erro ao encontrar estado da inscrição: $error');
      throw error;
    }
  }

  Future<Map<String, dynamic>> getCurso(int id) async {
    final cacheKey = 'cursos_$id';

    final hasConnection = await temInternet();

    if(hasConnection) {
      try {
          final prefs = await SharedPreferences.getInstance();
          final token = prefs.getString('token');
        
          if (token == null) {
            throw Exception('Sessão expirada: token inexistente');
          }
          
          final response = await http.get(
            Uri.parse('$urlAPI/get/$id'),
            headers: {
              'Authorization': 'Bearer $token',
              'Content-Type': 'application/json',
            },
          );
          if (response.statusCode == 200) {
            print('Curso encontrado: ${response.body}');
            final curso = jsonDecode(response.body);
            await ApiCache.guardarDados(cacheKey, curso);
            return curso;
          }
          throw Exception('Erro ao encontrar curso!');
        } catch (apiError) {
          print('Erro na API: $apiError');
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

  Future<List<Map<String, dynamic>>> listCursos() async {
    const cacheKey = 'list_cursos';

    final hasConnection = await temInternet();

    if (hasConnection) {
      try {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final response = await http.get(
          Uri.parse('$urlAPI/list'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Cursos encontrados: ${response.body}');
          final List<dynamic> data = jsonDecode(response.body);
          final cursos = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, cursos);
          return cursos;
        }
        
        throw Exception('Erro ao encontrar curso!');
      } catch (error) {
        print('Erro ao encontrar cursos: $error');
        throw error;
      }
    }
    
    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return List<Map<String, dynamic>>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }

  Future<List<Map<String, dynamic>>> listCursoDisponiveisInsc({String tipo = "todos", int? idCurso, String search = "", List<int> idTopico = const []}) async {
    const cacheKey = 'list_cursos_disponives';

    final hasConnection = await temInternet();

    if (hasConnection) {
      try {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final queryParams = {
          'tipo': tipo,
          if(idCurso != null) 'id_curso' : idCurso.toString(),
          if (search.isNotEmpty) 'search': search,
          if (idTopico.isNotEmpty) 'idstopicos': idTopico.join(','),
        };

        final uri = Uri.parse('$urlAPI/cursos-disponiveis-inscricao').replace(queryParameters: queryParams);

        final response = await http.get(
          uri,
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Cursos encontrados: ${response.body}');
          final List<dynamic> data = jsonDecode(response.body);
          final cursos = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, cursos);
          return cursos;
        }
        
        throw Exception('Erro ao encontrar curso!');
      } catch (error) {
        print('Erro ao encontrar cursos: $error');
        throw error;
      }
    }
    
    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return List<Map<String, dynamic>>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }

  Future<List<Map<String, dynamic>>> courseForYou() async {
    const cacheKey = 'course_foryou';
    
    final hasConnection = await temInternet();

    if(hasConnection) {
      try {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final response = await http.get(
          Uri.parse('$urlAPI/cursos-destaque/top8foryou'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Cursos encontrados para si: ${response.body}');
          final List<dynamic> data = jsonDecode(response.body);
          final cursos = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, cursos);
          return cursos;
        }

        throw Exception('Erro ao encontrar cursos para si!');
      } catch (error) {
        print('Erro ao encontrar cursos para si: $error');
        throw error;
      }
    }
    
    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return List<Map<String, dynamic>>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }

  Future<List<Map<String, dynamic>>> coursePopular() async {
    const cacheKey = 'cursos_populares';

    final hasConnection = await temInternet();

    if(hasConnection) {
      try {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final response = await http.get(
          Uri.parse('$urlAPI/cursos-destaque/top8popular'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Cursos populares encontrados: ${response.body}');
          final List<dynamic> data = jsonDecode(response.body);
          final cursos = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, cursos);
          return cursos;
        }

        throw Exception('Erro ao encontrar cursos populares!');
      } catch (error) {
        print('Erro ao encontrar cursos populares: $error');
        throw error;
      }
    }
    
    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return List<Map<String, dynamic>>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }

  Future<List<Map<String, dynamic>>> coursesNews() async {
    const cacheKey = 'cursos_novos';

    final hasConnection = await temInternet();

    if(hasConnection) {
      try {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final response = await http.get(
          Uri.parse('$urlAPI/cursos-destaque/top8news'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Cursos novos encontrados: ${response.body}');
          final List<dynamic> data = jsonDecode(response.body);
          final cursos = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, cursos);
          return cursos;
        }

        throw Exception('Erro ao encontrar cursos novos!');
      } catch (error) {
        print('Erro ao encontrar cursos novos: $error');
        throw error;
      }
    }

    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return List<Map<String, dynamic>>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }
  
  Future<bool> verificarInscricao(int userId, int cursoId) async {
    final cacheKey = 'curso_inscrito_user_${userId}_curso_$cursoId';

    final hasConnection = await temInternet();

    if (hasConnection) {
      try {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final response = await http.get(
          Uri.parse('$urlAPI/verificar/$userId/$cursoId'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Estado de inscrição encontrado: ${response.body}');
          final data = jsonDecode(response.body);
          final bool inscrito = data['inscrito'];
          if(inscrito) {
            await ApiCache.guardarDados(cacheKey, {"inscrito": true});
          }
          return inscrito;
        }

        throw Exception('Erro ao encontrar estado da inscrição!');
      } catch (error) {
        print('Erro ao encontrar estado da inscrição: $error');
        throw error;
      }
    }
    
    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null && cached['inscrito']) {
        return true;
      } else {
        return false;
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }

  Future<List<Map<String, dynamic>>> listCursosInscritos(int userId) async {
    final cacheKey = 'cursos_incrito$userId';

    final hasConnection = await temInternet();

    if(hasConnection) {
      try {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final response = await http.get(
          Uri.parse('$urlAPI/users/$userId/enrolled-courses'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Cursos encontrados: ${response.body}');
          final List<dynamic> data = jsonDecode(response.body);
          final cursos = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, cursos);
          return cursos;
        }
        
        throw Exception('Erro ao encontrar curso!');
      } catch (error) {
        print('Erro ao encontrar cursos: $error');
        throw error;
      }
    }
    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return List<Map<String, dynamic>>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }

  Future<List<Map<String, dynamic>>> listCursoscompleted(int userId) async {
    final cacheKey = 'cursos_completos$userId';

    final hasConnection = await temInternet();

    if (hasConnection) {
      try {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
      
        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final response = await http.get(
          Uri.parse('$urlAPI/users/$userId/completed-courses'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Cursos encontrados: ${response.body}');
          final List<dynamic> data = jsonDecode(response.body);
          final cursos = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, cursos);
          return cursos;
        }
        
        throw Exception('Erro ao encontrar curso!');
      } catch (error) {
        print('Erro ao encontrar cursos: $error');
        throw error;
      }
    }
    try{
      final cached = await ApiCache.lerDados(cacheKey);
      if(cached != null) {
        return List<Map<String, dynamic>>.from(cached);
      } else {
        throw Exception('Sem internet e sem dados guardados localmente');
      }
    } catch (cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chache');
    }
  }

  Future <Map<String, dynamic>> cursoSlide() async {
    final cacheKey = 'cursos_slide';

    final hasConnection = await temInternet();

    if(hasConnection){
      try{
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');

        if (token == null) {
          throw Exception('Sessão expirada: token inexistente');
        }

        final response = await http.get(
          Uri.parse('$urlAPI/curso-destaque/topcurso'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          print('Curso para o Slide encontrado: ${response.body}');
          final Map<String, dynamic> data = jsonDecode(response.body);
          //final cursos = data.cast<Map<String, dynamic>>();
          await ApiCache.guardarDados(cacheKey, data);
          return data;
        }

        throw Exception('Erro ao encontrar cursos para si!');
      } catch (error) {
        print('Erro ao encontrar cursos para si: $error');
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
    } catch(cacheError) {
      print('Erro ao ler cache: $cacheError');
      throw Exception('Sem internet e não foi possivel aceder à chave');
    }
  }

}



