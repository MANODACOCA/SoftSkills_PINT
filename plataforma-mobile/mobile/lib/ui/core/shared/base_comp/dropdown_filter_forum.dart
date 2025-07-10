import '../export.dart';
import 'dropdown_component.dart';

class DropdownFilterForum extends StatefulWidget {
  const DropdownFilterForum({super.key , required this.onApply});
  final void Function({String? ordem}) onApply;

  static void show(BuildContext context, void Function({String? ordem}) onApply) {
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
                  child: DropdownFilterForum(onApply: onApply,),
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
  final List<String> ordem = ['Mais Recentes', 'Mais Antigos'];
  //final ForumAPI _forumApi = ForumAPI();
  String? selectedOrdem;


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
            items: ordem,
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
