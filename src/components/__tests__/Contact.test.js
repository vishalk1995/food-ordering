import Contact from '../Contact';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('Should load Contact component', () => {
  render(<Contact />);

  // check if the title is present
  const heading = screen.getByRole('heading');
  //assertion

  expect(heading).toBeInTheDocument();
});

test('Should load button inside Contact component', () => {
  render(<Contact />);

  // check if the title is present
  const button = screen.getByRole('button');
  //assertion

  expect(button).toBeInTheDocument();
});

test('Should load input inside Contact component', () => {
  render(<Contact />);

  // check if the title is present
  const input = screen.getByPlaceholderText('name');
  //assertion

  expect(input).toBeInTheDocument();
});

test('should load 2 input boxes inside Contact component', () => {
  render(<Contact />);
  const inputBoxes = screen.getAllByRole('textbox');
  expect(inputBoxes.length).toBe(2);
});
