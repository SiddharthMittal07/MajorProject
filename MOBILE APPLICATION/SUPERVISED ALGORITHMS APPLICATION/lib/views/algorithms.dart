import 'package:flutter/material.dart';
import 'package:major_project/components/algorithm_summary.dart';
import 'package:major_project/models/algorithm_definition.dart';
import 'package:major_project/data/api.dart';

class Algorithms extends StatefulWidget {
  const Algorithms({Key? key}) : super(key: key);

  @override
  State<Algorithms> createState() => _AlgorithmsState();
}

class _AlgorithmsState extends State<Algorithms> {
  final Api api = Api();
  List<Algorithm> algorithms = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    api.getAlgorithms().then((data) {
      setState(() {
        algorithms = data;
        loading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: 10.0),
      padding:
          const EdgeInsets.only(left: 8.0, top: 7.0, bottom: 10.0, right: 5.0),
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColor,
        borderRadius: const BorderRadius.only(
            bottomLeft: Radius.circular(15.0), topLeft: Radius.circular(15.0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'ALGORITHMS',
            style: TextStyle(
              color: Colors.white,
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10.0),
          const Text(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel mi dui. Duis pellentesque, lacus a posuere congue, neque sapien pulvinar purus, id interdum dui quam non massa. Quisque et sem a ligula pellentesque eleifend id vel lacus. Nulla facilisi. Sed quis mi sit amet massa posuere venenatis.',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 10.0),
          SizedBox(
            height: 200.0,
            child: loading
                ? const Center(child: CircularProgressIndicator())
                : ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    scrollDirection: Axis.horizontal,
                    itemCount: algorithms.length,
                    itemBuilder: (BuildContext context, int index) {
                      return AlgorithmSummary(algorithm: algorithms[index]);
                    }),
          ),
        ],
      ),
    );
  }
}
