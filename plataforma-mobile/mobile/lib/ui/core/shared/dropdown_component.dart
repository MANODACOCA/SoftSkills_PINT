import 'export.dart';

class DropdownComponent extends StatefulWidget {
  const DropdownComponent({super.key, required this.type, required this.items, required this.onChanged});

  final String type;
  final List<String> items;
  final ValueChanged<String?> onChanged;


  @override
  State<DropdownComponent> createState() => _DropdownComponentState();
}

class _DropdownComponentState extends State<DropdownComponent> {
  String? _chosenValue;

  @override
  Widget build(BuildContext context){
    double screenWidth = MediaQuery.of(context).size.width;
    return Material(
      borderRadius: BorderRadius.all(Radius.circular(15)),
      child: Container(
        height: 46,
        width: screenWidth - 40,
        padding: EdgeInsets.symmetric(horizontal: 15),
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(color: Colors.black26),
          borderRadius: BorderRadius.circular(20),
        ),
        child: DropdownButtonHideUnderline(
          child:  DropdownButton<String>(
            isExpanded: true,
            menuWidth: screenWidth - 40,
            focusColor:Colors.white,
            value: _chosenValue,
            style: TextStyle(color: Colors.white),
            iconEnabledColor:Colors.black,
            items: widget.items.map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value,style:TextStyle(color:Colors.black),),
              );
            }).toList(),
            hint:Text(
              widget.type,
              style: TextStyle(
                  color: Colors.black,
                  fontSize: 14,
                  fontWeight: FontWeight.w500),
            ),
            onChanged: (String? value) {
              setState(() {
                _chosenValue = value;
              });
              widget.onChanged(value);
            },
          ), 
        ),
      ),
    );
  }
}