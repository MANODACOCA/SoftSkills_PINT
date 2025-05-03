import 'export.dart';
import 'package:intl/intl.dart';
class CardCourse extends StatelessWidget {
  const CardCourse({
    super.key,
    required this.title,
    required this.typeCourse,
    required this.startDate,
    required this.endDate,
    required this.currentMembers,
    required this.maxMembers,
  });

  final String title;
  final String typeCourse;
  final DateTime startDate;
  final DateTime endDate;
  final int currentMembers;
  final int maxMembers;

//meter esta função num ficheiro à parte
  String _formatDateRange(DateTime start, DateTime end) {
    final formatter = DateFormat('d MMM yyyy', 'pt_PT');
    return '${formatter.format(start)} - ${formatter.format(end)}';
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shadowColor: Colors.black,
      color: AppColors.background,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(12),
              topRight: Radius.circular(12),
            ),
            child: const Image(
              image: AssetImage('assets/course-flutter.png'),
              height: 135,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
               
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        typeCourse,
                        style: const TextStyle(color: Colors.white),
                      ),
                    ),
                    Row(
                      children: [
                        Text(
                          '$currentMembers/$maxMembers',
                          style: AppTextStyles.body,
                        ),
                        const Icon(Ionicons.people, size: 20),
                        const SizedBox(width: 2),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  title,
                  style: AppTextStyles.title,
                ),
                const SizedBox(height: 6),
                Padding(
                  padding: const EdgeInsets.only(bottom:5.0),
                      child:         Text(
                  _formatDateRange(startDate, endDate),
                  style: AppTextStyles.body.copyWith(color: Colors.grey[600]),
                ),
                )

              ],
            ),
          ),
        ],
      ),
    );
  }
}
