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
import { store } from './store/store';
export default {
  data() {
  },
  components: {
    NavbarComponent,
    Footer,
  },
  mounted(){
    if(this.$cookies.get('session-token'))
    {
      store.isAuthenticated = true;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>