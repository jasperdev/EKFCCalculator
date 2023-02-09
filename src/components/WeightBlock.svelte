<script>
	import ErrorBlock from './ErrorBlock.svelte';
	import {store} from '../stores'

	let isMetric = true;
	let data = null;
	let dataDisp = null;
	let errorMsg = '';
	let isValid = null;

	function registerData() {
		try {
			validateWeight();
			errorMsg = '';
			
			if(isMetric) {
				data = dataDisp;
			} else{
				data = Math.round(dataDisp / 2.2046 *10) /10;
			}
			store.weight = data;
		} catch (e) {
			errorMsg = e.message;
			isValid = false;
		}
	}

	function toggleUnit(newUnit) {
		if (newUnit === 'lbs' && isValid && isMetric) {
			dataDisp = Math.round(data * 2.2046 * 10) / 10;
		} else if (newUnit === 'kg' && isValid && !isMetric) {
			dataDisp = data;
		}
	}

	function validateWeight() {
		if (dataDisp === '') {
			isValid = null;
			return true;
		}

		let weight = parseFloat(dataDisp);
		if (isNaN(weight)) {
			throw new Error('Value is not a number');
		}

		if (isMetric && !(weight >= 10 && weight <= 300)) {
			throw new Error('Value is out of range [10,300] kg');
		}

		if (!isMetric && !(weight >= 22 && weight <= 660)) {
			throw new Error('Value is out of range [22,660] lbs');
		}

		isValid = true;
		return true;
	}
</script>

<div class="grid">
	<div>
		<input
			on:change={registerData}
			bind:value={dataDisp}
			aria-invalid={isValid !== null ? !isValid : ''}
			type="text"
			id="weight"
			name="weight"
			placeholder={isMetric ? 'weight in kg' : 'weight in lbs'}
			required
		/>
		<ErrorBlock message={errorMsg} />
	</div>
	<div>
		<a
			href="#/"
			on:click={() => {
				toggleUnit('kg');
				isMetric = true;
			}}
			class={isMetric ? '' : 'outline'}
			role="button"
			>kg
		</a>
		<a
			href="#/"
			on:click={() => {
				toggleUnit('lbs');
				isMetric = false;
			}}
			class={isMetric ? 'outline' : ''}
			role="button"
			>lbs
		</a>
	</div>
</div>
