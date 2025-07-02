import 'package:intl/intl.dart';

String formatDateRange(DateTime start, DateTime end) {
  final formatter = DateFormat('d MMM yyyy', 'pt_PT');
  return '${formatter.format(start)} - ${formatter.format(end)}';
}