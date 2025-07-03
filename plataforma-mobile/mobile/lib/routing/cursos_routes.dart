import 'package:go_router/go_router.dart';
import 'package:mobile/ui/course/courses.dart';
import 'package:mobile/ui/course_assync/widget/course_assync_inscrito.dart';
import 'package:mobile/ui/course_assync/widget/course_assync_screen.dart';
import 'package:mobile/ui/course_sync/widget/course_sync_inscrito.dart';
import 'package:mobile/ui/course_sync/widget/course_sync_screen.dart';
import 'package:mobile/ui/profile/widget/courser_joined.dart';
import 'package:mobile/ui/profile/widget/ended_courses.dart';
//import 'package:mobile/ui/profile/widget/liked_coursed.dart';
import 'package:mobile/ui/profile/widget/rated_courses.dart';
import 'package:mobile/ui/profile/widget/unrated.dart';

final List<GoRoute> cursosRoutes = [
  /* GoRoute(
    name: 'likedcourses',
    path: '/likedcourses',
    builder: (context, state) => LikedCourses(),
  ), */
  GoRoute(
    name: 'cursos-inscritos-sincrono',
    path: '/cursos-inscritos-sincrono',
    builder: (context, state) => SincronoInscrito(idCurso: state.extra as int),
  ),
  GoRoute(
    name: 'cursos-inscritos-assincrono',
    path: '/cursos-inscritos-assincrono',
    builder: (context, state) => AssincronoInscrito(idCurso: state.extra as int),  
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
    name: 'coursejoined',
    path: '/coursejoined',
    builder: (context, state) => CourserJoined(),
  ),
  GoRoute(
    name: 'cursos',
    path: '/cursos',
    builder: (context, state) => Courses(),
  ),
  GoRoute(
    name: 'Assync',
    path: '/assync',
    builder: (context, state) {
      return Assincrono(idCurso: state.extra as int);
    },
  ),
  GoRoute(
    name: 'Sync',
    path: '/sync',
    builder: (context, state) {
      return Sincrono(idCurso: state.extra as int);
    },
  ),
];