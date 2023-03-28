<script>
	import { ageStore, showResultStore } from '../stores';
	import ErrorBlock from './ErrorBlock.svelte';

	// rerender on updating value
	let changeToggle = true;
</script>

<div class="grid">
	<div>
		{#key changeToggle}
			<input
				on:change={(age) => {
					ageStore.setAge(age);
					changeToggle = !changeToggle;
					showResultStore.dontShow();
				}}
				value={$ageStore.value}
				aria-invalid={$ageStore.valid !== null ? !$ageStore.valid : ''}
				type="number"
				min="2"
				max="100"
				step="0.1"
				id="value"
				name="value"
				placeholder="age in years"
				required
			/>
		{/key}
		<ErrorBlock message={$ageStore.error} />
	</div>
</div>
