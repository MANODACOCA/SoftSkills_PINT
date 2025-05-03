import '../../core/shared/export.dart';
import '../../core/shared/navigationbar_component.dart';


class Forum extends StatefulWidget {
  const Forum({super.key});

  @override
  State<Forum> createState() => _ForumState();
}

class _ForumState extends State<Forum> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text('Forumm'),
      bottomNavigationBar: Footer(),
    );
  }
}
