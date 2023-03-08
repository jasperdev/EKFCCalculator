<script>
	import ErrorBlock from './ErrorBlock.svelte';
	import { cystatinStore } from '../stores';

	// rerender on updating value
	let changeToggle = true;
</script>

<div class="grid">
	<div>
		{#key changeToggle}
			<input
				on:change={(cystatin) => {
					cystatinStore.setCystatinC(cystatin);
					changeToggle = !changeToggle;
				}}
				value={$cystatinStore.value}
				aria-invalid={$cystatinStore.valid !== null ? !$cystatinStore.valid : ''}
				type="text"
				id="value"
				name="value"
				placeholder="cystatin C in mg/L"
			/>
		{/key}
		<ErrorBlock message={$cystatinStore.error} />
	</div>
</div>
