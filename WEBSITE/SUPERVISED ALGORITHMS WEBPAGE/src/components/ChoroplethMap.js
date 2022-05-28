import { useState, useEffect } from 'react';
import { json, max, select, geoNaturalEarth1, geoPath, interpolateYlOrRd, scaleSequential } from 'd3';
import { feature } from 'topojson';

import { useCsvData } from './useCsvData';

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const dataUrl = "https://gist.githubusercontent.com/SiddharthMittal07/74bd1ff2fa92bda1e71c096f7a3ec94a/raw/8de10efe897eac8e1514f004667f6c50e1364dbf/all-cancer-by-type.csv";
const codesUrl = "https://gist.githubusercontent.com/SiddharthMittal07/762e6e1ce1f504f254ddcd5cb58b8276/raw/9ddc0eaa651fde15f5177a154ccc03d7e488e47a/iso-3166-country-codes.csv";
const source = "https://ourworldindata.org/cancer";

export const ChoroplethMap = ({ height, width }) => {
    const [atlasData, setAtlasData] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2019);
    const codes = useCsvData(codesUrl);
    const data = useCsvData(dataUrl);
    const [hoveredCountry, setHoveredCountry] = useState(null);

    useEffect(() => {
        json(jsonUrl).then(topojsonData => {
            const { countries } = topojsonData.objects;
            setAtlasData(feature(topojsonData, countries));
        });
    }, []);

    if (!atlasData || !codes || !data) {
        return <div>Loading..</div>;
    }

    const codeMap = new Map();
    codes.forEach(code => codeMap.set(code['country-code'], code['alpha-3']));

    const newData = data.filter(d => +d.Year === selectedYear);
    const dataMap = new Map();
    newData.forEach(d => dataMap.set(d.Code, d));

    const colorValue = d => d['Deaths - Brain and central nervous system cancer - Sex: Both - Age: All Ages (Number)'];
    const colorScale = scaleSequential(interpolateYlOrRd).domain([0, max(newData, colorValue)])

    const projection = geoNaturalEarth1().scale(width / 1.7 / Math.PI).translate([width / 2, height / 2]);
    const path = geoPath(projection);

    const maxValue = max(newData, colorValue);
    let domains = [];
    for (let i = 0; i <= maxValue; i += parseInt(maxValue / 5)) {
        domains.push(i);
    }

    return (
        <div id="choropleth-map">
            <svg width={width} height={height} style={{ border: '1px solid black' }}>
                <g>
                    {
                        atlasData.features.map((feature, i) => {
                            const code = codeMap.get(feature.id);
                            const country = dataMap.get(code);
                            return (
                                <g key={i} onMouseEnter={() => {
                                    if (country) {
                                        select('#map-tooltip').append('span').text(country.Entity + ' - Total Deaths(' + selectedYear + '): ' + colorValue(country));
                                        setHoveredCountry(country.Code);
                                    }
                                }} onMouseLeave={() => {
                                    if (country) {
                                        select('#map-tooltip').selectAll('span').remove();
                                        setHoveredCountry(null);
                                    }
                                }}>
                                    <path d={path(feature)} fill={country ? colorScale(colorValue(country)) : '#fff'} style={{ stroke: country ? hoveredCountry === country.Code ? '#000' : '#fff' : '#fff' }} />
                                </g>
                            );
                        }
                        )
                    }
                </g>
                <g transform={`translate(20, ${height / 2})`}>
                    {
                        domains.map((d, i) => <g key={i}><rect y={i * 20} width={20} height={15} fill={colorScale(d)} /></g>)
                    }
                </g>
                <g transform={`translate(5, ${height - 15})`}>
                    <text style={{ fontWeight: '300' }}>Source: {source}</text>
                </g>
            </svg>
            <div id="map-tooltip" style={{ top: 0.8 * height }}></div>
            <div id="range-slider">
                <label htmlFor="slider">{selectedYear}</label>
                <input type="range" value={selectedYear} name="slider" id="slider" min="1990" max="2019" onChange={(e) => setSelectedYear(parseInt(e.target.value))} />
            </div>
        </div>
    );
}