<script>
	import AgeBlock from '../components/AgeBlock.svelte';
	import BiomarkerBlock from '../components/BiomarkerBlock.svelte';
	import ReferenceBlock from '../components/ReferenceBlock.svelte';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	onMount(async () => {
		const ctx = document.getElementById('chart');

		// @ts-ignore
		const chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: 'Example Data',
						data: [12, 19, 3, 5, 2, 3]
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					tooltip: {
						enabled: false // <-- this option disables tooltips
					}
				},
				animation: false
			}
		});
	});
</script>

<div class="container" id="/">
	<article>
		<!-- HEADER BLOCK -->
		<header>
			<h1 style="margin: 0;">EKFC eGFR calculator</h1>
			<h2>This web app provides a reference implementation for the EKFC equations</h2>
		</header>

		<div class="grid">
			<form>
				<h3>Input values</h3>
				<h4>Age</h4>
				<AgeBlock />
				<hr />
				<h4>Biomarkers</h4>
				<BiomarkerBlock />
				<hr />
				<h4>Reference ID (optional)</h4>
				<ReferenceBlock />
				<hr />
				<button>Calculate</button>
			</form>
			<div>
				<h3>Result</h3>
				<canvas id="chart" />
			</div>
		</div>
	</article>
</div>

<style>
</style>
