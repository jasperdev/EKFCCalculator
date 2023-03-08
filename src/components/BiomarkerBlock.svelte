<script>
	import { biomarkerStore, Biomarkers, creatinineStore, cystatinStore } from '../stores';
	import CreatinineBlock from './CreatinineBlock.svelte';
	import CystatinBlock from './CystatinBlock.svelte';
	import SexBlock from './SexBlock.svelte';
</script>

<div class="box">
	<a
		href="#/"
		on:click={() => {
			biomarkerStore.setToCystatinC();
			creatinineStore.clear();
		}}
		class={$biomarkerStore !== Biomarkers.cystatinc ? 'outline' : ''}
		role="button"
		>cystatin C
	</a>
	<a
		href="#/"
		on:click={() => {
			biomarkerStore.setToCreatinine();
			cystatinStore.clear();
		}}
		class={$biomarkerStore !== Biomarkers.creatinine ? 'outline' : ''}
		role="button"
		>creatinine
	</a>
	<a
		href="#/"
		on:click={() => {
			biomarkerStore.setToBoth();
		}}
		class={$biomarkerStore !== Biomarkers.both ? 'outline' : ''}
		role="button"
		>both
	</a>
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
	.box > a {
		flex-grow: 1;
		margin-right: var(--form-element-spacing-vertical);
		margin-bottom: var(--spacing);
	}

	.box > :last-child {
		margin-right: 0;
	}
</style>
