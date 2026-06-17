import { motion } from "framer-motion";
import { gridElements, textStyles, ColorSquare, ElementSquares } from "../styling/stylingVariants.jsx";
import PieChart from "./pieOverview.jsx";

export function StudentFocus({data}){



    if (!data) {
    return <p>Lade Schülerdaten...</p>;
  }

    return(
        <div className={ElementSquares.studentMain}>
            <h2>Schülerliste</h2>
      <ul>
        {/* 2. Über das Array 'schueler' iterieren */}
        {data.schueler.map((student) => (
          <li key={student.id}>
            {/* Ausgabe der Studenten */}
            <strong>{student.vorname}</strong> (ID: {student.id})
          </li>
        ))}
      </ul>
                            
            <h1>Tim</h1>
            <p>Hier sehen sie alle Infos über Tim.</p>

            <PieChart
                         
                          richtig={2}
                          falsch={4}
                          richtigNachHilfe={5}
                        />

        

        </div>

    )

}