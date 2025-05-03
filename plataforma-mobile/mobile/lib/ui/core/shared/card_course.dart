import 'export.dart';

class CardCourse extends StatelessWidget {
  const CardCourse({required this.title, required this.typeCourse, super.key});
  final String title;
  final String typeCourse;

  @override
  Widget build(BuildContext context){
    return Card(
      elevation: 50,
      shadowColor: Colors.black,
      color: AppColors.background,
      child: SizedBox(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            //mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Image(image: AssetImage('assets/logo-softinsa.png'), height: 100,),
              Row(
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 5),
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      borderRadius: BorderRadius.circular(8)
                    ),
                    child: Text(
                      typeCourse,
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ],
              ),
              Text(
                title,
                style: AppTextStyles.title,
              ),
            ],
          ),
        ),
      ),
    );
  }
}