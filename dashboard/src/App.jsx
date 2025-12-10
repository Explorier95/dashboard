import StudentOverview from "./components/main/studentOverview.jsx";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import MotionExamples from "./examples/motionExamples"
import PieChart from "./components/main/pieOverview.jsx";
import SlidingSquare from "./components/slidingSquare.jsx"
import { ElementSquares, gridElements } from "./components/styling/stylingVariants.jsx";
import Concepts from "./components/main/Concepts.jsx";
import OverView from "./components/main/OverView.jsx";
import Akkordeon from "./components/main/Akkordeon.jsx";
import { title } from "framer-motion/client";
/*
*Application for the IPN-Dashboard
*@author Fabian Tappendorf
*/


const App = () => {
  const akkordeonData = [{
    title: "Barrierefreiheit",
    content: [
      { summary: "Was ist Barrierefreiheit?", text: "Barrierefreiheit bedeutet, dass Produkte, Dienstleistungen und Umgebungen so gestaltet sind, dass sie von allen Menschen genutzt werden können, unabhängig von ihren Fähigkeiten oder Einschränkungen." },
      { summary: "Warum ist Barrierefreiheit wichtig?", text: "Barrierefreiheit ist wichtig, um sicherzustellen, dass alle Menschen gleichberechtigten Zugang zu Informationen und Dienstleistungen haben. Sie fördert Inklusion und Chancengleichheit." },
      { summary: "Wie kann Barrierefreiheit umgesetzt werden?", text: "Barrierefreiheit kann durch die Einhaltung von Richtlinien und Standards, wie z.B. der WCAG (Web Content Accessibility Guidelines), sowie durch die Berücksichtigung der Bedürfnisse von Menschen mit Behinderungen bei der Gestaltung von Produkten und Dienstleistungen umgesetzt werden." }
    ]
  },{title: "Datenschutz", content: [
    { summary: "Was ist Datenschutz?", text: "Datenschutz bezieht sich auf den Schutz personenbezogener Daten vor unbefugtem Zugriff, Verwendung oder Offenlegung. Er umfasst Maßnahmen und Richtlinien, die sicherstellen, dass persönliche  Informationen sicher und vertraulich behandelt werden." },
    { summary: "Warum ist Datenschutz wichtig?", text: "Datenschutz ist wichtig, um die Privatsphäre und Rechte von Einzelpersonen zu schützen. Er hilft, Identitätsdiebstahl, Betrug und Missbrauch persönlicher Daten zu verhindern und fördert das Vertrauen in digitale Dienste." },
    { summary: "Wie kann Datenschutz gewährleistet werden?", text: "Datenschutz kann durch die Implementierung von Sicherheitsmaßnahmen, wie z.B. Verschlüsselung und Zugriffskontrollen, sowie durch die Einhaltung von Datenschutzgesetzen und -richtlinien gewährleistet werden. Es ist auch wichtig, dass Organisationen transparent über ihre Datenpraktiken informieren." }]
  }]

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

            <Akkordeon
            content={akkordeonData}
            
          />
        </SlidingSquare>
      </div>

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;