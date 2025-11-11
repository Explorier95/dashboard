import { motion} from "framer-motion";
import { GridContainerVariants } from "./variants";

function CircleSquareFade(props) {
    return (
       <div>
        <h2 className="text-slate-100 font-thin text-1xl w-1/2 mx-auto text-center">{props.title}</h2>
        <motion.div variants={{GridContainerVariants}} className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
            
            <motion.div
                className="w-20 h-20 bg-stone-100 rounded-lg"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            />
            {/* Fade Down */}
            <motion.div
                className="w-20 h-20 bg-stone-100 rounded-full"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            />
        </motion.div>
        </div>
    );
}
export default CircleSquareFade