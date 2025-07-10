import 'package:intl/intl.dart';

String formatDateRange(DateTime start, DateTime end) {
  final formatter = DateFormat('d MMM yyyy', 'pt_PT');
  return '${formatter.format(start)} - ${formatter.format(end)}';
}

String formatDateRangeSingle(String data) {
  final formatter = DateFormat('d MMM yyyy', 'pt_PT');
  final parsedDate = DateTime.parse(data);
  return formatter.format(parsedDate);
}

String tempoParaFimCurso(DateTime dataFim, {DateTime? agora}) {
  final DateTime now = agora ?? DateTime.now();
  final endOfDay = DateTime(dataFim.year, dataFim.month, dataFim.day, 23, 59 ,59, 999);
  final diff = endOfDay.difference(now);

  if(diff.isNegative || diff.inDays > 15) return 'Em curso...';

  final dias = diff.inDays;
  final horas = diff.inHours.remainder(24);
  final minutos = diff.inMinutes.remainder(60);

  if (dias == 0 && horas == 0 && minutos == 0) return 'Poucos segundos';

  final buffer = StringBuffer('Termina em ');
  
  if (dias != 0) buffer.write('${dias}d');
  if (horas != 0) buffer.write('${horas}h');
  if (minutos != 0 && dias == 0 && horas == 0) buffer.write('${minutos}m');

  return buffer.toString();
}

String dataHoraFormat(String isoString) {
  final dt = DateTime.parse(isoString).toLocal();
  final datePart = DateFormat('d MMM yyyy', 'pt_PT').format(dt);
  final hourPart = DateFormat('HH:mm', 'pt_PT').format(dt);
  return '$datePart | $hourPart';
}

String tempoDecorrido(String data) {
  final agora = DateTime.now().toUtc(); 
  final dataConvertida = DateTime.tryParse(data)?.toUtc();
  if (dataConvertida == null) return 'data inválida';

  final diferenca = agora.difference(dataConvertida);

  final dias = diferenca.inDays;
  final horas = diferenca.inHours % 24;
  final minutos = diferenca.inMinutes % 60;

  String resultado = '';

  if (dias > 0) {
    resultado += 'há $dias dia${dias == 1 ? '' : 's'}';
  } else if (horas > 0) {
    resultado += 'há $horas hora${horas == 1 ? '' : 's'}';
  } else if (minutos > 0) {
    resultado += 'há $minutos minuto${minutos == 1 ? '' : 's'}';
  } else {
    resultado = 'agora mesmo';
  }

  return resultado;
}
