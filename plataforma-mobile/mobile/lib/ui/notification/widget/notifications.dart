import 'package:go_router/go_router.dart';
import '../../core/shared/search_bar.dart';
import '../../core/shared/export.dart';
import '../../core/shared/export.dart';
import '../../core/shared/navigationbar_component.dart';

class Notification extends StatefulWidget {
  const Notification({super.key});

  @override
  State<Notification> createState() => _NotificationState();
}

class _NotificationState extends State<Notification> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SearchBarCustom(),
        backgroundColor: AppColors.primary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(children: <Widget>[Text('Lista das Notificações')]),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
