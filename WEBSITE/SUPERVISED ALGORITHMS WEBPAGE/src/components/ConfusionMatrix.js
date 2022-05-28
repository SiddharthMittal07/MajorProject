import { select } from 'd3';

export const ConfusionMatrix = ({ confusion_matrix, initialText }) => {
    return (
        <div id="confusion-matrix">
            <table>
                <thead>
                    <tr>

                        <th></th>
                        <th>Brain Cancer Present</th>
                        <th>Brain Cancer Absent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>Brain Cancer Present</td>
                        <td
                            style={{ backgroundColor: '#4caf50' }}
                            onMouseEnter={() => select('#sens-spec').text('TRUE POSITIVES')}
                            onMouseLeave={() => select('#sens-spec').text(initialText)}>
                            {confusion_matrix[0][0]}</td>
                        <td style={{ backgroundColor: '#d30047' }} onMouseEnter={() => select('#sens-spec').text('FALSE POSITIVES')} onMouseLeave={() => select('#sens-spec').text(initialText)}>{confusion_matrix[0][1]}</td>
                    </tr>
                    <tr>
                        <td>Brain Cancer Absent</td>
                        <td style={{ backgroundColor: '#d30047' }} onMouseEnter={() => select('#sens-spec').text('FALSE NEGATIVES')} onMouseLeave={() => select('#sens-spec').text(initialText)}>{confusion_matrix[1][0]}</td>
                        <td style={{ backgroundColor: '#4caf50' }} onMouseEnter={() => select('#sens-spec').text('TRUE NEGATIVES')} onMouseLeave={() => select('#sens-spec').text(initialText)}>{confusion_matrix[1][1]}</td>
                    </tr>
                </tbody>
            </table>
            <div id="sens-spec">{initialText}</div>
        </div>
    );
}