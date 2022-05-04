import {computeNeighbors, generateEmptyGrid, generateFilledGrid, simulate} from "../../utils/GridUtils";

describe('Grid utils', () => {
    test('generateFilledGrid', () => {
        const grid = generateEmptyGrid();
        expect(grid).not.toBeUndefined();
        expect(Array.isArray(grid)).toBe(true);
        expect(grid[0].filter(x => x !== 0).length).toBe(0);
    });

    test('generateFilledGrid', () => {
        const emptyGrid = generateEmptyGrid();
        const filledGrid = generateFilledGrid();
        expect(filledGrid).not.toBeUndefined();
        expect(filledGrid).not.toEqual(emptyGrid);
    });

    test('computeNeighbors', () => {
       const smallGrid = [
           [0, 1, 1],
           [0, 1, 0]
       ];
       const neighbors = computeNeighbors(0, 1, smallGrid);
       expect(neighbors).toBe(2);
    });

    test('simulate', () => {
        let grid = generateFilledGrid();
        let newGrid = JSON.parse(JSON.stringify(grid));
        simulate(grid, newGrid);
        expect(grid).not.toEqual(newGrid);
    });
});

export default {

}