import StudentOverview from "./components/studentOverview";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import PieChart from "./components/pieOverview.jsx";
import { ElementSquares } from "./components/squareVariants.jsx";
/*
*Application for the IPN-Dashboard
*@author Fabian Tappendorf
*/
const App = () => {

  return (

    <div className={ElementSquares.appShell}>

      <div className={ElementSquares.appFrame}>
        <Header />

        <div className={ElementSquares.dashboardGrid}>
          <div className={`${ElementSquares.cardShell} ${ElementSquares.resizableCard}`}>
            <StudentOverview />
          </div>
          
        </div>

      </div>

    </div>
  );
};

export default App;
