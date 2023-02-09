<script>
	import ErrorBlock from './ErrorBlock.svelte';
	import { store } from '../stores';

	let data = null;
	let isValid = null;
	let errorMsg = '';

	function registerData() {
		try {
			validateReference();
			errorMsg = '';
			store.reference = data;
		} catch (e) {
			errorMsg = e.message;
			isValid = false;
		}
	}

	function validateReference() {
		if (data === '') {
			isValid = null;
			return true;
		}

		let reference = String(data);
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
			placeholder="Reference ID"
		/>
		<ErrorBlock message={errorMsg} />
	</div>
	<div />
</div>
