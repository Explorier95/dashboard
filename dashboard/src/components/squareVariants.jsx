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
    appShell: "min-h-screen bg-slate-50 text-blue-900 py-10 px-2 md:px-6",
    appFrame: "w-full max-w-none bg-white rounded-2xl shadow-2xl shadow-blue-100 ring-2 ring-blue-200 overflow-hidden flex flex-col gap-6 px-4 md:px-8 py-6",
    dashboardGrid: "grid gap-6 lg:grid-cols-2 w-full",
    cardShell: "bg-white rounded-xl shadow-xl shadow-blue-100 ring-1 ring-slate-200 p-4",
    footerCard: "bg-white text-blue-900 border-t border-slate-200 p-6 shadow-xl shadow-blue-100",
    resizableCard: "w-full min-w-[320px] md:min-w-[480px] lg:min-w-[600px] max-w-full resize overflow-auto",
    appJustifyCenter: "justify-items-center",

    //studentOverview  content
    studentContainer: "flex flex-col gap-3 p-1",
    studentSearchBar: "bg-white rounded-lg w-full flex flex-wrap justify-between items-center gap-4 mb-2 p-3 ring-2 ring-blue-200 shadow-md shadow-blue-100",
    studentMain: "bg-white rounded-lg w-full flex flex-col items-center justify-start gap-6 mb-4 ring-2 ring-blue-200 shadow-md shadow-blue-100 p-4 md:p-6",
    studentTableScroll: "w-full max-h-[60vh] md:max-h-[65vh] overflow-y-auto",
    studentTableMain: "table-auto border-collapse border border-gray-300 mx-auto my-4",
    studentTableHeadStatic: "border border-gray-300 px-1 py-1 text-center text-sm font-semibold text-blue-900",
    studentTableHeadDynamic: "border-b border-gray-300 px-1 py-1 hover:bg-blue-400 text-sm font-semibold text-blue-900 text-center",
    studentTableData: "text-center align-middle text-sm text-blue-900",
    
    //heading with explanation
    studentTableHeaderDiv: "flex items-center gap-1 m-2  ",
    studentTableHeaderTable: "w-full border-separate border-spacing-x-6",
    studentTableHeaderText: "w-full flex justify-start px-4 mb-2 text-nowrap text-blue-900 text-[10px] font-semibold",

    //checkbox
    checkboxAccent: "accent-blue-800 w-4 h-4 rounded-md shadow-sm shadow-blue-200 border border-blue-300"
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

