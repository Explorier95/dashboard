import jsonData from "../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "./modalAnswer.jsx";
import { ElementSquares } from "./squareVariants.jsx";
import StudentOverviewHeader from "./studentOverviewHeader.jsx";
import DefaultStudentSort from "./defaultStudentSort.jsx";
import SortListName from "./sortList.jsx";
/*
*Sudent Table for the IPN-Dashboard
*@authort Fabian Tappendorf
*/
function StudentOverview() {

    const [info, setInfo] = useState(null)
    const [type, setType] = useState(null)
    const [sort, setSort] = useState(null)
    const [isSelected, setIsSelected] = useState(false);

    function changeSort(sort) {
        setSort(sort)
    }

    function openDialog(text, type) {
        setInfo(text)
        setType(type)
    }

    function closeDialog() {
        setInfo(null)
    }

    return (
        <div>
            {info && type === "Antwort" ? <ModalAnswer info={info} onClose={closeDialog} type="Antwort" />
                : info && type === "Frage" ? <ModalAnswer info={info} onClose={closeDialog} type="Frage" /> : ""}
            <div className={ElementSquares.studentSearchBar}>
                <h2 className="font-semibold color-gray">Sortieren</h2>
                <div className="text-[10px]">
                    <h3 className="font-semibold color-gray">Schüler</h3>
                    <input type="checkbox" id="alphabetic" checked={isSelected} onChange={(e) => {
                        setIsSelected(e.target.checked);
                        changeSort(e.target.checked ? "alphabetic" : "default");
                    }} />
                    <label className="align-top px-1">alphabetisch</label>
                    <input type="checkbox" id="bestUp" />
                    <label className="align-top px-1">beste Leistung oben</label>
                    <input type="checkbox" id="bestDown" />
                    <label className="align-top px-1">beste Leistung unten</label></div>
                <div className="text-[10px]">
                    <h3 className="font-semibold color-gray">Fragen</h3>
                    <input type="checkbox" id="numbering" />
                    <label className="align-top px-1">Nummerierung</label><input type="checkbox" id="diffRight" />
                    <label className="align-top px-1">schwierigste Frage rechts</label></div>
            </div>
            {/* Importet Component */}
            <StudentOverviewHeader />
            <div className={ElementSquares.studentMain}>
                <table className={ElementSquares.studentTableMain}>
                    {sort === "alphabetic" ?
                        <SortListName
                            list={jsonData}
                            funktion={openDialog} /> :
                        <DefaultStudentSort
                            list={jsonData}
                            funktion={openDialog} />}
                </table>
            </div>
        </div>


    );


}
export default StudentOverview;