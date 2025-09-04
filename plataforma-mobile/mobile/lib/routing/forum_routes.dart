import 'package:go_router/go_router.dart';
import 'package:mobile/ui/pages/forum/widget/comment_page.dart';
import 'package:mobile/ui/pages/forum/widget/forum.dart';
import 'package:mobile/ui/pages/forum/widget/forum_page.dart';

final List<GoRoute> forumRoutes = [
  GoRoute(name: 'forum', path: '/forum', builder: (context, state) => Forum()),
  GoRoute(
    name: 'forumPage',
    path: '/forumPage',
    pageBuilder: (context, state) {
      try {
        final extra = state.extra as Map<String, dynamic>?;
        if (extra == null) {
          return NoTransitionPage(child: Forum());
        }
        final forumID = extra['forumID']?.toString() ?? '';
        final name = extra['name']?.toString() ?? '';
        final description = extra['description']?.toString() ?? '';
        return NoTransitionPage(
          child: ForumPage(forumID: forumID, name: name, description: description),
        );
      } catch (e) {
        print('Erro ao processar forumPage: $e');
        return NoTransitionPage(child: Forum());
      }
    },
  ),
  GoRoute(
    name: 'commentPage',
    path: '/commentPage',
    pageBuilder: (context, state) {
      try {
        final extra = state.extra as Map<String, dynamic>?;
        if (extra == null) {
          return NoTransitionPage(child: Forum());
        }
        return NoTransitionPage(
          child: CommentPage(post: extra),
        );
      } catch (e) {
        print('Erro ao processar commentPage: $e');
        return NoTransitionPage(child: Forum());
      }
    },
  ),
];
