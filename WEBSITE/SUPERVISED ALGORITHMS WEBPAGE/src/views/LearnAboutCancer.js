import { useState } from 'react';
import { ChoroplethMap } from '../components/ChoroplethMap';
import { Diseases } from '../components/Diseases';
import { LineChart } from '../components/LineChart';

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const sizeFactor = 0.47;
const width = parseInt(windowWidth * sizeFactor);
const height = parseInt(windowHeight * sizeFactor);

const description = "Brain tumors refer to the unusual and uncontrollable cell growth in the brain which causes more pressure inside the restricted space in the skull. Since the brain is confined in the bony skull, it cannot inflate to make space for the uncontrollable growth which results in the squashing of normal brain tissues. This unorthodox growth causes life-threatening complications by damaging the brain.";

export const LearnAboutCancer = () => {
    const [index, setIndex] = useState(0);

    const graphics = [
        <ChoroplethMap height={height} width={width} />,
        <LineChart height={height} width={width} />,
        <Diseases height={height} width={width} />
    ];

    const graphicDefinitions = [
        'Choropleth Map provides an easy way to visualize how the Amount of Deaths due to Brain Cancer varies across the world over the years. The legend displayed on the bottom-left side maps the color intensities to the magnitude of deaths',
        'The Line Chart displays the change in Deaths due to the Top-5 types of Cancer over time. The Top-5 Cancers include Stomach Cancer, Lung Cancer, Breast Cancer, Brain Cancer and Liver Cancer for the timeline 1985-2019.',
        'The Bar Chart shows the Top-10 ranked types of Diseases based on their impact and Death Count.'
    ];

    return (
        <div id="outer-cancer">
            <div id="cancer">

                <div id="learn-about-cancer">
                    <div className="title-description">
                        <div id="title">A Little Bit about Cancer!</div>
                        <div id="description">{description}</div>
                    </div>
                    <div className="out-infographics">
                        <button
                            className="nav-button"
                            type="button"
                            onClick={() => {
                                if (index > 0) {
                                    setIndex(cur => cur - 1);
                                }

                            }}
                            disabled={index === 0}
                        >&lt;</button>
                        <div className="infographics">
                            <div id="graphics">
                                {graphics[index]}
                            </div>
                            <div id="define">{graphicDefinitions[index]}</div>
                        </div>
                        <button
                            className="nav-button"
                            type="button"
                            onClick={() => {
                                if (index < graphics.length - 1) {
                                    setIndex(cur => cur + 1);
                                }
                            }}
                            disabled={index === graphics.length - 1}
                        >&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}