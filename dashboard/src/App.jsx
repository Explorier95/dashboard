import { motion, useAnimation, useTransform, useInView, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CircleSquareFade from "./components/circleSquareFade";
import ResponsiveButton from "./components/responsiveButton";
import { GridContainerVariants } from "./components/variants";
import StudentOverview from "./components/studentOverview";
import InfinitySquare from "./components/infinitySquare";
import SlidingSquare from "./components/slidingSquare";
import ScrollingIndicator from "./components/scrollingIndicator"
//import {TemplateLoader} from "./templateLoader";
//import Table from "./table";

const svgIconVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255,211,77,0)",

  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255,211,77,1)",
  }
}

const App = () => {


  const containerRef = useRef(null)

  const mainControls = useAnimation();

  const isInView = useInView(containerRef, { once: true })


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const paragraphOneValue = useTransform(
    scrollYProgress, [0, 1], ["-100%", "0%"]);

  const paragraphTwoValue = useTransform(
    scrollYProgress, [0, 1], ["100%", "0%"]);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView])


  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <h1 className="text-5xl trackingwide text-slate-100 text-center">IPN-Dashboard</h1>
      <p className="text-2xl text-white text-center "> Welcome to the IPN Dashboard</p>
      <motion.section
        variants={{GridContainerVariants}}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 p-10 gap-10"

      > {/* Importet Component */}
        <CircleSquareFade
        title="A Square and a Circle"
        />

         {/* Importet Component */}
        <InfinitySquare/>


        {/* Importet Component */}
        <ResponsiveButton/>

        {/* Importet Component */}
        <SlidingSquare/>

        <ScrollingIndicator/>

        <motion.div variants={{GridContainerVariants}} className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
          <motion.svg
            xmln="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-1/2 stroke-amber-500 stroke-[0.5]"
          >

            <motion.path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z "
              variants={svgIconVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 2, ease: "easeInOut", delay: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1

              }}
            />
          </motion.svg>
        </motion.div>

      </motion.section>
      <section className="flex flex-col gap-10 mb-10" ref={containerRef}>
        <motion.h1 className="text-5xl trackingwide text-slate-100 text-center" animate={mainControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ delay: 0.3 }}
        >
          IPN-Dashboard Projekt</motion.h1>
        <motion.p style={{ translateX: paragraphOneValue }} className="text-slate-100 font-thin text-4xl w-1/2 mx-auto">Ziel des Praxisprojekts ist die Entwicklung eines interaktiven, übersichtlichen Dashboards für Lehrkräfte, dass die Ergebnisse und Leistungsprofile von Schüler*innen,
          die durch den „Noten-Copilot“ (automatisierte Korrektur/Annotation) erhoben wurden, gebündelt darstellt.
          Das Dashboard soll Sortier-, Filter- und Drill-down-Funktionen bieten, visuelle Übersichten (z. B. Kuchendiagramme, Mini-Charts),
          detaillierte Einzelschüler-Ansichten sowie eine Kommunikationsmöglichkeit zwischen Lehrkraft und Schüler ermöglichen. Die Anwendung wird als React-Webanwendung umgesetzt.
        </motion.p>
        <motion.p style={{ translateX: paragraphTwoValue }} className="text-slate-100 font-thin text-4xl w-1/2 mx-auto">
          Der Noten Copilot wird im Rahmen einer Nutzerstudie mit Lehrpersonen hinsichtlich Bedienbarkeit und Mehrwert für die Korrektur von Klausuren mithilfe dieser Anwendung evaluiert.
        </motion.p>
      </section>
      <motion.section
        variants={{GridContainerVariants}}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 p-10 gap-10"
      >{/* Dashboard Section */}
       <StudentOverview/>
      </motion.section>
    </div>
  );
};

export default App;