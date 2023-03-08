<script>
	import Chart from '../components/Chart.svelte';
	import {
		EGFRStoreCreatinine,
		EGFRStoreCystatin,
		EGFRStoreMean,
		ageStore,
		cystatinStore,
		creatinineStore,
		sexStore,
		referenceStore
	} from '../stores';
</script>

<!-- check if there are results available -->
{#if $EGFRStoreCreatinine === null && $EGFRStoreCystatin === null}
	<p>Please fill in all required fields to show the result</p>
{:else}
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
						<td>Age</td>
						<td>{$ageStore.value}</td>
					</tr>
				{/if}

				{#if $cystatinStore.valid}
					<tr>
						<td>Cystatin C</td>
						<td>{$cystatinStore.value}</td>
					</tr>
				{/if}

				{#if $creatinineStore.valid}
					<tr>
						<td>Creatinine</td>
						<td>{$cystatinStore.value}</td>
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
						<b>EKFC</b>
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