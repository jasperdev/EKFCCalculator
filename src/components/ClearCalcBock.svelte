<script>
	import {
		ageStore,
		creatinineStore,
		cystatinStore,
		referenceStore,
		showResultStore
	} from '../stores';

	function clearStores() {
		ageStore.clear();
		creatinineStore.clear();
		cystatinStore.clear();
		referenceStore.clear();
	}
</script>

<div class="box">
	<button
		on:click={() => {
			clearStores();
			showResultStore.dontShow();
		}}
		type="reset"
		>Clear inputs
	</button>
	<button
		on:click={() => {
			showResultStore.show();
		}}
		class="contrast"
		type="submit"
		><b>Calculate</b>
	</button>
</div>

<style>
	.box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.box > button {
		flex: 1;
		-ms-flex: 1;
		margin-right: var(--form-element-spacing-vertical);
		margin-bottom: var(--form-element-spacing-vertical);
	}

	.box > :last-child {
		margin-right: 0;
	}
</style>
