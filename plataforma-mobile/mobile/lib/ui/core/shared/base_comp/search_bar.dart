import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'dart:math' as math;

class SearchBarCustom extends StatelessWidget {
  final String hintText;
  final void Function(String)? onSearchChanged;
  final VoidCallback? onFilterTap;

  const SearchBarCustom({
    super.key,
    this.hintText = 'Search',
    this.onSearchChanged,
    this.onFilterTap,
  });

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
            hintText: hintText,
            onChanged: onSearchChanged,
            shadowColor: WidgetStateProperty.all(Colors.white),
            elevation: WidgetStateProperty.all(4.0),
            shape: WidgetStateProperty.all(
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)),
            ),
            padding: WidgetStateProperty.all(
              const EdgeInsets.symmetric(horizontal: 16.0),
            ),
          ),
        ),
        Transform.rotate(
          angle: math.pi * 1.5,
          child: IconButton(
            icon: const Icon(Ionicons.options, size: 30.0, color: Colors.white),
            onPressed: onFilterTap,
          ),
        ),
      ],
    );
  }
}
