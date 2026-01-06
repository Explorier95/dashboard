import svgIPN from "../static/assets/IPN.svg"
import {textStyles, imagesStyles, menuStyles} from "./styling/stylingVariants.jsx";
/*
*Header Component for the IPN-Dashboard
*@author Fabian Tappendorf
*/

export default function Header() {


    return (
        <>
            <header className= {menuStyles.menuContainer}>
                <img src={svgIPN} className={imagesStyles.menuIcon} />
                <h1 className={textStyles.headlineLargeCenter}>IPN-Dashboard</h1>
            </header>
            <p className={textStyles.headlineMediumCenter}> Willkommen in der Klassenübersicht!</p>
        </>
    )
}