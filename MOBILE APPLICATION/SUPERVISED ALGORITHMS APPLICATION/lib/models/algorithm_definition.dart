class AlgoInformation {
  final String main;
  final String img;
  final List<dynamic> applications;
  final List<dynamic> pros;
  final List<dynamic> cons;

  const AlgoInformation({
    required this.main,
    required this.img,
    required this.applications,
    required this.pros,
    required this.cons,
  });

  factory AlgoInformation.fromJson(Map json) {
    return AlgoInformation(
        main: json['main'],
        img: json['img'],
        applications: json['applications'],
        pros: json['pros'],
        cons: json['cons']);
  }
}

class Algorithm {
  final String algorithm;
  final List<dynamic> confusionMatrix;
  final AlgoInformation information;

  const Algorithm({
    required this.algorithm,
    required this.confusionMatrix,
    required this.information,
  });

  factory Algorithm.fromJson(Map json) {
    final information = AlgoInformation.fromJson(json['information']);

    return Algorithm(
      algorithm: json['algorithm'],
      confusionMatrix: json['confusion_matrix'],
      information: information,
    );
  }
}
