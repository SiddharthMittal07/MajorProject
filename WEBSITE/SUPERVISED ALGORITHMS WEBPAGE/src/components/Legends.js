import { select, mean } from 'd3';

export const Legends = ({ setHoveredLegend, data, xValue, yValue }) => {
    return (
        <>
            {
                ['#e92533', '#4e83ad'].map((d, i) =>
                    <g key={i} transform={`translate(0, ${(i + 1) * 30})`}
                        onMouseEnter={(e) => {
                            setHoveredLegend(d)

                            const filteredData = data.filter(data => data.color === d);
                            const table = select('#tab');
                            const thead = table.append('tr');
                            filteredData.map(data => thead.append('th').text(xValue(data)));
                            thead.append('th').text('Average');
                            const tbody = table.append('tr');
                            filteredData.map(data => tbody.append('td').text(yValue(data).toFixed(2)).style('background-color', d).style('color', 'white'));
                            tbody.append('td').text(mean(data, yValue).toFixed(2)).style('background-color', 'green').style('color', 'white');

                            table.style('visibility', 'visible');
                        }}
                        onMouseLeave={() => {
                            setHoveredLegend(null)

                            select('#tab').selectAll('tr').remove();
                            select('#tab').selectAll('th').remove();
                            select('#tab').selectAll('td').remove();
                            select('#tab').style('visibility', 'hidden');
                        }}
                    >
                        <rect
                            width={20}
                            height={20}
                            fill={d}
                        />
                        <text
                            x={20 + 5}
                            style={{ textAnchor: 'start' }}
                            y={10 + 5}
                        >{d === '#e92533' ? 'Inefficient' : 'Efficient'}</text>
                    </g>)
            }
        </>
    );
}
