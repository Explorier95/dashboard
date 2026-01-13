import StudentOverview from "./components/main/studentOverview.jsx";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import PieChart from "./components/main/pieOverview.jsx";
import Layout from "./components/Laylout.jsx"
import { ElementSquares } from "./components/styling/stylingVariants.jsx";
import Concepts from "./components/main/Concepts.jsx";
import Akkordeon from "./components/main/Akkordeon.jsx";
import summaryData from "./static/summaryData.json";
/*
*@description
*Main application for the IPN-Dashboard
*@author Fabian Tappendorf
*/

const App = () => {

  const akkordeonDataFromJSON = summaryData;

  return (

    <div className={ElementSquares.appMain}>

      {/* Importet Component */}
      <Header />

      {/* Dashboard Section */}
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

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;