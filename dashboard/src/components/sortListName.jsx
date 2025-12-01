import { ElementSquares, SquareColor } from "./squareVariants.jsx";
import StudentTableHead from "./studentTableHead.jsx";

export default function SortList({ list, funktion, showHeader = true, questionOrder = null }) {
  const { schueler, schueler_antworten } = list;

  return (
    <>
      {showHeader && (
        <StudentTableHead
          className={ElementSquares.studentTableHeadDynamic}
          funktion={funktion}
          list={list}
        />
      )}
      {[...schueler]
        .sort((a, b) => a.vorname.localeCompare(b.vorname))
        .map((student, index) => (
          <tbody key={index}>
            <tr>
              <td className={ElementSquares.studentTableData}>{student.vorname}</td>
              {(questionOrder
                ? questionOrder.map((frage) =>
                    schueler_antworten.find(
                      (antwort) =>
                        antwort.schueler_id === student.id &&
                        antwort.frage_nmbr === frage.nmbr
                    )
                  )
                : schueler_antworten.filter(
                    (antwort) => antwort.schueler_id === student.id
                  )
              ).map((antwort, idx) => (
                <td key={idx} className={ElementSquares.studentTableData}>
                  {antwort ? SquareColor(antwort, funktion) : null}
                </td>
              ))}
            </tr>
          </tbody>
        ))}
    </>
  );
}
