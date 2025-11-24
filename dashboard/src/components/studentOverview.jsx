import jsonData from "../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "./modalAnswer.jsx";
import { ElementSquares } from "./squareVariants.jsx";
import StudentOverviewHeader from "./studentOverviewHeader.jsx";
import StudentTableHead from "./studentTableHead.jsx"
import DefaultStudentSort from "./defaultStudentSort.jsx";
import SortListName from "./sortListName.jsx";
import SortListPerformance from "./sortListPerformance.jsx";
/*
*Sudent Table for the IPN-Dashboard
*@authort Fabian Tappendorf
*/
function StudentOverview() {

    const [info, setInfo] = useState(null)
    const [type, setType] = useState(null)
    const [sort, setSort] = useState("sortUp")

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
                    <input
                        type="checkbox"
                        checked={sort === "alphabetic"}
                        onChange={() => setSort(sort === "alphabetic" ? "default" : "alphabetic")}
                    />
                    <label className="align-top px-1">alphabetisch</label>
                    <input
                        type="checkbox"
                        checked={sort === "bestUp"}
                        onChange={() => setSort(sort === "bestUp" ? "default" : "bestUp")}
                    />
                    <label className="align-top px-1">beste Leistung oben</label>
                    <input
                        type="checkbox"
                        checked={sort === "bestDown"}
                        onChange={() => setSort(sort === "bestDown" ? "default" : "bestDown")}
                    />
                    <label className="align-top px-1">beste Leistung unten</label></div>
                <div className="text-[10px]">
                    <h3 className="font-semibold color-gray">Fragen</h3>
                    <input type="checkbox" id="numbering" />
                    <label className="align-top px-1">Nummerierung</label>                    <input
                        type="checkbox"
                        checked={sort === "difficulty"}
                        onChange={() => setSort(sort === "difficulty" ? "default" : "difficulty")}
                    />
                    <label className="align-top px-1">schwierigste Frage rechts</label></div>
            </div>
            {/* Importet Component */}
            <StudentOverviewHeader
            />
            <div className={ElementSquares.studentMain}>
                <table className={ElementSquares.studentTableMain}>
                    {sort === "alphabetic" ? (
                        <SortListName list={jsonData} funktion={openDialog} />
                    ) : sort === "bestUp" || sort === "bestDown" || sort === "difficulty" ? (
                        <>
                            <StudentTableHead
                                className={ElementSquares.studentTableHeadDynamic}
                                funktion={openDialog}
                                list={jsonData}
                                orderBy={sort}
                            />
                            <SortListPerformance
                                list={jsonData}
                                funktion={openDialog}
                                direction={sort}
                            />
                        </>
                    ) : (
                        <DefaultStudentSort list={jsonData} funktion={openDialog} />
                    )}
                </table>
            </div>
        </div>


    );


}
export default StudentOverview