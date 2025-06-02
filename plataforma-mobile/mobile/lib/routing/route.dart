import 'package:mobile/ui/course_assync/widget/course_assync_screen.dart';
import 'package:mobile/ui/course_sync/widget/course_sync_screen.dart';
import 'package:mobile/ui/forum/widget/comment_page.dart';
import 'package:mobile/ui/forum/widget/forum.dart';
import '../ui/home/widgets/homepage.dart';
import '../ui/login/widget/alterarpassword.dart';
import '../ui/login/widget/confirm_2fa.dart';
import '../ui/login/widget/forgetpassword.dart';
import '../ui/login/widget/return_login.dart';
import '../ui/login/widget/registar.dart';
import '../ui/login/widget/success.dart';
import 'package:mobile/ui/login/widget/loginpage.dart';
import 'package:go_router/go_router.dart';
import '../ui/login/widget/page_open_app.dart';
import 'package:mobile/ui/profile/widget/profile_screen.dart';
import 'package:mobile/ui/profile/widget/change_personal_info.dart';
import 'package:mobile/ui/profile/widget/see_info_profile.dart';
import '../ui/profile/widget/logout_all_devices.dart';
import '../ui/profile/widget/activate_twofa.dart';
import '../ui/login/widget/create_password.dart';
import '../ui/login/widget/confirm_to_change_pass.dart';
import '../ui/login/widget/change_forgot_pass.dart';
import '../ui/profile/widget/courser_joined.dart';
import '../ui/profile/widget/info_change_pass.dart';
import '../ui/profile/widget/ended_courses.dart';
import '../ui/profile/widget/rated_courses.dart';
import '../ui/profile/widget/unrated.dart';
import '../ui/profile/widget/gerir_notification.dart';
import '../ui/profile/widget/support.dart';
import '../ui/profile/widget/privacy_politics.dart';
import '../ui/profile/widget/liked_coursed.dart';
import '../ui/forum/widget/forum_page.dart';

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
      builder: (context, state) => ConfirmAccountScreen(),
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
    /* GoRoute(
      name: 'notificacoes',
      path: '/notificacoes',
      builder: (context, state) => Notification(),
    ), */
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
    ),
    GoRoute(
      name: 'createPassword',
      path: '/createPassword',
      builder: (context, state) => CreatePassword(),
    ),
    GoRoute(
      name: 'changeforgotpass',
      path: '/changeforgotpass',
      builder: (context, state) => ChangePasswordForget(),
    ),
    GoRoute(
      name: 'coursejoined',
      path: '/coursejoined',
      builder: (context, state) => CourserJoined(),
    ),
    GoRoute(
      name: 'Assync',
      path: '/assync',
      builder: (context, state) {
        final title = state.extra as String;
        return Assincrono(title: title);
      },
    ),
    GoRoute(
      name: 'Sync',
      path: '/sync',
      builder: (context, state) {
        final title = state.extra as String;
        return Sincrono(title: title);
      },
    ),
    GoRoute(
      name: 'changeinfopass',
      path: '/changeinfopass',
      builder: (context, state) => ChangeInfoPassword(),
    ),
    GoRoute(
      name: 'endedcourses',
      path: '/endedcourses',
      builder: (context, state) => EndedCourses(),
    ),
    GoRoute(
      name: 'ratedcourses',
      path: '/ratedcourses',
      builder: (context, state) => RateCourses(),
    ),
    GoRoute(
      name: 'unratedcourses',
      path: '/unratedcourses',
      builder: (context, state) => UnratedCourses(),
    ),
    GoRoute(
      name: 'gerirnotification',
      path: '/gerirnotification',
      builder: (context, state) => GerirNotification(),
    ),
    GoRoute(
      name: 'support',
      path: '/support',
      builder: (context, state) => Support(),
    ),
    GoRoute(
      name: 'privacypolitics',
      path: '/privacypolitics',
      builder: (context, state) => PrivacyPolitics(),
    ),
    GoRoute(
      name: 'likedcourses',
      path: '/likedcourses',
      builder: (context, state) => LikedCourses(),
    ),
    GoRoute(
      name: 'forumPage',
      path: '/forumPage',
      builder: (context, state) {
        final forumName = state.extra as String;
        return ForumPage(forumName: forumName);
      },
    ),
  ],
);