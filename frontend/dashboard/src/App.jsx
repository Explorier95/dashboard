import StudentOverview from "./components/main/studentOverview.jsx";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import LandingMinimal from "./components/main/Landing.jsx";
import AskAI from "./components/main/AskAI.jsx";
import PieChart from "./components/main/pieOverview.jsx";
import { ElementSquares } from "./components/styling/stylingVariants.jsx";
import Concepts from "./components/main/Concepts.jsx";
import Akkordeon from "./components/main/Akkordeon.jsx";
import summaryData from "./static/summaryData.json";
import { useState } from "react";
import imgGeminiOne from "./img/Gemini_Generated_Image_.png";
import imgGeminiTwo from "./img/Gemini_Generated_Image_2.png";
import imgGeminiThree from "./img/Gemini_Generated_Image_3.png";
import QuizChat from "./components/main/quizChat.jsx";
import Masonry from 'react-masonry-css';
import jsonData from "./static/json_fuer_fabian_cba_dashboard.json";
import Dashboard from "./examples/Dashboard.jsx";
//import { StudentFocus } from "./components/main/StudentFocus.jsx";
import { StudentFocus } from "./components/main/StudentFocus2.jsx";
import { Conversation } from "./components/main/Conversation.jsx";
/*
*@description
*Main application for the IPN-Dashboard
*@author Fabian Tappendorf
*/

const breakpointColumnsObj = {
  default: 2,
  1100: 2,
  700: 1
};

const App = () => {

  const akkordeonDataFromJSON = summaryData;
  const [activeView, setActiveView] = useState("landing");

  const toggleView = (viewName) => {
    setActiveView(prevView => prevView === viewName ? "landing" : viewName);
  };

  return (
    <>
      {/* Importet Component */}
      <Header />

      {/* Selection  */}
      <div className={ElementSquares.selectionBody}>
        <button
          className={`${ElementSquares.selectionDataBase} ${activeView === "overview" ? ElementSquares.selectionDataActive : ElementSquares.selectionDataInactive
            }`}
          onClick={() => toggleView('overview')}
        >
          Klassenübersicht
        </button>

        <button
          className={`${ElementSquares.selectionDataBase} ${activeView === "focus" ? ElementSquares.selectionDataActive : ElementSquares.selectionDataInactive
            }`}
          onClick={() => toggleView('focus')}
        >
          Schülerfokus
        </button>

        <button
          className={`${ElementSquares.selectionDataBase} ${activeView === "conversation" ? ElementSquares.selectionDataActive : ElementSquares.selectionDataInactive
            }`}
          onClick={() => toggleView('conversation')}
        >
          Konversationen
        </button>

        <button
          className={`${ElementSquares.selectionDataBase} ${activeView === "chat" ? ElementSquares.selectionDataActive : ElementSquares.selectionDataInactive
            }`}
          onClick={() => toggleView('chat')}
        >
          Chat
        </button>
                <button
          className={`${ElementSquares.selectionDataBase} ${activeView === "test" ? ElementSquares.selectionDataActive : ElementSquares.selectionDataInactive
            }`}
          onClick={() => toggleView('test')}
        >
          Test
        </button>
      </div>
      <main>
        {activeView === "landing" && (
          <LandingMinimal
            onSelectView={setActiveView}
            teacherName="XY"
            classLabel="10a"
          />
        )}

        {activeView === 'overview' && <div className="flex h-[700px] w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-scroll border border-gray-200">
        
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto mx-40 pt-4"
          columnClassName="pl-4 bg-clip-padding"
        >

          {/* Dashboard Section */}
         

          {activeView === 'overview' &&
            <StudentOverview data={jsonData} />}

          {activeView === 'overview' &&
            <div className="w-[240px] flex">
              <PieChart
                richtig={12}
                falsch={7}
                richtigNachHilfe={2}
              />
            </div>} {activeView === 'overview' &&

              <Concepts
                concepts={[
                  { title: "Kolenstoffkreislauf", value: 0.65 },
                  { title: "Photosynthese", value: 0.78 },
                  { title: "Treibhauseffekt", value: 0.53 }
                ]} />}

          {activeView === "overview" &&
            <div> </div>}


          {activeView === 'overview' &&

            <Akkordeon
              content={akkordeonDataFromJSON}
            />}
          {activeView === 'overview' &&
            <AskAI

            />}
        


      </Masonry>
      </div>
      }
      {activeView === "overview" ? <></> : activeView === "focus" ? <><StudentFocus data={jsonData} /></>
        : activeView === "conversation" ? <><Conversation data={jsonData} /></>
        : activeView === "test" ? <><Dashboard/></>
        : activeView ==="chat" ? <><QuizChat/></>
          : <></>}
    </main >
</>
    
  );
};

export default App;