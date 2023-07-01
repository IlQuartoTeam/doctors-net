<script>
import axios from 'axios';
import MapComponent from '../components/MapComponent.vue'
import {store} from '../store/store.js'
    export default {
        components: {MapComponent},
        data(){
            return{
                store,
                addresses: [],
                doctors: []
            }
        },
        mounted(){
            axios.get(store.API_URL + 'doctors').then((res) => {
                console.log(res.data.results.data);
                const results = res.data.results.data
                results.forEach(element => {
                    this.doctors.push(element)
                });
            })
        }
    }
</script>

<template>
    <div>
        <MapComponent :doctors="doctors" :cap="'00184'" :city="'Roma'" />
    </div>
</template>


<style lang="scss" scoped>

</style>