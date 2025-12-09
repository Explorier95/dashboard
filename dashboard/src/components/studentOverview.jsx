import jsonData from "../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "./modalAnswer.jsx";
import { ElementSquares, gridElements } from "./stylingVariants.jsx";
import { SortList, SortListPerformance } from "./Sort.jsx";
import StudentOverviewHeader from "./studentOverviewHeader.jsx";
import StudentTableHead from "./studentTableHead.jsx"

/*
*Sudent Table for the IPN-Dashboard
*@author Fabian Tappendorf
*/
function StudentOverview() {

    const [info, setInfo] = useState(null)
    const [type, setType] = useState(null)
    const [sort, setSort] = useState("alphabetic")

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
                <div className="text-[12px]">
                    <h3 className="font-semibold color-gray">Schüler</h3>
                    <input
                        type="checkbox"
                        className={ElementSquares.checkboxAccent}
                        checked={sort === "alphabetic"}
                        onChange={() => setSort(sort === "alphabetic" ? "default" : "alphabetic")}
                    />
                    <label className="align-top px-1">Alphabetisch</label>
                    <input
                        type="checkbox"
                        className={ElementSquares.checkboxAccent}
                        checked={sort === "bestUp"}
                        onChange={() => setSort(sort === "bestUp" ? "default" : "bestUp")}
                    />
                    <label className="align-top px-1">Beste Leistung oben</label>
                    <input
                        type="checkbox"
                        className={ElementSquares.checkboxAccent}
                        checked={sort === "bestDown"}
                        onChange={() => setSort(sort === "bestDown" ? "default" : "bestDown")}
                    />
                    <label className="align-top px-1">Beste Leistung unten</label></div>
                <div className="text-[12px]">
                    <h3 className="font-semibold color-gray">Fragen</h3>
                    <input
                        type="checkbox"
                        className={ElementSquares.checkboxAccent}
                        checked={sort === "difficulty"}
                        onChange={() => setSort(sort === "difficulty" ? "default" : "difficulty")}
                    />
                    <label className="align-top px-1">Schwierigste Frage rechts</label></div>
            </div>
            {/* Importet Component */}
            <StudentOverviewHeader
            />
            <div className={ElementSquares.studentMain}>
                <table className={ElementSquares.studentTableMain}>
                    {sort === "alphabetic" ? (
                        <SortList list={jsonData} funktion={openDialog} />
                    ) : sort === "bestUp" || sort === "bestDown" ? (
                        <>
                            <StudentTableHead
                                className={gridElements.gridElementLookDynamic}
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
                    ) : sort === "difficulty" ? (<>
                        <StudentTableHead
                            className={gridElements.gridElementLookDynamic}
                            funktion={openDialog}
                            list={jsonData}
                            orderBy={sort}
                        />

                    </>
                    ) : (
                        <>
                            <StudentTableHead
                                className={gridElements.gridElementLookDynamic}
                                funktion={openDialog}
                                list={jsonData}
                                orderBy={sort}
                            />
                        </>
                    )}
                </table>
            </div>
        </div >


    );


}
export default StudentOverview