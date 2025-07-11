import 'package:mobile/ui/core/shared/aulas/card_aceder_aula.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/conteudos/conteudo_scroll.dart';
import '../../core/shared/export.dart';

class AulaSyncPage extends StatefulWidget{
  const AulaSyncPage({super.key, required this.aulas});
  
  final Map<String, dynamic> aulas;

  @override
  State<AulaSyncPage> createState() => _AulaSyncPageState();
}

class _AulaSyncPageState extends State<AulaSyncPage> {

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBarArrow(
        onBack: () => context.pop(),
        title: widget.aulas['nome_aula'],
      ),
      body: Column(
        children: [
          SizedBox(height: 10,),
          Container(
            width: double.infinity,
            padding: EdgeInsets.symmetric(horizontal: 10),
            child: Text(
              'Link Aula',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
          ),
          SizedBox(height: 15,),
          CardAcederAula(aula: widget.aulas),
          SizedBox(height: 20,),
          Container(
            width: double.infinity,
            padding: EdgeInsets.symmetric(horizontal: 10),
            child: Text(
              'Conteúdos',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
          ),
          SizedBox(height: 15,),
          Expanded(
            child: ConteudoScroll(conteudos: widget.aulas['conteudos']),
          ),
        ],
      ),
    );
  }
}