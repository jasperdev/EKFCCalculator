<script>
	import { store } from '../stores';

	let sex = 'M';
	updateSex(sex);

	function updateSex(sex) {
		store.sex = sex;
	}
</script>

<div class="grid" style="margin-bottom: var(--spacing);">
	<div class="box">
		<a
			href="#/"
			on:click={() => {
				sex = 'M';
				updateSex(sex);
			}}
			class={sex === 'M' ? '' : 'outline'}
			role="button"
			>male
		</a>
		<a
			href="#/"
			on:click={() => {
				sex = 'F';
				updateSex(sex);
			}}
			class={sex === 'M' ? 'outline' : ''}
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
