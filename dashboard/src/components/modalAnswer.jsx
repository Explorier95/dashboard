import { createPortal } from "react-dom";

export default function ModalAnswer({ info, onClose }) {
    return createPortal(
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2>Antwort:</h2>
                <p>"{info}"</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
}