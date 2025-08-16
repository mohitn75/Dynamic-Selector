import React, {useState, useEffect, useRef} from "react";
import './App.css';

export default function Grid(Props){

   const gridLayout = Array.from({ length: Props.Rows }, () =>
        Array.from({ length: Props.Cols }, () => "")
    );

    const [selectedCells, setSelectedCells] = useState([]);
    const [firstSelection, setFirstSelection] = useState(false);
    const startCellRef = useRef(null);


    function handleMouseDown(x, y){
        setSelectedCells([{x, y}])
        setFirstSelection(true);
        startCellRef.current = {x, y};
    }

    function handleMouseUp() {
        setFirstSelection(false);
    }

    function handleMouseEnter(rowIdx, colIdx) {
        if(firstSelection) {
            const startX = startCellRef.current.x;
            const startY = startCellRef.current.y;
            const endX = rowIdx;
            const endY = colIdx;

            const minX = Math.min(startX, endX);
            const maxX = Math.max(startX, endX);
            const minY = Math.min(startY, endY);
            const maxY = Math.max(startY, endY);

            const selected = [];
            for (let x = minX; x <= maxX; x++) {
                for (let y = minY; y <= maxY; y++) {
                    selected.push({ x, y });
                }
            }      
            setSelectedCells(selected);
        }
    }

    return(
        <>
        <div>
            {gridLayout.map((row, rowIdx) => (
                <div key={rowIdx} className="row">
                    {row.map((cell, colIdx) => (
                        <div key={colIdx} 
                            className={`cell ${selectedCells.filter((curr) => (
                                curr.x === rowIdx && curr.y === colIdx
                            )).length > 0 ? "selected ": ""}`}
                            onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                            onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                            onMouseUp={() => handleMouseUp}
                        >
                            {rowIdx * Props.Rows + colIdx + 1}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </>
    )
}