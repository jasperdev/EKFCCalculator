<script>
	let ismgL = true;
</script>

<div class="grid">
	<div>
		<input type="text" placeholder={ismgL ? 'creatinine in mg/L' : 'creatinine in µmol/L'}/>
	</div>
	<div>
		<a
			href="#/"
			on:click={() => {
				ismgL = true;
			}}
			class={ismgL ? '' : 'outline'}
			role="button"
			>mg/L
		</a>
		<a
			href="#/"
			on:click={() => {
				ismgL = false;
			}}
			class={ismgL ? 'outline' : ''}
			role="button"
			>µmol/L
		</a>
	</div>
</div>
