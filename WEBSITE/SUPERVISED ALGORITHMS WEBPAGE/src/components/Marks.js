import { select } from 'd3';

export const Marks = ({ data, xScale, yScale, xValue, yValue, yAttribute, innerHeight, tooltipLeft, valueToLabel, filteredByLegend, algorithmDef }) => {

    return (
        <>
            <g opacity={filteredByLegend.length === 0 ? "1" : "0.2"}>
                {
                    data.map((d, i) =>
                        <g
                            key={i}
                            className='bar'
                            transform={`translate(${xScale(xValue(d))}, ${yScale(yValue(d))})`}
                            onMouseEnter={() => {
                                valueToLabel.map(({ value, label }) =>
                                    select('#tooltip').append('span').text(label + ' : ' + d[value].toFixed(2)).style('font-weight', () => value === yAttribute ? 'bold' : '400')
                                )
                                select('#tooltip').style('top', innerHeight / 2 + 'px');
                                select('#tooltip').style('left', xScale(d.algorithm) + tooltipLeft + 'px');
                                select('#tooltip').style('visibility', 'visible');

                                select('#algorithm-define').append('span').text(algorithmDef[xValue(d)]);
                                select('#algorithm-define').style('visibility', 'visible');
                            }}
                            onMouseLeave={() => {
                                select('#tooltip').selectAll('span').remove();
                                select('#tooltip').style('visibility', 'hidden');

                                select('#algorithm-define').selectAll('span').remove();
                                select('#algorithm-define').style('visibility', 'hidden');
                            }}
                        >
                            <rect
                                x={-xScale.bandwidth() / 2}
                                width={xScale.bandwidth()}
                                height={innerHeight - yScale(yValue(d))}
                                fill={d.color}
                            />
                        </g>)
                }
            </g>
            {
                filteredByLegend.map((d, i) =>
                    <g
                        key={i}
                        transform={`translate(${xScale(xValue(d))}, ${yScale(yValue(d))})`}
                    >
                        <rect
                            x={-xScale.bandwidth() / 2}
                            width={xScale.bandwidth()}
                            height={innerHeight - yScale(yValue(d))}
                            fill={d.color}
                        />
                    </g>)
            }
        </>
    );
}
