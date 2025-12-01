import svgIPN from "../static/assets/IPN.svg"

export default function Header() {


    return (
        <>
            <header className="relative bg-white p-4 rounded-xl shadow-xl shadow-blue-100 ring-1 ring-slate-200">
                <img src={svgIPN} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-35 h-35" alt="Icon" />
                <h1 className="text-5xl text-blue-900 text-center">Dashboard</h1>
            </header>
            <p className="text-2xl text-blue-900 text-center ">Welcome to the IPN Dashboard</p>
        </>
    )
}
