import 'package:go_router/go_router.dart';
import 'export.dart';

class Footer extends StatefulWidget {
  const Footer({super.key});

  @override
  State<Footer> createState() => _FooterState();
}

class _FooterState extends State<Footer> {
  int _currentIndex = 0;

  void _onTap(int index) {
    setState(() {
      _currentIndex = index;
    });
    switch (index) {
      case 0:
        context.go("/homepage");
        break;
      case 1:
        context.go("/forum");
        break;
      case 2:
        context.go("/cursos");
        break;
      case 3:
        context.go("/notificacoes");
        break;
      case 4:
        context.go('/profile');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _currentIndex,
      backgroundColor: AppColors.primary,
      type: BottomNavigationBarType.fixed,
      unselectedItemColor: Colors.white,
      selectedItemColor: AppColors.secondary,
      selectedLabelStyle: AppTextStyles.body,
      unselectedLabelStyle: AppTextStyles.body,
      onTap: _onTap,
      items: const <BottomNavigationBarItem>[
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
      ],
    );
  }
}
