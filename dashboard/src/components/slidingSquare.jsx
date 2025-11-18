import { motion } from "framer-motion";
import { GridContainerVariants } from "./variants";
import React from "react";
import { useRef } from "react";

function SlidingSquare({children}) {

  const constraintsRef = useRef(null);

  return (
    <>
      <div ref={constraintsRef}
        /* variants={{ GridContainerVariants }} */
        className="bg-slate-800 w-[800px] h-[800px] rounded-lg relative"
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            className="absolute"
            key={index}
            drag
            dragConstraints={constraintsRef}
          >
            <div className="inline-block">
            {child}
            </div>
          </motion.div>
        ))}
    </div>
    </>
  );
}

export default SlidingSquare