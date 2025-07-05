import 'package:go_router/go_router.dart';
import 'package:mobile/ui/aulas/aula_async_page.dart';
import 'package:mobile/ui/aulas/aula_sync_page.dart';
import 'package:mobile/ui/course/course_screen_inscrever.dart';
import 'package:mobile/ui/course/courses.dart';
//import 'package:mobile/ui/course/course_assync/widget/course_assync_inscrito.dart';
import 'package:mobile/ui/course/course_inscrito.dart';
/* import 'package:mobile/ui/profile/widget/courser_joined.dart';
import 'package:mobile/ui/profile/widget/ended_courses.dart';
//import 'package:mobile/ui/profile/widget/liked_coursed.dart';
import 'package:mobile/ui/profile/widget/rated_courses.dart';
import 'package:mobile/ui/profile/widget/unrated.dart'; */
import 'package:mobile/ui/course/course_enrolled.dart';
import 'package:mobile/ui/course/courses_completed.dart';

final List<GoRoute> cursosRoutes = [
  GoRoute(
    name: 'cursos',
    path: '/cursos',
    builder: (context, state) => Courses(),
  ),
  GoRoute(
    name: 'cursos-inscritos',
    path: '/cursos-inscritos',
    builder: (context, state) => CourseInscrito(idCurso: state.extra as int),
  ),
  GoRoute(
    name: 'cursos-completed',
    path: '/cursos-completed',
    builder: (context, state) => CoursesCompleted(),
  ),
  GoRoute(
    name: 'list-cursos-inscrito',
    path: '/list-cursos-inscrito',
    builder: (context, state) => CourseEnrolled(),
  ),
  GoRoute(
    name: 'Inscrever',
    path: '/inscrever',
    builder: (context, state) {
      return Inscrever(idCurso: state.extra as int);
    },
  ),

  //aulas
  GoRoute(
    name: 'aulas-async',
    path: '/aulas-async',
    builder: (context, state) => AulaAsyncPage(aulas: state.extra as Map<String,dynamic>),
  ),
  GoRoute(
    name: 'aulas-sync',
    path: '/aulas-sync',
    builder: (context, state) => AulaSyncPage(aulas: state.extra as Map<String,dynamic>),
  ),
  /* GoRoute(
    name: 'endedcourses',
    path: '/endedcourses',
    builder: (context, state) => EndedCourses(),
  ), */
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
    name: 'coursejoined',
    path: '/coursejoined',
    builder: (context, state) => CourserJoined(),
  ), */
  /* GoRoute(
    name: 'likedcourses',
    path: '/likedcourses',
    builder: (context, state) => LikedCourses(),
  ), */
];