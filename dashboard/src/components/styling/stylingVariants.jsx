/*
*CSS Component for dynamic output
*All CSS-and styling-Elements are to be stored in here
*@author Fabian Tappendorf
*/

export const textStyles = {
    headlineLargeCenter: "text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-950 bg-clip-text text-transparent text-center mb-2 drop-shadow-md",
    headlineMediumCenter: "text-2xl font-semibold text-ipn-text mb-3 text-center",
    headlineElements: "text-2xl font-semibold text-ipn-text mb-2 text-center drop-shadow-md",
    headlineInnerElementAlignLeft: "text-xl font-semibold text-ipn-text text-left",
    headlineElementsAlignLeft: "text-2xl font-semibold text-ipn-text mb-1 text-left",
    paragraph: "text-base text-ipn-text",
    buttonPrimary: "bg-ipn-primary text-white px-4 py-2 rounded hover:bg-blue-700",
    buttonSecondary: "bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
}

export const imagesStyles = {
    menuIcon: "absolute left-4 top-1/2 transform -translate-y-1/2 w-35 h-35"
}

export const menuStyles = {
    menuContainer: "relative bg-stone-100 p-4",
}

export const ColorSquare = {
    red: "w-5 h-5 bg-ipn-wrong hover:bg-red-500 aspect-square rounded-sm m-2 drop-shadow-md",
    yellow: "w-5 h-5 bg-ipn-right-with-help hover:bg-yellow-300 aspect-square rounded-sm m-2 drop-shadow-md",
    green: "w-5 h-5 bg-ipn-right hover:bg-green-500 aspect-square rounded-sm m-2 ",
    //evtl. redundant
    grey: "w-5 h-5 bg-gray-400 hover:bg-gray-200 aspect-square rounded-sm m-2",
    //for heading with explanation,
    redHeadline: "w-5 h-5 bg-ipn-wrong aspect-square rounded-sm text-center",
    yellowHeadline: "w-5 h-5 bg-ipn-right-with-help aspect-square rounded-sm text-center",
    greenHeadline: "w-5 h-5 bg-ipn-right aspect-square rounded-sm text-center"
}

export const gridElements = {
    flex: "flex flex-col mt-4 mb-8 flex-qrap gap-4 ",
    grid: "relative grid grid-cols-2 auto-rows-min gap-4 ",
    gridAlt: "grid grid-cols-2 grid-flow-col auto-rows-max auto-rows-max gap-6 bg-slate-800",
    gridAltNoCol: "grid grid-cols grid-flow-col auto-rows-max auto-rows-max gap-6",
    gridMore: "bg-stone-100 rounded-lg justify-center grid auto-rows-min gap-4 ring-ipn-primary p-6 ring-2 ",
    gridMain: "bg-stone-100 rounded-lg justify-center flex items-center gap-10 mb-2 ring-2 ring-ipn-primary",
    gridConcepts: "gap-6 bg-stone-100 backdrop-blur-md p-6 rounded-2xl ring-2 ring-ipn-primary ",
    gridPieChart: "flex flex-col items-center bg-stone-100 backdrop-blur-md p-6 rounded-2xl shadow-lg ring-2 ring-ipn-primary",
    flexMain: "bg-slate-800 w-[800px] h-[800px] rounded-lg relative flex gap-4 p-4 flex-wrap",
    gridElementLook: "bg-slate-700 rounded-lg p-4 flex flex-col items-center justify-center text-white text-center",
    gridElementLookDynamic: "border-b border-gray-300 px-1 py-1 hover:bg-ipn-light hover:font-bold text-sm font-semibold text-bg-ipn-text"
}

export const ElementSquares = {
    //app content
    appMain: "flex flex-col gap-10 overflow-x-hidden  ",
    appJustifyCenter: "justify-items-center",

    //studentOverview  content
    studentSearchBar: "bg-stone-100 rounded-lg justify-center items-center gap-4 mb-1 p-2 ring-2 ring-ipn-primary",
    studentMain: "bg-stone-100 rounded-lg justify-center flex items-center gap-10 mb-4 ring-2 ring-ipn-primary",
    studentTableMain: "table-auto m-4 ",
    studentTableHeadStatic: "border border-gray-300 px-1 py-1 text-left...",
    studentTableData: "text-center text-sm",

    //heading with explanation
    studentTableHeaderDiv: "flex items-center gap-1 m-2  ",
    studentTableHeaderTable: "border-spacing-x-20 ",
    studentTableHeaderText: "text-nowrap text-bg-ipn-text text-[13px] ...",

    //checkbox
    checkboxAccent: "bg-ipn-dark"
}

export function SquareColor(antwort, funktion) {

    let classNameTmp = ""
    let studentText = ""

    if (antwort === undefined) {
        classNameTmp = ColorSquare.grey;
        console.log("undefined Antwort in SquareColor" );
    }else if (antwort.under_help && antwort.is_correct) {
        classNameTmp = ColorSquare.yellow;
    } else if (!antwort.is_correct && antwort.under_help) {
        classNameTmp = ColorSquare.red;
    } else if (antwort.is_correct && !antwort.under_help) {
        classNameTmp = ColorSquare.green;
    } else {
        classNameTmp = ColorSquare.red;
    }

    if(antwort !== undefined){
         studentText = antwort.student_text
    }else{
         studentText = "Keine Antwort vorhanden"
    }
    
    return (
        <button onClick={() => funktion(studentText, "Antwort")}
            className={classNameTmp}></button>
    )


}

