function StudentOverview() {
    return (
        <div className="w-60 h-70 bg-stone-100 rounded-lg justify-center flex items-center gap-10">

            <table className="border-seperate border border-gray-400 ...">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-2 py-1 text-left...">Schüler</th>
                        <th className="border border-gray-300 px-2 py-1 text-left...">Note</th>
                        <th className="border border-gray-300 px-2 py-1 text-left...">Indikator</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-2 py-1 ...">Max</td>
                        <td className="border border-gray-300 px-2 py-1 ...">1.0</td>
                        <td className="border border-gray-300 px-2 py-1 ...">
                            <div className="bg-green-700 hover:bg-green-500 aspect-square rounded-lg justify-center flex items-center gap-10 m-4"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-2 py-1 ...">Tom</td>
                        <td className="border border-gray-300 px-2 py-1 ...">4.0</td>
                        <td className="border border-gray-300 px-2 py-1 ...">
                            <div className="bg-yellow-500 hover:bg-yellow-300 aspect-square rounded-lg justify-center flex items-center gap-10 m-4"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-2 py-1 ...">Gerome</td>
                        <td className="border border-gray-300 px-2 py-1 ...">5.0</td>
                        <td className="border border-gray-300 px-2 py-1 ...">
                            <div className="bg-red-700 hover:bg-red-500 aspect-square rounded-lg justify-center flex items-center gap-10 m-4"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default StudentOverview;