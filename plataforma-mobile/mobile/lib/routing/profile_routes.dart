import 'package:go_router/go_router.dart';
import 'package:mobile/ui/profile/widget/change_personal_info.dart';
//import 'package:mobile/ui/profile/widget/gerir_notification.dart';
import 'package:mobile/ui/profile/widget/info_change_pass.dart';
//import 'package:mobile/ui/profile/widget/logout_all_devices.dart';
import 'package:mobile/ui/profile/widget/privacy_politics.dart';
import 'package:mobile/ui/profile/widget/profile_screen.dart';
import 'package:mobile/ui/profile/widget/see_info_profile.dart';
import 'package:mobile/ui/profile/widget/support.dart';

final List<GoRoute> profileRoutes = [
  GoRoute(
    path: '/profile',
    builder: (context, state) {
    return Profile();
    },
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
/*  GoRoute(
    name: 'logoutAllDevices',
    path: '/logoutAllDevices',
    builder: (context, state) => LogOut(),
 ), */ 
  GoRoute(
    name: 'changeinfopass',
    path: '/changeinfopass',
    builder: (context, state) => ChangeInfoPassword(idUser: state.extra as String),
  ),
  GoRoute(
    name: 'privacypolitics',
    path: '/privacypolitics',
    builder: (context, state) => PrivacyPolitics(),
  ),
  GoRoute(
    name: 'support',
    path: '/support',
    builder: (context, state) => Support(),
  ),
  /* GoRoute(
    name: 'notificacoes',
    path: '/notificacoes',
    builder: (context, state) => Notification(),
  ), */
  /* GoRoute(
    name: 'gerirnotification',
    path: '/gerirnotification',
    builder: (context, state) => GerirNotification(),
  ), */
];