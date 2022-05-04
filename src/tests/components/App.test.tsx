import React from 'react';
import {act, render, screen} from '@testing-library/react';
import App from '../../App';
import userEvent from "@testing-library/user-event";

describe('App component', () => {

  beforeEach(() => {
    render(<App />);
  });

  test('Is App component rendered', () => {
    const app = screen.getByTestId('app');
    expect(app).toBeInTheDocument();
  });

  test('Are buttons rendered', () => {
    const buttonsBlock = screen.getByTestId('buttons');
    expect(buttonsBlock).toBeInTheDocument();
    expect(buttonsBlock.childElementCount).toBe(3);
  });

  test('Is grid rendered', () => {
    const grid = screen.getByTestId('game-grid');
    expect(grid).toBeInTheDocument();
  });

  test('Generate random grid', () => {
    const aliveCells = screen.queryAllByTestId('alive');
    expect(aliveCells.length).toBe(0);
    const generateButton = screen.getByTestId('generate-btn');
    userEvent.click(generateButton);
    const aliveCellsAfterGenerating = screen.getAllByTestId('alive');
    expect(aliveCellsAfterGenerating.length).toBeGreaterThan(0);
  });

  test('Clear grid', () => {
    const generateButton = screen.getByTestId('generate-btn');
    userEvent.click(generateButton);
    const aliveCells = screen.queryAllByTestId('alive');
    expect(aliveCells.length).toBeGreaterThan(0);
    const clearButton = screen.getByTestId('clear-btn');
    userEvent.click(clearButton);
    const aliveCellsAfterClearing = screen.queryAllByTestId('alive');
    expect(aliveCellsAfterClearing.length).toBe(0);
  });

  test('Start simulation', async () => {
    const generateButton = screen.getByTestId('generate-btn');
    const startStopBtn = screen.getByTestId('startStop-btn');
    act(() => {
      userEvent.click(generateButton);
    });
    const aliveCells = screen.queryAllByTestId('alive');
    act(() => {
      userEvent.click(startStopBtn);
    });
    await new Promise((r) => setTimeout(r, 400));
    const aliveCellsAfterStart = screen.queryAllByTestId('alive');
    expect(aliveCells.length).not.toBe(aliveCellsAfterStart.length);
  });

  test('Cell Click', async () => {
    const aliveCells = screen.queryAllByTestId('alive');
    expect(aliveCells.length).toBe(0);
    const deadCells = screen.queryAllByTestId('dead');
    userEvent.click(deadCells[0]);
    await new Promise((r) => setTimeout(r, 200));
    const aliveCellsAfterClick = screen.queryAllByTestId('alive');
    expect(aliveCellsAfterClick.length).toBe(1);
  });
});
