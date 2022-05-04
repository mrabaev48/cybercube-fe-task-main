import {FC} from "react";
import classes from './GridCell.module.css';

export interface IGridCellProps {
    isAlive: boolean,
    onCellClick: (rowIndex: number, columnIndex: number) => void;
    rowIndex: number;
    columnIndex: number
}

const GridCell: FC<IGridCellProps> = ({
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
            data-testid={isAlive ? 'alive' : 'dead'}
        />
    )
}

export default GridCell;