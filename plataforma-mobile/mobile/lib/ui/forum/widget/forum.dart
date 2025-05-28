// ignore_for_file: avoid_print

import 'package:go_router/go_router.dart';

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
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: AppColors.primary,
          title: SearchBarCustom(),
          centerTitle: true,
        ),
        body: SingleChildScrollView(
          padding: EdgeInsets.all(20),
          child: ListView(
            shrinkWrap: true,
            children: [
              /*Falta dar import da database e fazer o list de todos os foruns que a database tem*/
              GestureDetector(
                onTap: () {
                  context.push('/forumPage', extra: 'Facebook');
                  print('Entra no forum Facebook');
                },
                child: CardForum(
                  title: 'Facebook',
                  description: 'Discussões sobre Facebook',
                  imageUrl: 'assets/facebook-logo.png',
                ),
              ),
            ],
          ),
        ),
        bottomNavigationBar: Footer(),
      ),
    );
  }
}

class CardForum extends StatelessWidget {
  final String title;
  final String description;
  final String imageUrl;

  const CardForum({
    super.key,
    required this.title,
    required this.description,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: Image.asset(imageUrl, width: 50, height: 50),
        contentPadding: EdgeInsets.all(10),
        title: Text(title),
        subtitle: Text(description),
      ),
    );
  }
}
