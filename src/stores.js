import { writable, derived } from 'svelte/store';

//
// AGE STORE
//
function createAgeStore() {
	const { subscribe, set } = writable({ value: null, valid: null, error: '' });

	function clear() {
		set({ value: null, valid: null, error: '' });
	}

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
		setAge: setAge,
		clear: clear
	};
}

export const ageStore = createAgeStore();

//
// REFERENCE STORE
//
function createReferenceStore() {
	const { subscribe, set } = writable({ value: null, valid: null, error: '' });

	function clear() {
		set({ value: null, valid: null, error: '' });
	}

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
		setReference: setReference,
		clear: clear
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
// BIOMARKER STORE
//
export const Biomarkers = {
	creatinine: 'creatinine',
	cystatinc: 'cystatinc',
	both: 'both'
};

function createBiomarkerStore() {
	const { subscribe, set } = writable(Biomarkers.cystatinc);

	return {
		subscribe,
		setToCreatinine: () => set(Biomarkers.creatinine),
		setToCystatinC: () => set(Biomarkers.cystatinc),
		setToBoth: () => set(Biomarkers.both)
	};
}

export const biomarkerStore = createBiomarkerStore();

//
// Cystatin C STORE
//
function createCystatinStore() {
	const { subscribe, set } = writable({ value: null, valid: null, error: '' });

	function clear() {
		set({ value: null, valid: null, error: '' });
	}

	function setCystatinC(e) {
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
				error: 'Value is out of range [0.1,2.0] mg/L'
			};
			set(newState);
			return;
		}

		// if al OK, set Cystatin
		let newState = { value: Math.round(Cystatin * 100) / 100, valid: true, error: '' };
		console.log(newState.value);
		set(newState);
		return;
	}

	return {
		subscribe,
		setCystatinC: setCystatinC,
		clear: clear
	};
}

export const cystatinStore = createCystatinStore();

//
// Creatinine STORE (mg/L)
//
function createCreatinineStore() {
	const { subscribe, set } = writable({ value: null, valid: null, error: '' });

	function clear() {
		set({ value: null, valid: null, error: '' });
	}


	function setCreatinineMiligram(e) {
		setCreatinine(e, false);
	}

	function setCreatinineMicroMol(e) {
		setCreatinine(e, true);
	}

	function setCreatinine(e, isMicromol) {
		let input = e.target.value;

		// reset state if empty
		if (input === '') {
			let newState = { value: null, valid: null, error: '' };
			set(newState);
			return;
		}

		// convert input to number and check if it is a valid number
		let creatinine = parseFloat(input);
		if (isNaN(creatinine)) {
			let newState = { value: input, valid: false, error: 'Value is not a number' };
			set(newState);
			return;
		}

		// convert to mg/dL if isMicromol
		// 1.0 micromol/L = 0.011312 mg/dL, thus
		if (isMicromol) {
			creatinine = creatinine * 0.011312;
		}

		// check if the value is sane
		if (!(creatinine >= 0.1 && creatinine <= 2)) {
			let newState = {
				value: creatinine,
				valid: false,
				error: 'Value is out of range [0.1,2.0] mg/l'
			};
			set(newState);
			return;
		}

		// if al OK, set creatinine
		let newState = { value: creatinine, valid: true, error: '' };
		set(newState);
		return;
	}

	return {
		subscribe,
		setCreatinineMiligram: setCreatinineMiligram,
		setCreatinineMicroMol: setCreatinineMicroMol,
		clear: clear
	};
}

export const creatinineStore = createCreatinineStore();

// Derived stores for rounding (visualisation purposes).
export const creatinineStoreMiligram = derived(creatinineStore, ($creatinineStore) => {
	if (!$creatinineStore.valid) {
		return null;
	} else {
		return Math.round($creatinineStore.value * 100) / 100;
	}
});

