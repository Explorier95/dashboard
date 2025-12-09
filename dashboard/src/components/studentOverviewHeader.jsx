import { ElementSquares, ColorSquare, textStyles,  } from "./styling/stylingVariants"
import Table from "./table"
/*
*Header Component for the studentOverview
*@authort Fabian Tappendorf
*/
export default function StudentOverviewHeader() {

    return (

        <Table className={ElementSquares.studentTableHeaderText}
            tableClassName={ElementSquares.studentTableHeaderTable}
            tableHead={
                <>
                    <th>
                        <div className={ElementSquares.studentTableHeaderDiv}>
                            <div className={ColorSquare.greenHeadline}></div>
                            <span>Korrekt (direkt)</span>
                        </div>
                    </th>
                    <th>
                        <div className={ElementSquares.studentTableHeaderDiv}>
                            <div className={ColorSquare.yellowHeadline}></div>
                            <span>Korrekt (nach Hilfe)</span>
                        </div>
                    </th>
                    <th>
                        <div className={ElementSquares.studentTableHeaderDiv}>
                            <div className={ColorSquare.redHeadline}></div>
                            <span>Inkorrekt</span>
                        </div>
                    </th>
                </>
            }
            //Zum testen vom table interface
            /* tableBody={<><td>Some Data 1</td><td>Some Data 2</td><td>Some Data 3</td></>} */
        >

        </Table>

    )
}