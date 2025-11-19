import { ElementSquares, ColorSquare } from "./squareVariants"
import Table from "./table"
/*
*Header Component for the studentOverview
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
                            <span>korrekt (direkt)</span>
                        </div>
                    </th>
                    <th>
                        <div className={ElementSquares.studentTableHeaderDiv}>
                            <div className={ColorSquare.yellowHeadline}></div>
                            <span>korrekt (nach Hilfe)</span>
                        </div>
                    </th>
                    <th>
                        <div className={ElementSquares.studentTableHeaderDiv}>
                            <div className={ColorSquare.redHeadline}></div>
                            <span>inkorrekt</span>
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