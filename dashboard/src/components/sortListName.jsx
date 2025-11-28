import { ElementSquares, SquareColor } from "./squareVariants.jsx";
import StudentTableHead from "./studentTableHead.jsx";

export default function SortList({ list, funktion }) {

    const { schueler, schueler_antworten } = list

    return (
        <>            
            <StudentTableHead
            className={ElementSquares.studentTableHeadDynamic}
            funktion = {funktion}
            list = {list}
            />
            {[...schueler]
                .sort((a, b) => a.vorname.localeCompare(b.vorname))
                .map((student, index) => (
                    <tbody key={index}>
                        <tr>
                            <td className={ElementSquares.studentTableData}>{student.vorname}</td>
                            {schueler_antworten
                                .filter(antwort => antwort.schueler_id === student.id)
                                .map((antwort, index) => (
                                    <td key={index}>
                                        {SquareColor(antwort, funktion)}
                                    </td>
                                ))}
                        </tr>
                    </tbody>
                ))}

        </>


    )
}