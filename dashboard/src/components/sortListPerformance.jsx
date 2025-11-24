import StudentTableHead from "./studentTableHead.jsx";
import { ElementSquares, SquareColor } from "./squareVariants.jsx";

export default function SortListPerformance({ list, funktion, direction }) {
    //Ermittel die Punkte 
    function countStudentPoints(studentId, list) {
        let points = 0
        const { schueler_antworten } = list
        for (let i = 0; i < schueler_antworten.length; i++) {
            if (schueler_antworten[i].schueler_id === studentId) {
                if (schueler_antworten[i].is_correct && !schueler_antworten[i].under_help) {
                    points++
                } if (schueler_antworten[i].is_correct && schueler_antworten[i].under_help) {
                    points = + points + 0.5

                }
            }
        }
        //console.log(studentId + " has: " + points)
        return points
    }

    //Füge die Punkte an die richtige Stelle der schuler-liste
    function bestStudentUp(list) {
        const schueler = list.schueler.map(student => ({
            ...student,
            n_total_correct: countStudentPoints(student.id, list)
        }))

        // Sortiere nach Punkten absteigend
        schueler.sort((a, b) => b.n_total_correct - a.n_total_correct);

        return schueler
    }

    //Invertierte Funktion
    function bestStudentDown(list) {
        const schueler = list.schueler.map(student => ({
            ...student,
            n_total_correct: countStudentPoints(student.id, list)
        }))

        // Sortiere nach Punkten aufsteigend
        schueler.sort((a, b) => a.n_total_correct - b.n_total_correct)

        return schueler
    }

    function sortAfterDirection(upOdown, listElement) {

        let whatDirection
        console.log(upOdown)

        if (upOdown === "bestUp") {
            whatDirection = bestStudentUp(listElement)

        } else if (upOdown === "bestDown") {
            whatDirection = bestStudentDown(listElement)

        } else {
            return listElement.schueler.map(student => ({
                ...student,
                n_total_correct: countStudentPoints(student.id, listElement)
            }))
        }
        return whatDirection

    }

    const sortedSchueler = sortAfterDirection(direction, list);

    return (
        <>
            {sortedSchueler.map((student, index) => (<tbody key={index} >
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