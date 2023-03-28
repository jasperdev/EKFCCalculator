<script>
	import AgeBlock from '../components/AgeBlock.svelte';
	import BiomarkerBlock from '../components/BiomarkerBlock.svelte';
	import ClearCalcBock from '../components/ClearCalcBock.svelte';
	import ReferenceBlock from '../components/ReferenceBlock.svelte';
	import ResultBlock from '../components/ResultBlock.svelte';
	import { showResultStore } from '../stores';
</script>

<div class="container" id="/">
	<article>
		<!-- HEADER BLOCK -->
		<header>
			<h1 style="margin: 0;">EKFC eGFR calculator</h1>
			<h2>This web app provides a reference implementation for the EKFC equations</h2>
		</header>

		<div class="grid">
			<form action="#results">
				<h3>Input values</h3>
				<hr/>
				<h4>Age</h4>
				<AgeBlock />
				<hr />
				<h4>Biomarkers</h4>
				<BiomarkerBlock />
				<hr />
				<h4>Patient ID (optional)</h4>
				<ReferenceBlock />
				<hr />
				<ClearCalcBock />
			</form>
			<div>
				<h3 id="results">Result</h3>		
				{#key $showResultStore}
				<ResultBlock />
				{/key}
			</div>
		</div>
	</article>
</div>
