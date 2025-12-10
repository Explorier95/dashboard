import { gridElements, textStyles } from "../styling/stylingVariants"
import Dropdown from "./Dropdown.jsx"
import { useState } from "react";
/*
*Overview Component for different summary options
*@author Fabian Tappendorf
*/

export default function OverView() {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <>
            <Dropdown
                name="mehr..."
                options={['Zusammenfassung der Klassenleistung', 'Was lief gut?', 'Wo ist Verbesserungsbedarf?']}
                onSelect={(value) => {
                    console.log(value);
                    setSelectedOption(value);
                }}
            />
            <br></br>
            {selectedOption === "Zusammenfassung der Klassenleistung" ?
                
                <div className={gridElements.gridMain}>
                    <h2 className={textStyles.headlineMediumCenter}>Gesammtübersicht der Klasse</h2>

                    <p className={textStyles.paragraph}>dummy</p>
                </div>
                : selectedOption === "Wo ist Verbesserungsbedarf?" ?

                    <div >
                        <h2 className={textStyles.headlineMediumCenter}>Wo ist Verbesserungsbedarf?</h2>

                        <p className={textStyles.paragraph} >dummy</p>
                    </div>
                    : selectedOption === "Was lief gut?" ?
                        <div>
                            <h2 className={textStyles.headlineMediumCenter}>Was lief gut?</h2>

                            <p className={textStyles.paragraph}>dummy</p>
                        </div>
                        : null

            }

        </>
    )
}