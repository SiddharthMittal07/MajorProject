import 'package:flutter/material.dart';

class Upload extends StatelessWidget {
  const Upload({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 15.0),
      padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 15.0),
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColor,
        borderRadius: const BorderRadius.only(
          topRight: Radius.circular(15.0),
          bottomRight: Radius.circular(15.0),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text(
            'UPLOAD',
            style: TextStyle(
              color: Colors.white,
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 10.0),
          Text(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel mi dui. Duis pellentesque, lacus a posuere congue, neque sapien pulvinar purus, id interdum dui quam non massa. Quisque et sem a ligula pellentesque eleifend id vel lacus. Nulla facilisi. Sed quis mi sit amet massa posuere venenatis.',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
          SizedBox(height: 10.0),
        ],
      ),
    );
  }
}
