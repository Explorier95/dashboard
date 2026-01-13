import StudentOverview from "./components/main/studentOverview.jsx";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import PieChart from "./components/main/pieOverview.jsx";
import Layout from "./components/Laylout.jsx"
import { ElementSquares } from "./components/styling/stylingVariants.jsx";
import Concepts from "./components/main/Concepts.jsx";
import Akkordeon from "./components/main/Akkordeon.jsx";
import summaryData from "./static/summaryData.json";
import { useState } from "react";
/*
*@description
*Main application for the IPN-Dashboard
*@author Fabian Tappendorf
*/

const App = () => {

  const akkordeonDataFromJSON = summaryData;
  const [activeView, setActiveView] = useState(null);

  const toggleView = (viewName) => {
    setActiveView(prevView => prevView === viewName ? null : viewName);
  };

  return (

    <div className={ElementSquares.appMain}>

      {/* Importet Component */}
      <Header />

      {/* Selection  */}


      <div className={ElementSquares.selectionBody}>
        <button
          className={ElementSquares.selectionData}
          onClick={() => toggleView('overview')}
        >
          Klassenübersicht
        </button>

        <button
          className={ElementSquares.selectionData}
          onClick={() => toggleView('focus')}
        >
          Schüler-Fokus
        </button>

        <button
          className={ElementSquares.selectionData}
          onClick={() => toggleView('conversation')}
        >
          Konversationen
        </button>
      </div>


      {/* Dashboard Section */}
      {activeView === 'overview' ?
        <div className="">
          <Layout>
            <StudentOverview />

            <PieChart
              richtig={6}
              falsch={4}
              richtigNachHilfe={2}
            />

            <Concepts
              concepts={[
                { title: "Kolenstoffkreislauf", value: 0.65 },
                { title: "Photosynthese", value: 0.78 },
                { title: "Treibhauseffekt", value: 0.53 }
              ]} />

            <Akkordeon
              content={akkordeonDataFromJSON}
            />
          </Layout>

        </div>
        : activeView === "focus" ? <p>HIER IST DER FOKUS!</p>
          : activeView === "conversation" ? <p>HIER SIND DIE KONVERSATIONEN!</p>
            : <p>KEIN KNOPF GEDRÜCKT</p>}
      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;