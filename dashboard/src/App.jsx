import StudentOverview from "./components/studentOverview";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import MotionExamples from "./components/motionExamples"
import SlidingSquare from "./components/slidingSquare"
import {ElementSquares} from "./components/squareVariants.jsx";


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