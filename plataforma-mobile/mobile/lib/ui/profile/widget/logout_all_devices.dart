import 'package:mobile/ui/core/shared/export.dart';


class LogOut extends StatefulWidget {
  const LogOut({super.key});

  @override
  State<LogOut> createState() => LogoutAllDevices();
}

class LogoutAllDevices extends State<LogOut> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: [Text('Logout from all devices')]),
      bottomNavigationBar: Footer(),
    );
  }
}
