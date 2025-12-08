import StudentOverview from "./components/studentOverview";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import MotionExamples from "./examples/motionExamples"
import PieChart from "./components/pieOverview.jsx";
import SlidingSquare from "./components/slidingSquare"
import { ElementSquares } from "./components/stylingVariants.jsx";
import Dropdown from "./components/Dropdown.jsx";
import Concepts from "./components/Concepts.jsx";
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
          <Dropdown
            name="mehr..."
            options={['Zusammenfassung der Klassenleistung', 'Was lief gut?', 'Wo ist Verbesserungsbedarf?']}
            onSelect={(value) => console.log(`Selected optoin: ${value}`)}
          />
          <Concepts 
          concepts={  [
 { title: "Aufgabe 1", value: 0.65 },
 { title: "Aufgabe 2", value: 0.78 },
 { title: "Aufgabe 3", value: 0.53 }
 ] }/>
        </SlidingSquare>
      </div>

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;