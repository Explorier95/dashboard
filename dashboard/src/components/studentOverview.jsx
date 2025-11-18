import jsonData from "../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "./modalAnswer.jsx";
import { ColorSquare, ElementSquares } from "./squareVariants.jsx";
import StudentOverviewHeader from "./studentOverviewHeader.jsx";
/*
*Sudent Table for the IPN-Dashboard
*@authort Fabian Tappendorf
*/
function StudentOverview() {

    const [info, setInfo] = useState(null)
    const [type, setType] = useState(null)

    function openDialog(text, type) {
        setInfo(text);
        setType(type)
        console.log(text)
        console.log(type)
    }
    function closeDialog() {
        setInfo(null);
    }
    function squareColor(antwort) {

        let classNameTmp = ""

        if (antwort.under_help && antwort.is_correct) {
            classNameTmp = ColorSquare.yellow;
        } else if (!antwort.is_correct && antwort.under_help) {
            classNameTmp = ColorSquare.red;
        } else if (antwort.is_correct && !antwort.under_help) {
            classNameTmp = ColorSquare.green;
        } else {
            classNameTmp = ColorSquare.red;
        }

        const studentText = antwort.student_text

        return (
            <button onClick={() => openDialog(studentText, "Antwort")}
                className={classNameTmp}></button>
        )

    }

    return (
        <div>
            {info && type === "Antwort" ? <ModalAnswer info={info} onClose={closeDialog} type="Antwort" />
                : info && type === "Frage" ? <ModalAnswer info={info} onClose={closeDialog} type="Frage" /> : ""}
            <div className={ElementSquares.studentSearchBar}>
                <h2 className ="font-semibold color-gray">Sortieren</h2>
                <div className="text-[10px]">
                    <h3 className ="font-semibold color-gray">Schüler</h3>
                    <input type="checkbox" id="alphabetic" />
                    <label className="align-top px-1">alphabetisch</label><input type="checkbox" id="bestUp" />
                    <label className="align-top px-1">beste Leistung oben</label><input type="checkbox" id="bestDown" />
                    <label className="align-top px-1">beste Leistung unten</label></div>
                <div className="text-[10px]">
                    <h3 className ="font-semibold color-gray">Fragen</h3>
                    <input type="checkbox" id="numbering" />
                    <label className="align-top px-1">Nummerierung</label><input type="checkbox" id="diffRight" />
                    <label className="align-top px-1">schwierigste Frage rechts</label></div>
            </div>
            {/* Importet Component */}
            <StudentOverviewHeader />
            <div className={ElementSquares.studentMain}>
                <table className={ElementSquares.studentTableMain}>
                    <thead>
                        <tr>
                            <th className={ElementSquares.studentTableHeadStatic}>Schüler</th>
                            {jsonData.fragen.map((frage, index) => (<th key={index}
                                className={ElementSquares.studentTableHeadDynamic}
                                onClick={() => openDialog(frage.title, "Frage")}>{frage.nmbr}</th>))}
                        </tr>
                    </thead>
                    {jsonData.schueler.map((student, index) => (<tbody key={index} >
                        <tr>
                            <td className={ElementSquares.studentTableData}>{student.vorname}</td>
                            {jsonData.schueler_antworten
                                .filter(antwort => antwort.schueler_id === student.id)
                                .map((antwort, index) => (
                                    <td key={index} className={ElementSquares.studentTableColorBorder}>
                                        {squareColor(antwort)}
                                    </td>
                                ))}
                        </tr>
                    </tbody>))}
                </table>
            </div>
        </div>


    );


}
export default StudentOverview;