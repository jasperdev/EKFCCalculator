<script>
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { EGFRStoreCreatinine, EGFRStoreCystatin, EGFRStoreMean, ageStore } from '../stores';

	let dataTop = [];
	let dataBottom = [];
	let dataMean = [];
	let years = [];

	// Generate the data for the reference curves.
	for (let year = 2; year <= 100; year++) {
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
		pointStyle: 'dash',
		label: '97.5ᵗʰ  Pct',
		data: dataTop,
		borderColor: '#000',
		backgroundColor: '#fff',
		tension: 0,
		pointRadius: 0,
		borderDash: [10, 7.5],
		borderWidth: 2
	};

	const datasetMean = {
		type: 'line',
		pointStyle: 'line',
		label: '50ᵗʰ  Pct',
		data: dataMean,
		borderColor: '#000',
		backgroundColor: '#fff',
		pointRadius: 0,
		borderWidth: 3
	};

	const datasetBottom = {
		type: 'line',
		pointStyle: 'dash',
		label: '2.5ᵗʰ  Pct',
		data: dataBottom,
		borderColor: '#000',
		backgroundColor: '#fff',
		pointRadius: 0,
		borderDash: [5, 7.5],
		borderWidth: 2
	};

	const datasetEGFRCystatin = {
		type: 'bubble',
		label: 'EGFR Cystatin C',
		pointStyle: 'triangle',
		data: [
			{
				x: $ageStore.value,
				y: $EGFRStoreCystatin,
				r: 7
			}
		],
		// backgroundColor: '#1E88E5'
		backgroundColor: 'rgba(30, 136, 229, 1)'
	};

	const datasetEGFRCreatinine = {
		type: 'bubble',
		label: 'EGFR Creatinine',
		pointStyle: 'rect',
		data: [
			{
				x: $ageStore.value,
				y: $EGFRStoreCreatinine,
				r: 6
			}
		],
		// backgroundColor: '#D81B60'
		backgroundColor: 'rgba(216, 27, 96, 1)'
	};

	const datasetEGFRMean = {
		type: 'bubble',
		label: 'EGFR Mean',
		data: [
			{
				x: $ageStore.value,
				y: $EGFRStoreMean,
				r: 6
			}
		],
		// backgroundColor: '#FFC107'
		backgroundColor: 'rgba(255, 193, 7, 1)'
	};

	let datasets = [];
	datasets.push(datasetTop, datasetMean, datasetBottom);

	if ($EGFRStoreCystatin !== null && $EGFRStoreCreatinine !== null) {
		datasets.push(datasetEGFRCystatin, datasetEGFRCreatinine, datasetEGFRMean);
	} else if ($EGFRStoreCystatin !== null) {
		datasets.push(datasetEGFRCystatin);
	} else if ($EGFRStoreCreatinine !== null) {
		datasets.push(datasetEGFRCreatinine);
	}

	// Only register the chart when the component is mounted
	onMount(async () => {
		const ctx = document.getElementById('chart');
		const data = {
			labels: years,
			datasets: datasets
		};

		const config = {
			options: {
				animation: false,
				scales: {
					x: {
						bounds: 'ticks',
						title: {
							display: true,
							text: 'Age'
						},
						type: 'linear',
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
						display: true,
						position: 'bottom',
						align: 'center',

						labels: {
							usePointStyle: true
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

<canvas width="100" height="66" id="chart" />

<style>
	canvas {
		margin-bottom: 0.5em;
	}
</style>
