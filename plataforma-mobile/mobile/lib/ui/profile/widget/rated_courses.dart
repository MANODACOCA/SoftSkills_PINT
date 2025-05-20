import 'package:flutter/material.dart';
import 'package:mobile/ui/core/themes/colors.dart';

class RateCourses extends StatefulWidget {
  const RateCourses({super.key});

  @override
  State<RateCourses> createState() => _RateCoursesState();
}

class _RateCoursesState extends State<RateCourses> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text("Avaliar cursos", style: TextStyle(color: Colors.white)),
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
                Text('Aqui vai estar presente a lista de cursos que o utilizador já avaliou'),
              ],
            ),
          ),
        ),
      ),
    );
  }
}