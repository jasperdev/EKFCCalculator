<script>
	import ErrorBlock from './ErrorBlock.svelte';
	import { cystatinStore } from '../stores';
</script>

<div class="grid">
	<div>
		<input
			on:change={(cystatin) => cystatinStore.setC(cystatin)}
			value={$cystatinStore.value}
			aria-invalid={$cystatinStore.valid !== null ? !$cystatinStore.valid : ''}
			type="text"
			id="value"
			name="value"
			placeholder="cystatin C in mg/dL"
		/>
		<ErrorBlock message={$cystatinStore.error} />
	</div>
	<div />
</div>
