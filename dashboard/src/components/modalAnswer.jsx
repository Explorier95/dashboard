import { createPortal } from "react-dom";
import { textStyles } from "./styling/stylingVariants.jsx";

export default function ModalAnswer({ info, onClose, type }) {
    return createPortal(
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className={textStyles.headlineElementsAlignLeft}>{type}</h2>
                <br/>
                <p className={textStyles.paragraph}>"{info}"</p>
                <br/>
                <button
                    onClick={onClose}
                    className={textStyles.buttonPrimary}
                >
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
}