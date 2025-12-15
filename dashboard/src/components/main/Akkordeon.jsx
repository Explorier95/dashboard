import {useState} from "react";
import { gridElements } from "../styling/stylingVariants";

export default function Akkordeon({ content }) {

    const [open, setOpen] = useState(false);

    const contentList = content || [];

    return (
        <div className={gridElements.gridMore}>
            {contentList.map((item, index) => (
                <div key={index} className="border-b border-gry-300 mb-2">
                    <button onClick={() => setOpen(open === index ? false : index)} className="w-full text-left py-4 px-2 flex justify-between items-center focus:outline-none">
                        <span className="font-medium text-lg hover:font-bold rounded-2xl">{item.title}</span>
                    </button>
                    {open === index && (
                        <div className="px-4 pb-4">
                            {item.content.map((subItem, subIndex) => (
                                <div key={subIndex} className="mb-4">
                                    <h4 className="font-semibold">{subItem.summary}</h4>
                                    <p className="text-gray-700">{subItem.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}