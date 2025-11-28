import { motion } from "framer-motion";
import React from "react";
import { useRef } from "react";

function SlidingSquare({ children }) {

  const constraintsRef = useRef(null);
  

  return (
    <>
      <div
        ref={constraintsRef}
        className="bg-slate-800 w-[800px] h-[800px] rounded-lg relative flex gap-4 p-4 flex-wrap"
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            drag
            dragConstraints={constraintsRef}
            className="inline-block"
          >
            {child}
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default SlidingSquare