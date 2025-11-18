import { ElementSquares, ColorSquare } from "./squareVariants"
/*
*Header Component for the studentOverview
*/
export default function StudentOverviewHeader() {

    return (
        <div className={ElementSquares.studentTableHeaderText}>
            <table className={ElementSquares.studentTableHeaderTable}>
                <thead>
                    <tr>
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
                    </tr>
                </thead>
            </table>
        </div>
    )
}