import '../export.dart';
import 'card_aulas.dart';

class AulasScroll extends StatefulWidget {
  const AulasScroll({super.key, required this.aulas, required this.sincrono});

  final List<Map<String, dynamic>> aulas;
  final bool sincrono;

  @override
  State<AulasScroll> createState() => _AulasScrollState();
}

class _AulasScrollState extends State<AulasScroll> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.aulas.isEmpty) {
      return Container(
        padding: EdgeInsets.all(12),
        width: double.infinity,
        child: Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Este curso ainda não tem nenhuma aula...',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey),
            ),
          ),
        ),
      );
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
        height: 280,
          child: ListView.builder(
            controller: _scrollController,
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemCount: widget.aulas.length,
            itemBuilder: (context, index) {
              final aula = widget.aulas[index];
              return Container(
                width: 200,
                margin: EdgeInsets.symmetric(horizontal: 5),
                child: CardAula(aulas: aula, sincrono: widget.sincrono,)
              );
            },
          ),
        )
      ]
    );
  }
}

  