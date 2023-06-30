<template>
    <div class="hero d-flex flex-column align-items-center justify-content-center">
        <h1 class="text-h1 fw-bold text-white mt-5">Ciao, {{ store.user.name }} {{ store.user.surname }}</h1>
        <span class="text-white text-decoration-underline mb-5">Hai "" messaggi non letti.</span>
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
        }
    }
    
</script>

<style lang="scss" scoped>
    .hero{
        background-color: #0071A2;
        min-height: 400px;
    }
</style>