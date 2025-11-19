import { motion, useAnimation, useInView } from "framer-motion";
import InfinitySquare from "./infinitySquare";
import SlidingSquare from "../components/slidingSquare";
import ScrollingIndicator from "./scrollingIndicator"
import AnimatePainting from "./animatePainting";
import CircleSquareFade from "./circleSquareFade";
import ResponsiveButton from "./responsiveButton";
import { GridContainerVariants } from "./variants";
import { useEffect, useRef } from "react";

export default function MotionExamples(){

      const containerRef = useRef(null)

      const mainControls = useAnimation();
    
      const isInView = useInView(containerRef, { once: true })

        useEffect(() => {
          if (isInView) {
            mainControls.start("visible")
          }
        }, [isInView])

return(
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
          <ResponsiveButton >Klick mich!</ResponsiveButton>
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
)
}