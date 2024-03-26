<template>    
    <div class="button"> {{ text }} </div>
</template>

<script>

export default {
  components: {},
    props: {
        text: {
            type: String,
            required: true
        }
    },
}

</script>

<style scoped>
.button {
    width: fit-content;
    min-width: 150px;
    height: 42px;
    border-radius: 25px;
    background-color: var(--primary-orange);
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 5px;
    margin-right: 5px;
    color: black;
}
</style>