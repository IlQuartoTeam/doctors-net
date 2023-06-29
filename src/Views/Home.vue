<template>
    <div>
        <NavbarComponent />
        <!-- <MapComponent cap="94017"/>
        HOME
        <ButtonComponent title="ciao" className="primary" /> -->
    </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import MapComponent from '../components/MapComponent.vue';
    export default {
    components: { ButtonComponent, MapComponent, NavbarComponent }
}
</script>

<style lang="scss" scoped>

</style>