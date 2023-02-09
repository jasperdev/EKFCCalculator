<script>
	import AgeBlock from '../components/AgeBlock.svelte';
	import CreatinineBlock from '../components/CreatinineBlock.svelte';
	import CystatinBlock from '../components/CystatinBlock.svelte';
	import ReferenceBlock from '../components/ReferenceBlock.svelte';
	import SexBlock from '../components/SexBlock.svelte';

	import { ageStore } from '../stores';
	function calculate() {
		alert($ageStore);
	}
</script>

<div class="container">
	<article>
		<!-- HEADER BLOCK -->
		<header>
			<h1 style="margin: 0;">EKFC eGFR calculator</h1>
			<h2>This web app provides a reference implementation for the EKFC equations</h2>
		</header>
		<form>
			<h3>Age</h3>
			<AgeBlock />
			<hr />
			<h3>Sex</h3>
			<SexBlock />
			<hr />
			<h3>Serum creatinine</h3>
			<CreatinineBlock />
			<hr />
			<h3>Cystatin C</h3>
			<CystatinBlock />
			<hr />
			<h3>Reference ID (optional)</h3>
			<ReferenceBlock />
			<hr />
			<button on:click={calculate}>Calculate</button>
		</form>
	</article>
</div>

<style>
	h3 {
		margin-bottom: 0.5em;
	}
</style>
