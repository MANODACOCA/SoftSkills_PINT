/* //import 'package:go_router/go_router.dart';
import '../../core/shared/export.dart';
import 'dart:math' as math;
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
        child: Column(
          children: <Widget>[
            Text('Lista das Notificações'),
            NotificationsWidget(
              profileName: 'João Silva',
              description: 'Você recebeu uma nova mensagem.',
              imageProfileURL: 'https://example.com/profile_image.jpg',
              date: '2023-10-01',
            ),
            SizedBox(height: 20),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}

class SearchBarCustom extends StatefulWidget {
  const SearchBarCustom({super.key});

  @override
  State<SearchBarCustom> createState() => _SearchBarCustomState();
}

class _SearchBarCustomState extends State<SearchBarCustom> {
  String selectedOrder = 'Relevância';

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SizedBox(width: 0),
        SizedBox(
          height: 40,
          width: screenWidth - 92,
          child: SearchBar(
            leading: const Icon(Icons.search, color: Colors.black38),
            hintText: 'Search',
            shadowColor: WidgetStateProperty.all(Colors.white),
            elevation: WidgetStateProperty.all(4.0),
            shape: WidgetStateProperty.all(
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)),
            ),
            padding: WidgetStateProperty.all(
              EdgeInsets.symmetric(horizontal: 16.0),
            ),
          ),
        ),
        Transform.rotate(
          angle: math.pi * 1.5,
          child: IconButton(
            icon: Icon(Icons.tune, size: 30.0, color: Colors.white),
            onPressed: () {
              showModalBottomSheet(
                context: context,
                builder: (context) {
                  return Container(
                    height: 400,
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(30),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                'Ordenar por: ',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.grey,
                                ),
                                //textAlign: TextAlign.left,
                              ),
                              SizedBox(height: 10),
                              Container(
                                padding: EdgeInsets.symmetric(horizontal: 16),
                                child: DropdownMenu(
                                  inputDecorationTheme: InputDecorationTheme(
                                    enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(25),
                                      borderSide: BorderSide(
                                        color: Colors.black,
                                      ),
                                    ),
                                  ),
                                  label: Text(
                                    'Ordenar notificações por',
                                    style: TextStyle(fontSize: 13),
                                  ),
                                  width: 400,
                                  menuHeight: 100,
                                  onSelected: (String) {
                                    setState(() {
                                      selectedOrder = String!;
                                      print('Selected order: $selectedOrder');
                                    });
                                  },
                                  dropdownMenuEntries:
                                      <DropdownMenuEntry<String>>[
                                        DropdownMenuEntry<String>(
                                          value: 'Relevância',
                                          label: ('Relevância'),
                                          style: ButtonStyle(
                                            textStyle: WidgetStateProperty.all(
                                              TextStyle(fontSize: 13),
                                            ),
                                          ),
                                        ),
                                        DropdownMenuEntry<String>(
                                          value: 'Data',
                                          label: ('Data'),
                                          style: ButtonStyle(
                                            textStyle: WidgetStateProperty.all(
                                              TextStyle(fontSize: 13),
                                            ),
                                          ),
                                        ),
                                        DropdownMenuEntry<String>(
                                          value: 'Mais recente',
                                          label: ('Mais recente'),
                                          style: ButtonStyle(
                                            textStyle: WidgetStateProperty.all(
                                              TextStyle(fontSize: 13),
                                            ),
                                          ),
                                        ),
                                      ],
                                ),
                              ),
                              SizedBox(height: 20),
                              Text(
                                'Filtrar por: ',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.grey,
                                ),
                                //textAlign: TextAlign.left,
                              ),
                              SizedBox(height: 10),
                              Container(
                                padding: EdgeInsets.symmetric(horizontal: 16),
                                child: DropdownMenu(
                                  inputDecorationTheme: InputDecorationTheme(
                                    enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(25),
                                      borderSide: BorderSide(
                                        color: Colors.black,
                                      ),
                                    ),
                                  ),
                                  label: Text(
                                    'Filtrar notificações por',
                                    style: TextStyle(fontSize: 13),
                                  ),
                                  width: 400,
                                  menuHeight: 100,
                                  onSelected: (String) {
                                    setState(() {
                                      selectedOrder = String!;
                                      print('Selected order: $selectedOrder');
                                    });
                                  },
                                  dropdownMenuEntries:
                                      <DropdownMenuEntry<String>>[
                                        DropdownMenuEntry<String>(
                                          value: 'Dia',
                                          label: ('Dia'),
                                          style: ButtonStyle(
                                            textStyle: WidgetStateProperty.all(
                                              TextStyle(fontSize: 13),
                                            ),
                                          ),
                                        ),
                                        DropdownMenuEntry<String>(
                                          value: 'Mês',
                                          label: ('Mês'),
                                          style: ButtonStyle(
                                            textStyle: WidgetStateProperty.all(
                                              TextStyle(fontSize: 13),
                                            ),
                                          ),
                                        ),
                                        DropdownMenuEntry<String>(
                                          value: 'Ano',
                                          label: ('Ano'),
                                          style: ButtonStyle(
                                            textStyle: WidgetStateProperty.all(
                                              TextStyle(fontSize: 13),
                                            ),
                                          ),
                                        ),
                                      ],
                                ),
                              ),
                              SizedBox(height: 40),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  SizedBox(
                                    width: 300,
                                    child: ElevatedButton(
                                      onPressed: () {
                                        print('Filtragem feita');
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: AppColors.primary,
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(
                                            20,
                                          ),
                                        ),
                                      ),
                                      child: Text(
                                        'Aplicar',
                                        style: TextStyle(
                                          fontSize: 14,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              );
            },
          ),
        ),
      ],
    );
  }
}

class NotificationsWidget extends StatefulWidget {
  final String profileName;
  final String description;
  final String imageProfileURL;
  final String date;

  const NotificationsWidget({
    super.key,
    required this.profileName,
    required this.description,
    required this.imageProfileURL,
    required this.date,
  });

  @override
  State<NotificationsWidget> createState() => Notifications();
}

class Notifications extends State<NotificationsWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        elevation: 4,
        child: ListTile(
          leading: CircleAvatar(
            backgroundImage: NetworkImage(widget.imageProfileURL),
          ),
          trailing: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Row(children: <Widget>[Text(widget.profileName)]),
              Row(children: <Widget>[Text(widget.description)]),
              Row(children: <Widget>[Text(widget.date)]),
            ],
          ),
        ),
      ),
    );
  }
}
 */