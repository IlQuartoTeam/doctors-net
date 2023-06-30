<template>
    <div class="hero">
        <h1 class="text-h1 fw-bold">Ciao</h1>
    </div>
</template>

<script>
    export default {
        name:'HeroUserComponent',
        props: ['doctor'],
    }
    
</script>

<style lang="scss" scoped>
    .hero{
        background-color: #0071A2;
    }
</style>