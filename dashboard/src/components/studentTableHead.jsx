import { ElementSquares } from "./squareVariants.jsx";
import { DefaultStudentSort, SortByQuestion} from "./Sort.jsx";

/*
*Table Head with sorting function for the IPN-Dashboard
*@author Fabian Tappendorf
*/
export default function StudentTableHead({ className, funktion, list, orderBy }) {

    function countTotalWrong(dataList, questionNr) {
        let amount = 0
        const answers = dataList.schueler_antworten

        for (let i = 0; i < answers.length - 1; i++) {
            //console.log(answers[i].frage_nmbr)
            if (answers[i].frage_nmbr === questionNr && !answers[i].is_correct) {
                //console.log(answers[i].is_correct)
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
        })).sort((a, b) => a.totalWrong - b.totalWrong); // aufsteigend nach Schwierigkeit
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

    const oderedObject = setDirection(orderBy, list)

    const orderedList = oderedObject.map(frage => ({
        nmbr: frage.nmbr,
        title: frage.title,
        totalWrong: frage.totalWrong
    }))

    return (
        <>
            <thead>
                {console.log(orderBy)}
                <tr>
                    <th className={className}>Schüler</th>
                    {orderedList.map((frage, index) => (<th key={index}
                        className={ElementSquares.studentTableHeadDynamic}
                        onClick={() => funktion(frage.title, "Frage")}>{frage.nmbr}</th>))}
                </tr>
            </thead>
            {orderBy === "difficulty" || orderBy === "numbered" ? (

                <SortByQuestion
                    newQuestionList={orderedList}
                    list={list}
                    funktion={funktion}
                />

            ) : orderBy === "default" ? (<DefaultStudentSort
                list={list}
                funktion={funktion}
            />) : null}

        </>
    )
}