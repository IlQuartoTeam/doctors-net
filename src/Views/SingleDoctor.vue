<template>
    <div>
       <ExperiencesComponent />
       <ExaminationsComponent  doctor="store.singleDoctor" />
    </div>
</template>

<script>
import ExaminationsComponent from '../components/ExaminationsComponent.vue';
import { store } from '../store/store';
import axios from 'axios';
import ExperiencesComponent from '../components/ExperiencesComponent.vue';
    export default {
        components: { ExperiencesComponent, ExaminationsComponent},
        data () {
            return {
                store,
            }
        },
        methods: {
            getDoctor() {
                axios.get(store.API_URL + 'doctors/' + this.$route.params.user).then(res => {
                    store.singleDoctor = res.data.results;
                    console.log(store.singleDoctor)
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