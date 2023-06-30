<template>
    <div class="hero d-flex flex-column align-items-center justify-content-center">
        <h1 v-if="store.isAuthenticated && store.userDoctor" class="text-h1 fw-bold text-white mt-5">Ciao, {{ store.userDoctor.name }} {{ store.userDoctor.surname }}</h1>
        <span v-if="store.isAuthenticated && store.userDoctor" class="text-white text-decoration-underline mb-5">Hai {{ store.userDoctor.messages.length }} messaggi non letti.</span>
    </div>
</template>

<script>
import { store } from '../store/store';
    export default {
        name:'HeroUserComponent',
        props: ['doctor'],
        data(){
            return{
                store,
            }
        },
        mounted() {
        }
    }
    
</script>

<style lang="scss" scoped>
    .hero{
        background-color: #0071A2;
        min-height: 400px;
    }
</style>