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
      body: Text('Notificaçoes'),
      bottomNavigationBar: Footer(),
    );
  }
}
