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
  final CursosApi _api = CursosApi();
  Map<String, dynamic> cursosParaSi = {};
  Map<String, dynamic> cursosPopulares = {};
  Map<String, dynamic> cursosNovos = {};

  @override
  void initState() {
    super.initState();
    fetchCursos();
  }

  void fetchCursos() async {
    try {
      final data = await _api.courseForYou();
      
      setState(() {
        cursosParaSi = Map<String, dynamic>.from(data);
      });
      print(cursosParaSi);
    } catch (e) {
      print('Erro ao carregar cursos: $e');
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
            CardsScroll(tema: 'Para si', cursos: [cursosParaSi]),
            SizedBox(height: 10),
            CardsScroll(tema: 'Cursos Mais Populares', cursos: [cursosParaSi]),
            SizedBox(height: 10),
            CardsScroll(tema: 'Novidades', cursos: [cursosParaSi]),
            SizedBox(height: 15),
          ],
        ),
      ),
      bottomNavigationBar: Footer(idUser: widget.idUser),
    );
  }
}
