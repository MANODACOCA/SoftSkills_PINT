import 'package:go_router/go_router.dart';
import 'package:mobile/ui/pages/login/widget/change_forgot_pass.dart';
import 'package:mobile/ui/pages/login/widget/confirm_to_change_pass.dart';
import 'package:mobile/ui/pages/login/widget/forgetpassword.dart';
import 'package:mobile/ui/pages/login/widget/loginpage.dart';
import 'package:mobile/ui/pages/login/widget/primeirologin.dart';
import 'package:mobile/ui/pages/login/widget/registar.dart';

final List<GoRoute> loginRoutes = [
  GoRoute(
      name: 'loginpage',
      path: '/login',
      builder: (context, state) => LoginPage(),
    ),
    GoRoute(
      name: 'firstlogin',
      path: '/firstlogin',
      builder: (context, state) => FirstLogin(),
    ),
    GoRoute(
      name: 'forgetpassword',
      path: '/forgetpassword',
      builder: (context, state) => ForgetPassword(),
    ),
    GoRoute(
      name: 'confirmacao',
      path: '/confirmacao',
      builder: (context, state) => ConfirmAccountScreen(),
    ),
    // GoRoute(
    //   name: 'alterarpassword',
    //   path: '/alterarpassword',
    //   builder: (context, state) => ChangePassword(),
    // ),
    GoRoute(
      name: 'registo',
      path: '/registo',
      builder: (context, state) => Register(),
    ),
    // GoRoute(
    //   name: 'twofa',
    //   path: '/twofa',
    //   builder: (context, state) => TwoFactorAuthentication(),
    // ),
    // GoRoute(
    //   name: 'check',
    //   path: '/check',
    //   builder: (context, state) {
    //     final data = state.extra as CheckmarkScreen;
    //     return CheckmarkScreen(path: data.path, message: data.message);
    //   },
    // ),
    // GoRoute(
    //   name: 'return',
    //   path: '/returnLogin',
    //   builder: (context, state) => ReturnLogin(),
    // ),
    // GoRoute(
    //   name: 'changePassword',
    //   path: '/changePassword',
    //   builder: (context, state) => ChangePassword(),
    // ),
    // GoRoute(
    //   name: 'activateTwofa',
    //   path: '/activateTwofa',
    //   builder: (context, state) => TwoFactorActivate(idUser: state.extra as String),
    // ),
    // GoRoute(
    //   name: 'createPassword',
    //   path: '/createPassword',
    //   builder: (context, state) => CreatePassword(email: state.extra as String),
    // ),
    GoRoute(
      name: 'changeforgotpass',
      path: '/changeforgotpass',
      builder: (context, state) => ChangePasswordForget(),
    ),
];