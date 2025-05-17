import 'export.dart';

class AppBarArrow extends StatelessWidget implements PreferredSizeWidget {
  const AppBarArrow({super.key, required this.title, required this.onBack});

  final String title;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: IconButton(
        icon: const Icon(Icons.arrow_back),
        color: Colors.white,
        onPressed: onBack,
      ),
      title: Text(title, style: TextStyle(color: Colors.white)),
      centerTitle: true,
      backgroundColor: AppColors.primary,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
