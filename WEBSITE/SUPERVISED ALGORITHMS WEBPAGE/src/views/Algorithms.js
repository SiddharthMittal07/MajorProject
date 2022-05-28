import { useState } from 'react';
import { useData } from '../components/useData';
import AlgorithmDefine from "../components/AlgorithmDefine";

const jsonUrl = 'https://gist.githubusercontent.com/SiddharthMittal07/554b26ec04129f393e2fc59c82c0f1d3/raw/871224e25d4eb30b19eb7c2a945f7db0af405787/major_project_define.json';
const resultsUrl = 'https://gist.githubusercontent.com/SiddharthMittal07/3c7afd2a88faa690291f9474b60483b6/raw/c52aa3e8f2b870591d5fccd0957f236ee6141452/major_project_algorithms.json';

function modifyTitle(title) {
    if (title.length > 8) {
        let letters = title.split('');
        let modifiedTitle = '';
        for (let i = 0; i < letters.length; i++) {
            if (i !== 0 && letters[i] === letters[i].toUpperCase()) {
                modifiedTitle += ('\n' + letters[i]);
            } else {
                modifiedTitle += letters[i];
            }

        }
        return modifiedTitle
    }
    return title;
}

export const Algorithms = () => {
    const data = useData(jsonUrl);
    const results = useData(resultsUrl);
    const [index, setIndex] = useState(0);

    if (!data || !results) {
        return <div>Loading..</div>;
    }

    return (
        <div id="algorithms-and-tables">
            <div id="outside-algorithms">
                <div id="algorithms">
                    {
                        !data ? <h1>Loading....</h1> : <AlgorithmDefine data={data[index]} index={index} />
                    }
                </div>
                <div className="items">
                    <button
                        className="nav-button"
                        disabled={index === 0}
                        onClick={() => {
                            if (data && index > 0) {
                                setIndex(cur => cur - 1)
                            }
                        }}
                    >&lt;</button>
                    <button
                        className="nav-button"
                        disabled={data && index === data.length - 1}
                        onClick={() => {
                            if (data && index < data.length - 1) {
                                setIndex(cur => cur + 1)
                            }
                        }}
                    >&gt;</button>
                </div>
            </div>

            <div id="table">
                <table>
                    <thead>
                        <tr>
                            <th>ALGORITHM</th>
                            <th>ACCURACY</th>
                            <th>PRECISION</th>
                            <th>PROCESSING TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((result) => <tr>
                                <td>{modifyTitle(result['algorithm'])}</td>
                                <td>{result['testing_accuracy'].toFixed(2)}%</td>
                                <td>{result['precision_score'].toFixed(2)}</td>
                                <td>{result['time'].toFixed(2)}s</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}