import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/app_bar_arrow.dart';
import '../../core/shared/export.dart';
import '../../core/shared/navigationbar_component.dart';


class Assincrono extends StatefulWidget {
  const Assincrono({super.key , required this.title});

  final String title;

  @override
  State<Assincrono> createState() => _AssincronoState();
}

class _AssincronoState extends State<Assincrono> {
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBarArrow(onBack: () => context.pop(),title: widget.title),
      body: Center(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.all(10),
                child: Column(
                  children: [
                    SizedBox(
                      width: MediaQuery.of(context).size.width,
                      height: 200,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20),
                        child: Image.asset('assets/course-flutter.png', fit: BoxFit.cover),
                      ),
                    ),
                    Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),
                    Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),
                    Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),Text('assincrono'),
                  ],
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(10),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  fixedSize: Size(screenWidth - 10, 46),
                ),
                onPressed: () {}, 
                child: Text('Inscrever', style: TextStyle(color: Colors.white),)
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
