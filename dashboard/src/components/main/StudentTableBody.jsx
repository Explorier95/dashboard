import { ElementSquares } from "../styling/stylingVariants.jsx";
import { SquareColor } from "../styling/stylingVariants.jsx";
export function StudentTableBody({ students, questions, answers, funktion }) {
    return (
        <tbody>
            {students.map(student => (
                <tr key={student.id}>
                    {/* Name des Schülers */}
                    <td className={ElementSquares.studentTableData}>
                        {student.vorname}
                    </td>

                    {/* Antworten in der Reihenfolge der questions-Liste */}
                    {questions.map(question => {
                        const ans = answers.find(
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