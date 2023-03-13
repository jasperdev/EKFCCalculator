<script>
	import { ageStore } from '../stores';
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
				}}
				value={$ageStore.value}
				aria-invalid={$ageStore.valid !== null ? !$ageStore.valid : ''}
				type="text"
				id="value"
				name="value"
				placeholder="age in years"
				required
			/>
		{/key}
		<ErrorBlock message={$ageStore.error} />
	</div>
</div>
