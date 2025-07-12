import 'package:go_router/go_router.dart';
import 'package:mobile/ui/pages/profile/widget/change_personal_info.dart';
//import 'package:mobile/ui/profile/widget/gerir_notification.dart';
import 'package:mobile/ui/pages/profile/widget/info_change_pass.dart';
//import 'package:mobile/ui/profile/widget/logout_all_devices.dart';
import 'package:mobile/ui/pages/profile/widget/privacy_politics.dart';
import 'package:mobile/ui/pages/profile/widget/profile_screen.dart';
import 'package:mobile/ui/pages/profile/widget/see_info_profile.dart';
import 'package:mobile/ui/pages/profile/widget/support.dart';

final List<GoRoute> profileRoutes = [
  GoRoute(
    path: '/profile',
    pageBuilder: (context, state) => NoTransitionPage(
      child: Profile(),
    ),
  ),
    GoRoute(
    name: 'alterarInformacoes',
    path: '/alterarInformacoes',
    pageBuilder: (context, state) => NoTransitionPage(
      child: ChangePersonalInfo(),
    ),
  ),
  GoRoute(
    name: 'seeinfoprofile',
    path: '/seeinfoprofile',
    pageBuilder: (context, state) => NoTransitionPage(
      child: SeeInfoProfile(),
    ),
  ),

  GoRoute(
    name: 'changeinfopass',
    path: '/changeinfopass',
    pageBuilder: (context, state) => NoTransitionPage(
      child: ChangeInfoPassword(idUser: state.extra as String),
    ),
  ),
  GoRoute(
    name: 'privacypolitics',
    path: '/privacypolitics',
    pageBuilder: (context, state) => NoTransitionPage(
      child: PrivacyPolitics(),
    ),
  ),
  GoRoute(
    name: 'support',
    path: '/support',
    pageBuilder: (context, state) => NoTransitionPage(
      child: Support(),
    ),
  ),
];