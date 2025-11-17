import StudentOverview from "./components/studentOverview";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import MotionExamples from "./components/motionExamples"


const App = () => {

  return (

    <div className="flex flex-col gap-10 overflow-x-hidden">

      {/* Importet Component */}
      <Header />
      {/* Importet Component (Examples for the Framer-Motion Framework) */}
      {/*<MotionExamples />*/}
      
      {/* Dashboard Section */}
      <div className="justify-items-center">
        <StudentOverview />
      </div>

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;