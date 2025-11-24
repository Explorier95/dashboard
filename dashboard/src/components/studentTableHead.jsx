import { ElementSquares } from "./squareVariants.jsx";

export default function StudentTableHead({ className, funktion, list, orderBy }) {

    function countTotalWrong(dataList, question) {
        let amount = 0
        const answers = dataList.schueler_antworten
        for (let i = 0; i < answers.length - 1; i++) {
            if (answers.frage_nmbr === question && !answers.is_correct) {
                amount++
            }
        }
        return amount
    }

    function orderQuestionsWrong(dataList) {
        return dataList.fragen.map(frage => ({
            nmbr: frage.nmbr,
            title: frage.title,
            totalWrong: countTotalWrong(dataList, frage.nmbr)
        })).sort((a, b) => b.totalWrong - a.totalWrong); // absteigend nach Schwierigkeit
    }


function setDirection(order, listElement) {
    if (order === "difficulty") {
        return orderQuestionsWrong(listElement);
    }

    if (order === "number") {
        return orderNumbers(listElement);
    }

    return listElement.fragen;
}

const orderedList = setDirection(orderBy, list).map(frage => ({
    nmbr: frage.nmbr,
    title: frage.title,
    totalWrong: frage.totalWrong
}))

return (
    <thead>
        <tr>
            <th className={className}>Schüler</th>
            {orderedList.map((frage, index) => (<th key={index}
                className={ElementSquares.studentTableHeadDynamic}
                onClick={() => funktion(frage.title, "Frage")}>{frage.nmbr}</th>))}
        </tr>
    </thead>
)
}