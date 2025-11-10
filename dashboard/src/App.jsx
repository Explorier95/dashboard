import { motion, useScroll, useAnimation, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CircleSquareFade from "./circleSquareFade";
import ResponsiveButton from "./responsiveButton";
import { GridContainerVariants } from "./variants";
import StudentOverview from "./studentOverview";
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

  const { scrollYProgress: completionProgress } = useScroll();

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
        <CircleSquareFade/>

        <motion.div variants={{GridContainerVariants}}className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
          <motion.div
            className="w-1/3 h-1/3 shadow-md bg-rose-400" animate={{
              scale: [1, 2, 2, 1], rotate: [0, 90, 90, 0],
              borderRadius: ["10%", "10%", "50%", "10%"]
            }}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
          />

        </motion.div>
        {/* Importet Component */}
        <ResponsiveButton/>
        <motion.div variants={{GridContainerVariants}} className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
          <motion.div className="w-1/3 h-1/3 bg-orange-500 rounded-3xl cursor-grab"
            drag
            dragConstraints={{ top: -125, left: -125, right: 125, bottom: 125 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          />
        </motion.div>
        <motion.div variants={{GridContainerVariants}} className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
          <motion.div className="w-40 aspect-square bg-gray-50/20 rounded-xl">
            <motion.div className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
              style={{ scaleY: completionProgress }} />

          </motion.div>
        </motion.div>
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