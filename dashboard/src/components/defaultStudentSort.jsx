import { ElementSquares, SquareColor } from "./squareVariants.jsx";

export default function DefaultStudentSort({ list, funktion }) {


    return (
        <>
            <thead>
                <tr>
                    <th className={ElementSquares.studentTableHeadStatic}>Schüler</th>
                    {list.fragen.map((frage, index) => (<th key={index}
                        className={ElementSquares.studentTableHeadDynamic}
                        onClick={() => funktion(frage.title, "Frage")}>{frage.nmbr}</th>))}
                </tr>
            </thead>
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