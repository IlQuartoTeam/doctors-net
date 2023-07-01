<script>
import axios from 'axios';
import MapComponent from '../components/MapComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import {store} from '../store/store.js'
import { ref } from 'vue';

    export default {
        components: {MapComponent, InputComponent},
        data(){
            return{
                store,
                addresses: [],
                doctors: [],
                specialization: null
            }
        },
        mounted(){
            axios.get(store.API_URL + 'doctors').then((res) => {
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
        <MapComponent :doctors="doctors" />
        <div class="pt-2">
            <InputComponent id="spec_search_doctors" type="text" placeholder="Dermatologa" v-model="specialization"  />
            <InputComponent id="city_search_doctors" type="text" placeholder="Roma" v-model="store.citySearched"  />
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

input {
   
    border: 1px solid $doc-primary;
    border-radius: 5px;
    padding: 1rem 20px;
    display: block;

    &::placeholder{
        color: $doc-blue;
        opacity: 60%;
    }
    &:focus-visible{
        outline: 2px solid $doc-blue;
    }
    &.invalid{
        border: 1px solid $doc-red;
        &:focus-visible{
        outline: 2px solid $doc-red;
    }
    }

    
}
</style>