import { writable } from 'svelte/store';

//
// AGE STORE
//
function createAgeStore() {
	const { subscribe, set } = writable({ value: null, valid: null, error: '' });

	function setAge(e) {
		let input = e.target.value;

		// reset state if empty
		if (input === '') {
			let newState = { value: null, valid: null, error: '' };
			set(newState);
			return;
		}

		// convert input to number and check if it is a valid number
		let age = parseInt(input);
		if (isNaN(age)) {
			let newState = { value: input, valid: false, error: 'Value is not a number' };
			set(newState);
			return;
		}

		// check if the value is sane
		if (!(age >= 2 && age <= 120)) {
			let newState = { value: age, valid: false, error: 'Value is out of range [2,120]' };
			set(newState);
			return;
		}

		// if al OK, set age
		let newState = { value: age, valid: true, error: '' };
		set(newState);
		return;
	}

	return {
		subscribe,
		setAge: setAge
	};
}

export const ageStore = createAgeStore();

//
// REFERENCE STORE
//
function createReferenceStore() {
	const { subscribe, set } = writable({ value: null, valid: null, error: '' });

	function setReference(e) {
		let input = e.target.value;

		// reset state if empty
		if (input === '') {
			let newState = { value: null, valid: null, error: '' };
			set(newState);
			return;
		}

		// try to convert to string and store
		try {
			let reference = String(input);

			// limit the max length
			if (reference.length > 100) {
				throw new Error('too long');
			}
			let newState = { value: reference, valid: true, error: '' };
			set(newState);
			return;
		} catch (error) {
			let newState = { value: input, valid: false, error: 'Invalid input' };
			set(newState);
		}
	}

	return {
		subscribe,
		setReference: setReference
	};
}

export const referenceStore = createReferenceStore();

//
// SEX STORE
//
function createSexStore() {
	const { subscribe, set } = writable('M');

	return {
		subscribe,
		setSextoM: () => set('M'),
		setSextoF: () => set('F')
	};
}

export const sexStore = createSexStore();

//
// Cystatin C STORE
//
function createCystatinStore() {
	const { subscribe, set } = writable({ value: null, valid: null, error: '' });

	function setCystatin(e) {
		let input = e.target.value;

		// reset state if empty
		if (input === '') {
			let newState = { value: null, valid: null, error: '' };
			set(newState);
			return;
		}

		// convert input to number and check if it is a valid number
		let Cystatin = parseFloat(input);
		if (isNaN(Cystatin)) {
			let newState = { value: input, valid: false, error: 'Value is not a number' };
			set(newState);
			return;
		}

		// check if the value is sane
		if (!(Cystatin >= 0.1 && Cystatin <= 2)) {
			let newState = {
				value: Cystatin,
				valid: false,
				error: 'Value is out of range [0.1,2.0] mg/l'
			};
			set(newState);
			return;
		}

		// if al OK, set Cystatin
		let newState = { value: Cystatin, valid: true, error: '' };
		set(newState);
		return;
	}

	return {
		subscribe,
		setCystatin: setCystatin
	};
}

export const cystatinStore = createCystatinStore();
