import { motion } from "framer-motion";
import { GridContainerVariants } from "./variants";

function SlidingSquare(props) {
  return (
    <div>
      <h2 className="text-slate-100 font-thin text-1xl w-1/2 mx-auto text-center">{props.title}</h2>
    <motion.div variants={{ GridContainerVariants }} className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
      <motion.div className="w-1/3 h-1/3 bg-orange-500 rounded-3xl cursor-grab"
        drag
        dragConstraints={{ top: -125, left: -125, right: 125, bottom: 125 }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
      />
    </motion.div>
    </div>
  )
}

export default SlidingSquare