import React, {useState, useCallback, useRef} from "react";
import produce from "immer";
import {generateEmptyGrid, generateFilledGrid, simulate} from "./utils/GridUtils";
import GameGrid from "./components/gameGrid/GameGrid";
import Button from "./components/UI/button/Button";
import classes from './App.module.css';

const App: React.FC = () => {
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    const [isRunning, setIsRunning] = useState(false);

    const runningRef = useRef(isRunning);
    runningRef.current = isRunning;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid(currentGrid => {
            return produce(currentGrid, gridCopy => {
                simulate(currentGrid, gridCopy);
            });
        });

        setTimeout(runSimulation, 100);
    }, []);

    const onCellClickHandler = (rowIndex: number, columnIndex: number) => {
        const newGrid = produce(grid, gridCopy => {
            gridCopy[rowIndex][columnIndex] = grid[rowIndex][columnIndex] ? 0 : 1;
        });
        setGrid(newGrid);
    }

    const generateGridClickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setGrid(generateFilledGrid());
    }

    const clearGridClickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setGrid(generateEmptyGrid());
    }

    const runSimulationClickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            runningRef.current = true;
            runSimulation();
        }
    }

    return (
        <div className={classes.app}>
            <div className={classes.buttons}>
                <Button
                    onClick={generateGridClickHandler}
                    CssClasses={classes['grid-btn']}
                >
                    Generate Random Grid
                </Button>
                <Button
                    onClick={clearGridClickHandler}
                    CssClasses={classes['grid-btn']}
                >
                    Clear Grid
                </Button>
                <Button
                    onClick={runSimulationClickHandler}
                    CssClasses={classes['grid-btn']}
                >
                    {isRunning ? 'Stop' : 'Start'}
                </Button>
            </div>
            <div className="grid">
                <GameGrid
                    cells={grid}
                    onCellClick={onCellClickHandler}
                />
            </div>
        </div>
    );
};

export default App;
