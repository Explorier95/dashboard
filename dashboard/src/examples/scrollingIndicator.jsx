import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GridContainerVariants } from "./variants";






function ScrollingIndicator(props) {



  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const { scrollYProgress: completionProgress } = useScroll();


  return (
    <div>
      <h2 className="text-slate-100 font-thin text-1xl w-1/2 mx-auto text-center">{props.title}</h2>
    <motion.div
      ref={containerRef}
      variants={GridContainerVariants}
      className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
      <motion.div className="w-40 aspect-square bg-gray-50/20 rounded-xl">
        <motion.div className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
          style={{ scaleY: completionProgress }} />

      </motion.div>
    </motion.div>
    </div>
  )
}

export default ScrollingIndicator