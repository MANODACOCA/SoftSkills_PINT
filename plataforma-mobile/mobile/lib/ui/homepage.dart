import 'package:flutter/material.dart';
import 'core/shared/navigationbar_component.dart';
import 'core/shared/search_bar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SearchBarCustom(),
        centerTitle: true,
        backgroundColor: Color.fromRGBO(57, 99, 156, 1.0),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
