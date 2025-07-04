import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import '../../core/shared/base_comp/navigationbar_component.dart';

class CourserJoined extends StatefulWidget {
  const CourserJoined({super.key});

  @override
  State<CourserJoined> createState() => _CourserJoinedWidgetState();
}

class _CourserJoinedWidgetState extends State<CourserJoined> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.go('/profile');
          },
        ),
        title: Text('Cursos Inscritos', style: TextStyle(color: Colors.white)),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.computer,
                    color: const Color.fromARGB(255, 88, 85, 85),
                  ),
                  SizedBox(width: 10),
                  Text('Cursos assíncrono'),
                  Spacer(),
                  IconButton(
                    onPressed: () {},
                    icon: Icon(Icons.arrow_forward_ios),
                    iconSize: 15,
                  ),
                ],
              ),
              SizedBox(height: 10),
              Row(
                children: [
                  Icon(
                    Icons.star_half,
                    color: const Color.fromARGB(255, 88, 85, 85),
                  ),
                  SizedBox(width: 10),
                  Text('Cursos síncrono'),
                  Spacer(),
                  IconButton(
                    onPressed: () {},
                    icon: Icon(Icons.arrow_forward_ios),
                    iconSize: 15,
                  ),
                ],
              ),
              SizedBox(height: 20),
              Text('Lista de Cursos Inscritos'),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