export const creatinineStoreMicroMol = derived(creatinineStore, ($creatinineStore) => {
	if (!$creatinineStore.valid) {
		return null;
	} else {
		// 1.0 mg/dL = 88.4 micromol/L, thus
		return Math.round($creatinineStore.value * 88.4 * 100) / 100;
	}
});

// Store where the EGFR based on creatinine is calculated
export const EGFRStoreCreatinine = derived(
	[creatinineStoreMicroMol, ageStore, sexStore],
	(stores) => {
		let [creatinineStoreMicroMol, ageStore, sexStore] = stores;
		let value = null;

		if (!creatinineStoreMicroMol || !ageStore.valid) {
			return null;
		}

		let age = ageStore.value;
		let SCr = creatinineStoreMicroMol;

		// Calculate the Q-value
		let Q = 0;
		if (age <= 25 && sexStore == 'M') {
			let lnQ =
				3.2 +
				0.259 * age -
				0.543 * Math.log(age) -
				0.00763 * Math.pow(age, 2) +
				0.000079 * Math.pow(age, 3);
			Q = Math.exp(lnQ);
		} else if (age <= 25 && sexStore == 'F') {
			let lnQ =
				3.08 +
				0.177 * age -
				0.223 * Math.log(age) -
				0.00596 * Math.pow(age, 2) +
				0.0000686 * Math.pow(age, 3);
			Q = Math.exp(lnQ);
		} else if (age > 25 && sexStore == 'M') {
			Q = 80;
		} else if (age > 25 && sexStore == 'F') {
			Q = 62;
		}

		// Calculate the eGFR value
		if (age <= 40 && SCr / Q < 1) {
			value = 107.3 * Math.pow(SCr / Q, -0.322);
		} else if (age <= 40 && SCr / Q >= 1) {
			value = 107.3 * Math.pow(SCr / Q, -1.132);
		} else if (age > 40 && SCr / Q < 1) {
			value = 107.3 * Math.pow(SCr / Q, -0.322) * Math.pow(0.99, age - 40);
		} else if (age > 40 && SCr / Q >= 1) {
			value = 107.3 * Math.pow(SCr / Q, -1.132) * Math.pow(0.99, age - 40);
		}

		return Math.round(value * 10) / 10;
	}
);

// Store where the EGFR based on cystatin C is calculated
export const EGFRStoreCystatin = derived([cystatinStore, ageStore], (stores) => {
	let [cystatinStore, ageStore] = stores;
	let value = null;

	if (!cystatinStore.valid || !ageStore.valid) {
		return null;
	}

	let age = ageStore.value;
	let SC = cystatinStore.value;

	// Calculate the Q-value
	let Q = 0;
	if (age <= 50) {
		Q = 0.83;
	} else {
		Q = 0.83 + 0.005 * (age - 50);
	}

	// Calculate the eGFR value
	if (age <= 40 && SC / Q < 1) {
		value = 107.3 * Math.pow(SC / Q, -0.322);
	} else if (age <= 40 && SC / Q >= 1) {
		value = 107.3 * Math.pow(SC / Q, -1.132);
	} else if (age > 40 && SC / Q < 1) {
		value = 107.3 * Math.pow(SC / Q, -0.322) * Math.pow(0.99, age - 40);
	} else if (age > 40 && SC / Q >= 1) {
		value = 107.3 * Math.pow(SC / Q, -1.132) * Math.pow(0.99, age - 40);
	}

	return Math.round(value * 10) / 10;
});

// Store for the mean EGFR
export const EGFRStoreMean = derived([EGFRStoreCreatinine, EGFRStoreCystatin], (stores) => {
	let [EGFRStoreCreatinine, EGFRStoreCystatin] = stores;
	if (!EGFRStoreCreatinine || !EGFRStoreCystatin) {
		return null;
	}

	let value = (EGFRStoreCreatinine + EGFRStoreCystatin) / 2;
	return Math.round(value * 10) / 10;
});
