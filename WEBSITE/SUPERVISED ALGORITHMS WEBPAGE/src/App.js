import { Header } from "./views/Header";
import { Results } from "./views/Results";
import { Upload } from "./views/Upload";
import { LearnAboutCancer } from "./views/LearnAboutCancer";
import { Footer } from "./views/Footer";
import { Algorithms } from "./views/Algorithms";

function App() {
  return (
    <>
      <div id="big-screens">
        <Header />
        <LearnAboutCancer />
        <Results />
        <Algorithms />
        <Upload />
        <Footer />
      </div>
      <div id="small-screens">
        <div id="img">
          <img src="devices.jpg" alt="Mobile First" />
          <span>Download our Mobile App for a better experience on Android and IOS smartphones</span>
        </div>
      </div>
    </>
  );
}

export default App;
