import svgIPN from "../static/assets/IPN.svg"
import {textStyles, imagesStyles, menuStyles} from "./styling/stylingVariants.jsx";
/*
*Header Component for the IPN-Dashboard
*@author Fabian Tappendorf
*/

export default function Header({ currentUser, onLogout }) {


    return (
        <>
            <header className= {menuStyles.menuContainer}>
                <img src={svgIPN} className={imagesStyles.menuIcon} />
                <h1 className={textStyles.headlineLargeCenter}>CBA-Dashboard</h1>
                {currentUser && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-sm">
                        <span className="text-slate-600">
                            {currentUser.displayName || currentUser.username}
                        </span>
                        <button
                            type="button"
                            onClick={onLogout}
                            className="rounded-lg border border-slate-300 px-3 py-1 hover:bg-slate-50 transition"
                        >
                            Abmelden
                        </button>
                    </div>
                )}
            </header>

        </>
    )
}