import { useState } from 'react'
import { max, line, scaleLinear, scaleOrdinal } from 'd3';
import { useCsvData } from './useCsvData';

const csvUrl = "https://gist.githubusercontent.com/SiddharthMittal07/74bd1ff2fa92bda1e71c096f7a3ec94a/raw/8de10efe897eac8e1514f004667f6c50e1364dbf/all-cancer-by-type.csv";
const selectedCountry = "World";
const cancerTypes = ['Stomach', 'Lung', 'Breast', 'Brain', 'Liver'];
const margin = { top: 40, bottom: 30, left: 20, right: 20 };
const colors = ['#1a6a6b', '#b361b5', '#2fb171', '#58150e', '#7fb077'];
const source = "https://ourworldindata.org/cancer";

export const LineChart = ({ height, width }) => {
    const [hoveredValue, setHoveredValue] = useState(null);
    const data = useCsvData(csvUrl);

    if (!data) {
        return <div>Loading...</div>;
    }

    const newData = data.filter(d => d.Entity === selectedCountry);

    let columns = [];
    cancerTypes.forEach(type => {
        Object.keys(newData[0]).forEach(key => {
            if (key.toUpperCase().includes(type.toUpperCase())) {
                columns.push(key);
            }
        });
    });

    newData.forEach(data => {
        columns.forEach(col => data[col] = +data[col]);
    });

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let maxValue = 0;
    columns.forEach(col => {
        maxValue = Math.max(maxValue, max(newData, d => d[col]))
    });

    const xScale = scaleLinear().domain([1985, 2022]).range([innerWidth / 4, innerWidth]);
    const yScale = scaleLinear().domain([0, maxValue]).range([innerHeight, 0]);
    const colorScale = scaleOrdinal().domain(columns).range(colors);

    return (
        <div id="line-chart">
            <svg width={width} height={height} style={{ border: '1px solid black' }}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g transform={`translate(${innerWidth / 4}, 0)`}>
                        <line y2={innerHeight} stroke='#000' />
                    </g>
                    <g transform={`translate(${innerWidth / 4}, ${innerHeight})`}>
                        <line x2={innerWidth * 3 / 4} stroke='#000' />
                    </g>
                    <g>
                        {
                            xScale.ticks().map(tickValue => <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${innerHeight + 5})`}>
                                <line y1={-8} y2={-2} stroke='#000' />
                                <text style={{ textAnchor: 'middle' }} dy="0.71em">{tickValue}</text>
                            </g>)
                        }
                    </g>
                    <g>
                        {
                            yScale.ticks().map(tickValue => <g key={tickValue} transform={`translate(${innerWidth / 4 - 5}, ${yScale(tickValue)})`}>
                                <line x1={2} x2={8} stroke='#000' />
                                <text style={{ textAnchor: 'end' }} dy="0.32em">{tickValue}</text>
                            </g>)
                        }
                    </g>
                    <g opacity={hoveredValue ? 0.2 : 1}>
                        {
                            columns.map(column => <g key={column}>
                                <path d={line().x(d => xScale(d.Year)).y(d => yScale(d[column]))(newData)} stroke={colorScale(column)} strokeWidth="3" fill='none' />
                                {
                                    newData.map(data => <g key={data.Column + data.Year} transform={`translate(${xScale(data.Year)}, ${yScale(data[column])})`}>
                                        <circle r={3} style={{ fill: colorScale(column) }} />
                                    </g>)
                                }
                            </g>)
                        }
                    </g>
                    {
                        hoveredValue ?
                            <g opacity={hoveredValue ? 1 : 0}>
                                <path d={line().x(d => xScale(d.Year)).y(d => yScale(d[hoveredValue]))(newData)} stroke={colorScale(hoveredValue)} strokeWidth="7" fill='none' />
                                {
                                    newData.map(data => <g key={data.hoveredValue + data.Year} transform={`translate(${xScale(data.Year)}, ${yScale(data[hoveredValue])})`}>
                                        <circle r={3} style={{ fill: colorScale(hoveredValue) }} />
                                    </g>)
                                }
                            </g> : null
                    }
                    <g>
                        {
                            columns.map((column, index) => <g key={index} transform={`translate(0, ${innerHeight / 4 + index * 30})`} onMouseEnter={() => setHoveredValue(column)} onMouseLeave={() => setHoveredValue(null)}>
                                <rect width={20} height={15} fill={colorScale(column)} />
                                <text style={{ anchorText: 'end' }} dx={25} dy="0.82em">{cancerTypes[index] + ' Cancer'}</text>
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