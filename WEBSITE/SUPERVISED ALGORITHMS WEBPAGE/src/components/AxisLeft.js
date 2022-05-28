export const AxisLeft = ({ yScale, innerHeight, axisMargin, yAttribute, label }) => {
    return (
        <>
            {
                yScale.ticks().map(tickValue => <g className='tick' key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                    <text
                        x={-5}
                        dy="0.32em"
                        style={{ textAnchor: 'end' }}
                    >{tickValue}</text>
                    <line
                        x1={-3}
                        x2={2}
                        stroke='black'
                    />
                </g>)
            }
            <g className='axis-label' transform={`translate(0,0)`}>
                <line
                    stroke='black'
                    y2={innerHeight}
                />
                <text
                    transform={`translate(${axisMargin / 1.8},${innerHeight / 2}) rotate(-90)`}
                    style={{ textAnchor: 'middle' }}
                >{label}</text>
            </g>
        </>
    );
}