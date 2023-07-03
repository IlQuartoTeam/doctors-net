<template>
  <template v-if="isLoading">
    <SplashPage/>
  </template>
  <template v-if="!isLoading">
    <div class="introWrap" v-if="!loaded">
      <div class="intro">
      </div>
    </div>
    <template v-if="this.$route.path != '/login' && this.$route.path != '/users/profile'">
      <NavbarComponent />
    </template>
    <router-view></router-view>
    <template v-if="!this.$route.path.includes('/users') && !this.$route.path.includes('/doctors')">
      <!-- <CtaComponent /> -->
    </template>
    <Footer v-if="this.$route.name != 'login'"></Footer>
  </template>
</template>

<script>
import SplashPage from './components/SplashPage.vue';
import NavbarComponent from './components/NavbarComponent.vue';
import Footer from './components/Footer.vue';
import CtaComponent from './components/CtaComponent.vue';
import { store } from './store/store';
export default {
  data() {
    return {
      isLoading: false,
      loaded: true,
      store,
      lastVisitTime: localStorage.getItem('lastVisitTime'),
      currentTime: Date.now(),
    }
  },
  components: {
    NavbarComponent,
    Footer,
    SplashPage,
    CtaComponent
  },
  methods: {
    getReady() {
      localStorage.setItem('lastVisitTime', this.currentTime)
      store.newUser = false
      this.isLoading = !this.isLoading;
      this.loaded = !this.loaded
      setTimeout(() => {
        this.isLoading = !this.isLoading;
      }, 6500);
      setTimeout(() => {
        this.loaded = !this.loaded
      }, 8500);
    }
  },
  mounted(){
    if(this.$cookies.get('session-token'))
    {
      store.isAuthenticated = true;
    }
    if (store.newUser && (this.currentTime - this.lastVisitTime) > 3600000 || !this.lastVisitTime) this.getReady();
  }
}
</script>

<style lang="scss" scoped>
.intro{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fafafa;
  position: absolute;
  z-index: 999999999;
  top: 50%;
  left:50%;
  translate: -50% -50%;
  scale: 200;
  animation: reduce 1s ease-out forwards;
}
.introWrap{
  position: absolute;
  top: 0;
  left: 0;
  width: 98vw;
  height: 100vh;
  overflow: hidden;
  background: transparent;
}

@keyframes reduce {
  from {
    scale: 200;
  }
  to {
    scale: 0;
  }
}
</style>