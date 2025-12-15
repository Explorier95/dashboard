import StudentOverview from "./components/main/studentOverview.jsx";
import DynamixText from "./components/dynamicText";
import Header from "./components/header";
import PieChart from "./components/main/pieOverview.jsx";
import Layout from "./components/Laylout.jsx"
import { ElementSquares, gridElements } from "./components/styling/stylingVariants.jsx";
import Concepts from "./components/main/Concepts.jsx";
import Akkordeon from "./components/main/Akkordeon.jsx";
/*
*Main application for the IPN-Dashboard
*@author Fabian Tappendorf
*/

const App = () => {

  //Data for the Akkordeon Component - should be dynamic in the future
  const akkordeonData = [{
    title: "Zusammenfassung der Klassenleistung",
    content: [
      { summary: "Was ist Barrierefreiheit?", text: "Barrierefreiheit bedeutet, dass Produkte, Dienstleistungen und Umgebungen so gestaltet sind, dass sie von allen Menschen genutzt werden können, unabhängig von ihren Fähigkeiten oder Einschränkungen." },
      { summary: "Warum ist Barrierefreiheit wichtig?", text: "Barrierefreiheit ist wichtig, um sicherzustellen, dass alle Menschen gleichberechtigten Zugang zu Informationen und Dienstleistungen haben. Sie fördert Inklusion und Chancengleichheit." },
      { summary: "Wie kann Barrierefreiheit umgesetzt werden?", text: "Barrierefreiheit kann durch die Einhaltung von Richtlinien und Standards, wie z.B. der WCAG (Web Content Accessibility Guidelines), sowie durch die Berücksichtigung der Bedürfnisse von Menschen mit Behinderungen bei der Gestaltung von Produkten und Dienstleistungen umgesetzt werden." }
    ]
  }, {
    title: "Was lief gut?", content: [
      { summary: "Kohlenstoffkreislauf", text: "Datenschutz bezieht sich auf den Schutz personenbezogener Daten vor unbefugtem Zugriff, Verwendung oder Offenlegung. Er umfasst Maßnahmen und Richtlinien, die sicherstellen, dass persönliche  Informationen sicher und vertraulich behandelt werden." },
      { summary: "Warum ist Datenschutz wichtig?", text: "Datenschutz ist wichtig, um die Privatsphäre und Rechte von Einzelpersonen zu schützen. Er hilft, Identitätsdiebstahl, Betrug und Missbrauch persönlicher Daten zu verhindern und fördert das Vertrauen in digitale Dienste." },
      { summary: "Wie kann Datenschutz gewährleistet werden?", text: "Datenschutz kann durch die Implementierung von Sicherheitsmaßnahmen, wie z.B. Verschlüsselung und Zugriffskontrollen, sowie durch die Einhaltung von Datenschutzgesetzen und -richtlinien gewährleistet werden. Es ist auch wichtig, dass Organisationen transparent über ihre Datenpraktiken informieren." }]
  }, {
    title: "Wo ist noch Unterstützungsbedarf?", content: [
      { summary: "Weltfrieden", text: "Datenschutz bezieht sich auf den Schutz personenbezogener Daten vor unbefugtem Zugriff, Verwendung oder Offenlegung. Er umfasst Maßnahmen und Richtlinien, die sicherstellen, dass persönliche  Informationen sicher und vertraulich behandelt werden." },
      { summary: "Warum ist Datenschutz wichtig?", text: "Datenschutz ist wichtig, um die Privatsphäre und Rechte von Einzelpersonen zu schützen. Er hilft, Identitätsdiebstahl, Betrug und Missbrauch persönlicher Daten zu verhindern und fördert das Vertrauen in digitale Dienste." },
      { summary: "Wie kann Datenschutz gewährleistet werden?", text: "Datenschutz kann durch die Implementierung von Sicherheitsmaßnahmen, wie z.B. Verschlüsselung und Zugriffskontrollen, sowie durch die Einhaltung von Datenschutzgesetzen und -richtlinien gewährleistet werden. Es ist auch wichtig, dass Organisationen transparent über ihre Datenpraktiken informieren." }]
  }]

  return (

    <div className={ElementSquares.appMain}>

      {/* Importet Component */}
      <Header />

      {/* Dashboard Section */}
      <div className="">
        {/* Only the studentOverview Component */}
        {/* <StudentOverview /> */}

        {/* Dashboard Dragable version */}
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
            content={akkordeonData}
          />
        </Layout>






      </div>

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;