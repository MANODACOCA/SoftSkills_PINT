import 'package:go_router/go_router.dart';
import 'package:mobile/ui/pages/aulas/aula_async_page.dart';
import 'package:mobile/ui/pages/aulas/aula_sync_page.dart';
import 'package:mobile/ui/pages/course/course_screen_inscrever.dart';
import 'package:mobile/ui/pages/course/courses.dart';
import 'package:mobile/ui/pages/course/course_screen_inscrito.dart';
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
  ),
  GoRoute(
    name: 'cursos-inscritos',
    path: '/cursos-inscritos',
    pageBuilder: (context, state) {
      final idCurso = state.extra as int?;
      if (idCurso == null) {
        // Se não há idCurso, redirecionar para a lista de cursos
        return NoTransitionPage(child: Courses());
      }
      return NoTransitionPage(
        child: CourseInscrito(idCurso: idCurso),
      );
    },
  ),
  GoRoute(
    name: 'cursos-completed',
    path: '/cursos-completed',
    pageBuilder: (context, state) => NoTransitionPage(
      child: CoursesCompleted(),
    ),
  ),
  GoRoute(
    name: 'list-cursos-inscrito',
    path: '/list-cursos-inscrito',
    pageBuilder: (context, state) => NoTransitionPage(
      child: CourseEnrolled(),
    ),
  ),
  GoRoute(
    name: 'Inscrever',
    path: '/inscrever',
    pageBuilder: (context, state) {
      final idCurso = state.extra as int?;
      if (idCurso == null) {
        // Se não há idCurso, redirecionar para a lista de cursos
        return NoTransitionPage(child: Courses());
      }
      return NoTransitionPage(
        child: Inscrever(idCurso: idCurso),
      );
    },
  ),

  //aulas
  GoRoute(
    name: 'aulas-async',
    path: '/aulas-async',
    pageBuilder: (context, state) {
      try {
        final aulas = state.extra as Map<String, dynamic>?;
        if (aulas == null) {
          return NoTransitionPage(child: Courses());
        }
        return NoTransitionPage(
          child: AulaAsyncPage(aulas: aulas),
        );
      } catch (e) {
        print('Erro ao processar aulas-async: $e');
        return NoTransitionPage(child: Courses());
      }
    },
  ),
  GoRoute(
    name: 'aulas-sync',
    path: '/aulas-sync',
    pageBuilder: (context, state) {
      try {
        final aulas = state.extra as Map<String, dynamic>?;
        if (aulas == null) {
          return NoTransitionPage(child: Courses());
        }
        return NoTransitionPage(
          child: AulaSyncPage(aulas: aulas),
        );
      } catch (e) {
        print('Erro ao processar aulas-sync: $e');
        return NoTransitionPage(child: Courses());
      }
    },
  ),
  GoRoute(
    name: 'inserir-trabalho',
    path: '/inserir-trabalho',
    pageBuilder: (context, state) {
      try {
        final trabalho = state.extra as Map<String, dynamic>?;
        if (trabalho == null) {
          return NoTransitionPage(child: Courses());
        }
        return NoTransitionPage(
          child: EntregaTrabalho(trabalho: trabalho),
        );
      } catch (e) {
        print('Erro ao processar inserir-trabalho: $e');
        return NoTransitionPage(child: Courses());
      }
    },
  ),
];