import React from "react";
/*
*Component that enables dragging of its children within a defined area
*@author Fabian Tappendorf
*/

export default function Layout({ children }) {
  const items = React.Children.map(children, (child, index) => ({
    id: index,
    content: child,
  }));

  return (
    <div className="grid auto-rows grid-cols-2 gap-4 mx-40">
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
