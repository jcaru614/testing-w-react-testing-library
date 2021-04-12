import { useState } from 'react';
import './App.css';

export function replaceCamelWithSpaces(colorName) {
	return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
	const [buttonColor, setButtonColor] = useState('red');
	const [disabled, setdisabled] = useState(false);

	const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

	return (
		<div>
			<button
				style={{ backgroundColor: disabled ? 'gray' : buttonColor, color: 'white' }}
				onClick={() => setButtonColor(newButtonColor)}
				disabled={disabled}
			>
				Change to {newButtonColor}
			</button>
			<br />
			<input
				type='checkbox'
				id='disable-button-checkbox'
				defaultChecked={disabled}
				aria-checked={disabled}
				onChange={(e) => setdisabled(e.target.checked)}
			/>
			<label htmlFor='disable-button-checkbox'>Disable Button</label>
		</div>
	);
}

export default App;
