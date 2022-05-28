import { useState } from 'react';
import { arc, pie, select, scaleOrdinal } from 'd3';

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const width = parseInt(windowWidth * 0.3125);
const height = parseInt(windowHeight * 0.426);
const margin = { top: width / 60, left: 0, right: width / 4, bottom: width / 60 };

let firstTime = true;

const apiUrl = "https://mlalgorithmsapi.herokuapp.com/prediction";
const uploadDescription = "Test our Supervised Machine Learning Algorithms by uploading an MRI Image of a brain and check the results. The server returns the results of all 6 algorithms and they are displayed as a Donut Chart. The final prediction depends on the result of all algorithms.";

export const Upload = () => {

    const [picture, setPicture] = useState({});
    const [results, setResults] = useState([]);
    const [hoverLegend, setHoverLegend] = useState(null);

    const uploadPicture = (e) => {
        console.log(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);

        setResults([]);
        setPicture({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        });
    };

    const setImageAction = async (event) => {
        event.preventDefault();
        firstTime = false;
        select("#loading").style('visibility', 'visible');
        const formData = new FormData();
        formData.append("upImage", picture.pictureAsFile);
        const data = await fetch(apiUrl, {
            method: "post",
            header: {
                "Content-Type": "multipart/form-data"
            },
            body: formData,
        });
        const response = await data.json();
        select("#loading").style('visibility', 'hidden');
        setResults(response);
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const innerRadius = width / 4;
    const outerRadius = width / 6;
    const colorScale = scaleOrdinal().domain(results.map(r => r.result)).range(['red', 'blue', 'green', 'yellow']);
    const ar = arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const hoveredArc = arc().innerRadius(innerRadius + 10).outerRadius(outerRadius - 10);

    let data = {};
    results.forEach(d => {
        if (!data.hasOwnProperty(d.result)) {
            data[d.result] = 0;
        }
        data[d.result] += 1;
    });
    data = Object.entries(data);
    const pi = pie().padAngle(0.04).value(d => d[1]);
    const arcs = pi(data);
    const filteredArcs = arcs.filter(d => d.data[0] === hoverLegend);

    let predictions = {};
    results.forEach(res => {
        if (!predictions.hasOwnProperty(res.result)) {
            predictions[res.result] = 0;
        }
        predictions[res.result] += 1;
    });

    let pred = [];
    Object.keys(predictions).forEach(key => pred.push([key, predictions[key]]));
    pred.sort(function (a, b) {
        return b[1] - a[1];
    });

    return (
        <div id="upload">
            <div className="title-and-description">
                <div id="title">UPLOAD</div>
                <div id="description">{uploadDescription}</div>
            </div>
            {
                firstTime ?
                    <div id="outer-upload">

                        <div className="upload-form">
                            <label htmlFor="image-input">Upload MRI Image</label>
                            <form onSubmit={setImageAction}>
                                <input type="file" name="upImage" onChange={uploadPicture} id="image-input" />
                                <button className="btn" type="submit" name="upload">Upload</button>
                            </form>
                        </div>
                        <div id="loading">
                            <div className="loader">

                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    :
                    <div id="outer-upload">

                        <div id="img-result">
                            <div className="image-and-form">
                                <img id="image" src={picture.picturePreview} alt="MRI" />
                                <div id="form">
                                    <label htmlFor="image-input">Upload MRI Image</label>
                                    <form onSubmit={setImageAction}>
                                        <input type="file" name="upImage" onChange={uploadPicture} id="image-input" />
                                        <button className="btn" type="submit" name="upload">Upload</button>
                                    </form>
                                </div>
                            </div> {
                                results.length === 0 ? null :
                                    <div className="upload-results">
                                        <svg width={width} height={height}>
                                            <g transform={`translate(${margin.left}, ${margin.top})`}>
                                                <g transform={`translate(${innerWidth / 2}, ${innerHeight / 2})`}>
                                                    <g opacity={hoverLegend === null ? '1' : '0.2'}>
                                                        {
                                                            arcs.map((d, i) => <path key={i} d={ar(d)} fill={colorScale(d.data[0])} onMouseEnter={() => {
                                                                setHoverLegend(d.data[0]);
                                                                const tooltip = select('.upload-results').select('#tooltip');
                                                                tooltip.text(Math.round(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100) + '%').style('top', innerHeight / 2 - 35 + 'px').style('left', innerWidth / 2 - 50 + 'px').style('visibility', 'visible').style('background-color', colorScale(d.data[0])).classed('circleTooltip', true);
                                                            }} onMouseLeave={() => {
                                                                setHoverLegend(null);
                                                                const tooltip = select('.upload-results').select('#tooltip');
                                                                tooltip.classed('circleTooltip', false);
                                                                tooltip.text(null).style('visibility', 'hidden');
                                                            }} />)
                                                        }
                                                    </g>
                                                    {
                                                        hoverLegend !== null && filteredArcs.map((d, i) => <path key={i} d={hoveredArc(d)} fill={colorScale(d.data[0])} onMouseEnter={() => {
                                                            setHoverLegend(d.data[0]);
                                                            const tooltip = select('.upload-results').select('#tooltip');
                                                            tooltip.text(Math.round(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100) + '%').style('top', innerHeight / 2 + 'px').style('left', innerWidth / 2 + 'px').style('transform', 'translate(-50%, -50%)').style('visibility', 'visible').classed('circleTooltip', true);
                                                        }} onMouseLeave={() => {
                                                            setHoverLegend(null);
                                                            const tooltip = select('.upload-results').select('#tooltip');
                                                            tooltip.classed('circleTooltip', false);
                                                            tooltip.text(null).style('visibility', 'hidden');
                                                        }} />)
                                                    }
                                                </g>
                                            </g>
                                            <g transform={`translate(${innerWidth - margin.right / 3}, ${margin.top * 4})`}>
                                                {
                                                    colorScale.domain().map((d, i) => <g key={i} onMouseEnter={() => {
                                                        setHoverLegend(d);
                                                        const tooltipValues = results.filter(r => r.result === d);
                                                        const tooltip = select('.upload-results').select('#tooltip');
                                                        tooltipValues.map(value => tooltip.append('span').text(value.algorithm))
                                                        tooltip.style('visibility', 'visible').style('top', innerHeight / 2 + 'px').style('left', width * 4 / 5 + 'px').style('background-color', 'white');
                                                    }} onMouseLeave={() => {
                                                        setHoverLegend(null);
                                                        const tooltip = select('.upload-results').select('#tooltip');
                                                        tooltip.selectAll('span').remove();
                                                        tooltip.style('visibility', 'hidden');
                                                    }}>
                                                        <rect width={20} height={10} y={i * 20} fill={colorScale(d)} />
                                                        <text y={i * 20} dy="0.71em" x={25} style={{ textAnchor: 'start' }} fill='#000'>{d}</text>
                                                    </g>)
                                                }
                                            </g>
                                            <g transform={`translate(${innerWidth / 2}, ${innerHeight})`}>
                                                <text style={{ fontWeight: '600' }}>Prediction: {pred[0][0]}</text>
                                            </g>
                                        </svg>
                                        <div id="tooltip"></div>
                                    </div>
                            }
                        </div>
                        <div id="loading">
                            <div className="loader">

                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}