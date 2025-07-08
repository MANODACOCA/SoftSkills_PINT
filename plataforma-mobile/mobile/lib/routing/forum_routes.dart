import 'package:go_router/go_router.dart';
import 'package:mobile/ui/forum/widget/comment_page.dart';
import 'package:mobile/ui/forum/widget/forum.dart';
import 'package:mobile/ui/forum/widget/forum_page.dart';

final List<GoRoute> forumRoutes = [
  GoRoute(name: 'forum', path: '/forum', builder: (context, state) => Forum()),
  GoRoute(
    name: 'forumPage',
    path: '/forumPage',
    builder: (context, state) {
      final extra = state.extra as Map<String, dynamic>;
      final forumID = extra['forumID'] as String;
      final name = extra['name'] as String;
      return ForumPage(forumID: forumID, name: name);
    },
  ),
  GoRoute(
    name: 'commentPage',
    path: '/commentPage',
    builder: (context, state) {
      final Map<String, dynamic> extra = state.extra as Map<String, dynamic>;
      print("Extra: $extra");
      return CommentPage(
        postId: (extra['postId'] ?? '').toString(),
        postName: "${extra['postName']}",
        description: "${extra['description']}",
        likes: extra['likes'] as int,
        comments: extra['comments'] as int,
        photo: "${extra['photo']}",
      );
    },
  ),
];
