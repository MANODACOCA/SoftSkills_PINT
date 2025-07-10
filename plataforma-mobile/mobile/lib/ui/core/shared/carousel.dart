// ignore_for_file: deprecated_member_use

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:mobile/API/cursos_api.dart';

class MyCarousel extends StatefulWidget {
  const MyCarousel({super.key});

  @override
  State<MyCarousel> createState() => _MyCarouselState();
}

class _MyCarouselState extends State<MyCarousel> {
  final CursosApi _api = CursosApi();
  Map<String, dynamic> slidecurso = {};

  @override
  void initState() {
    super.initState();
    fetchCursoSlide();
  }

  Future<void> fetchCursoSlide() async {
    try {
      final cursoSlide = await _api.cursoSlide();
      setState(() {
        slidecurso = cursoSlide;
      });
    } catch (error) {
      print('Erro ao encontrar curso slide: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> slides = [
      {
        'title': 'Cursos',
        'description': '📚 Descubra nossos cursos e transforme seu futuro hoje!',
        'image': 'assets/carousel/courses.png',
        'route': '/cursos',
      },
      {
        'title': 'Fórum',
        'description': '🌐 Vem partilhar o teu conhecimento no nosso fórum!',
        'image': 'assets/carousel/forum_resized.png',
        'route': '/forum',
      },
      if (slidecurso.isNotEmpty) {
        'title': slidecurso['nome_curso'],
        'description': '🧠 Conhece o curso mais procurado na SoftSkills.',
        'image': slidecurso['imagem'] ?? '',
        'route': '/cursos/${slidecurso['id_curso']}',
      },
    ];

      return CarouselSlider(
        options: CarouselOptions(
          height: 250,
          viewportFraction: 1,
          autoPlay: true,
      ),
      items: slides.map((slide) {
        return Builder(
          builder: (context) {
            return Padding(
              padding: EdgeInsets.all(8.0),
              child: Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: slide['image'].startsWith('http')
                    ? Image.network(
                        slide['image'],
                        fit: BoxFit.cover,
                        width: double.infinity,
                        height: 250,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            width: double.infinity,
                            height: 250,
                            color: Colors.grey[800],
                            child: Center(
                              child: Text(
                                slide['title'],
                                style: const TextStyle(color: Colors.white, fontSize: 20),
                              ),
                            ),
                          );
                        }
                      )
                    : Image.asset(
                        slide['image'],
                        fit: BoxFit.cover,
                        width: double.infinity,
                        height: 250,
                      ),
                ),
                Container(
                  width: double.infinity,
                  height: 250,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    color: Colors.black.withOpacity(0.5),
                  ),
                ),
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        slide['title'],
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        slide['description'],
                        style: const TextStyle(color: Colors.white70, fontSize: 14),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton.icon(
                        onPressed: () {
                          Navigator.pushNamed(context, slide['route']);
                        },
                        icon: const Icon(Icons.info_outline),
                        label: const Text('Mais Informações'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: Colors.blue[800],
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              ],
            ),
            );
          },
        );
      }).toList(),
    );
  }
}