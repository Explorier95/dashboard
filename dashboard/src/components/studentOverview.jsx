import jsonData from "../static/json_fuer_fabian_cba_dashboard.json";
import { useState } from "react";
import ModalAnswer from "./modalAnswer.jsx";
import { ElementSquares } from "./squareVariants.jsx";
import StudentOverviewHeader from "./studentOverviewHeader.jsx";
import StudentTableHead from "./studentTableHead.jsx";
import SortListName from "./sortListName.jsx";
import SortListPerformance from "./sortListPerformance.jsx";
/*
*Student Table for the IPN-Dashboard
*@author Fabian Tappendorf
*/
function StudentOverview() {
  const [info, setInfo] = useState(null);
  const [type, setType] = useState(null);
  const [studentSort, setStudentSort] = useState("alphabetic");
  const [questionSort, setQuestionSort] = useState("default");

  function countTotalWrong(questionNr) {
    let amount = 0;
    const answers = jsonData.schueler_antworten;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i].frage_nmbr === questionNr && !answers[i].is_correct) {
        amount++;
      }
    }
    return amount;
  }

  function orderQuestionsWrong() {
    return jsonData.fragen
      .map((frage) => ({
        nmbr: frage.nmbr,
        title: frage.title,
        totalWrong: countTotalWrong(frage.nmbr),
      }))
      .sort((a, b) => a.totalWrong - b.totalWrong);
  }

  const orderedQuestions =
    questionSort === "difficulty" ? orderQuestionsWrong() : jsonData.fragen;

  function openDialog(text, type) {
    setInfo(text);
    setType(type);
  }

  function closeDialog() {
    setInfo(null);
  }

  return (
    <div className={ElementSquares.studentContainer}>
      {info && type === "Antwort" ? (
        <ModalAnswer info={info} onClose={closeDialog} type="Antwort" />
      ) : info && type === "Frage" ? (
        <ModalAnswer info={info} onClose={closeDialog} type="Frage" />
      ) : (
        ""
      )}
      <div className={ElementSquares.studentSearchBar}>
        <h2 className="font-semibold color-gray">Sortieren</h2>
        <div className="flex flex-col gap-2 text-[10px]">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold color-gray mr-2">Schüler</h3>
            <input
              type="checkbox"
              className={ElementSquares.checkboxAccent}
              checked={studentSort === "alphabetic"}
              onChange={() =>
                setStudentSort(
                  studentSort === "alphabetic" ? "default" : "alphabetic"
                )
              }
            />
            <label className="align-top px-1">Alphabetisch</label>
            <input
              type="checkbox"
              className={ElementSquares.checkboxAccent}
              checked={studentSort === "bestUp"}
              onChange={() =>
                setStudentSort(studentSort === "bestUp" ? "default" : "bestUp")
              }
            />
            <label className="align-top px-1">Beste Leistung oben</label>
            <input
              type="checkbox"
              className={ElementSquares.checkboxAccent}
              checked={studentSort === "bestDown"}
              onChange={() =>
                setStudentSort(
                  studentSort === "bestDown" ? "default" : "bestDown"
                )
              }
            />
            <label className="align-top px-1">Beste Leistung unten</label>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold color-gray mr-2">Fragen</h3>
            <input
              type="checkbox"
              className={ElementSquares.checkboxAccent}
              checked={questionSort === "difficulty"}
              onChange={() =>
                setQuestionSort(
                  questionSort === "difficulty" ? "default" : "difficulty"
                )
              }
            />
            <label className="align-top px-1">Schwierigste Frage rechts</label>
          </div>
        </div>
      </div>
      {/* Imported Component */}
      <div className={ElementSquares.studentMain}>
        <div className="w-full">
          <StudentOverviewHeader />
          <div className={ElementSquares.studentTableScroll}>
            <table className={ElementSquares.studentTableMain}>
              <StudentTableHead
                className={ElementSquares.studentTableHeadDynamic}
                funktion={openDialog}
                list={jsonData}
                orderBy={questionSort === "difficulty" ? "difficulty" : "default"}
                orderedQuestions={orderedQuestions}
              />
              {studentSort === "alphabetic" || studentSort === "default" ? (
                <SortListName
                  list={jsonData}
                  funktion={openDialog}
                  showHeader={false}
                  questionOrder={orderedQuestions}
                />
              ) : (
                <SortListPerformance
                  list={jsonData}
                  funktion={openDialog}
                  direction={studentSort}
                  questionOrder={orderedQuestions}
                />
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentOverview;
