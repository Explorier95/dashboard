import { ElementSquares, SquareColor, gridElements } from "./styling/stylingVariants.jsx";
import StudentTableHead from "./studentTableHead.jsx";
/*
*all sorting functions for the IPN-Dashboard
*@author Fabian Tappendorf
*/
/*
*Sorting function for questions based on difficulty (number of wrong answers)
*@author Fabian Tappendorf
*/
export function SortByQuestion({ list, funktion, newQuestionList }) {

    // Absichern, falls newQuestionList beim ersten Render noch nicht da ist
    const frageReihenfolge = Array.isArray(newQuestionList)
        ? newQuestionList.map(i => i.nmbr)
        : [];

    let squareColorElement = SquareColor(undefined, funktion); // initialer Wert für Grauen Kasten wenn keine Antwort vorliegt

    return (
        <tbody>
            {list.schueler.map(student => (
                <tr key={student.id}>
                    <td className={ElementSquares.studentTableData}>{student.vorname}</td>

                    {newQuestionList.map(question => {
                        const ans = list.schueler_antworten.find(
                            a => a.schueler_id === student.id && a.frage_nmbr === question.nmbr
                        );
                        { ans === undefined ? squareColorElement = SquareColor(undefined, funktion) : squareColorElement = SquareColor(ans, funktion) }
                        return (
                            <td key={question.nmbr}>
                                {squareColorElement}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    );
}

/*
*Sorting function for students in alphabetical order
*@author Fabian Tappendorf
*/
export function SortList({ list, funktion }) {

    const { schueler, schueler_antworten } = list

    return (
        <>
            <StudentTableHead
                className={gridElements.gridElementLookDynamic}
                funktion={funktion}
                list={list}
            />
            {[...schueler]
                .sort((a, b) => a.vorname.localeCompare(b.vorname))
                .map((student, index) => (
                    <tbody key={index}>
                        <tr>
                            <td className={ElementSquares.studentTableData}>{student.vorname}</td>
                            { 
                                schueler_antworten
                                    .filter(antwort => antwort.schueler_id === student.id)
                                    .map((antwort, index) => (
                                        <td key={index}>
                                            {SquareColor(antwort, funktion)}
                                        </td>
                                    ))
                            }

                        </tr>
                    </tbody>
                ))}

        </>


    )
}
/*
*Sorting function for students based on performance (number of correct answers)
*@author Fabian Tappendorf
*/
export function SortListPerformance({ list, funktion, direction }) {
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
                            <td key={index}>
                                {SquareColor(antwort, funktion)}
                            </td>
                        ))}
                </tr>
            </tbody>))}
        </>

    )
}
/*
*default sorting function for the IPN-Dashboard
*@author Fabian Tappendorf
*/
export function DefaultStudentSort({ list, funktion }) {


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
