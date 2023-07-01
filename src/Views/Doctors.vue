<script>
import axios from 'axios';
import MapComponent from '../components/MapComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import {store} from '../store/store.js'


    export default {
        components: {MapComponent, InputComponent, ButtonComponent},
        data(){
            return{
                store,
                addresses: [],
                doctors: [],
                specialization: null,
                city: 'Roma'
            }
        },
        methods: {
            handleClick(){
                store.citySearched = this.city
            },
            filterDoctors(){

            },
            searchDoctors(){
                axios.get(store.API_URL + 'doctors').then((res) => {
                const results = res.data.results.data
                store.doctorsQueried = results
            })
            }
        },
        mounted(){
            this.searchDoctors()
        },
        created(){
            this.searchDoctors()
        }
    }
</script>

<template>
    <div class="px-3 px-md-5">
        <MapComponent />
        <div class="py-2">
            <InputComponent id="spec_search_doctors" type="text" placeholder="Dermatologa" v-model="specialization" class="mb-3"  />
            <p class="d-none md-block">a</p>
            <input @keyup.enter="handleClick()" id="city_search_doctors" type="text" placeholder="Roma" v-model="city" class="text-doc-blue mb-3"  />
            <label for="rating_select" class="mb-2 d-block text-doc-blue">Rating</label>
            <select class="mb-3 text-doc-blue" name="rating_select" id="rating_select">
                <option value="all">Tutte</option>
                <option value="1+">1+ stella</option>
                <option value="2+">2+ stelle</option>
                <option value="3+">3+ stelle</option>
                <option value="4+">4+ stelle</option>
            </select>
            <div>
                <ButtonComponent @click="handleClick()" :button="true" type="submit" className="primary w-100">Cerca</ButtonComponent>
            </div>
            
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

input, select {
    width: 100%;
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