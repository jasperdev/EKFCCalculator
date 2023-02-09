<script>
	import ErrorBlock from './ErrorBlock.svelte';
	import { referenceStore } from '../stores';
</script>

<div class="grid">
	<div>
		<input
			on:change={(age) => referenceStore.setReference(age)}
			value={$referenceStore.value}
			aria-invalid={$referenceStore.valid !== null ? !$referenceStore.valid : ''}
			type="text"
			id="value"
			name="value"
			placeholder="optional reference ID"
		/>
		<ErrorBlock message={$referenceStore.error} />
	</div>
	<div />
</div>
