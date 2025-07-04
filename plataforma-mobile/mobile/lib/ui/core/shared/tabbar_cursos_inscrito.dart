import 'package:mobile/ui/core/shared/card_aulas.dart';

import 'export.dart';
import '../../../utils/uteis.dart';

class TabbarCoursesInscrito extends StatelessWidget {
  const TabbarCoursesInscrito({super.key, required this.curso});

  final Map<String, dynamic> curso;

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    DateTime agora = DateTime.now();
    final bool hasFormador = curso['sincrono'] != null;
    final imgPerfil = curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['img_perfi'];
    final nomeFormador = curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['nome_util'];
    print('Imagem do formador: $imgPerfil');
    return DefaultTabController(
      length: 4,
      child: Column(
        children: [
          TabBar(
            tabs: [
              hasFormador ? Tab(child: Text("Material\napoio", textAlign: TextAlign.center,),) : Tab(text: "Aulas"),
              hasFormador ? Tab(text: "Eventos") : Tab(child: Text("Material\napoio", textAlign: TextAlign.center,),),
              hasFormador ? Tab(text: "Sobre") : Tab(text: "Eventos"),
              hasFormador ? Tab(text: "Formador") : Tab(text: "Sobre"),
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
                        CardAula(aulas :{'title': 'Nome Aula', 'duracao': {'horas': 3, 'minutes': 5}, 'caminho': 'url', 'data': agora}),
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
                        Text('Datas de inscrição: ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        Text(formatDateRange(DateTime.parse(curso['data_inicio_inscricao']), DateTime.parse(curso['data_fim_inscricao'])), style: TextStyle(fontSize: 15), textAlign: TextAlign.justify),
                        SizedBox(height: 5,),
                      ],
                    ),  
                  ),
                ]),
                //Sobre
                //Eventos
                hasFormador 
                ? ListView(children: [
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
                ])
                : ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 5,),
                        Text("Eventos", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        SizedBox(height: 10,),
                        Text("${curso['descricao_curso']}", style: TextStyle(fontSize: 15), textAlign: TextAlign.justify,), 
                      ],
                    ) 
                  ),
                ]),
                
                //formador
                hasFormador
                ? ListView(children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 5, vertical: 10),
                    child: Column(
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
                                Text("${curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['nome_util']}", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold), textAlign: TextAlign.left,),
                                Text('${curso['sincrono']?['id_formador_formadore']?['id_formador_utilizador']?['email']}', textAlign: TextAlign.left,),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(height: 5,),
                        Text("${curso['sincrono']?['id_formador_formadore']?['descricao_formador']}", style: TextStyle(fontSize: 15), textAlign: TextAlign.left,),      
                      ],
                    ),
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
                        Text("${curso['descricao_curso']}", style: TextStyle(fontSize: 15), textAlign: TextAlign.justify,), 
                      ],
                    ) 
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
