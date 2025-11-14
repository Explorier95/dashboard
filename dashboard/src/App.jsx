import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import svgIPN from "./static/assets/IPN.svg"
import CircleSquareFade from "./components/circleSquareFade";
import ResponsiveButton from "./components/responsiveButton";
import { GridContainerVariants } from "./components/variants";
import StudentOverview from "./components/studentOverview";
import InfinitySquare from "./components/infinitySquare";
import SlidingSquare from "./components/slidingSquare";
import ScrollingIndicator from "./components/scrollingIndicator"
import AnimatePainting from "./components/animatePainting";
import DynamixText from "./components/dynamicText";
//import {TemplateLoader} from "./templateLoader";
//import Table from "./table";


const App = () => {



  const containerRef = useRef(null)

  const mainControls = useAnimation();

  const isInView = useInView(containerRef, { once: true })



  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView])

  const titleElements = ["Tobias", "Holger", "Gert", "Hugo"];
  const [title, setTitle] = useState("Noch nicht geklickt!") // Startwert

  function handleSelect() {
    const randomIndex = Math.floor(Math.random() * titleElements.length)
    setTitle(titleElements[randomIndex])
    console.log("Button clicked! New title:", titleElements[randomIndex]);
  }


  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <header className="relative bg-slate-100 p-4">
        <img src={svgIPN} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-35 h-35" alt="Icon" />
        <h1 className="text-5xl text-blue-900 text-center">Dashboard</h1>
      </header>
      <p className="text-2xl text-white text-center "> Welcome to the IPN Dashboard</p>
      <motion.section
        variants={{ GridContainerVariants }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 p-10 gap-10"

      > {/* Importet Component */}
        <CircleSquareFade
          title="Viereck und Kreis"
        />

        {/* Importet Component */}
        <InfinitySquare
          title="Unendlichkeit!"
        />

        {/* Importet Component */}
        <div id="responsiveButtonTitle">
          <h2 className="text-slate-100 font-thin text-1xl w-1/2 mx-auto text-center">{title}</h2>
          <ResponsiveButton onSelect={handleSelect}>Klick Mich!</ResponsiveButton>
        </div>

        {/* Importet Component */}
        <SlidingSquare
          title="Bewegend !" />

        {/* Importet Component */}
        <ScrollingIndicator
          title="Guck mal!" />

        {/* Importet Component */}
        <AnimatePainting
          title="Geblitzt!"
        />

      </motion.section>

      {/* Dashboard Section */}
      <motion.section
        variants={{ GridContainerVariants }}
        initial="hidden"
        animate="show"
        className="p-10 gap-10 justify-items-center"
      >
        <StudentOverview />
      </motion.section>

      {/* Text */}
      <DynamixText />

    </div>
  );
};

export default App;