import { ElementSquares } from "../styling/stylingVariants.jsx";
import { SquareColor, buttonInfoAssessment } from "../styling/stylingVariants.jsx";

export function StudentTableBody({ students, questions, answers, assesment, funktion }) {
    return (
        <>
            <tbody>
                {students.map(student => {
                    
                    // 1. ALLE Bewertungen für diesen Schüler
                    const studentAssessments = assesment.filter(
                        t => t.schueler_id === student.id
                    );

                    // 2. Text für den Button  (alle Fragen untereinander)
                    const combinedText = studentAssessments
                        .map(a => `Frage ${a.frage_nmbr}: ${a.tutor_text}`)
                        .join("\n\n\n\n");

                    return (
                        <tr key={student.id}>
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

                            <td>
                                {buttonInfoAssessment(
                                    combinedText,
                                    funktion,
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </>
    );
}