import {FC} from "react";
import GridCell from "./GridCell/GridCell";
import classes from './GameGrid.module.css';
import {NUM_COLS} from "../../utils/AppConstants";

export interface GridGameProps {
    cells: number[][];
    onCellClick: (rowIndex: number, columnIndex: number) => void;
}

const GameGrid: FC<GridGameProps> = ({
                                         cells,
                                         onCellClick
                                     }) => {

    return (
        <div
            className={classes['game-grid']}
            style={{
                gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`
            }}
        >
            {cells.map((rows, rowIndex) =>
                rows.map((columns, columnIndex) =>
                    <GridCell
                        onCellClick={onCellClick}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        key={`${rowIndex}-${columnIndex}`}
                        isAlive={cells[rowIndex][columnIndex] === 1}
                    />
                )
            )}
        </div>
    )
}

export default GameGrid;