<script>
	import AgeBlock from '../components/AgeBlock.svelte';
	import CreatinineBlock from '../components/CreatinineBlock.svelte';
	import CystatinBlock from '../components/CystatinBlock.svelte';
	import HeightBlock from '../components/HeightBlock.svelte';
	import ReferenceBlock from '../components/ReferenceBlock.svelte';
	import SexBlock from '../components/SexBlock.svelte';
	import WeightBlock from '../components/WeightBlock.svelte';

	import { store } from '../stores';
	function calculate() {
		alert(store);
	}
</script>

<div class="container">
	<article>
		<!-- HEADER BLOCK -->
		<header>
			<h1 style="margin: 0;">FAS and EKFC eGFR calculator</h1>
			<h2>This web app provides a reference implementation for the FAS and EKFC equations</h2>
		</header>
		<div class="grid">
			<form>
				<h3>Age</h3>
				<AgeBlock />
				<hr />
				<h3>Sex</h3>
				<SexBlock />
				<hr />
				<h3>Weight</h3>
				<WeightBlock />
				<hr />
				<h3>Height</h3>
				<HeightBlock />
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
			<div />
		</div>
	</article>
</div>

<style>
	h3 {
		margin-bottom: 0.5em;
	}
</style>
