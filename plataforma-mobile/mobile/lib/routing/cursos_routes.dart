import 'package:go_router/go_router.dart';
import 'package:mobile/ui/pages/aulas/aula_async_page.dart';
import 'package:mobile/ui/pages/aulas/aula_sync_page.dart';
import 'package:mobile/ui/pages/course/course_screen_inscrever.dart';
import 'package:mobile/ui/pages/course/courses.dart';
//import 'package:mobile/ui/course/course_assync/widget/course_assync_inscrito.dart';
import 'package:mobile/ui/pages/course/course_screen_inscrito.dart';
/* import 'package:mobile/ui/profile/widget/courser_joined.dart';
import 'package:mobile/ui/profile/widget/ended_courses.dart';
//import 'package:mobile/ui/profile/widget/liked_coursed.dart';
import 'package:mobile/ui/profile/widget/rated_courses.dart';
import 'package:mobile/ui/profile/widget/unrated.dart'; */
import 'package:mobile/ui/pages/course/course_enrolled.dart';
import 'package:mobile/ui/pages/course/courses_completed.dart';
import 'package:mobile/ui/pages/trabalhos/entrega_trabalho.dart';

final List<GoRoute> cursosRoutes = [
  GoRoute(
    name: 'cursos',
    path: '/cursos',
    pageBuilder: (context, state) => NoTransitionPage(
        child: Courses(),
      ),
    //builder: (context, state) => Courses(),
  ),
  GoRoute(
    name: 'cursos-inscritos',
    path: '/cursos-inscritos',
    pageBuilder: (context, state) => NoTransitionPage(
      child: CourseInscrito(idCurso: state.extra as int),
    ),
    //builder: (context, state) => CourseInscrito(idCurso: state.extra as int),
  ),
  GoRoute(
    name: 'cursos-completed',
    path: '/cursos-completed',
    pageBuilder: (context, state) => NoTransitionPage(
      child: CoursesCompleted(),
    ),
    //builder: (context, state) => CoursesCompleted(),
  ),
  GoRoute(
    name: 'list-cursos-inscrito',
    path: '/list-cursos-inscrito',
    pageBuilder: (context, state) => NoTransitionPage(
      child: CourseEnrolled(),
    ),
    //builder: (context, state) => CourseEnrolled(),
  ),
  GoRoute(
    name: 'Inscrever',
    path: '/inscrever',
    pageBuilder: (context, state) => NoTransitionPage(
      child: Inscrever(idCurso: state.extra as int),
    ),
    //builder: (context, state) { return Inscrever(idCurso: state.extra as int); },
  ),

  //aulas
  GoRoute(
    name: 'aulas-async',
    path: '/aulas-async',
    pageBuilder: (context, state) => NoTransitionPage(
      child: AulaAsyncPage(aulas: state.extra as Map<String,dynamic>),
    ),
    //builder: (context, state) => AulaAsyncPage(aulas: state.extra as Map<String,dynamic>),
  ),
  GoRoute(
    name: 'aulas-sync',
    path: '/aulas-sync',
    pageBuilder: (context, state) => NoTransitionPage(
      child: AulaSyncPage(aulas: state.extra as Map<String,dynamic>),
    ),
    //builder: (context, state) => AulaSyncPage(aulas: state.extra as Map<String,dynamic>),
  ),
  GoRoute(
    name: 'inserir-trabalho',
    path: '/inserir-trabalho',
    pageBuilder: (context, state) => NoTransitionPage(
      child: EntregaTrabalho(trabalho: state.extra as Map<String, dynamic>,),
    ),
    //builder: (context, state) => EntregaTrabalho(trabalho: state.extra as Map<String, dynamic>,),
  ),
  /* GoRoute(
    name: 'ratedcourses',
    path: '/ratedcourses',
    builder: (context, state) => RateCourses(),
  ), */
  /* GoRoute(
    name: 'unratedcourses',
    path: '/unratedcourses',
    builder: (context, state) => UnratedCourses(),
  ), */
  /* GoRoute(
    name: 'likedcourses',
    path: '/likedcourses',
    builder: (context, state) => LikedCourses(),
  ), */
];