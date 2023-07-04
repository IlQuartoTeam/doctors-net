<template>
    <div>
        {{ this.$route.params }}
       <ExperiencesComponent />
    </div>
</template>

<script>
import ExperiencesComponent from '../components/ExperiencesComponent.vue';
    export default {
        components: { ExperiencesComponent},
        data () {

        return {
           
        }
    }
    }
</script>

<style lang="scss" scoped>

</style>