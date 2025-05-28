import 'package:flutter/material.dart';
import 'package:mobile/ui/core/shared/navigationbar_component.dart';
import 'forum.dart';

class ForumPage extends StatelessWidget {
  const ForumPage({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blue,
          title: const Text('Forum'),
          centerTitle: true,
        ),
        body: Text('Facebook Forum Page'),
        bottomNavigationBar: Footer(),
      ),
    );
  }
}
