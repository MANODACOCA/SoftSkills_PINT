import 'package:go_router/go_router.dart';
import 'package:mobile/ui/forum/widget/comment_page.dart';
import 'package:mobile/ui/forum/widget/forum.dart';
import 'package:mobile/ui/forum/widget/forum_page.dart';

final List<GoRoute> forumRoutes = [
  GoRoute(
    name: 'forum',
    path: '/forum',
    builder: (context, state) => Forum(),
  ),
  GoRoute(
    name: 'forumPage',
    path: '/forumPage',
    builder: (context, state) {
      final forumName = state.extra as String;
      return ForumPage(forumName: forumName);
    },
  ),
  GoRoute(
    name: 'commentPage',
    path: '/commentPage',
    builder: (context, state) {
      final Map<String, dynamic> extra = state.extra as Map<String, dynamic>;
      return CommentPage(
        postName: "${extra['postName']}",
        description: "${extra['description']}",
        likes: extra['likes'] as int,
        comments: extra['comments'] as int,
        photo: "${extra['photo']}",
      );
    },
  ),
];