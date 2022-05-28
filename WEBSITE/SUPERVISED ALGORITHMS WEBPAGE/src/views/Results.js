import { useState } from 'react';
import { scaleLinear, scaleBand, max, mean } from 'd3';
import { AxisBottom } from '../components/AxisBottom';
import { AxisLeft } from '../components/AxisLeft';
import { useData } from '../components/useData';
import { Marks } from '../components/Marks';
import { Legends } from '../components/Legends';
import { SelectOptions } from '../components/SelectOptions';

//width: 1920px
//height: 937px
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const sizeFactor = 0.47;
const width = parseInt(windowWidth * sizeFactor);
const height = parseInt(windowHeight * sizeFactor);
const margin = { top: 20, right: 80, bottom: 50, left: 60 };

const jsonUrl = 'https://gist.githubusercontent.com/SiddharthMittal07/3c7afd2a88faa690291f9474b60483b6/raw/c52aa3e8f2b870591d5fccd0957f236ee6141452/major_project_algorithms.json';

const valueToLabel = [
    { value: 'testing_accuracy', label: 'ACCURACY' },
    { value: 'time', label: 'TIME' },
    { value: 'precision_score', label: 'PRECISION' },
    { value: 'recall_score', label: 'RECALL' }
];
const lessThanMean = { 'testing_accuracy': true, 'time': false, 'precision_score': true, 'recall_score': true };

const factorDef = {
    'testing_accuracy': 'Accuracy is defined as the percentage of correct predictions for the test data. It can be calculated easily by dividing the number of correct predictions by the number of total predictions.',
    'time': 'Time complexity can be seen as the measure of how fast or slow an algorithm will perform for the input size. Time complexity is always given with respect to some input size (say n).',
    'precision_score': 'Precision is one indicator of a machine learning model\'s performance – the quality of a positive prediction made by the model. Precision refers to the number of true positives divided by the total number of positive predictions.',
    'recall_score': 'Recall literally is how many of the true positives were recalled (found), i.e. how many of the correct hits were also found.'
};

const result_description = "We have used 6 Supervised Machine Learning Algorithms, namely: Support Vector Machine, Decision Tree Classification, Logistic Regression, Naive Bayes Classification, Random Forest Algorithm, and K-Nearest Neighbors. The results are observed on the basis of 4 metrics of Precision, Recall, Accuracy and Processing Time.";

const algorithmDef = {
    'LogisticRegression': `It is a statistical analysis method to predict a categorical outcome based on prior observations of a dataset. The model predicts a dependent data variable by analysing the relationship between one or more existing independent variables.
    Logistic Regression has become an important tool in the discipline of machine learning. It allows algorithms used in machine learning applications to classify incoming data based on historical data. As additional relevant data comes in, the algorithms get better at predicting classifications within datasets.`,
    'SVM': `Support Vector Machine or SVM is one of the most popular Supervised learning algorithms, which is used for classification as well as regression problems. The goal of the SVM algorithm is to create the best line or decision boundary that can segregate n-dimensional space into classes so that we can  easily put the new data point in the correct category. This best decision boundary is called a hyperplane.`,
    'KNN': `KNN algorithm assumes the similarity between the new case/data and available cases and put the new case into the category that is most similar to the available categories. KNN algorithm stores all the available data and classifies a new data point based on the similarity. This means when new data appears then it can be easily classified into a well suited category by using the algorithm.`,
    'NaiveBayes': `Naive Bayes algorithm is a supervised learning algorithm, which is based on Bayes theorem and used for solving classification problems. It is mainly used in text classification that includes a high-dimensional training data. It is one of the simple and most effective classification algorithms which helps in building fast machine learning models that can make quick predictions.
    It is called “Naive” because it assumes that the occurrence of a certain feature is independent of the occurrence of other features. It is called “Bayes” because it depends on the principle of Bayes’ Theorem.`,
    'DecisionTree': `It is a Tree-Structured classifier, where internal nodes represent the features of a dataset, branches represent the decision rules and each leaf node represents the outcome. It is a graphical representation for getting all the possible solutions to a problem/decision based on given conditions.`,
    'RandomForest': `Random Forest algorithm is based on the concept of ensemble learning, which is a process of combining multiple classifiers to solve a complex problem and to improve the performance of the model. Random Forest is a classifier that contains a number of decision trees on various subsets of the given dataset and takes the average to improve the predictive accuracy of that dataset. The greater number of trees in the forest leads to higher accuracy and prevents the problem of over fitting.`
};

const initialYAttribute = 'precision_score';

export const Results = () => {
    const data = useData(jsonUrl);
    const [yAttribute, setYAttribute] = useState(initialYAttribute);
    const [hoveredLegend, setHoveredLegend] = useState(null);

    if (!data) {
        return <div>Loading...</div>
    }

    const xValue = d => d.algorithm
    const yValue = d => d[yAttribute]

    for (let i = 0; i < data.length; ++i) {
        if (lessThanMean[yAttribute]) {
            if (yValue(data[i]) < mean(data, yValue)) {
                data[i].color = '#e92533';
            } else {
                data[i].color = '#4e83ad';
            }
        } else {
            if (yValue(data[i]) > mean(data, yValue)) {
                data[i].color = '#e92533';
            } else {
                data[i].color = '#4e83ad';
            }
        }
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]).paddingInner(0.5).paddingOuter(0.4);
    const yScale = scaleLinear().domain([0, max(data, yValue)]).range([innerHeight, 0]);

    const filteredLegendData = data.filter(d => d.color === hoveredLegend);

    return (
        <div id="res">
            <div className="title-and-description">
                <div id="title">RESULTS</div>
                <div id="description">{result_description}</div>
            </div>
            <div id="results">
                <div id="display">
                    <SelectOptions yAttribute={yAttribute} setYAttribute={setYAttribute} valueToLabel={valueToLabel} />
                    <div id="factor-define">{factorDef[yAttribute]}</div>
                    <div id="table-and-define">
                        <div id="algorithm-define"></div>
                        <table id="tab"></table>
                    </div>
                </div>
                <div id='graph'>
                    <svg
                        width={width}
                        height={height}
                    >
                        <g transform={`translate(${margin.left},${margin.top})`} >
                            <AxisBottom xScale={xScale} innerHeight={innerHeight} innerWidth={innerWidth} axisMargin={margin.bottom} filteredByLegend={filteredLegendData} />
                            <AxisLeft yScale={yScale} innerHeight={innerHeight} axisMargin={-margin.left} yAttribute={yAttribute} label={valueToLabel.filter(d => d.value === yAttribute)[0].label} />
                            <Marks data={data} filteredByLegend={filteredLegendData} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} yAttribute={yAttribute} innerHeight={innerHeight} tooltipLeft={margin.left} valueToLabel={valueToLabel} algorithmDef={algorithmDef} />
                        </g>
                        <g transform={`translate(${innerWidth + 20}, ${margin.top})`}>
                            <Legends setHoveredLegend={setHoveredLegend} data={data} xValue={xValue} yValue={yValue} />
                        </g>
                    </svg>
                    <div id="tooltip">
                    </div>
                </div>
            </div>
        </div>
    );
}