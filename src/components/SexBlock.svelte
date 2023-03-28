<script>
	import { sexStore, showResultStore } from '../stores';
</script>

<div class="grid" style="margin-bottom: var(--spacing);">
	<div class="box">
		<button
			type="button"
			on:click={() => {
				sexStore.setSextoM();
				showResultStore.dontShow();
			}}
			class={$sexStore === 'M' ? '' : 'outline'}
			>male
		</button>
		<button
			type="button"
			on:click={() => {
				sexStore.setSextoF();
			}}
			class={$sexStore === 'M' ? 'outline' : ''}
			>female
		</button>
	</div>
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
