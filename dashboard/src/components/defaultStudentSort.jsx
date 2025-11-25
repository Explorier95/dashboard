import { ElementSquares, SquareColor } from "./squareVariants.jsx";

/*
*default sorting function for the IPN-Dashboard
*@author Fabian Tappendorf
*/
export default function DefaultStudentSort({ list, funktion}) {


    return (
        <>
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