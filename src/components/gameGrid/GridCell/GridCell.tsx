import {FC} from "react";
import classes from './GridCell.module.css';

export interface GridCellProps {
    isAlive: boolean,
    onCellClick: (rowIndex: number, columnIndex: number) => void;
    rowIndex: number;
    columnIndex: number
}

const GridCell: FC<GridCellProps> = ({
                                         isAlive = false,
                                         onCellClick,
                                         columnIndex,
                                         rowIndex
                                     }) => {
    const controlClasses = [classes['grid-cell'], isAlive ? classes.alive : classes.dead].join(' ');
    return (
        <div
            onClick={() => onCellClick(rowIndex, columnIndex)}
            className={controlClasses}
        />
    )
}

export default GridCell;