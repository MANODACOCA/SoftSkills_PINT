import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import '../../core/shared/export.dart';

class UnratedCourses extends StatefulWidget {
  const UnratedCourses({super.key});

  @override
  State<UnratedCourses> createState() => _UnratedCoursesState();
}

class _UnratedCoursesState extends State<UnratedCourses> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.pop();
          },
        ),
        title: Text("Cursos por avaliar", style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: GestureDetector(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: SizedBox(
            width: double.infinity,
            child: Column(
              children: <Widget>[
                Text('Aqui vai estar presente a lista de cursos que o utilizador ainda não avaliou'),
              ],
            ),
          ),
        ),
      ),
    );
  }
} 