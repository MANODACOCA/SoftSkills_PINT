import 'package:flutter/material.dart';
import '../../../utils/uteis.dart';

class TabbarCourses extends StatelessWidget {
  const TabbarCourses({super.key, required this.curso});

  final Map<String, dynamic> curso;

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    final bool hasFormador = curso['sincrono'] != null;

    return DefaultTabController(
      length: hasFormador ? 3:2,
      child: Column(
        children: [
          TabBar(
            tabs: [
              Tab(text: "Informações"),
              Tab(text: "Descrição"),
              if(hasFormador) Tab(text: "Formador"),
            ],
          ),
          SizedBox(
            height: screenHeight - 550, 
            child: TabBarView(
              children: [
                //Informaçoes
                ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Datas de inscrição: ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        Text(formatDateRange(DateTime.parse(curso['data_inicio_inscricao']), DateTime.parse(curso['data_fim_inscricao'])), style: TextStyle(fontSize: 15), textAlign: TextAlign.justify),
                        SizedBox(height: 5,),
                        Text('Datas de curso: ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        Text(formatDateRange(DateTime.parse(curso['data_inicio_curso']), DateTime.parse(curso['data_fim_curso'])), style: TextStyle(fontSize: 15), textAlign: TextAlign.justify),
                        SizedBox(height: 5,),
                        Text('Categoria/Área/Tópico: ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        Text("${curso['id_topico_topico']?['id_area_area']?['id_categoria_categorium']?['nome_cat']}/${curso['id_topico_topico']?['id_area_area']?['nome_area']}/${curso['id_topico_topico']?['nome_topico']}", style: TextStyle(fontSize: 15)),
                        SizedBox(height: 5,),
                        Text('Idioma: ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        Text("${curso['idioma']}", style: TextStyle(fontSize: 15), textAlign: TextAlign.justify),
                      ],
                    ),  
                  ),
                ]),
                //descricao
                ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 5,),
                        Text("Descrição de curso", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        SizedBox(height: 10,),
                        Text("${curso['descricao_curso']}", style: TextStyle(fontSize: 15), textAlign: TextAlign.justify,), 
                      ],
                    ) 
                  ),
                ]),
                //formador
                if (hasFormador)
                ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            ClipOval(
                              child: Image.network(
                                (curso['img_perfil'] != null && curso['img_perfil'].toString().isNotEmpty)
                                  ? 'https://softskills-api.onrender.com/${curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['img_perfi']}' 
                                  : 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['nome_util'])}&background=random&bold=true',
                                fit: BoxFit.cover,
                                errorBuilder: (context, error, stackTrace) {
                                  final fallbackImg = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['nome_util'])}&background=random&bold=true';
                                  return Image.network(
                                    fallbackImg,
                                    height: 135,
                                    width: double.infinity,
                                    fit: BoxFit.cover,
                                  );
                                },
                              ) 
                            ),
                            SizedBox(width: 15,),
                            Text("${curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['nome_util']}", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))
                          ],
                        ),
                        SizedBox(height: 5,),
                        Text("${curso['sincrono']?['id_formador_formadore']?['descricao_formador']}", style: TextStyle(fontSize: 15), textAlign: TextAlign.justify,),      
                      ],
                    ),
                  ),
                ]),
              ],
            ),
          )
        ],
      ),
    );
  }
}
