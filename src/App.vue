<template>

    <template v-if="this.$route.path != '/login'">
      <NavbarComponent />
    </template>
    <router-view></router-view>
    <Footer v-if="$route.name != 'login'"></Footer>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import Footer from './components/Footer.vue';
export default {
  data() {
  },
  components: {
    NavbarComponent,
    Footer,
  },
}
</script>

<style lang="scss" scoped>

</style>