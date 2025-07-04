import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/ui/core/shared/carousel.dart';
import 'package:mobile/ui/core/shared/cursos/card_cursos/card_scroll.dart';
import '../../core/shared/base_comp/navigationbar_component.dart';
import '../../core/shared/base_comp/search_bar.dart';
import '../../core/shared/export.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  List<Map<String, dynamic>> cursosParaSi = [];
  List<Map<String, dynamic>> cursosPopulares = [];
  List<Map<String, dynamic>> cursosNovos = [];
  final CursosApi _api = CursosApi();

  @override
  void initState() {
    super.initState();
    fetchCursos();
  }

  Future<void> fetchCursos () async {
    try{
      final paraSi = await _api.courseForYou(); 
      final populares = await _api.coursePopular();
      final novos  = await _api.coursesNews();
      setState(() {
        cursosParaSi = paraSi;
        cursosPopulares = populares;
        cursosNovos = novos;
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
        child: (cursosNovos.isEmpty && cursosParaSi.isEmpty && cursosPopulares.isEmpty) 
          ? Padding(padding: EdgeInsets.only(top: 40), child: Center(child: CircularProgressIndicator()),) 
          : Column(
          children: [
            SizedBox(height: 10),
            Carousel(),
            SizedBox(height: 15),
            CardsScroll(tema: 'Para si', cursos: cursosParaSi),
            SizedBox(height: 10),
            CardsScroll(tema: 'Cursos Mais Populares', cursos: cursosPopulares),
            SizedBox(height: 10),
            CardsScroll(tema: 'Novidades', cursos: cursosNovos),
            SizedBox(height: 15),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
