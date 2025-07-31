import 'package:go_router/go_router.dart';
import 'package:mobile/ui/pages/login/widget/change_forgot_pass.dart';
import 'package:mobile/ui/pages/login/widget/check_two_fa.dart';
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
    GoRoute(
      name: 'registo',
      path: '/registo',
      builder: (context, state) => Register(),
    ),
    GoRoute(
      name: 'changeforgotpass',
      path: '/changeforgotpass',
      builder: (context, state) => ChangePasswordForget(),
    ),
    GoRoute(
      name: 'twofauten',
      path: '/twofauten',
      builder: (context, state) => ConfirmTwoFaScreen(id: (state.extra as String?) ?? ''),
    ),
];