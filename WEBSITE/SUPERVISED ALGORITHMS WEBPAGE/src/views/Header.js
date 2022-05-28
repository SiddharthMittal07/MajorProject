export const Header = () => {
    return (
        <div className="outer-header">
            <div id="image"></div>
            <div className="header">
                <div id="logo">Major  Project</div>
                <div className="nav">
                    <ul>
                        <li><a href="#learn-about-cancer">About</a></li>
                        <li><a href="#res">Results</a></li>
                        <li><a href="#algorithms">Algorithms</a></li>
                        <li><a href="#upload">Upload</a></li>
                        <li><a href="#footer">Team</a></li>
                    </ul>
                </div>
            </div>
            <div id="description">Predictive Analysis for Brain Cancer Detection using Machine Learning Techniques</div>
            <a href="#upload"><div id="header-btn">Try It Yourself</div></a>
        </div>
    );
}