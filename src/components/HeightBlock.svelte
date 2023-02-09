<script>
	import { store } from '../stores';
	import ErrorBlock from './ErrorBlock.svelte';

	let isMetric = true;
	let data = null;
	let dataDispCm = null;
	let dataDispFeet = null;
	let dataDispInches = null;
	let errorMsg = '';
	let isValid = null;

	function registerData() {
		try {
			validateHeight();
			errorMsg = '';

			if (isMetric) {
				data = dataDispCm;
			} else {
				let value = 30.48 * dataDispFeet + 2.54 * dataDispInches;
				data = Math.round(value);
				dataDispFeet = cmToFeet()[0];
				dataDispInches = cmToFeet()[1];
			}
			store.height = data;
		} catch (e) {
			errorMsg = e.message;
			isValid = false;
		}
	}

	function cmToFeet() {
		var realFeet = (data * 0.3937) / 12;
		var feet = Math.floor(realFeet);
		var inches = Math.round((realFeet - feet) * 12);
		return [feet, inches];
	}

	function toggleUnit(newUnit) {
		if (newUnit === 'ft+inches' && isValid && isMetric) {
			dataDispFeet = cmToFeet()[0];
			dataDispInches = cmToFeet()[1];
		} else if (newUnit === 'cm' && isValid && !isMetric) {
			dataDispCm = data;
		}
	}

	function validateHeight() {
		if (dataDispCm === '') {
			isValid = null;
			return true;
		}

		let height = 0;
		if (isMetric) {
			height = parseInt(dataDispCm);
		} else {
			let heightFeet = parseInt(dataDispFeet);
			let heightInches = parseInt(dataDispInches);
			
			if(isNaN(heightInches)) {
				heightInches = 0;
				dataDispInches = 0;
			}

			height = Math.round(30.48 * heightFeet + 2.54 * heightInches);
		}

		if (isNaN(height)) {
			throw new Error('Value is not a number');
		}

		if (!(height >= 50 && height <= 230)) {
			throw new Error('Value is out of range [50,230] cm');
		}

		isValid = true;
		return true;
	}
</script>

<div class="grid">
	<div>
		{#if isMetric}
			<input
				on:change={registerData}
				bind:value={dataDispCm}
				aria-invalid={isValid !== null ? !isValid : ''}
				type="text"
				placeholder={'height in cm'}
				required
			/>
		{:else}
			<div class="grid">
				<div>
					<input
						on:change={registerData}
						bind:value={dataDispFeet}
						aria-invalid={isValid !== null ? !isValid : ''}
						type="text"
						placeholder="feet"
						required
					/>
				</div>
				<div>
					<input
						on:change={registerData}
						bind:value={dataDispInches}
						aria-invalid={isValid !== null ? !isValid : ''}
						type="text"
						placeholder="inches"
						required
					/>
				</div>
			</div>
		{/if}
		<ErrorBlock message={errorMsg} />
	</div>
	<div>
		<a
			href="#/"
			on:click={() => {
				toggleUnit('cm');
				isMetric = true;
			}}
			class={isMetric ? '' : 'outline'}
			role="button"
			>cm
		</a>
		<a
			href="#/"
			on:click={() => {
				toggleUnit('ft+inches');
				isMetric = false;
			}}
			class={isMetric ? 'outline' : ''}
			role="button"
			>feet/inches
		</a>
	</div>
</div>
