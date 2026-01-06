import jsonData from "../../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "../modalAnswer.jsx";
import { ElementSquares, gridElements, textStyles } from "../styling/stylingVariants.jsx";
import { StudentTableBody } from "./StudentTableBody.jsx";
import StudentOverviewHeader from "../studentOverviewHeader.jsx";
import StudentTableHead from "./studentTableHead.jsx"

/*
*Sudent Table for the IPN-Dashboard
*@author Fabian Tappendorf
*/
function StudentOverview() {
    const [info, setInfo] = useState(null);
    const [type, setType] = useState(null);

    // 1. Getrennte States
    const [studentSort, setStudentSort] = useState("default"); // alphabetic, bestUp, bestDown
    const [sortByDifficulty, setSortByDifficulty] = useState(false); // true oder false

    const getQuestionOrder = () => {
        if (!sortByDifficulty) return jsonData.fragen;

        // Schwierigkeit berechnen (wie in deinem TableHead)
        return [...jsonData.fragen].map(frage => {
            const totalWrong = jsonData.schueler_antworten.filter(
                a => a.frage_nmbr === frage.nmbr && !a.is_correct
            ).length;
            return { ...frage, totalWrong };
        }).sort((a, b) => a.totalWrong - b.totalWrong);
    };

    const getStudentOrder = () => {
        let students = [...jsonData.schueler];

        if (studentSort === "alphabetic") {
            return students.sort((a, b) => a.vorname.localeCompare(b.vorname));
        }

        if (studentSort === "bestUp" || studentSort === "bestDown") {
            // Punkte berechnen (Logik aus deiner SortListPerformance)
            const studentsWithPoints = students.map(s => {
                const points = jsonData.schueler_antworten
                    .filter(a => a.schueler_id === s.id && a.is_correct)
                    .reduce((acc, a) => acc + (a.under_help ? 0.5 : 1), 0);
                return { ...s, points };
            });

            return studentsWithPoints.sort((a, b) =>
                studentSort === "bestUp" ? b.points - a.points : a.points - b.points
            );
        }

        return students; // Default
    };

    const currentQuestions = getQuestionOrder();
    const currentStudents = getStudentOrder();

    function openDialog(text, type) {
        setInfo(text);
        setType(type);
    }

    function closeDialog() {
        setInfo(null);
    }

    return (
        <div>
            {info && type === "Antwort" ? <ModalAnswer info={info} onClose={closeDialog} type="Antwort" />
                : info && type === "Frage" ? <ModalAnswer info={info} onClose={closeDialog} type="Frage" /> : ""}

            <div className={ElementSquares.studentSearchBar}>
                <h2 className={textStyles.headlineElements}>Sortieren</h2>

                <div className="text-[12px]">
                    <h3 className={textStyles.headlineInnerElementAlignLeft}>Schüler</h3>
                    {/* Schüler-Sortierung nutzt setStudentSort */}
                    <input
                        type="checkbox"
                        className={ElementSquares.checkboxAccent}
                        checked={studentSort === "alphabetic"}
                        onChange={() => setStudentSort("alphabetic")}
                    />
                    <label className={textStyles.paragraph + " px-1"}>Alphabetisch</label>

                    <input
                        type="checkbox"
                        className={ElementSquares.checkboxAccent}
                        checked={studentSort === "bestUp"}
                        onChange={() => setStudentSort("bestUp")}
                    />
                    <label className={textStyles.paragraph + " px-1"}>Beste Leistung oben</label>

                    <input
                        type="checkbox"
                        className={ElementSquares.checkboxAccent}
                        checked={studentSort === "bestDown"}
                        onChange={() => setStudentSort("bestDown")}
                    />
                    <label className={textStyles.paragraph + " px-1"}>Beste Leistung unten</label>
                </div>

                <div className="text-[12px]">
                    <h3 className={textStyles.headlineInnerElementAlignLeft}>Fragen</h3>
                    {/* Schwierigkeit nutzt setSortByDifficulty (Toggle) */}
                    <input
                        type="checkbox"
                        className={ElementSquares.checkboxAccent}
                        checked={sortByDifficulty}
                        onChange={() => setSortByDifficulty(!sortByDifficulty)}
                    />
                    <label className={textStyles.paragraph + " px-1"}>Schwierigste Frage rechts</label>
                </div>
            </div>

            <StudentOverviewHeader />

            <div className={ElementSquares.studentMain}>
                <table className={ElementSquares.studentTableMain}>
                    <StudentTableHead
                        orderedQuestions={currentQuestions}
                        funktion={openDialog}
                        className={gridElements.gridElementLookDynamic}
                    />

                    {/* Wir brauchen nur noch EINE Body-Komponente */}
                    <StudentTableBody
                        students={currentStudents}
                        questions={currentQuestions}
                        answers={jsonData.schueler_antworten}
                        funktion={openDialog}
                    />
                </table>
            </div>
        </div>
    );
}
export default StudentOverview