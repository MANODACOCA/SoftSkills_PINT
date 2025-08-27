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
    final extra = state.extra as Map<String, dynamic>;
    final forumID = extra['forumID'] as String;
    final name = extra['name'] as String;
    final description = extra['description'] as String;
    return NoTransitionPage(
      child: ForumPage(forumID: forumID, name: name, description: description,),
    );
  },
  ),
  GoRoute(
    name: 'commentPage',
    path: '/commentPage',
    pageBuilder: (context, state) {
      final extra = state.extra as Map<String, dynamic>;
      return NoTransitionPage(
        child: CommentPage( post: state.extra as Map<String,dynamic> ),
      );
    },
  ),
];
