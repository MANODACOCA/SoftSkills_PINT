import 'package:go_router/go_router.dart';
import '../export.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  int _locationToIndex(String location){
  if(location.startsWith('/homepage')) return 0;
  if(location.startsWith('/forum')) return 1;
  if(location.startsWith('/cursos')) return 2;
/*   if(location.startsWith('/notificacoes')) return 3; */
  if(location.startsWith('/profile')) return 3;
  return 0;
}

  void _onTap(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go('/homepage');
        break;
      case 1:
        context.go('/forum');
        break;
      case 2:
        context.go('/cursos');
        break;
      /* case 3:
        context.go("/notificacoes");
        break; */
      case 3:
        context.go('/profile');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final location = GoRouterState.of(context).uri.toString();
    final currentIndex = _locationToIndex(location);
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: (index) => _onTap(context, index),
      backgroundColor: AppColors.primary,
      type: BottomNavigationBarType.fixed,
      unselectedItemColor: Colors.white,
      selectedItemColor: AppColors.secondary,
      selectedLabelStyle: AppTextStyles.body,
      unselectedLabelStyle: AppTextStyles.body,
      items: const [
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
        /* BottomNavigationBarItem(
          icon: Icon(Ionicons.notifications_outline),
          label: 'Notificações',
        ), */
        BottomNavigationBarItem(
          icon: Icon(Ionicons.person_outline),
          label: 'Perfil',
        ),
      ],
    );
  }
}
