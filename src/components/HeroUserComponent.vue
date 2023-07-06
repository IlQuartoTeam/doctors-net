<template>
    <div v-if="store.isAuthenticated && store.userDoctor" class="hero d-flex flex-column align-items-center justify-content-center">
        <h1 class="text-h1 fw-bold text-white mt-5">Ciao, {{ store.userDoctor.name }} {{ store.userDoctor.surname }}</h1>
        <span class="text-white text-decoration-underline mb-5">Hai {{ store.userDoctor.messages.length }} messaggi non letti.</span>
    </div>
    <div class="wrap p-5">
        <StarsComponent/>
    </div>
</template>

<script>
import StarsComponent from './StarsComponent.vue';

import { store } from '../store/store';
    export default {
    name: "HeroUserComponent",
    props: ["doctor"],
    data() {
        return {
            store,
        };
    },
    mounted() {
    },
    components: { StarsComponent }
}
    
</script>

<style lang="scss" scoped>
    .hero{
        background-color: #0071A2;
        min-height: 300px;
    }
    @media screen and (min-width:1200px){
    .hero{
        max-height: 300px;
    }
}
</style>