import { motion } from "framer-motion";
import { gridElements, textStyles, ColorSquare } from "../styling/stylingVariants.jsx";

export default function PieChart({ richtig, falsch, richtigNachHilfe }) {
    const total = richtig + falsch + richtigNachHilfe;

    if (total === 0) {
        return <p>Keine Daten vorhanden.</p>;
    }

    // Diagramm-Parameter
    const size = 140;                  // etwas größer, damit nichts abgeschnitten wird
    const radius = size / 2;
    const strokeWidth = 25;           
    const circleRadius = radius - strokeWidth;
    const circumference = 2 * Math.PI * circleRadius;
    const innerCircleRadius = radius;
    const innerCircleCircleRaius = innerCircleRadius - (strokeWidth - 1) / 2;
    const outerCircleRadius = 150 / 2;
    const outerCircleCircleRaius = outerCircleRadius - (strokeWidth - 5) / 2;

    const segments = [
        { value: richtig, color: "#28A745" },
        { value: falsch, color: "#DC3545" },
        { value: richtigNachHilfe, color: "#FFC107" },
    ];

    let offset = 0;


    return (
        <div className={gridElements.gridPieChart}>
            <h1 className={textStyles.headlineElementsh2}>Klassen-Durchschnitt</h1>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ background: "bg-stone-100" }}
            >
                <circle

                    cx={innerCircleRadius}
                    cy={innerCircleRadius}
                    r={innerCircleCircleRaius}
                    fill="transparent"
                    
                    className="drop-shadow-md"
                />

                <circle
                    cx={110}
                    cy={110}
                    r={outerCircleCircleRaius}
                    fill="transparent"
                    className="drop-shadow-md"
                />
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

{/* 
            <div className="mt-4 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                    <div className={ColorSquare.green}></div>
                    <span className={textStyles.paragraph}>Richtig: {richtig}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className={ColorSquare.red}></div>
                    <span className={textStyles.paragraph}>Falsch: {falsch}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className={ColorSquare.yellow}></div>
                    <span className={textStyles.paragraph}>Richtig nach Hilfe: {richtigNachHilfe}</span>
                </div>
            </div>
 */}
        </div>
    );
}
