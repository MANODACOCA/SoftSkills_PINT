import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

class Carousel extends StatelessWidget {
  const Carousel({super.key});

  @override
  Widget build(BuildContext context) {
    return CarouselSlider(
      options: CarouselOptions(
        height: 200.0,
        viewportFraction: 1,
        autoPlay: true,
      ),
      items: [
        'assets/course-flutter.png',
        'assets/course-flutter.png',
        'assets/course-flutter.png',
        'assets/course-flutter.png',
        'assets/course-flutter.png',
      ].map((path) {
        return Builder(
          builder: (BuildContext context) {
            return Container(
              width: MediaQuery.of(context).size.width,
              margin: const EdgeInsets.symmetric(horizontal: 5.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.asset(path, fit: BoxFit.cover),
              ),
            );
          },
        );
      }).toList(),
    );
  }
}
