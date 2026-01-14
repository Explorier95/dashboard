import jsonData from "../../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "../modalAnswer.jsx";
import { ElementSquares, gridElements, textStyles, ColorSquare } from "../styling/stylingVariants.jsx";
import { StudentTableBody } from "./StudentTableBody.jsx";
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

        // Schwierigkeit berechnen (wie in TableHead)
        return [...jsonData.fragen].map(frage => {
            const totalWrong = jsonData.schueler_antworten.filter(
                a => a.frage_nmbr === frage.nmbr && !a.is_correct
            ).length;
            return { ...frage, totalWrong };
        }).sort((a, b) => a.totalWrong - b.totalWrong);
    };

    const getStudentOrder = () => {
        let students = [...jsonData.schueler];

        //localCompare Funktion aus JavaScript für alphabetische Sortierung 
        if (studentSort === "alphabetic") {
            return students.sort((a, b) => a.vorname.localeCompare(b.vorname));
        }

        if (studentSort === "bestUp" || studentSort === "bestDown") {
            // Punkte berechnen (Logik aus deiner SortListPerformance)
            const studentsWithPoints = students.map(s => {
                const points = jsonData.schueler_antworten
                    .filter(a => a.schueler_id === s.id && a.is_correct)
                    .reduce((acc, a) => acc + (a.under_help ? 0.5 : 1), 0); // acc = Akkumulator
                return { ...s, points };
            });

            return studentsWithPoints.sort((a, b) =>
                studentSort === "bestUp" ? b.points - a.points : a.points - b.points
            );
        }

        return students; // Default
    };

    const getAssessmentOrder = () => {
        // Implementierung für tutor_assessments Sortierung, falls benötigt
        return jsonData.tutor_assessments;
    }
    const currentAssessment = getAssessmentOrder();

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
        <div className={ElementSquares.studentSortTableGap}>
            {info && type === "Antwort" ? <ModalAnswer info={info} onClose={closeDialog} type="Antwort" />
                : info && type === "Frage" ? <ModalAnswer info={info} onClose={closeDialog} type="Frage" /> :
                    info && type === "Tutorbewertung" ? <ModalAnswer info={info} onClose={closeDialog} type="Tutorbewertung" /> : ""}

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
            <div className={ElementSquares.studentMain}>
                <table className={ElementSquares.studentTableMain}>
                    <caption className="caption-bottom">{
                        <div className="mt-4 pt-4 border-t border-gray-300"> {/* mt-4 für Abstand zur Tabelle, pt-4 für Abstand zur Linie */}
                            <div className="flex flex-row justify-center items-center gap-12">

                                {/* Korrekt (direkt) */}
                                <div className="flex items-center gap-3">
                                    <div className={`${ColorSquare.green} w-5 h-5 rounded-md shadow-sm`}></div>
                                    <div className="flex flex-col leading-tight text-[13px]">
                                        <span className="font-medium text-gray-800">korrekt</span>
                                        <span className="text-gray-500 text-[11px]">(direkt)</span>
                                    </div>
                                </div>

                                {/* Korrekt (nach Hilfe) */}
                                <div className="flex items-center gap-3">
                                    <div className={`${ColorSquare.yellow} w-5 h-5 rounded-md shadow-sm`}></div>
                                    <div className="flex flex-col leading-tight text-[13px]">
                                        <span className="font-medium text-gray-800">korrekt</span>
                                        <span className="text-gray-500 text-[11px]">(nach Hilfe)</span>
                                    </div>
                                </div>

                                {/* Inkorrekt */}
                                <div className="flex items-center gap-3">
                                    <div className={`${ColorSquare.red} w-5 h-5 rounded-md shadow-sm`}></div>
                                    <span className="font-medium text-gray-800 text-[13px]">inkorrekt</span>
                                </div>

                            </div>
                        </div>
                    }
                    </caption>
                    <StudentTableHead
                        orderedQuestions={currentQuestions}
                        funktion={openDialog}
                        className={gridElements.gridElementLookDynamic}
                    />
                    <StudentTableBody
                        students={currentStudents}
                        questions={currentQuestions}
                        answers={jsonData.schueler_antworten}
                        funktion={openDialog}
                        assesment={currentAssessment}
                    />
                </table>

            </div>
        </div>
    );
}
export default StudentOverview