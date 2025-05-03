import 'export.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      backgroundColor: AppColors.primary,
      type: BottomNavigationBarType.fixed,
      unselectedItemColor: Colors.white,
      selectedItemColor: AppColors.secondary,
      selectedLabelStyle: AppTextStyles.body,
      unselectedLabelStyle: AppTextStyles.body,
      items: const <BottomNavigationBarItem> [
        BottomNavigationBarItem(
          icon: Icon(Ionicons.home_outline), 
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Ionicons.chatbubble_ellipses_outline),
          label: 'Fórum',
        ),
        BottomNavigationBarItem(
          icon: Icon(Ionicons.school_outline),
          label: 'Cursos',
        ),
        BottomNavigationBarItem(
          icon: Icon(Ionicons.notifications_outline),
          label: 'Notificações',
        ),
        BottomNavigationBarItem(
          icon: Icon(Ionicons.person_outline),
          label: 'Perfil',
        ),
      ] 
    );
  }

}