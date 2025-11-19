import StudentOverview from "./components/studentOverview";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import MotionExamples from "./examples/motionExamples"
import SlidingSquare from "./components/slidingSquare"
import {ElementSquares} from "./components/squareVariants.jsx";
/*
*Application for the IPN-Dashboard
*@authort Fabian Tappendorf
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
        <SlidingSquare><StudentOverview /></SlidingSquare>
      </div>

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;