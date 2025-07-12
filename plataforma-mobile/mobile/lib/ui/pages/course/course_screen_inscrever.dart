import 'package:go_router/go_router.dart';
import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/API/inscricao_api.dart';
import 'package:mobile/API/utilizadores_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:mobile/ui/core/shared/cursos/cursos_comp/tabbar_cursos_inscrever.dart';
import 'package:mobile/utils/verifica_internet.dart';
import 'package:provider/provider.dart';
import '../../core/shared/export.dart';


class Inscrever extends StatefulWidget {
  const Inscrever({super.key , required this.idCurso});

  final int idCurso;

  @override
  State<Inscrever> createState() => _InscreverState();
}

class _InscreverState extends State<Inscrever> {
  Map<String, dynamic> curso = {};
  Map<String, dynamic> user = {};
  final CursosApi _apicurso = CursosApi();
  final InscricaoApi _apiinsc = InscricaoApi();
  final UtilizadoresApi _apiuser = UtilizadoresApi();
  int? id;
  bool jaInscrito = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        setState(() {
          id = int.tryParse(userId);
        });
        fetchUtilizador(int.parse(userId));
      }
    });
    fetchCursos(widget.idCurso);
  }

  Future<void> fetchCursos (int idCurso) async {
    try{
      final esteCurso = await _apicurso.getCurso(idCurso);
      setState(() {
        curso = esteCurso;
      });
    } catch(e) {
      print('Erro ao buscar o curso: $e');
    }
  }

  Future<void> fetchUtilizador (int userid) async {
    try{
      final esteUtilizador = await _apiuser.getUtilizador(userid);
      setState(() {
        user = esteUtilizador;
      });
    } catch(e) {
      print('Erro ao buscar o curso: $e');
    }
  }
  
  Future<bool> inscrever () async {
    try {
      int i = (curso['contador_formandos'] ?? 0) + 1;
      Map<String, dynamic> insc = { 
                                    'id_formando': id,
                                    'id_curso': widget.idCurso, 
                                    'nome_formando': user['nome_utilizador'],
                                    'destinatario': user['email'],
                                    'nome_curso': curso['nome_curso'],
                                    'data_inicio': curso['data_inicio_curso'],
                                  };
      await _apiinsc.criarInscricao(insc);
      await _apicurso.updateCurso(widget.idCurso, {'contador_formandos': i});
      return true;
    } catch (e) {
      print('Erro ao inscrever no curso: $e');
      return false;
    }
  }

  Future<void> _handleInscricao() async {
    if (jaInscrito) return;
    setState(() {
      jaInscrito = true;
    });

    bool inscreveu = await inscrever();

    if (!mounted) return;

    setState(() {
      jaInscrito = false;
    });

    final scaffoldMessenger = ScaffoldMessenger.of(context);
   
    if (inscreveu) {
      scaffoldMessenger.showSnackBar(
        const SnackBar(content: Text('Inscrição realizada com sucesso!')),
      );

      context.go('/cursos-inscritos', extra: widget.idCurso);

    } else {
      scaffoldMessenger.showSnackBar(
        const SnackBar(content: Text('Ocorreu um erro ao inscrever. Tente novamente.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return AppScaffold(
      appBar: AppBarArrow(
        onBack: () => context.go('/cursos'),
        title: (curso.isNotEmpty && curso['nome_curso'] != null && curso['nome_curso'].toString().isNotEmpty) 
        ? curso['nome_curso'] 
        : ''
      ),
      body: Center(
        child: curso.isEmpty 
          ? Padding(padding: EdgeInsets.all(4), child: Center(child: CircularProgressIndicator()),) 
          : Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.all(10),
                child: Column(
                  children: [
                    SizedBox(
                      width: MediaQuery.of(context).size.width,
                      height: 185,
                      child: ClipRRect(
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(12),
                        topRight: Radius.circular(12),
                      ),
                      child: FutureBuilder<bool>(
                        future: temInternet(),
                        builder: (context, snapshot) {
                          final online = snapshot.data ?? true;
                          final imageUrl = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(curso['nome_curso'])}&background=random&bold=true';
                          if (online) {
                            return Image.network(
                              curso['imagem'],
                              width: double.infinity,
                              height: 135,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) {
                                return Image.network(
                                  imageUrl,
                                  width: double.infinity,
                                  height: 135,
                                  fit: BoxFit.cover,
                                );
                              },
                            );
                          } else {
                            return Image.asset(
                              'assets/course-horizontal.png',
                              width: double.infinity,
                              height: 135,
                              fit: BoxFit.cover,
                            );
                          }
                        },
                      ),
                    ), 
                  ), 
                    SizedBox(height: 5,),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Container(
                        height: 70,
                        alignment: Alignment.centerLeft,
                        child: Text(
                          "${curso['nome_curso']}",
                          style: TextStyle(fontSize: 23, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.start,
                        ),  
                      ),
                      
                    ),
                    TabbarCoursesInscrever(curso: curso),
                  ],
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(10),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  fixedSize: Size(screenWidth - 10, 46),
                ),
                onPressed: (user.isEmpty || curso.isEmpty || jaInscrito) 
                ? null
                : () async {
                 _handleInscricao();
                }, 
                child: jaInscrito 
                ? CircularProgressIndicator(color: Colors.white) 
                : Text('Inscrever', style: TextStyle(color: Colors.white),)
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
