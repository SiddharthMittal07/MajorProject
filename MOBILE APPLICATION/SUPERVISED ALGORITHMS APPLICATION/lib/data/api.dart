import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:major_project/models/algorithm_definition.dart';

class Api {
  Future<List<Algorithm>> getAlgorithms() async {
    const url =
        "https://gist.githubusercontent.com/SiddharthMittal07/554b26ec04129f393e2fc59c82c0f1d3/raw/871224e25d4eb30b19eb7c2a945f7db0af405787/major_project_define.json";
    final response =
        await http.get(Uri.parse(url), headers: {'Accept': 'application/json'});
    return (json.decode(response.body) as List)
        .map<Algorithm>((json) => Algorithm.fromJson(json))
        .toList();
  }
}
