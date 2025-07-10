import '../export.dart';
import 'dropdown_component.dart';

class DropdownFilterForum extends StatefulWidget {
  const DropdownFilterForum({super.key , required this.onApply, required this.parametro});
  final void Function({String? ordem}) onApply;
  final String parametro;
  static void show(BuildContext context, void Function({String? ordem}) onApply, String parametro) {
    showGeneralDialog(
      context: context,
      barrierLabel: 'Fechar',
      barrierDismissible: true,
      barrierColor: Color.fromARGB(150, 0, 0, 0),
      transitionDuration: Duration(milliseconds: 300),
      pageBuilder: (context, animation, secondaryAnimation) {
        return Stack(
          children: [
            GestureDetector(
              onTap: () => Navigator.of(context).pop(),
              child: Container(color: Colors.transparent),
            ),
            Align(
              alignment: Alignment.topCenter,
              child: SafeArea(
                child: Material(
                  color: Colors.transparent,
                  child: DropdownFilterForum(onApply: onApply, parametro: parametro),
                ),
              ),
            ),
          ],
        );
      },
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(opacity: animation, child: child);
      },
    );
  }

  @override
  State<DropdownFilterForum> createState() => _DropdownFilterForumState();
}

class _DropdownFilterForumState extends State<DropdownFilterForum> {
  List<String> ordemLista = [];
  String? selectedOrdem;

  @override
  void initState() {
    super.initState();
    _forumPost(widget.parametro);
  }

  void _forumPost(String param) {
    if(param == 'Forum') {
      ordemLista = ['Mais Recentes', 'Mais Antigos'];
    } else{
      ordemLista = ['Mais Recentes', 'Mais Antigos', 'Mais Populares'];
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Container(
      width: screenWidth,
      padding: EdgeInsets.symmetric(horizontal: 20, vertical: 30),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(15),
          bottomRight: Radius.circular(15),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(height: 15),
          Align(
            alignment: Alignment.centerLeft,
            child: Text('Ordenar por:', style: TextStyle(fontWeight: FontWeight.w600)),
          ),
          SizedBox(height: 15),
          DropdownComponent(
            key: ValueKey('ordem-$selectedOrdem'),
            type: 'Ordenar por',
            items: ordemLista,
            value: selectedOrdem,
            onChanged: (value) => setState(() => selectedOrdem = value),
          ),
          const SizedBox(height: 30),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              fixedSize: Size(screenWidth - 40, 46),
            ),
            onPressed: () {
              final ordem = (selectedOrdem == null) ? null : selectedOrdem;
              widget.onApply(ordem: ordem);
              Navigator.of(context).pop();
            },
            child: const Text('Aplicar', style: TextStyle(color: Colors.white)),
          ),
          const SizedBox(height: 15),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              fixedSize: Size(screenWidth - 40, 46),
            ),
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancelar', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}
