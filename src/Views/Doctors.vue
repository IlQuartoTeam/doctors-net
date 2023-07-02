<script>
import axios from 'axios'
import MapComponent from '../components/MapComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import DoctorCard from '../components/DoctorCard.vue'
import SmallLoaderComponent from '../components/SmallLoaderComponent.vue'
import { store } from '../store/store.js'


export default {
    components: 
    { 
        MapComponent, 
        InputComponent, 
        ButtonComponent, 
        DoctorCard, 
        SmallLoaderComponent 
    },
    data() 
    {
        return {
            store,
            addresses: [],
            doctors: null,
            specialization: '',
            city: '',
            message: null,
            specializationInput: '',
        }
    },
    methods: 
    {
        handleClick() 
        {
            store.citySearched = this.city
            this.searchDoctors(this.city)
        },
        filterDoctors(resultsFromDB) 
        {
            store.doctorsQueried = resultsFromDB.filter(doctor => 
            {
                const specializations = doctor.specializations
                let itContains = false
                specializations.forEach((spec) => 
                {
                    if (spec.name.includes(this.specialization)) 
                    {
                        itContains = true
                    }
                });
                if (itContains) 
                {
                    itContains = false
                    return true
                }
            })
        },
        searchDoctors(city) 
        {
            this.specialization = this.specializationInput
            axios.get(store.API_URL + 'doctors?city=' + this.city)
            .then((res) => 
            {
                const results = res.data.results.data

                if (this.specialization === '') 
                {
                    store.doctorsQueried = results
                } 
                else 
                {
                    this.filterDoctors(results)
                }
                this.message = null
            })
            .catch((err) => 
            {
                const success = err.response.data.success
                if (!success) 
                {
                    this.message = "Nessun risultato trovato"
                    store.doctorsQueried = null
                }
            })
        }
    },
    mounted() 
    {
        this.searchDoctors(this.store.citySearched)
    },
    created() 
    {
        this.searchDoctors(this.store.citySearched)
    }
}
</script>

<template>
    <div class="px-3 px-md-5">
        <MapComponent />
        <div class="py-3 mt-3 d-md-flex flex-md-column gap-3 flex-lg-row">
            <div class="d-md-flex justify-content-between align-items-center gap-2 flex-lg-grow-1">
                <input id="spec_search_doctors" type="text" placeholder="Dermatologa" v-model="specializationInput"
                    className="mb-3 mb-md-0 text-doc-blue" />
                <p class="d-none d-md-block m-0 p-0">a</p>
                <input @keyup.enter="city != '' &&  handleClick()" id="city_search_doctors" type="text" placeholder="Roma" v-model="city"
                    class="text-doc-blue mb-3 mb-md-0" />
            </div>
            <div class="d-md-flex justify-content-between align-items-center gap-2 flex-lg-grow-1">
                <select class="mb-3 mb-md-0 text-doc-blue" name="rating_select" id="rating_select">
                    <option value="all">Tutte</option>
                    <option value="1+">1+ stella</option>
                    <option value="2+">2+ stelle</option>
                    <option value="3+">3+ stelle</option>
                    <option value="4+">4+ stelle</option>
                </select>

                <select class="mb-3  mb-md-0 text-doc-blue" name="reviews_select" id="reviews_select">
                    <option value="all">Qualsiasi</option>
                    <option value="1+">1+ stella</option>
                    <option value="5+">2+ stelle</option>
                    <option value="10+">3+ stelle</option>
                </select>


                <div class="mb-3 mb-md-0">
                    <ButtonComponent @click="handleClick()" :button="true" type="submit" className="primary w-100 m-0" :disabled="city === ''">Cerca
                    </ButtonComponent>
                </div>
            </div>
        </div>
    </div>
    <section class="doctors-list bg-doc-primary bg-opacity-25 py-3">
        <h6 class="text-doc-blue fw-bold text-center py-4">
            <span v-if="!message && specialization !== ''">{{ store.doctorsQueried.length }} risultati per {{ specialization
            }} a {{ store.citySearched }}</span>
            <span v-else-if="message">Nessun risultato trovato.</span>
        </h6>
        <div v-if="store.doctorsQueried" class="row row-cols-1 row-cols-lg-2 gx-0 px-1 px-md-5">
            <DoctorCard v-for="doctor in store.doctorsQueried" :doctor="doctor" />
        </div>
    </section>
</template>


<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

input,
select {
    width: 100%;
    border: 1px solid $doc-primary;
    border-radius: 5px;
    padding: 1rem 20px;
    display: block;

    &::placeholder {
        color: $doc-blue;
        opacity: 60%;
    }

    &:focus-visible {
        outline: 2px solid $doc-blue;
    }

    &.invalid {
        border: 1px solid $doc-red;

        &:focus-visible {
            outline: 2px solid $doc-red;
        }
    }


}
</style>