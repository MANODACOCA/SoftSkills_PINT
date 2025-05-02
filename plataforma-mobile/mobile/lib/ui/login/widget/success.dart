import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'dart:async';

class CheckmarkScreen extends StatefulWidget {
  const CheckmarkScreen({super.key});

  @override
  State<CheckmarkScreen> createState() => _CheckmarkScreenState();
}

class _CheckmarkScreenState extends State<CheckmarkScreen> {
  @override
  void initState() {
    super.initState();
    Timer(Duration(seconds: 2), () {
      context.go("/homepage");
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Color(0xFFB3E5FC),
                border: Border.all(color: Color(0xFF1976D2), width: 2),
              ),
              child: Center(
                child: Icon(Icons.check, size: 40, color: Color(0xFF1976D2)),
              ),
            ),
            SizedBox(height: 20),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 20.0),
              child: Text(
                "Sucesso!",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 30,
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
