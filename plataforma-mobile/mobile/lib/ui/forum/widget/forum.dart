import '../../core/shared/export.dart';
import '../../core/shared/navigationbar_component.dart';
import '../../core/shared/search_bar.dart';

class Forum extends StatefulWidget {
  const Forum({super.key});

  @override
  State<Forum> createState() => _ForumState();
}

class _ForumState extends State<Forum> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        title: SearchBarCustom(),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20),
        child: Text('Forum'),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
