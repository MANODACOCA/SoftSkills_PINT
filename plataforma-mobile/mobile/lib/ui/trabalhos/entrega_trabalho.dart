import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:mobile/ui/core/shared/base_comp/text_expand.dart';
import 'package:mobile/ui/core/shared/trabalhos/box_submit_trab.dart';
import 'package:mobile/ui/core/shared/trabalhos/card_enunciado.dart';
import '../core/shared/export.dart';

class EntregaTrabalho extends StatefulWidget {
    const EntregaTrabalho({super.key, required this.trabalho});

    final Map<String, dynamic> trabalho;

    @override
    State<EntregaTrabalho> createState() => _EntregaTrabalhoState();
}

class _EntregaTrabalhoState extends State<EntregaTrabalho> {
    @override
    Widget build(BuildContext context) {
        return AppScaffold(
            appBar: AppBarArrow(title: widget.trabalho['nome_tr'], onBack: () => context.pop()),
            body: Column(
                children: [
                    SizedBox(height: 10,),
                    Container(
                        width: double.infinity,
                        padding: EdgeInsets.symmetric(horizontal: 10),
                        child: Text(
                        'Descrição',
                        style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                        ),
                    ),
                    SizedBox(height: 10,),
                    Container(
                        padding: EdgeInsets.symmetric(horizontal: 10),
                        width: double.infinity,
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                                TextExpand(text: widget.trabalho['descricao_tr'],),  
                            ],
                        ), 
                    ),
                    SizedBox(height: 20,),
                    CardEnunciado(enunciado: widget.trabalho),
                    SizedBox(height: 20,),
                    Container(
                        width: double.infinity,
                        padding: EdgeInsets.symmetric(horizontal: 10),
                        child: Text(
                        'Entrega',
                        style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                        ),
                    ),
                    SizedBox(height: 15,),
                    BoxSubmitTrab(idCurso: widget.trabalho['id_curso_tr'],idTrabalho: widget.trabalho['id_trabalho'],),
                ],
            ),
        );
    }
}