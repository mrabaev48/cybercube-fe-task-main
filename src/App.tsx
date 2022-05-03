import React, {useCallback, useRef, useState} from 'react';
import {calculateNeighbors, generateEmptyGrid, generateFilledGrid} from "./utils/GridUtils";
import GameGrid from "./components/gameGrid/GameGrid";
import produce from 'immer';
import {NUM_COLS, NUM_ROWS} from "./utils/AppConstants";

function App() {

    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    const [isRunning, setIsRunning] = useState(false);
    const runningRef = useRef(isRunning);
    runningRef.current = isRunning;

    const onCellClickHandler = (rowIndex: number, columnIndex: number) => {
        const newGrid = produce(grid, gridCopy => {
            gridCopy[rowIndex][columnIndex] = grid[rowIndex][columnIndex] ? 0 : 1;
        });
        setGrid(newGrid);
    }

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid(currentGrid => {
            return produce(currentGrid, gridCopy => {
                for (let rowIndex = 0; rowIndex < NUM_ROWS; rowIndex++) {
                    for (let columnIndex = 0; columnIndex < NUM_COLS; columnIndex++) {
                        const neighbors = calculateNeighbors(rowIndex, columnIndex, gridCopy);
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[rowIndex][columnIndex] = 0;
                        } else if (currentGrid[rowIndex][columnIndex] === 0 && neighbors === 3) {
                            gridCopy[rowIndex][columnIndex] = 1;
                        }
                    }
                }
            });
        });

        setTimeout(runSimulation, 100);
    }, []);

    const generateGridClickHandler = (event: any): void => {
        setGrid(generateFilledGrid());
    }

    const clearGridClickHandler = (event: any): void => {
        setGrid(generateEmptyGrid());
    }

    const runSimulationClickHandler = (event: any): void => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            runningRef.current = true;
            runSimulation();
        }
    }

    return (
        <>
            <div className="App">
                <div className="buttons">
                    <button
                        onClick={generateGridClickHandler}
                    >
                        Generate Random Grid
                    </button>
                    <button
                        onClick={clearGridClickHandler}
                    >
                        Clear Grid
                    </button>
                    <button
                        onClick={runSimulationClickHandler}
                    >
                        {isRunning ? 'Stop' : 'Start'}
                    </button>
                </div>
                <div className="grid">
                    <GameGrid
                        cells={grid}
                        onCellClick={onCellClickHandler}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
