import StudentOverview from "./components/main/studentOverview.jsx";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import MotionExamples from "./examples/motionExamples"
import PieChart from "./components/main/pieOverview.jsx";
import SlidingSquare from "./components/slidingSquare.jsx"
import { ElementSquares, gridElements } from "./components/styling/stylingVariants.jsx";
import Concepts from "./components/main/Concepts.jsx";
import OverView from "./components/main/OverView.jsx";
/*
*Application for the IPN-Dashboard
*@author Fabian Tappendorf
*/


const App = () => {

  return (

    <div className={ElementSquares.appMain}>

      {/* Importet Component */}
      <Header />
      {/* Importet Component (Examples for the Framer-Motion Framework) */}
      {/*<MotionExamples />*/}

      {/* Dashboard Section */}
      <div className={ElementSquares.appJustifyCenter}>
        {/* Only the studentOverview Component */}
        {/* <StudentOverview /> */}

        {/* Dashboard Dragable version */}
        <SlidingSquare><StudentOverview />
          <PieChart
            richtig={6}
            falsch={4}
            richtigNachHilfe={2}
          />
          <OverView />
          
          <Concepts
            concepts={[
              { title: "Kolenstoffkreislauf", value: 0.65 },
              { title: "Photosynthese", value: 0.78 },
              { title: "Treibhauseffekt", value: 0.53 }
            ]} />
        </SlidingSquare>
      </div>

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;