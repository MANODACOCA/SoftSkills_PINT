import '../export.dart';

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
      title: Text(
          title,
          style: const TextStyle(color: Colors.white, fontSize: 18),
          maxLines: 2, 
          overflow: TextOverflow.ellipsis, 
          textAlign: TextAlign.center,
        ),
      centerTitle: true,
      actions: const [
        SizedBox(width: kToolbarHeight),
      ],
      backgroundColor: AppColors.primary,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
