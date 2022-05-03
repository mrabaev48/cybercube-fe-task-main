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

export const computeNeighbors = (rowIndex: number, columnIndex: number, currentGrid: number[][]): number => {
    let neighbors = 0;
    CELL_OPERATIONS.forEach(([x, y]) => {
        const newRowIndex = rowIndex + x;
        const newColumnIndex = columnIndex + y;

        if (newRowIndex >= 0 && newRowIndex < NUM_ROWS && newColumnIndex >= 0 && newColumnIndex < NUM_COLS) {
            neighbors += currentGrid[newRowIndex][newColumnIndex];
        }
    });

    return neighbors;
}

export const simulate = (currentGrid: number[][], gridCopy: number[][]): void => {
    for (let rowIndex = 0; rowIndex < NUM_ROWS; rowIndex++) {
        for (let columnIndex = 0; columnIndex < NUM_COLS; columnIndex++) {
            const neighbors = computeNeighbors(rowIndex, columnIndex, currentGrid);
            if (neighbors < 2 || neighbors > 3) {
                gridCopy[rowIndex][columnIndex] = 0;
            } else if (currentGrid[rowIndex][columnIndex] === 0 && neighbors === 3) {
                gridCopy[rowIndex][columnIndex] = 1;
            }
        }
    }
}