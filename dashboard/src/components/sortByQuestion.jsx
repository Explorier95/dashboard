import { ElementSquares, SquareColor } from "./squareVariants.jsx";

export default function SortByQuestion({ list, funktion, newQuestionList }) {

    // Absichern, falls newQuestionList beim ersten Render noch nicht da ist
    const frageReihenfolge = Array.isArray(newQuestionList)
        ? newQuestionList.map(i => i.nmbr)
        : [];

    return (
        <tbody>
            {list.schueler.map(student => (
                <tr key={student.id}>
                    <td>{student.vorname}</td>

                    {newQuestionList.map(question => {
                        const ans = list.schueler_antworten.find(
                            a => a.schueler_id === student.id && a.frage_nmbr === question.nmbr
                        );

                        return (
                            <td key={question.nmbr}>
                                {SquareColor(ans, funktion)}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    );
}
