import React from 'react'
import { FaGithub, FaInstagramSquare, FaTwitter, FaFacebook, FaServer, FaDatabase, FaLinkedin, FaRegChartBar, FaReadme } from 'react-icons/fa';

const motivationText = "Cancer is the second-leading cause of death in the world. India is reporting over 13 lakh deaths every year due to cancer. This project will help in providing cancer detection related medical help in remote areas or areas where such facilities aren’t available. This will also save a lot of time as well as reduces the probability of human error.";

export const Footer = () => {
    return (
        <div id="footer">
            <div id="column">

                <div id="github-link">
                    <a href="https://github.com/SiddharthMittal07/MajorProject/tree/main/Dataset"><FaDatabase id="logo" /> <span>Dataset</span> </a>
                    <a href="https://github.com/SiddharthMittal07/MajorProject/tree/main/ML%20Algorithms"><FaGithub id="logo" /> <span>Jupyter Notebooks of all Algorithms</span> </a>
                    <a href="https://gist.githubusercontent.com/SiddharthMittal07/3c7afd2a88faa690291f9474b60483b6/raw/f2977fdbd8bf4fbd78878e773582ef75f75340ac/major_project_algorithms.json"><FaRegChartBar id="logo" /> <span>Result Statistics for Infographics</span> </a>
                    <a href="https://gist.githubusercontent.com/SiddharthMittal07/554b26ec04129f393e2fc59c82c0f1d3/raw/871224e25d4eb30b19eb7c2a945f7db0af405787/major_project_define.json"><FaReadme id="logo" /> <span>Algorithm Definitions and Content</span> </a>
                </div>
                <ul id="members">
                    <li id="title">Team Members:</li>
                    <li><a href="https://www.linkedin.com/in/siddharth-mittal-614172181/"><FaLinkedin id="logo" /> <span>Siddharth Mittal</span></a></li>
                    <li><a href="https://www.linkedin.com/in/siddharth-mittal-614172181/"><FaLinkedin id="logo" /> <span>Shreyansh Yadav</span></a></li>
                    <li><a href="https://www.linkedin.com/in/siddharth-mittal-614172181/"><FaLinkedin id="logo" /> <span>Shubham Rawat</span></a></li>
                    <li><a href="https://www.linkedin.com/in/siddharth-mittal-614172181/"><FaLinkedin id="logo" /> <span>Devashree Sharma</span></a></li>
                </ul>
            </div>
            <div id="temp">
                <div id="motivation">
                    <span>Motivation Behind the Project</span>
                    <span>{motivationText}</span>
                </div>
                <a href="https://mlalgorithmsapi.herokuapp.com/prediction"><FaServer id="logo" /> <span>API Link</span> </a>
                <div id="socials">
                    <FaInstagramSquare id="instagram" />
                    <FaTwitter id="twitter" />
                    <FaFacebook id="facebook" />
                </div>
            </div>
            <div id="mobile">
                <img src="devices.jpg" alt="Mobile First" />
                <span>Download our Mobile App for a better experience on Android and IOS smartphones</span>
            </div>
        </div>
    );
}