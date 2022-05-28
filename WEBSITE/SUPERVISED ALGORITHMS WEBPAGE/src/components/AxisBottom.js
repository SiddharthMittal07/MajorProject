export const AxisBottom = ({ xScale, innerHeight, innerWidth, axisMargin, filteredByLegend }) => {

    return (
        <>
            {
                xScale.domain().map(tickValue => {
                    const fontWeight = filteredByLegend.some(d => d.algorithm === tickValue) ? 'bold' : '400';

                    return (<g className='tick' key={tickValue} transform={`translate(${xScale(tickValue)}, ${innerHeight})`}>
                        <text
                            dy="0.71em"
                            y={5}
                            style={{ textAnchor: 'middle', fontWeight: fontWeight }}
                        >{tickValue}</text>
                        <line
                            y1={-2}
                            y2={3}
                            stroke='black'
                        />
                    </g>);
                })
            }
            <g className='axis-label' transform={`translate(0,${innerHeight})`}>
                <line
                    x2={innerWidth}
                    stroke='black'
                />
                <text x={innerWidth / 2} style={{ textAnchor: 'middle' }} y={axisMargin / 1.3}>Algorithms</text>
            </g>
        </>
    );
}
