import 'package:mobile/ui/core/shared/base_comp/text_expand.dart';
import 'package:mobile/ui/core/shared/export.dart';

class ForumHeader extends StatelessWidget {
  const ForumHeader({
    super.key,
    required this.postCount,
    required this.title,
    required this.description,
    required this.initials,
    required this.onNewPost,
    this.gradientStart,
    this.gradientEnd,
    required this.addPost,
    required this.paint,
  });

  final int postCount;
  final String title;
  final String description;
  final String initials;
  final VoidCallback onNewPost;
  final Color? gradientStart;
  final Color? gradientEnd;
  final bool addPost;
  final Color paint;
  static const double _headerH = 120;
  static const double _overlap = 45;

   @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

     return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Stack(
          clipBehavior: Clip.none,
          children: [
            Container(
              margin: EdgeInsets.symmetric(horizontal: 8),
              padding: EdgeInsets.all(8),
              height: _headerH,
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    gradientStart ??  Color(0xFF0E7DD8),
                    gradientEnd ?? Color(0xFFAEE0F5),
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Padding(
                padding: EdgeInsets.only(left: 16, top: 18),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.baseline,
                  textBaseline: TextBaseline.alphabetic,
                  children: [
                    Text(
                      '$postCount',
                      style: theme.textTheme.titleLarge?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    SizedBox(width: 6),
                    Text(
                      'Posts',
                      style: theme.textTheme.bodyMedium
                          ?.copyWith(color: Colors.white),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(8, _headerH - _overlap, 8, 0),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: [
                    BoxShadow(
                      blurRadius: 10,
                      offset: Offset(0, 3),
                      color: Color(0x1A000000),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        CircleAvatar(
                          radius: 22,
                          backgroundColor: Color(0xFFA4A23A),
                          child: Text(
                            initials,
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            title,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w700,
                              color: Color(0xFF1C2B39),
                            ),
                          ),
                        ),
                        SizedBox(width: 10),
                        ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: addPost ? paint : AppColors.primary,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.all(Radius.circular(20)),
                            ),
                          ),
                          onPressed: onNewPost,
                          icon: Icon(Icons.add, color: Colors.white),
                          label: Text('Novo Post', style: TextStyle(color: Colors.white)),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    TextExpand(text: description, maxLines: 2),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
