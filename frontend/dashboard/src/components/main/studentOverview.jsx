import { useState } from "react";
import ModalAnswer from "../modalAnswer.jsx";
import { ElementSquares, gridElements, textStyles, ColorSquare } from "../styling/stylingVariants.jsx";
import { StudentTableBody } from "./StudentTableBody.jsx";
import StudentTableHead from "./studentTableHead.jsx"

/*
*Sudent Table for the IPN-Dashboard
*@author Fabian Tappendorf
*/
function StudentOverview({data}) {
    const [info, setInfo] = useState(null);
    const [type, setType] = useState(null);

    // 1. Getrennte States
    const [studentSort, setStudentSort] = useState("default"); // alphabetic, bestUp, bestDown
    const [sortByDifficulty, setSortByDifficulty] = useState(false); // true oder false

    const getQuestionOrder = () => {
        if (!sortByDifficulty) return data.fragen;

        // Schwierigkeit berechnen (wie in TableHead)
        return [...data.fragen].map(frage => {
            const totalWrong = data.schueler_antworten.filter(
                a => a.frage_nmbr === frage.nmbr && !a.is_correct
            ).length;
            return { ...frage, totalWrong };
        }).sort((a, b) => a.totalWrong - b.totalWrong);
    };

    const getStudentOrder = () => {
        let students = [...data.schueler];

        //localCompare Funktion aus JavaScript für alphabetische Sortierung 
        if (studentSort === "alphabetic") {
            return students.sort((a, b) => a.vorname.localeCompare(b.vorname));
        }

        if (studentSort === "bestUp" || studentSort === "bestDown") {
            // Punkte berechnen (Logik aus deiner SortListPerformance)
            const studentsWithPoints = students.map(s => {
                const points = data.schueler_antworten
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
        return data.tutor_assessments;
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
            <h2 className={textStyles.headlineElements}>Sortierung</h2>

            <div className="mb-4">
                <h3 className={textStyles.headlineInnerElementAlignLeft + " mb-1"}>Schüler</h3>
                <div className="flex items-center gap-6 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    className={ElementSquares.checkboxAccent}
                    checked={studentSort === "alphabetic"}
                    onChange={() => setStudentSort("alphabetic")}
                    />
                    <span className={textStyles.paragraph}>Alphabetisch</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    className={`${ElementSquares.checkboxAccent} mt-0.5`}
                    checked={studentSort === "bestUp"}
                    onChange={() => setStudentSort("bestUp")}
                    />
                    <span className="flex flex-col leading-tight">
                        <span className={textStyles.paragraph}>Aufsteigend</span>
                        <span className="text-xs text-slate-500">(nach Score)</span>
                    </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    className={ElementSquares.checkboxAccent}
                    checked={studentSort === "bestDown"}
                    onChange={() => setStudentSort("bestDown")}
                    />
                     <span className="flex flex-col leading-tight">
                        <span className={textStyles.paragraph}>Absteigend</span>
                        <span className="text-xs text-slate-500">(nach Score)</span>
                    </span>
                </label>
                </div>

            </div>

            <div>
                <h3 className={textStyles.headlineInnerElementAlignLeft + " mb-1"}>Fragen</h3>

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
            <div className="flex flex-col pt-4">
            {/*  Legende ÜBER der Tabelle */}
            <div className="mb-0 pb-1 border-b border-gray-300">
                <div className="flex flex-row justify-center items-center gap-12">
                {/* Korrekt (direkt) */}
                <div className="flex items-center gap-3">
                    <div className={`${ColorSquare.green} w-5 h-5 rounded-md shadow-sm`} />
                    <div className="flex flex-col leading-tight text-[13px]">
                    <span className="font-medium text-gray-800">Korrekt</span>
                    <span className="text-gray-500 text-[11px]">(direkt)</span>
                    </div>
                </div>

                {/* Korrekt (nach Hilfe) */}
                <div className="flex items-center gap-3">
                    <div className={`${ColorSquare.yellow} w-5 h-5 rounded-md shadow-sm`} />
                    <div className="flex flex-col leading-tight text-[13px]">
                    <span className="font-medium text-gray-800">Korrekt</span>
                    <span className="text-gray-500 text-[11px]">(nach Hilfe)</span>
                    </div>
                </div>

                {/* Inkorrekt */}
                <div className="flex items-center gap-3">
                    <div className={`${ColorSquare.red} w-5 h-5 rounded-md shadow-sm`} />
                    <span className="font-medium text-gray-800 text-[13px]">Inkorrekt</span>
                </div>
                </div>
            </div>

            {/* Tabelle ohne Caption */}
            <div className = "mt-0">
            <table className={ElementSquares.studentTableMain}>
                <StudentTableHead
                orderedQuestions={currentQuestions}
                funktion={openDialog}
                className={gridElements.gridElementLookDynamic}
                />
                <StudentTableBody
                students={currentStudents}
                questions={currentQuestions}
                answers={data.schueler_antworten}
                funktion={openDialog}
                assesment={currentAssessment}
                />
            </table>
            </div>
            </div>
            </div>
        </div>
        );
}
export default StudentOverview