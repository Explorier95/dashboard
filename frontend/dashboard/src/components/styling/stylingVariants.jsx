/*
*CSS Component for dynamic output
*All CSS-and styling-Elements are to be stored in here
*@author Fabian Tappendorf
*/
import sprechblase from '../../img/sprechblase_reduziert.png'
import sprechblaseColor from '../../img/sprechblase_reduziert.png'

export const textStyles = {
    headlineLargeCenter: "text-4xl font-bold bg-gradient-to-r ipn-blue text-center mb-2 drop-shadow-md",
    headlineMediumCenter: "text-2xl font-semibold mb-3 text-center",
    headlineElements: "text-xl font-bold  mb-1 text-center",
    headlineElementsh2: "text-lg font-semibold  mb-1 text-center", 
    headlineInnerElementAlignLeft: "text-lg font-semibold text-left",
    paragraph: "text-base whitespace-pre-wrap",
    buttonPrimary: "bg-ipn-primary text-white px-4 py-2 rounded hover:bg-blue-700",
    buttonSecondary: "bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-s400"
}

export const imagesStyles = {
    menuIcon: "absolute left-4 top-1/2 transform -translate-y-1/2 w-35 h-35"
}

export const menuStyles = {
    menuContainer: "mb-4 relative bg-stone-100 p-4",
}

export const ColorSquare = {
    red: "w-5 h-5 bg-ipn-wrong hover:bg-red-500 rounded-sm m-2 drop-shadow-md",
    yellow: "w-5 h-5 bg-ipn-right-with-help hover:bg-yellow-300 rounded-sm m-2 drop-shadow-md",
    green: "w-5 h-5 bg-ipn-right hover:bg-green-500 rounded-sm m-2 ",
    //evtl. redundant
    grey: "w-5 h-5 bg-gray-400 hover:bg-gray-200 aspect-square rounded-sm m-2",
    //for heading with explanation,
    redHeadline: "w-5 h-5 bg-ipn-wrong aspect-square rounded-sm",
    yellowHeadline: "w-5 h-5 bg-ipn-right-with-help aspect-square rounded-sm",
    greenHeadline: "w-5 h-5 bg-ipn-right aspect-square rounded-sm"
}

export const gridElements = {
    flex: "flex flex-col mt-4 mb-8 flex-wrap gap-4 ",
    grid: "relative grid grid-cols-2 auto-rows-min gap-4 ",
    gridAlt: "grid grid-cols-2 grid-flow-col auto-rows-max gap-6 bg-slate-800",
    gridAltNoCol: "grid grid-cols-1 grid-flow-col auto-rows-max auto-rows-max gap-6",
    gridMore: "bg-stone-100 rounded-lg justify-center grid auto-rows-min gap-4 rounded-xl shadow-2xl p-6 shadow-md ",
    gridMain: "bg-stone-100 rounded-lg justify-center flex items-center gap-10 mb-2 shadow-md rounded-xl shadow-2xl",
    gridConcepts: "mb-4 gap-6 bg-stone-100 backdrop-blur-md p-6 rounded-2xl shadow-md rounded-xl shadow-2xl ",
    gridPieChart: "mb-4 flex flex-col items-center bg-stone-100 backdrop-blur-md p-6 rounded-2xl shadow-lg shadow-md rounded-xl shadow-2xl",
    flexMain: "bg-slate-800 w-[800px] h-[800px] rounded-lg relative flex gap-4 p-4 flex-wrap",
    gridElementLook: "bg-slate-700 rounded-lg p-4 flex flex-col items-center justify-center text-white text-center",
    gridElementLookDynamic: "border-b border-gray-300 px-1 py-1 hover:bg-ipn-light hover:font-bold text-sm font-semibold text-bg-ipn-text"
}

export const ElementSquares = {
    //app content
    appMain: "flex flex-col gap-10 overflow-x-hidden font-syntax",
    selectionMain: "justify-items-center ",
    selectionBody: "relative overflow-visible flex justify-center items-center gap-20 mb-4 p-4 bg-stone-100 rounded-lg",
    selectionDataBase:  "relative z-10 rounded-md px-10 py-3 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ipn-primary/40",
    selectionDataInactive:  "bg-white text-blue-8 text-sm shadow-[0_4px_12px_rgba(0,90,160,0.18),0_0_12px_rgba(0,90,160,0.12)] hover:shadow-[0_6px_16px_rgba(0,90,160,0.22),0_0_16px_rgba(0,90,160,0.16)] hover:bg-ipn-primary/10",
    selectionDataActive:  "bg-ipn-lightblue text-white font-bold shadow-md scale-[1.03]",
    appJustifyCenter: "justify-items-center",

    //studentOverview  content
    studentSortTableGap: "grid gap-4 mb-2 ",
    studentSearchBar: "bg-stone-100 rounded-lg justify-center items-center gap-25 shadow-md py-4 px-8 rounded-xl shadow-2xl",
    studentMain: "mb-4 bg-stone-100 rounded-lg justify-center flex items-center gap-10 mb-4 shadow-md  rounded-xl shadow-2xl",
    studentTableMain: "m-4",
    studentTableHeadStatic: "border border-gray-300 px-1 py-1 text-left",
    studentTableData: "text-center text-sm",
    speakBubbleImage: "w-9 h-9",

    //heading with explanation
    studentTableHeaderDiv: "flex items-center gap-1 m-2",
    studentTableHeaderTable: "border-spacing-x-20 ",
    studentTableHeaderText: "text-nowrap text-bg-ipn-text text-[13px]...",
    studenTableFooter: "border-t border-gray-300 px-1 py-1 ",

    //checkbox
    checkboxAccent: "bg-ipn-dark"
}
//*---------------------------------- Components ----------------------------------*/
export function buttonInfoAssessment(assesment, funktion) {
    let assessmentText = ""

    if (assesment === undefined || assesment.tutor_text === null || assesment.length < 0) {
        console.log("Kein Assessment vorhanden");
    } 
    return (
        <button
        type='button'
        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} 
        className="flex items-center justify-center w-full h-full"
        onClick={() => { console.log(assesment); funktion(assesment, "Tutorbewertung"); }}>
            <img className={ElementSquares.speakBubbleImage} src={sprechblaseColor} alt="Picture error"></img>
        </button>
    )
}

export function SquareColor(antwort, funktion) {

    let classNameTmp = ""
    let studentText = ""

    if (antwort === undefined) {
        classNameTmp = ColorSquare.grey;
        console.log("undefined Antwort in SquareColor");
    } else if (antwort.under_help && antwort.is_correct) {
        classNameTmp = ColorSquare.yellow;
    } else if (!antwort.is_correct && antwort.under_help) {
        classNameTmp = ColorSquare.red;
    } else if (antwort.is_correct && !antwort.under_help) {
        classNameTmp = ColorSquare.green;
    } else {
        classNameTmp = ColorSquare.red;
    }

    if (antwort !== undefined) {
        studentText = antwort.student_text
    } else {
        studentText = "Keine Antwort vorhanden"
    }

    return (
        <button onClick={() => funktion(studentText, "Antwort")}
            className={classNameTmp}></button>
    )


}

