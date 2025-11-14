import jsonData from "../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "./modalAnswer.jsx";

function StudentOverview() {

    const [info, setInfo] = useState(null)

    function openDialog(text) {
        setInfo(text);
        console.log(text)
    }

    function closeDialog() {
        setInfo(null);
    }

    function squareColor(){
        {}
        return "w-8 h-8 bg-green-700 hover:bg-green-500 aspect-square rounded-lg m-4"
    }

    function isCorrect(item) {
        return (
            <button
                onClick={() => openDialog(item)}
                className="w-7 h-7 bg-green-700 hover:bg-green-500 aspect-square rounded-lg m-4"
            />
        )
    }

    function isCorrectWithHelp(item) {
        return (
            <button onClick={() => openDialog(item)}
                className="w-7 h-7 bg-yellow-500 hover:bg-yellow-300 aspect-square rounded-lg flex m-4"></button>
        )
    }

    function isWrong(item) {
        return (
            <button onClick={() => openDialog(item)}
            className="w-7 h-7 bg-red-700 hover:bg-red-500 aspect-square rounded-lg m-4"></button>
        )
    }

    return (
       
        <div>
            {info && <ModalAnswer info={info} onClose={closeDialog} />}
            <div className="bg-stone-100 rounded-lg justify-center flex items-center gap-10 mb-4 ring-2 ring-blue-500/50">
                <table className="talbe-auto border-collapse border border-gray-400 m-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-2 py-1 text-left...">Schüler</th>
                            {jsonData.fragen.map((frage, index) => (<th key={index} className="border border-gray-300 px-2 py-1 text-left...">{frage.nmbr}</th>))}

                        </tr>
                    </thead>
                    {jsonData.schueler.map((student, index) => (<tbody key={index} >
                        <tr>
                            <td className="border border-gray-300 px-2 py-1 ...">{student.vorname}</td>
                            {jsonData.schueler_antworten
                                .filter(antwort => antwort.schueler_id === student.id)
                                .map((antwort, index) => (
                                    <td key={index} className="border border-gray-300 px-2 py-1">
                                        {antwort.under_help ? isCorrectWithHelp(antwort.student_text) : antwort.is_correct ? isCorrect(antwort.student_text) : isWrong(antwort.student_text)}
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