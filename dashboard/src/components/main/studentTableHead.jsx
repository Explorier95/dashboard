import { gridElements } from "../styling/stylingVariants.jsx";

/*
*Table Head with sorting function for the IPN-Dashboard
*@author Fabian Tappendorf
*/
export default function StudentTableHead({ className, funktion, orderedQuestions }) {
    return (
        <thead>
            <tr>
                <th className={className}>Schüler</th>
                {orderedQuestions.map((frage, index) => (
                    <th key={index}
                        className={gridElements.gridElementLookDynamic}
                        onClick={() => funktion(frage.title, "Frage")}>
                        {frage.nmbr}
                    </th>
                ))}
            </tr>
        </thead>
    );
}