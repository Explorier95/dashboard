import { ElementSquares, SquareColor } from "./squareVariants.jsx";

export default function SortByQuestion({ list, funktion, newQuestionList }) {
    //TODO
    function sortList(studentAnswerList, questionList) {
        let newStudentAnswerList = []
        for (let x = 0; x < list.schueler_antworten - 1; x++) {
            if (studentAnswerList[x].frage_nmbr === questionList[x].nmbr) {
                newStudentAnswerList.push(questionList[x])
            } else{
                
            }
        }

    }

    return (



        null
    )
}