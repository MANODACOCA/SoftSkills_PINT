import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/ui/core/shared/carousel.dart';
import 'package:mobile/ui/core/shared/card_scroll.dart';
import '../../core/shared/navigationbar_component.dart';
import '../../core/shared/search_bar.dart';
import '../../core/shared/export.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.idUser});

  final String idUser;

  @override
  State<HomePage> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  List<Map<String, dynamic>> cursos = [];
  final CursosApi _api = CursosApi();

  @override
  void initState() {
    super.initState();
    fetchCursos();
  }

  Future<void> fetchCursos () async {
    try{
      final resultado = await _api.courseForYou(); 
      setState(() {
        cursos = resultado;
      });
    } catch(e) {
      print('Erro ao buscar os cursos: , $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SearchBarCustom(),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: 10),
            Carousel(),
            SizedBox(height: 15),
            CardsScroll(tema: 'Para si', cursos: cursos),
            SizedBox(height: 10),
            CardsScroll(tema: 'Cursos Mais Populares', cursos: cursos),
            SizedBox(height: 10),
            CardsScroll(tema: 'Novidades', cursos: cursos),
            SizedBox(height: 15),
          ],
        ),
      ),
      bottomNavigationBar: Footer(idUser: widget.idUser),
    );
  }
}
