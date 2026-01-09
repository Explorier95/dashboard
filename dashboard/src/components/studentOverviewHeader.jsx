import { ElementSquares, ColorSquare } from "./styling/stylingVariants"
import Table from "./table"
/*
*@description
*Header Component for the studentOverview
*@authort Fabian Tappendorf
*@Redundant
*/
export default function StudentOverviewHeader() {

    return (

        <Table className={ElementSquares.studentTableHeaderText}
            tableClassName={ElementSquares.studentTableHeaderTable}
            tableFooter={
                <>
                    <td className={ElementSquares.studentTableHeaderDiv}>
                        <span className={ColorSquare.greenHeadline}></span>
                        <span>Korrekt (direkt)</span>
                    </td>


                    <td className={ElementSquares.studentTableHeaderDiv}>
                        <span className={ColorSquare.yellowHeadline}></span>
                        <span>Korrekt (nach Hilfe)</span>
                    </td>


                    <td className={ElementSquares.studentTableHeaderDiv}>
                        <span className={ColorSquare.redHeadline}></span>
                        <span>Inkorrekt</span>
                    </td>
                </>
            }
        //Zum testen vom table interface
        /* tableBody={<><td>Some Data 1</td><td>Some Data 2</td><td>Some Data 3</td></>} */
        >

        </Table>

    )
}