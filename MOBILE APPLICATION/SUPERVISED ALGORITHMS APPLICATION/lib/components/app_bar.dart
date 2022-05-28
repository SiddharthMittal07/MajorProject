import 'package:flutter/material.dart';

class TopBar extends StatelessWidget {
  final bool isCentered;

  const TopBar({Key? key, required this.isCentered}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 15.0),
      padding: const EdgeInsets.symmetric(vertical: 12.0),
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(width: 1.0, color: Colors.black),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          isCentered
              ? IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () => {},
                )
              : const SizedBox.shrink(),
          Text(
            'Brain Cancer\nDetection',
            style: TextStyle(
              fontSize: 22.0,
              fontWeight: FontWeight.w500,
              color: Theme.of(context).primaryColor,
              fontFamily: 'Poppins',
              height: 1,
            ),
          ),
        ],
      ),
    );
  }
}
