<template>

    <template v-if="this.$route.path != '/login'">
      <NavbarComponent />
    </template>
    <router-view></router-view>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';

  export default {
    components: { NavbarComponent }
}
</script>

<style lang="scss" scoped>

</style>