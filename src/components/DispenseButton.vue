<template>    
    <div class="dispenseButton">
        <div><img class="dispenseIcon" src="../assets/dispenseIcon.png"></div>
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
.dispenseButton {
    width: fit-content;
    min-width: 150px;
    background-color: var(--primary-blue);
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    margin-left: 5px;
    border-radius: 25px;
    height: 42px;

    .dispenseIcon {
        width: 30px;
        height: 26px;
        margin-right: 5px;
    }
}
</style>