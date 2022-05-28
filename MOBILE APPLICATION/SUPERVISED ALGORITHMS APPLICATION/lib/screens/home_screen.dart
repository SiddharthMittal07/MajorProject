import 'package:flutter/material.dart';
import 'package:major_project/components/app_bar.dart';
import 'package:major_project/views/cancer.dart';
import 'package:major_project/views/algorithms.dart';
import 'package:major_project/views/results.dart';
import 'package:major_project/views/upload.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: SafeArea(
        child: ListView(
          physics: const BouncingScrollPhysics(),
          children: const <Widget>[
            TopBar(isCentered: false),
            SizedBox(height: 5.0),
            AboutCancer(),
            SizedBox(height: 10.0),
            Algorithms(),
            SizedBox(height: 10.0),
            Results(),
            SizedBox(height: 15.0),
            Upload(),
          ],
        ),
      )
    );
  }
}
