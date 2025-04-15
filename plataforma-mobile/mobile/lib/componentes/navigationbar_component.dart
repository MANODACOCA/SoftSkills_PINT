import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      backgroundColor: Color(0XFF0D47A1),
      type: BottomNavigationBarType.fixed,
      unselectedItemColor: Colors.white,
      selectedItemColor: Color(0xFF00AEEF),
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