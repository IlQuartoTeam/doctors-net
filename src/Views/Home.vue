<template>
    <div>
        <MapComponent cap="94017"/>
        HOME
        <ButtonComponent title="ciao" className="primary" />
    </div>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue';
import MapComponent from '../components/MapComponent.vue';
    export default {
    components: { ButtonComponent, MapComponent }
}
</script>

<style lang="scss" scoped>

</style>