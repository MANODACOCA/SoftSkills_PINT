import 'package:mobile/ui/forum/widget/forum.dart';
import 'package:mobile/ui/notification/widget/notifications.dart';

import '../ui/home/widgets/homepage.dart';
import '../ui/login/widget/alterarpassword.dart';
import '../ui/login/widget/confirm_2fa.dart';
import '../ui/login/widget/forgetpassword.dart';
import '../ui/login/widget/return_login.dart';
//import 'primeirologin.dart';
import '../ui/login/widget/registar.dart';
//import 'confirm_criar_conta.dart';
import '../ui/login/widget/success.dart';
import 'package:mobile/ui/login/widget/loginpage.dart';
import 'package:go_router/go_router.dart';
import '../ui/login/widget/page_open_app.dart';
import 'package:mobile/ui/profile/widget/profile_screen.dart';
import 'package:mobile/ui/profile/widget/change_personal_info.dart';
import 'package:mobile/ui/profile/widget/see_info_profile.dart';
import '../ui/profile/widget/logout_all_devices.dart';
import '../ui/profile/widget/activate_twofa.dart';

final rotas = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      name: 'initial',
      path: '/',
      builder: (context, state) => const MyHomePage(),
    ),
    GoRoute(
      name: 'loginpage',
      path: '/login',
      builder: (context, state) => LoginPage(),
    ),
    GoRoute(
      name: 'firstlogin',
      path: '/firstlogin',
      builder: (context, state) => LoginPage(),
    ),
    GoRoute(
      name: 'forgetpassword',
      path: '/forgetpassword',
      builder: (context, state) => ForgetPassword(),
    ),
    GoRoute(
      name: 'confirmacao',
      path: '/confirmacao',
      builder: (context, state) => TwoFactorAuthentication(),
    ),
    GoRoute(
      name: 'alterarpassword',
      path: '/alterarpassword',
      builder: (context, state) => ChangePassword(),
    ),
    GoRoute(
      name: 'check',
      path: '/check',
      builder: (context, state) {
        final data = state.extra as CheckmarkData;
        return CheckmarkScreen(path: data.path, message: data.message);
      },
    ),
    GoRoute(
      name: 'registo',
      path: '/registo',
      builder: (context, state) => Register(),
    ),
    GoRoute(
      name: 'twofa',
      path: '/twofa',
      builder: (context, state) => TwoFactorAuthentication(),
    ),
    GoRoute(
      name: 'homepage',
      path: '/homepage',
      builder: (context, state) => HomePage(),
    ),
    GoRoute(
      name: 'return',
      path: '/returnLogin',
      builder: (context, state) => ReturnLogin(),
    ),
    GoRoute(
      name: 'profile',
      path: '/profile',
      builder: (context, state) => Profile(),
    ),
    GoRoute(
      name: 'notificacoes',
      path: '/notificacoes',
      builder: (context, state) => Notification(),
    ),
    GoRoute(
      name: 'forum',
      path: '/forum',
      builder: (context, state) => Forum(),
    ),
    GoRoute(
      name: 'alterarInformacoes',
      path: '/alterarInformacoes',
      builder: (context, state) => ChangePersonalInfo(),
    ),
    GoRoute(
      name: 'seeinfoprofile',
      path: '/seeinfoprofile',
      builder: (context, state) => SeeInfoProfile(),
    ),
    GoRoute(
      name: 'logoutAllDevices',
      path: '/logoutAllDevices',
      builder: (context, state) => LogOut(),
    ),
    GoRoute(
      name: 'changePassword',
      path: '/changePassword',
      builder: (context, state) => ChangePassword(),
    ),
    GoRoute(
      name: 'activateTwofa',
      path: '/activateTwofa',
      builder: (context, state) => TwoFactorActivate(),
    )
  ],
);
