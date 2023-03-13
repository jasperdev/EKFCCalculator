<script>
	import ErrorBlock from './ErrorBlock.svelte';
	import { creatinineStore, creatinineStoreMicroMol, creatinineStoreMiligram } from '../stores';

	// rerender on updating value
	let changeToggle = true;
</script>

<div id="line">
	<div id="input">
		{#key changeToggle}
			<input
				on:change={(c) => {
					$creatinineStore.isMicromol
						? creatinineStore.setCreatinineMicroMol(c)
						: creatinineStore.setCreatinineMiligram(c);
					changeToggle = !changeToggle;
				}}
				value={$creatinineStore.isMicromol ? $creatinineStoreMicroMol : $creatinineStoreMiligram}
				aria-invalid={$creatinineStore.valid !== null ? !$creatinineStore.valid : ''}
				type="text"
				id="value"
				name="value"
				placeholder='creatinine'
				required
			/>
		{/key}
		<ErrorBlock message={$creatinineStore.error} />
	</div>
	<div>
		<a
			href="#/"
			on:click={() => {
				creatinineStore.setUnitToMiligram();
			}}
			class={$creatinineStore.isMicromol ? 'outline' : ''}
			role="button"
			>mg/dL
		</a>
		<a
			href="#/"
			on:click={() => {
				creatinineStore.setUnitToMicroMol();
			}}
			class={$creatinineStore.isMicromol ? '' : 'outline'}
			role="button"
			>µmol/L
		</a>
	</div>
</div>

<style>
	#line {
		display: flex;
	}

	#input {
		flex: 1;
		margin-right: var(--form-element-spacing-vertical);
	}
</style>
