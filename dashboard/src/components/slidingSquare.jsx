import { motion } from "framer-motion";
import React from "react";
import { useRef } from "react";
import {gridElements} from "./stylingVariants.jsx";
/*
*Component that enables dragging of its children within a defined area
*@author Fabian Tappendorf
*/

function SlidingSquare({ children }) {

  const constraintsRef = useRef(null);
  

  return (
    <>
      <div
        ref={constraintsRef}
        className={gridElements.grid}
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