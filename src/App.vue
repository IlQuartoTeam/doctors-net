<template>


    <template v-if="this.$route.path != '/login' && this.$route.path != '/register'">
      <navbar-component />
    </template>
    <router-view></router-view>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';

  export default {
    mounted() {
        console.log(this.$route.path);
    },
    components: { NavbarComponent }
}
</script>

<style lang="scss" scoped>

</style>