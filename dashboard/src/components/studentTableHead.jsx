import { ElementSquares } from "./squareVariants.jsx";
/*
*Table Head with sorting function for the IPN-Dashboard
*@author Fabian Tappendorf
*/
export default function StudentTableHead({ className, funktion, list, orderBy, orderedQuestions }) {

    function countTotalWrong(dataList, questionNr) {
        let amount = 0;
        const answers = dataList.schueler_antworten;

        for (let i = 0; i < answers.length; i++) {
            if (answers[i].frage_nmbr === questionNr && !answers[i].is_correct) {
                amount++;
            }
        }
        return amount;
    }

    function orderQuestionsWrong(dataList) {
        return dataList.fragen
            .map(frage => ({
                nmbr: frage.nmbr,
                title: frage.title,
                totalWrong: countTotalWrong(dataList, frage.nmbr)
            }))
            .sort((a, b) => a.totalWrong - b.totalWrong); // aufsteigend nach Schwierigkeit
    }

    function setDirection(order, listElement) {
        if (order === "difficulty") {
            return orderQuestionsWrong(listElement);
        }
        return listElement.fragen;
    }

    const orderedList = (orderedQuestions || setDirection(orderBy, list)).map(frage => ({
        nmbr: frage.nmbr,
        title: frage.title,
        totalWrong: frage.totalWrong
    }));

    return (
        <thead>
            <tr>
                <th className={className}>Schüler</th>
                {orderedList.map((frage, index) => (
                    <th
                        key={index}
                        className={ElementSquares.studentTableHeadDynamic}
                        onClick={() => funktion(frage.title, "Frage")}
                    >
                        {frage.nmbr}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
