import { ElementSquares, SquareColor } from "./squareVariants.jsx";
import StudentTableHead from "./studentTableHead.jsx";

export default function DefaultStudentSort({ list, funktion }) {


    return (
        <>
            <StudentTableHead
            className={ElementSquares.studentTableHeadDynamic}
            funktion = {funktion}
            list = {list}
            />
            {list.schueler.map((student, index) => (<tbody key={index} >
                <tr>
                    <td className={ElementSquares.studentTableData}>{student.vorname}</td>
                    {list.schueler_antworten
                        .filter(antwort => antwort.schueler_id === student.id)
                        .map((antwort, index) => (
                            <td key={index} className={ElementSquares.studentTableColorBorder}>
                                {SquareColor(antwort, funktion)}
                            </td>
                        ))}
                </tr>
            </tbody>))}
        </>
    )
}