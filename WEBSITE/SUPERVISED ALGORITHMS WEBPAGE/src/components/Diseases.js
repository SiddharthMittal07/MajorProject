import { max, scaleBand, scaleLinear, scaleOrdinal } from 'd3';
import { useCsvData } from './useCsvData';

const csvUrl = "https://gist.githubusercontent.com/SiddharthMittal07/8dcf418025b3e9975f0a61407f929eda/raw/aac00303d56e7a41096dee9401adbfde73b4c6c2/deaths-diseases.csv";
const selectedYear = 2019;
const margin = { left: 10, right: 30, top: 40, bottom: 30 };
const colors = ['#1a6a6b', '#3707aa', '#b361b5', '#7728fa', '#2fb171', '#acaefa', '#58150e', '#db212d', '#7fb077', '#8d9b95'];
const source = "https://ourworldindata.org/cancer";
const selectedCountry = "India";

const xTickFormat = (tickValue) => {
    if (tickValue > 1000000) {
        return tickValue.toString().slice(0, 1) + '.' + tickValue.toString().slice(1, 2) + 'M';
    } else if (tickValue > 100000) {
        return tickValue.toString().slice(0, 3) + 'K';
    } else if (tickValue > 10000) {
        return tickValue.toString().slice(0, 2) + 'K';
    } else if (tickValue > 1000) {
        return tickValue.toString().slice(0, 1) + '.' + tickValue.toString().slice(1, 2) + 'K';
    } else {
        return tickValue;
    }
}

export const Diseases = ({ height, width }) => {
    const data = useCsvData(csvUrl);

    if (!data) {
        return <div>Loading...</div>;
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const newData = data.filter(d => +d.Year === selectedYear && d.Entity === selectedCountry);
    const keys = Object.keys(newData[0]).filter(d => d.includes("Deaths -"));

    let domainData = [];
    keys.forEach(key => domainData.push([key, +newData[0][key]]));
    domainData.sort(function (a, b) {
        return b[1] - a[1];
    });
    domainData = domainData.slice(0, 10);
    const domainValues = domainData.map(d => d[0].split('-')[1].trim());

    const yScale = scaleBand().domain(domainValues).range([0, innerHeight]).paddingInner(0.2).paddingOuter(0.6);
    const xScale = scaleLinear().domain([0, max(domainData, d => d[1])]).range([0, innerWidth * 3 / 4]);
    const colorScale = scaleOrdinal().domain(domainValues).range(colors);

    return (
        <div id="diseases">
            <svg width={width} height={height} style={{ border: '1px solid black' }}>
                <g transform={`translate(${margin.left + width / 4}, ${margin.top})`}>
                    <g>
                        {
                            domainData.map(d => {
                                const key = d[0].split('-')[1].trim();
                                const value = d[1];
                                return (<g key={key} transform={`translate(0, ${yScale(key)})`}>
                                    <rect y={-yScale.bandwidth() / 2} width={xScale(value)} height={yScale.bandwidth()} fill={colorScale(key)} />
                                    <text style={{ textAnchor: 'middle', stroke: '#fff' }} dy="0.32em" dx={xScale(value) / 2}>{value}</text>
                                </g>);
                            })
                        }
                    </g>
                    <g>
                        <line y2={innerHeight} stroke='#000' />
                    </g>
                    <g transform={`translate(0, ${innerHeight})`}>
                        <line x2={innerWidth * 3 / 4} stroke='#000' />
                    </g>
                    <g>
                        {
                            xScale.ticks().map(tickValue => <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${innerHeight + 10})`}>
                                <line y1={-15} y2={-5} stroke='#000' />
                                <text style={{ textAnchor: 'middle' }} dy="0.71em">{xTickFormat(tickValue)}</text>
                            </g>)
                        }
                    </g>
                    <g>
                        {
                            yScale.domain().map(tickValue => <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                                <line x1={-5} x2={5} stroke='#000'></line>
                                <text style={{ textAnchor: 'end', fontWeight: tickValue === 'Cancers' ? 'bold' : '400' }} dy="0.32em" dx="-0.71em">{tickValue.length < 30 ? tickValue : tickValue.slice(0, 25) + '...'}</text>
                            </g>)
                        }
                    </g>
                </g>
                <g transform={`translate(${innerWidth}, ${margin.top / 2})`}>
                    <text style={{ fontWeight: '300', textAnchor: 'end' }}>Source: {source}</text>
                </g>
            </svg>
        </div >
    );
}