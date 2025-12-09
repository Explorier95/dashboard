import { gridElements } from "../styling/stylingVariants";

export default function Dropdown({name, options, onSelect}) {
    
    return (
        <>
        <div className={gridElements.gridMain}>
            <select onChange={(e) => onSelect(e.target.value)} defaultValue="">
                <option value="" disabled>
                    Wähle {name}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select> 
        </div>
        </>
    );
}