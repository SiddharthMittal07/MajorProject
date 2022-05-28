import 'package:flutter/material.dart';

class Results extends StatelessWidget {
  const Results({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
      child: Stack(
        children: [
          Column(
            children: [
              const SizedBox(height: 5.0),
              Container(
                margin: const EdgeInsets.only(top: 20.0),
                padding: const EdgeInsets.only(
                    top: 25.0, right: 8.0, left: 8.0, bottom: 15.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(15.0),
                  color: Colors.white,
                ),
                child: Column(
                  children: const [
                    Text(
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel mi dui. Duis pellentesque, lacus a posuere congue, neque sapien pulvinar purus, id interdum dui quam non massa. Quisque et sem a ligula pellentesque eleifend id vel lacus. Nulla facilisi. Sed quis mi sit amet massa posuere venenatis.',
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(height: 15.0),
                  ],
                ),
              ),
            ],
          ),
          Positioned(
            left: 15.0,
            child: Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10.0, vertical: 12.0),
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor,
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: const Text(
                'RESULTS',
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
