import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/shared/navigationbar_component.dart';
import '../../core/shared/export.dart';

class EndedCourses extends StatefulWidget {
  const EndedCourses({super.key});

  @override
  State<EndedCourses> createState() => _EndedCoursesState();
}

class _EndedCoursesState extends State<EndedCourses> {
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
        title: Text("Cursos terminados", style: TextStyle(color: Colors.white)),
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
                Row(
                  children: [
                    Icon(
                      Icons.computer,
                      color: const Color.fromARGB(255, 88, 85, 85),
                    ),
                    SizedBox(width: 8),
                    Text('Cursos já avaliados'),
                    Spacer(),
                    IconButton(
                      icon: Icon(Icons.arrow_forward_ios),
                      onPressed: () {
                        context.push('/ratedcourses');
                      },
                      iconSize: 15,
                    ),
                  ],
                ),
                Row(
                  children: [
                    Icon(
                      Icons.star_half,
                      color: const Color.fromARGB(255, 88, 85, 85),
                    ),
                    SizedBox(width: 8),
                    Text('Cursos por avaliar'),
                    Spacer(),
                    IconButton(
                      icon: Icon(Icons.arrow_forward_ios),
                      onPressed: () {
                        context.push('/unratedcourses');
                      },
                      iconSize: 15,
                    ),
                  ],
                  //ListView()
                )
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
