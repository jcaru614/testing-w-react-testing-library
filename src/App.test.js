import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
	render(<App />);
	// find an element with a role of button and text of 'Change to blue'
	const colorButton = screen.getByRole('button', { name: 'Change to blue' });
	// expect the background color to be red
	expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
	// click button
	fireEvent.click(colorButton);
	// expect the background color to be blue
	expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
	// expect the button text to be 'Change to red'
	expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
	render(<App />);
	// check button startes enabled
	const colorButton = screen.getByRole('button', { name: 'Change to blue' });
	expect(colorButton).toBeEnabled();
	// check checkbox starts unchecked
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

test('button is disabled on checkbox click', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox');
	const colorButton = screen.getByRole('button');

	fireEvent.click(checkbox);
	expect(colorButton).toBeDisabled();
	fireEvent.click(checkbox);
	expect(colorButton).toBeEnabled();
});

test('button turns gray on disable click then back to red', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox');
	const colorButton = screen.getByRole('button');

	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
});

test('button turns gray on disable click then back to blue', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox');
	const colorButton = screen.getByRole('button');

	fireEvent.click(colorButton);
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
});


describe('spaces before camel-case capital letters', () => {
	test('Works for no inner capital letters', () => {
	  expect(replaceCamelWithSpaces('Red')).toBe('Red');
	});
	test('Works for one inner capital letter', () => {
	  expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
	});
	test('Works for multiple inner capital letters', () => {
	  expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
	});
  });