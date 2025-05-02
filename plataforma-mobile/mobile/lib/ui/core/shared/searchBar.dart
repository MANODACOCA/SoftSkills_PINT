import 'package:flutter/material.dart';

class SearchBarCustom extends StatelessWidget {
  const SearchBarCustom({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(width: 25),
        SizedBox(
          height: 45,
          width: 250,
          child: SearchBar(
            leading: const Icon(Icons.search),
            hintText: 'Search',
            shadowColor: WidgetStateProperty.all(Colors.black),
            elevation: WidgetStateProperty.all(4.0),
            shape: WidgetStateProperty.all(
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)),
            ),
            padding: WidgetStateProperty.all(
              EdgeInsets.symmetric(horizontal: 16.0),
            ),
          ),
        ),
        SizedBox(width: 1),
        IconButton(
          icon: const Icon(Icons.filter_list),
          onPressed: () {
            // Implement filter action here
          },
        ),
      ],
    );
  }
}
