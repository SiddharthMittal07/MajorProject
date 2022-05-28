import { ConfusionMatrix } from '../components/ConfusionMatrix';

const AlgorithmDefine = ({ data, index }) => {
    const sensitivity = data.confusion_matrix[0][0] / (data.confusion_matrix[0][0] + data.confusion_matrix[1][0]) * 100;
    const specificity = data.confusion_matrix[1][1] / (data.confusion_matrix[1][1] + data.confusion_matrix[0][1]) * 100;
    const initialText = `SENSITIVITY: ${sensitivity.toFixed(2)}% ;  SPECIFICITY: ${specificity.toFixed(2)}%`;

    return (
        <div id="algorithm-def">
            <div id="title-define-matrix">
                <div id="title-and-define">
                    <div id="title">{data.algorithm}</div>
                    <div id="define">{data.information.main}</div>
                </div>
                <div id="matrix">
                    <ConfusionMatrix confusion_matrix={data.confusion_matrix} initialText={initialText} />
                </div>
            </div>
            <div id="cols3">
                <div className="points">
                    <span id="title">Applications:</span>
                    {data.information.applications.map((d, i) => <span key={i}>- {d}</span>)}
                </div>
                <div className="points">
                    <span id="title">Pros:</span>
                    {data.information.pros.map((d, i) => <span key={i}>- {d}</span>)}
                </div>
                <div className="points">
                    <span id="title">Cons:</span>
                    {data.information.cons.map((d, i) => <span key={i}>- {d}</span>)}
                </div>
            </div>
        </div>
    );
}

export default AlgorithmDefine;