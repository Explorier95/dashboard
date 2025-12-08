import { motion } from "framer-motion";

export default function PieChart({ richtig, falsch, richtigNachHilfe }) {
    const total = richtig + falsch + richtigNachHilfe;

    if (total === 0) {
        return <p>Keine Daten vorhanden.</p>;
    }

    // Diagramm-Parameter
    const size = 220;                  // etwas größer, damit nichts abgeschnitten wird
    const radius = size / 2;
    const strokeWidth = 34;            // kleiner, damit genügend Platz bleibt
    const circleRadius = radius - strokeWidth; 
    const circumference = 2 * Math.PI * circleRadius;

    const segments = [
        { value: richtig, color: "#16a34a" },
        { value: falsch, color: "#dc2626" },
        { value: richtigNachHilfe, color: "#ffe100ff" },
    ];

    let offset = 0;

    return (
        <div className="flex flex-col items-center bg-stone-100 backdrop-blur-md p-6 rounded-2xl shadow-lg ring-4 ring-blue-500/30">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ background: "bg-stone-100" }}
            >
                {/* Wir rotieren den Kreis, damit er oben startet */}
                <g transform={`rotate(-90 ${radius} ${radius})`}>
                    {segments.map((seg, i) => {
                        const percentage = seg.value / total;
                        const dash = percentage * circumference;
                        const gap = circumference - dash;

                        const localOffset = offset;
                        offset += dash;

                        return (
                            <motion.circle
                                key={i}
                                cx={radius}
                                cy={radius}
                                r={circleRadius}
                                fill="transparent"
                                stroke={seg.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${dash} ${gap}`}
                                strokeDashoffset={-localOffset}
                                initial={{ strokeDasharray: `0 ${circumference}` }}
                                animate={{ strokeDasharray: `${dash} ${gap}` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        );
                    })}
                </g>
            </svg>

            <div className="mt-4 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-green-600"></div>
                    <span>Richtig: {richtig}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-red-600"></div>
                    <span>Falsch: {falsch}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-yellow-400"></div>
                    <span>Richtig nach Hilfe: {richtigNachHilfe}</span>
                </div>
            </div>
        </div>
    );
}
