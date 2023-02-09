<script>
	export let message;
</script>

{#if message !== ""}
<p>{message}</p>
{/if}

<style>
    p{
        color:var(--form-element-invalid-border-color)
    }
</style>