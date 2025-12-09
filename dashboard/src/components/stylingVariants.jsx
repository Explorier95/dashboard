/*
*CSS Component for dynamic output
*All CSS-and styling-Elements are to be stored in here
*@author Fabian Tappendorf
*/

export const textStyles = {
    headlineLargeCenter: "text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-950 bg-clip-text text-transparent text-center mb-2 drop-shadow-md",
    headlineMediumCenter: "text-2xl font-semibold text-stone-100 mb-3 text-center",
    paragraph: "text-base text-gray-700 mb-2",
    buttonPrimary: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
    buttonSecondary: "bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
}

export const imagesStyles = {
    menuIcon: "absolute left-4 top-1/2 transform -translate-y-1/2 w-35 h-35"
}

export const menuStyles = {
    menuContainer: "relative bg-slate-100 p-4",
}

export const ColorSquare = {
    red: "w-5 h-5 bg-red-700 hover:bg-red-500 aspect-square rounded-sm m-2",
    yellow: "w-5 h-5 bg-yellow-500 hover:bg-yellow-300 aspect-square rounded-sm m-2",
    green: "w-5 h-5 bg-green-700 hover:bg-green-500 aspect-square rounded-sm m-2",
    //for heading with explanation,
    redHeadline: "w-5 h-5 bg-red-700 aspect-square rounded-sm text-center",
    yellowHeadline: "w-5 h-5 bg-yellow-500 aspect-square rounded-sm text-center",
    greenHeadline: "w-5 h-5 bg-green-700 aspect-square rounded-sm text-center"
}

export const gridElements = {
    grid: "grid grid-cols-2 auto-rows-auto gap-4",
    gridMain: "bg-stone-100 rounded-lg justify-center flex items-center gap-10 mb-4 ring-2 ring-blue-500/50",
    flexMain: "bg-slate-800 w-[800px] h-[800px] rounded-lg relative flex gap-4 p-4 flex-wrap",
    gridElementLook: "bg-slate-700 rounded-lg p-4 flex flex-col items-center justify-center text-white text-center",
    gridElementLookDynamic: "border-b border-gray-300 px-1 py-1 hover:bg-blue-400 text-sm font-semibold text-blue-900"
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
    studentTableData: "text-center text-sm",

    //heading with explanation
    studentTableHeaderDiv: "flex items-center gap-1 m-2  ",
    studentTableHeaderTable: "border-spacing-x-20 ",
    studentTableHeaderText: "text-nowrap text-white text-[12px] ...",

    //checkbox
    checkboxAccent: "accent-blue-900"
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

