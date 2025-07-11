import 'package:mobile/ui/core/shared/aulas/aula_youtube.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/conteudos/conteudo_scroll.dart';
import '../../core/shared/export.dart';

class AulaAsyncPage extends StatefulWidget{
  const AulaAsyncPage({super.key, required this.aulas});
  
  final Map<String, dynamic> aulas;

  @override
  State<AulaAsyncPage> createState() => _AulaAsyncPageState();
}

class _AulaAsyncPageState extends State<AulaAsyncPage> {

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBarArrow(
        onBack: () => context.pop(),
        title: widget.aulas['nome_aula'],
      ),
      body: Column(
        children: [
          SizedBox(
            height: 220,
            child: AulaVideoPlayer(videoUrl: widget.aulas['caminho_url']),
          ),
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