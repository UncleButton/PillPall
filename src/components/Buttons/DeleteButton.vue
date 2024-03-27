<template>    
    <div class="deleteButton">
        <div><img class="deleteIcon" src="../../assets/deleteIcon.png"></div>
        <div>{{ text }}</div>
    </div>
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
.deleteButton {
    width: fit-content;
    min-width: 150px;
    background-color: var(--primary-orange);
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    margin-left: 5px;
    border-radius: 25px;
    height: 42px;
    color: black;

    .deleteIcon {
        width: 26px;
        height: 26px;
        margin-right: 5px;
    }
}
</style>