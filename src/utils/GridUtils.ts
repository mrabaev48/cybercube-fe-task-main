import {CELL_OPERATIONS, NUM_COLS, NUM_ROWS} from "./AppConstants";

export const generateEmptyGrid = () => {
    const rows: number[][] = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        rows.push(Array.from(Array(NUM_COLS), () => 0));
    }

    return rows;
}

export const generateFilledGrid = (): number[][] => {
    const rows: number[][] = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        rows.push(Array.from(Array(NUM_COLS), () => (Math.random() > 0.7 ? 1 : 0)));
    }

    return rows;
}

export const calculateNeighbors = (rowIndex: number, columnIndex: number, grid: number[][]): number => {
    let neighbours = 0;

    CELL_OPERATIONS.forEach(([x, y]) => {
        const newRowIndex = rowIndex + x;
        const newColumnIndex = columnIndex + y;

        if (
            newRowIndex >= 0 && newRowIndex < NUM_ROWS &&
            newColumnIndex >= 0 && newColumnIndex < NUM_COLS
        ) {
            neighbours += grid[newRowIndex][newColumnIndex];
        }
    });

    return neighbours;
}