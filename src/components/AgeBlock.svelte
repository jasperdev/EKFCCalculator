<script>
	import ErrorBlock from "./ErrorBlock.svelte";
	import {store} from "../stores";


	let data = null;
	let isValid = null;
	let errorMsg = "";

	function registerData() {
		try {
			validateAge();
			errorMsg = "";
			store.age = data;
		} catch (e) {
			errorMsg = e.message;
			isValid = false;
		}
	}

	function validateAge() {
		if (data === '') {
			isValid = null;
			return true;
		}

		let years = parseInt(data);
		if (isNaN(years)) {
			throw new Error('Value is not a number');
		}

		if (!(years >= 0 && years <= 120)) {
			throw new Error('Value is out of range [0,120]');
		}

		isValid = true;
		return true;
	}
</script>

<div class="grid">
	<div>
		<input
			on:change={registerData}
			bind:value={data}
			aria-invalid={isValid !== null ? !isValid : ''}
			type="text"
			id="value"
			name="value"
			placeholder="age in years"
			required
		/>
		<ErrorBlock message={errorMsg}></ErrorBlock>
	</div>
	<div />
</div>
