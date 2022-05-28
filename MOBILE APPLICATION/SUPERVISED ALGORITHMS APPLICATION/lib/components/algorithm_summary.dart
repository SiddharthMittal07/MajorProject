import 'package:flutter/material.dart';
import 'package:major_project/models/algorithm_definition.dart';

class AlgorithmSummary extends StatelessWidget {
  final Algorithm algorithm;

  String getString(String algorithm) {
    final List<String> words = algorithm.split(' ');
    if (words.length > 2) {
      return words.sublist(0, 3).join(' ');
    } else {
      return words.join(' ');
    }
  }

  int getNumber(String algorithm) {
    final List<String> words = algorithm.split(' ');
    return words.length;
  }

  const AlgorithmSummary({Key? key, required this.algorithm}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200.0,
      margin: const EdgeInsets.only(left: 5.0, bottom: 10.0, right: 15.0),
      child: Stack(
        children: [
          Column(
            children: [
              const SizedBox(height: 20.0),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.only(
                      left: 4.0, right: 4.0, bottom: 4.0, top: 30.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10.0),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.white,
                        offset: Offset(5.0, 1.0),
                        blurRadius: 2.0,
                        spreadRadius: 3.0,
                      ),
                    ],
                  ),
                  child: Text(
                    algorithm.information.main,
                    maxLines: 9,
                    style: const TextStyle(
                      fontSize: 13.0,
                      color: Colors.black,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ),
            ],
          ),
          Positioned(
              top: getNumber(algorithm.algorithm) > 2 ? 0.0 : 8.0,
              left: 10.0,
              child: Container(
                width: 180.0,
                padding:
                    const EdgeInsets.symmetric(horizontal: 8.0, vertical: 8.0),
                decoration: BoxDecoration(
                  border: Border.all(width: 1.0, color: Colors.black),
                  color: const Color.fromARGB(255, 1, 1, 161),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Text(
                  getString(algorithm.algorithm),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16.0,
                    height: 1.0,
                  ),
                  textAlign: TextAlign.center,
                ),
              )),
        ],
      ),
    );
  }
}
