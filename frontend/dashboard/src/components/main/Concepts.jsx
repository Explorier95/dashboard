import { textStyles, gridElements } from "../styling/stylingVariants";
import { motion } from "framer-motion";



/*  props:
 concepts = [
 { title: "Aufgabe 1", value: 0.65 },
 { title: "Aufgabe 2", value: 0.70 },
 { title: "Aufgabe 3", value: 0.60 }
 ] */



export default function Concepts({ concepts }) {
    if (!concepts || concepts.length === 0) {
        return <p className="text-gray-600">Keine Daten vorhanden.</p>;
    }


    return (
        <div className={gridElements.gridConcepts}>
            <h1 className={textStyles.headlineElements}>Konzepte</h1>
            {concepts.map((c, i) => (
                <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className={textStyles.paragraph }>{c.title}</span>
                        <span className="text-gray-700 font-medium ml-2">{Math.round(c.value * 100)}%</span>
                    </div>


                    {/* Balken-Hintergrund */}
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        {/* animierter Balken */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${c.value * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-green-600 rounded-full"
                        ></motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
}