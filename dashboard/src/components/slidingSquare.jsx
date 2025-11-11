import { motion} from "framer-motion";
import { GridContainerVariants } from "./variants";

function SlidingSquare(){
    return(
        <motion.div variants={{GridContainerVariants}} className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
          <motion.div className="w-1/3 h-1/3 bg-orange-500 rounded-3xl cursor-grab"
            drag
            dragConstraints={{ top: -125, left: -125, right: 125, bottom: 125 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          />
        </motion.div>
    )
}

export default SlidingSquare