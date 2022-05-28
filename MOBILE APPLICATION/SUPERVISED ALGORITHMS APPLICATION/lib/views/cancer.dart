import 'package:flutter/material.dart';

class AboutCancer extends StatelessWidget {
  const AboutCancer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    const String description =
        "Brain tumors refer to the unusual and uncontrollable cell growth in the brain which causes more pressure inside the restricted space in the skull. Since the brain is confined in the bony skull, it cannot inflate to make space for the uncontrollable growth which results in the squashing of normal brain tissues. This unorthodox growth causes life-threatening complications by damaging the brain.";

    return Column(
      children: <Widget>[
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 5.0),
          child: Container(
            decoration: BoxDecoration(
              color: Theme.of(context).scaffoldBackgroundColor,
            ),
            padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 3.0),
            child: Stack(
              children: <Widget>[
                Container(
                  margin: const EdgeInsets.only(top: 25.0),
                  padding: const EdgeInsets.only(
                      left: 8.0, right: 8.0, bottom: 14.0, top: 20.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(width: 1.0, color: Colors.black12),
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  child: const Text(
                    description,
                    style: TextStyle(
                      fontSize: 14.0,
                      color: Colors.black87,
                    ),
                  ),
                ),
                Positioned(
                  left: 90.0,
                  top: 0,
                  child: Container(
                    padding: const EdgeInsets.all(8.0),
                    decoration: BoxDecoration(
                      color: Theme.of(context).primaryColor,
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: const Text(
                      'ABOUT CANCER',
                      style: TextStyle(
                        fontSize: 20.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        Container(
          height: 200.0,
          decoration: BoxDecoration(
            color: Theme.of(context).scaffoldBackgroundColor,
          ),
          padding: const EdgeInsets.only(left: 20.0, top: 5.0, bottom: 15.0),
          child: ListView(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            children: [
              Container(
                margin: const EdgeInsets.only(right: 25.0),
                width: width * 0.8,
                decoration: const BoxDecoration(
                  color: Colors.white,
                ),
              ),
              Container(
                margin: const EdgeInsets.only(right: 25.0),
                width: width * 0.8,
                decoration: const BoxDecoration(
                  color: Colors.white,
                ),
              ),
              Container(
                margin: const EdgeInsets.only(right: 25.0),
                width: width * 0.8,
                decoration: const BoxDecoration(
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
