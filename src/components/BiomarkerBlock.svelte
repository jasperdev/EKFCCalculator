<script>
	import { biomarkerStore, Biomarkers, creatinineStore, cystatinStore } from '../stores';
	import CreatinineBlock from './CreatinineBlock.svelte';
	import CystatinBlock from './CystatinBlock.svelte';
	import SexBlock from './SexBlock.svelte';
</script>

<div class="box">
	<button
		type="button"
		on:click={() => {
			biomarkerStore.setToCreatinine();
			cystatinStore.clear();
		}}
		class={$biomarkerStore !== Biomarkers.creatinine ? 'outline' : ''}
		>creatinine
	</button>
	<button
		type="button"
		on:click={() => {
			biomarkerStore.setToCystatinC();
			creatinineStore.clear();
		}}
		class={$biomarkerStore !== Biomarkers.cystatinc ? 'outline' : ''}
		>cystatin C
	</button>
	<button
		type="button"
		on:click={() => {
			biomarkerStore.setToBoth();
		}}
		class={$biomarkerStore !== Biomarkers.both ? 'outline' : ''}
		>both
	</button>
</div>
<div />

<!-- Cystatin C block -->
{#if $biomarkerStore === Biomarkers.cystatinc || $biomarkerStore === Biomarkers.both}
	<hr />
	<h4>Cystatin C</h4>
	<CystatinBlock />
{/if}

<!-- Creatinine block -->
{#if $biomarkerStore === Biomarkers.creatinine || $biomarkerStore === Biomarkers.both}
	<hr />
	<h4>Creatinine</h4>
	<CreatinineBlock />
	<hr />
	<h4>Sex</h4>
	<SexBlock />
{/if}

<style>
	.box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.box > button {
		flex: 1;
		-ms-flex: 1;
		margin-right: var(--form-element-spacing-vertical);
		margin-bottom: var(--spacing);
	}

	.box > :last-child {
		margin-right: 0;
	}
</style>
