import StudentOverview from "./components/studentOverview";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import MotionExamples from "./examples/motionExamples"
import PieChart from "./components/pieOverview.jsx";
import SlidingSquare from "./components/slidingSquare"
import {ElementSquares} from "./components/squareVariants.jsx";
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
        <StudentOverview />

      {/* Dashboard Dragable version */}
        <SlidingSquare><StudentOverview />
                <PieChart
    richtig={12}
    falsch={5}
    richtigNachHilfe={3}
/>
        </SlidingSquare>
      </div>

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;