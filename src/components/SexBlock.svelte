<script>
	import { sexStore } from '../stores';
</script>

<div class="grid" style="margin-bottom: var(--spacing);">
	<div class="box">
		<a
			href="#/"
			on:click={() => {
				sexStore.setSextoM();
			}}
			class={$sexStore === 'M' ? '' : 'outline'}
			role="button"
			>male
		</a>
		<a
			href="#/"
			on:click={() => {
				sexStore.setSextoF();
			}}
			class={$sexStore === 'M' ? 'outline' : ''}
			role="button"
			>female
		</a>
	</div>
	<div />
</div>

<style>
	.box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.box > a {
		flex: 1;
		-ms-flex: 1;
		margin-right: var(--spacing);
		margin-bottom: var(--spacing);
	}

	.box > :last-child {
		margin-right: 0;
	}
</style>
