import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { textStyles } from "./styling/stylingVariants";
import { useRef } from "react";


export default function DynamixText() {
        const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const mainControls = useAnimation();

    const paragraphOneValue = useTransform(
        scrollYProgress, [0, 1], ["-100%", "0%"]);

    const paragraphTwoValue = useTransform(
        scrollYProgress, [0, 1], ["100%", "0%"]);

return(

    <section className="flex flex-col gap-10 mb-10" ref={containerRef}>
        <motion.h1 className="text-5xl trackingwide text-black-800 text-center" animate={mainControls}
            initial="hidden"
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ delay: 0.3 }}
        >
            IPN-Dashboard Projekt</motion.h1>
        <motion.p style={{ translateX: paragraphOneValue }} className={textStyles.paragraph + " font-thin text-2xl w-1/2 mx-auto"}>Ziel des Praxisprojekts ist die Entwicklung eines interaktiven, übersichtlichen Dashboards für Lehrkräfte, dass die Ergebnisse und Leistungsprofile von Schüler*innen,
            die durch den „Conversation Based Assesment“ (Aus QuizAcademy) erhoben wurden, gebündelt darstellt.
            Das Dashboard soll Sortier-, Filter- und Drill-down-Funktionen bieten, visuelle Übersichten (z. B. Kuchendiagramme, Mini-Charts),
            detaillierte Einzelschüler-Ansichten sowie eine Kommunikationsmöglichkeit zwischen Lehrkraft und Schüler ermöglichen. Die Anwendung wird als React-Webanwendung umgesetzt.
        </motion.p>
        <motion.p style={{ translateX: paragraphTwoValue }} className={textStyles.paragraph + " font-thin text-2xl w-1/2 mx-auto"}>
            © Fabian Tappendorf - IPN 
        </motion.p>
    </section>
    )
}