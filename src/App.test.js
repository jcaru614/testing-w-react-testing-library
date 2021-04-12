import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', { name: 'Change to blue' });

	expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

	fireEvent.click(colorButton);

	expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
	expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', { name: 'Change to blue' });
	expect(colorButton).toBeEnabled();

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
