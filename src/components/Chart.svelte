<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let dataTop = [];
	let dataBottom = [];
	let dataMean = [];
	let years = [];

	// Generate the data for the reference curves.
	for (let year = 2; year <= 120; year++) {
		let mean = 107.3 * (year > 40 ? Math.pow(0.99, year - 40) : 1);
		let bottom = mean / 1.33;
		let top = mean + (mean - bottom);

		dataMean.push(mean);
		dataTop.push(top);
		dataBottom.push(bottom);
		years.push(year);
	}

	const datasetTop = {
		type: 'line',
		label: '97.5ᵗʰ  Pct',
		data: dataTop,
		borderColor: '#000',
		tension: 0,
		pointRadius: 0,
		borderDash: [10, 7.5],
		borderWidth: 2
	};

	const datasetMean = {
		type: 'line',
		label: '50ᵗʰ  Pct',
		data: dataMean,
		borderColor: '#000',
		pointRadius: 0,
		borderWidth: 2
	};

	const datasetBottom = {
		type: 'line',
		label: '2.5ᵗʰ  Pct',
		data: dataBottom,
		borderColor: '#000',
		pointRadius: 0,
		borderDash: [5, 7.5],
		borderWidth: 2
	};

	// Only register the chart when the component is mounted
	onMount(async () => {
		const ctx = document.getElementById('chart');
		const data = {
			labels: years,
			datasets: [datasetTop, datasetMean, datasetBottom]
		};

		const config = {
			options: {
				animation: false,
				scales: {
					x: {
						title: {
							display: true,
							text: 'Age'
						},
						type: 'linear',
						max: 120,
						min: 2,
						ticks: {
							stepSize: 10
						}
					},
					y: {
						// max: 160,
						min: 0,
						title: {
							display: true,
							text: 'eGFR (mL/min/1.73m²)'
						}
					}
				},
				plugins: {
					legend: {
						labels: {
							boxHeight: 0
						}
					}
				}
			},
			data: data
		};

		// @ts-ignore
		const chart = new Chart(ctx, config);
	});
</script>

<div style="position: relative; height:100%; width:100%">
	<canvas id="chart" />
</div>
