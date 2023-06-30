<template>
    <div class="sidebar">
        ciao
    </div>
</template>

<script>
import { store } from '../store/store';
    export default {
        name: 'SidebarComponent',
        data(){
            return{
                store,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar{
        width: 100vw;
        height: 100vh;
        background-color: white;
    }
</style>