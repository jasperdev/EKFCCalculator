<script>
	import ErrorBlock from './ErrorBlock.svelte';
	import { creatinineStore, creatinineStoreMicroMol, creatinineStoreMiligram } from '../stores';
	let ismgDL = true;

	// rerender on updating value
	let changeToggle = true;
</script>

<div id="line">
	<div id="input">
		{#key changeToggle}
			<input
				on:change={(c) => {
					ismgDL
						? creatinineStore.setCreatinineMiligram(c)
						: creatinineStore.setCreatinineMicroMol(c);
					changeToggle = !changeToggle;
				}}
				value={ismgDL ? $creatinineStoreMiligram : $creatinineStoreMicroMol}
				aria-invalid={$creatinineStore.valid !== null ? !$creatinineStore.valid : ''}
				type="text"
				id="value"
				name="value"
				placeholder={ismgDL ? 'creatinine in mg/dL' : 'creatinine in µmol/L'}
				required
			/>
		{/key}
		<ErrorBlock message={$creatinineStore.error} />
	</div>
	<div>
		<a
			href="#/"
			on:click={() => {
				ismgDL = true;
			}}
			class={ismgDL ? '' : 'outline'}
			role="button"
			>mg/L
		</a>
		<a
			href="#/"
			on:click={() => {
				ismgDL = false;
			}}
			class={ismgDL ? 'outline' : ''}
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
		margin-right: var(--form-element-spacing-vertical)
	}
</style>
