import 'package:mobile/API/aulas_api.dart';
import 'package:mobile/API/materialapoio_api.dart';
import 'package:mobile/ui/core/shared/aulas/aulas_scroll.dart';
import 'package:mobile/ui/core/shared/material_apoio/material_scroll.dart';
//import 'package:mobile/ui/core/shared/aulas/card_aulas.dart';
import 'package:mobile/ui/core/shared/text_expand.dart';

import '../../export.dart';

class TabbarCoursesInscrito extends StatefulWidget {
  const TabbarCoursesInscrito({super.key, required this.curso});

  final Map<String, dynamic> curso;

  @override
  State<TabbarCoursesInscrito> createState() => _TabbarCoursesInscritoState();
}

class _TabbarCoursesInscritoState extends State<TabbarCoursesInscrito> {
  List<Map<String, dynamic>> aulas = [];
  List<Map<String,dynamic>> materialapoio = [];
  final AulasApi _apiaulas = AulasApi();
  final MaterialApoioApi _apimaterial = MaterialApoioApi();

  @override
  void initState() {
    super.initState();
    fetchAulas(widget.curso['id_curso']);
    fetchMateriais(widget.curso['id_curso']);
  }

  Future<void> fetchAulas (int idCurso) async {
    try{
      final estasAulas = await _apiaulas.getAulasCurso(idCurso);
      setState(() {
        aulas = estasAulas;
      });
    } catch(e) {
      print('Erro ao encontrar aulas: , $e');
    }
  }

  Future<void> fetchMateriais (int idCurso) async {
    try {
      final esteMaterial = await _apimaterial.getMaterialApoioCurso(idCurso);
      setState(() {
        materialapoio = esteMaterial;
      });
    } catch (e) {
      print('Erro ao encontrar materiais de apoio');
    }
  }

  bool hasSincrono () {
    if(widget.curso['sincrono'] == null){
      return false;
    } else {
      return true;
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    final bool hasFormador = widget.curso['sincrono'] != null;
    final imgPerfil = widget.curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['img_perfi'];
    final nomeFormador = widget.curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['nome_util'];
    print('Imagem do formador: $imgPerfil');
    return DefaultTabController(
      length: hasFormador ? 4 : 3,
      child: Column(
        children: [
          TabBar(
            tabs: [
              Tab(text: "Aulas"),
              Tab(child: Text("Material\napoio", textAlign: TextAlign.center,),),
              hasFormador ? Tab(text: "Trabalhos") : Tab(text: "Sobre"),
              if(hasFormador) Tab(text: "Sobre"),
            ],
          ),
          SizedBox(
            height: screenHeight - 490, 
            child: TabBarView(
              children: [
                //Aulas
                ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        AulasScroll(aulas: aulas, sincrono: hasSincrono(),)
                      ],
                    ),  
                  ),
                ]),
                //Materia Apoio
                ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        MaterialScroll(material: materialapoio,),
                      ],
                    ),  
                  ),
                ]),
                hasFormador 
                //Eventos
                ? ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 5,),
                        Text("Eventos", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        SizedBox(height: 10,),
                        Text('Por fazer...')
                      ],
                    ) 
                  ),
                ])
                //Sobre
                : ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 5,),
                        Text("Descrição de curso", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        SizedBox(height: 10,),
                        TextExpand(text: widget.curso['descricao_curso']),
                      ],
                    ) 
                  ),
                ]),
                //Sobre
                if (hasFormador)
                 ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            ClipOval(
                              child: SizedBox(
                                height: 60,
                                width: 60,
                                child: Image.network(
                                  (imgPerfil != null && imgPerfil.toString().isNotEmpty)
                                    ? 'https://softskills-api.onrender.com/$imgPerfil' 
                                    : 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(nomeFormador)}&background=random&bold=true',
                                  fit: BoxFit.cover,
                                  errorBuilder: (context, error, stackTrace) {
                                    final fallbackImg = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(nomeFormador)}&background=random&bold=true';
                                    return Image.network(
                                      fallbackImg,
                                      height: 135,
                                      width: double.infinity,
                                      fit: BoxFit.cover,
                                    );
                                  },
                                ) 
                              ),
                            ),
                            SizedBox(width: 15,),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("${widget.curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['nome_util']}", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold), textAlign: TextAlign.left,),
                                Text('${widget.curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['email']}', textAlign: TextAlign.left,),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(height: 10,),
                        TextExpand(text: widget.curso['sincrono']?['id_formador_formadore']?['descricao_formador']),
                        SizedBox(height: 25,),
                        Text("Descrição de curso", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        SizedBox(height: 10,),
                        TextExpand(text: widget.curso['descricao_curso']),
                      ],
                    ),
                  ),
                ])
              ],
            ),
          )
        ],
      ),
    );
  }
}
