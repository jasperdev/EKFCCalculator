<script>
	import { ageStore } from '../stores';
	import ErrorBlock from './ErrorBlock.svelte';

	let errorMsg = '';
</script>

<div class="grid">
	<div>
		<input
			on:change={(age) => ageStore.setAge(age)}
			value={$ageStore.value}
			aria-invalid={$ageStore.valid !== null ? !$ageStore.valid : ''}
			type="text"
			id="value"
			name="value"
			placeholder="age in years"
			required
		/>
		<ErrorBlock message={$ageStore.error} />
	</div>
	<div />
</div>
