<script>
	import ErrorBlock from './ErrorBlock.svelte';
	import { cystatinStore, showResultStore } from '../stores';

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
					showResultStore.dontShow();
				}}
				value={$cystatinStore.value}
				aria-invalid={$cystatinStore.valid !== null ? !$cystatinStore.valid : ''}
				type="number"
				step="0.01"
				id="value"
				name="value"
				placeholder="cystatin C"
				required
			/>
		{/key}
		<ErrorBlock message={$cystatinStore.error} />
	</div>
</div>
