import { motion } from "framer-motion";
import { GridContainerVariants } from "./variants";

function ResponsiveButton() {
  return (
        <motion.div variants={{GridContainerVariants}} className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10">
          <motion.button className="bg-emerald-600 w-1/2 py-4 rounded-lg text-2xl text-gray-100 font-light tracking-wide"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, backgroundColor: "#34d399", boxShadow: "0px 0px 8px rgb(52,211,153)" }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
          >
            Click Me
          </motion.button>
        </motion.div>
  );
}
export default ResponsiveButton;