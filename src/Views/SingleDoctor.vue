<template>
    <div>
       <ExperiencesComponent />
    </div>
</template>

<script>
import { store } from '../store/store';
import axios from 'axios';
import ExperiencesComponent from '../components/ExperiencesComponent.vue';
    export default {
        components: { ExperiencesComponent},
        data () {
            return {
                store,
            }
        },
        methods: {
            getDoctor() {
                axios.get(store.API_URL + 'doctors/' + this.$route.params.user).then(res => {
                    store.singleDoctor = res.data.results;
                }).catch(err => {
                    this.message.text = 'Ooops! Si è verificato un errore.'
                    this.loading = false
                });
            }
            
        },
        mounted() {
            this.getDoctor()
        }
    }
</script>

<style lang="scss" scoped>

</style>