/*
*CSS Component for dynamic output
*All CSS-Elements are to be stored in here
*@author Fabian Tappendorf
*/
export const ColorSquare = {
    red: "w-5 h-5 bg-red-700 hover:bg-red-500 aspect-square rounded-sm m-2",
    yellow: "w-5 h-5 bg-yellow-500 hover:bg-yellow-300 aspect-square rounded-sm m-2",
    green: "w-5 h-5 bg-green-700 hover:bg-green-500 aspect-square rounded-sm m-2",
    //for heading with explanation,
    redHeadline: "w-5 h-5 bg-red-700 aspect-square rounded-sm text-center",
    yellowHeadline: "w-5 h-5 bg-yellow-500 aspect-square rounded-sm text-center",
    greenHeadline: "w-5 h-5 bg-green-700 aspect-square rounded-sm text-center"
}

export const ElementSquares = {
    //app content
    appMain: "flex flex-col gap-10 overflow-x-hidden",
    appJustifyCenter: "justify-items-center",
    //studentOverview  content
    studentSearchBar: "bg-stone-100 rounded-lg justify-center items-center gap-4 mb-1 p-2 ring-2 ring-blue-500/50",
    studentMain: "bg-stone-100 rounded-lg justify-center flex items-center gap-10 mb-4 ring-2 ring-blue-500/50",
    studentTableMain: "talbe-auto border-collapse border border-gray-400 m-4",
    studentTableHeadStatic: "border border-gray-300 px-1 py-1 text-left...",
    studentTableHeadDynamic: "border border-gray-300 px-1 py-1 hover:bg-green-500 text-left...",
    studentTableData: "border border-gray-300 px-1 py-1",
    studentTableColorBorder: "border border-gray-300",
    //heading with explanation
    studentTableHeaderDiv: "flex items-center gap-1 m-2",
    studentTableHeaderTable: "border-spacing-x-20",
    studentTableHeaderText: "text-nowrap text-white text-[10px] ..."
}

export function SquareColor(antwort, funktion) {

    let classNameTmp = ""

    if (antwort.under_help && antwort.is_correct) {
        classNameTmp = ColorSquare.yellow;
    } else if (!antwort.is_correct && antwort.under_help) {
        classNameTmp = ColorSquare.red;
    } else if (antwort.is_correct && !antwort.under_help) {
        classNameTmp = ColorSquare.green;
    } else {
        classNameTmp = ColorSquare.red;
    }

    const studentText = antwort.student_text

    return (
        <button onClick={() => funktion(studentText, "Antwort")}
            className={classNameTmp}></button>
    )


}

