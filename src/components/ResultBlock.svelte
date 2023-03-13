<script>
	import Chart from '../components/Chart.svelte';
	import {
		EGFRStoreCreatinine,
		EGFRStoreCystatin,
		EGFRStoreMean,
		ageStore,
		cystatinStore,
		creatinineStore,
		creatinineStoreMicroMol,
		creatinineStoreMiligram,
		sexStore,
		referenceStore,
		showResultStore
	} from '../stores';
</script>

<!-- check if there are results available -->
{#if ($EGFRStoreCreatinine === null && $EGFRStoreCystatin === null) || $showResultStore === false}
	<p>Please fill in all required fields and press <em>Calculate</em> to show the result.</p>
{:else if $showResultStore}
	<div id="results" style="width:100%">
		<table>
			<tbody>
				<tr>
					<th scope="rowgroup" colspan="2">
						<b>Patient Characteristics</b>
					</th>
				</tr>
				{#if $ageStore.valid}
					<tr>
						<td>Age (years)</td>
						<td>{$ageStore.value}</td>
					</tr>
				{/if}

				{#if $cystatinStore.valid}
					<tr>
						<td>Cystatin C (mg/L)</td>
						<td>{$cystatinStore.value}</td>
					</tr>
				{/if}

				{#if $creatinineStore.valid}
					<tr>
						{#if $creatinineStore.isMicromol}
							<td>Creatinine (µmol/L)</td>
							<td>{$creatinineStoreMicroMol} </td>
						{:else}
							<td>Creatinine (mg/dL)</td>
							<td>{$creatinineStoreMiligram} </td>
						{/if}
					</tr>
				{/if}

				{#if $creatinineStore.valid}
					<tr>
						<td>Sex</td>
						<td>{$sexStore}</td>
					</tr>
				{/if}

				{#if $referenceStore.valid}
					<tr>
						<td>Reference</td>
						<td>{$referenceStore.value}</td>
					</tr>
				{/if}

				<tr>
					<th scope="rowgroup" colspan="2">
						<b>EKFC (mL/min/1.73m²)</b>
					</th>
				</tr>
				{#if $EGFRStoreCystatin}
					<tr>
						<td>Cystatin C</td>
						<td>{$EGFRStoreCystatin}</td>
					</tr>
				{/if}

				{#if $EGFRStoreCreatinine}
					<tr>
						<td>Creatinine</td>
						<td>{$EGFRStoreCreatinine}</td>
					</tr>
				{/if}

				{#if $EGFRStoreMean}
					<tr>
						<td>Mean</td>
						<td>{$EGFRStoreMean}</td>
					</tr>
				{/if}
			</tbody>
		</table>

		{#key [$EGFRStoreCystatin, $EGFRStoreCreatinine]}
			<Chart />
		{/key}
	</div>

	<button
		on:click={() => {
			window.print();
		}}>Print results</button
	>
{/if}
