import React from "react";
import { gridElements } from "./styling/stylingVariants";
/*
*@description
*This component arranges its children in a grid layout where the first child spans two rows,
*creating a visually appealing "bento" style arrangement.
*@author Fabian Tappendorf
*/

export default function Layout({ children }) {
  const items = React.Children.map(children, (child, index) => ({
    id: index,
    content: child,
  }));

  return (
    <div className={gridElements.main}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`
            list-none p-2 overflow-auto
            ${index === 0 ? "col-span-1 row-span-2" : ""}
            ${index === 3 ? "col-span-1" : ""}
          `}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
