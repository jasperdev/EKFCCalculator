<script>
    import { ageStore, creatinineStore, cystatinStore, referenceStore } from "../stores";


    function clearStores() {
        ageStore.clear();
        creatinineStore.clear();
        cystatinStore.clear();
        referenceStore.clear();
    }
</script>


<button on:click={clearStores}>Clear inputs</button>