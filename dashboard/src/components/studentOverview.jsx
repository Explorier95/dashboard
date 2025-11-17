import jsonData from "../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "./modalAnswer.jsx";

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
        const squares = {
            green: "w-6 h-6 bg-green-700 hover:bg-green-500 aspect-square rounded-lg m-2",
            yellow: "w-6 h-6 bg-yellow-500 hover:bg-yellow-300 aspect-square rounded-lg m-2",
            red: "w-6 h-6 bg-red-700 hover:bg-red-500 aspect-square rounded-lg m-2"
        }

        let classNameTmp = ""

        if (antwort.under_help && antwort.is_correct) {
            classNameTmp = squares.yellow;
        } else if (!antwort.is_correct && antwort.under_help) {
            classNameTmp = squares.red;
        } else if (antwort.is_correct && !antwort.under_help) {
            classNameTmp = squares.green;
        } else {
            classNameTmp = squares.red;
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
             : info && type === "Frage" ? <ModalAnswer info={info} onClose={closeDialog} type="Frage"/> : ""}
            <div className="bg-stone-100 rounded-lg justify-center flex items-center gap-10 mb-4 ring-2 ring-blue-500/50">
                <table className="talbe-auto border-collapse border border-gray-400 m-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-2 py-1 text-left...">Schüler</th>
                            {jsonData.fragen.map((frage, index) => (<th key={index}
                             className="border border-gray-300 px-2 py-1 hover:bg-green-500 text-left..."
                             onClick={()=>openDialog(frage.title,"Frage")}>{frage.nmbr}</th>))}
                        </tr>
                    </thead>
                    {jsonData.schueler.map((student, index) => (<tbody key={index} >
                        <tr>
                            <td className="border border-gray-300 px-2 py-1">{student.vorname}</td>
                            {jsonData.schueler_antworten
                                .filter(antwort => antwort.schueler_id === student.id)
                                .map((antwort, index) => (
                                    <td key={index} className="border border-gray-300">
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