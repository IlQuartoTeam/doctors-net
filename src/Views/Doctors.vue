<script>
import axios from 'axios'
import MapComponent from '../components/MapComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import DoctorCard from '../components/DoctorCard.vue'
import SmallLoaderComponent from '../components/SmallLoaderComponent.vue'
import { store } from '../store/store.js'
import { IconStarFilled, IconStar } from '@tabler/icons-vue'



export default {
    components: 
    { 
        MapComponent, 
        InputComponent, 
        ButtonComponent, 
        DoctorCard, 
        SmallLoaderComponent,
        IconStar,
        IconStarFilled 
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
            ratingSelected: 'all',
            reviewCountSelected: 'all'
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
            store.doctorsQueried = resultsFromDB 
            let results = null
            if (this.specialization.trim() != '')
            {
                results = this.filterBySpecialization(resultsFromDB)
                store.doctorsQueried = results
            }
            if (this.ratingSelected != 'all')
            {
                results = this.filterByRatingCount(results ?? resultsFromDB)
               
                store.doctorsQueried = results
            }
            if (this.reviewCountSelected != 'all')
            {
                results = this.filterByReviewCount(results ?? resultsFromDB)
                console.log(results);
                store.doctorsQueried = results
            }

            
                
        },
        filterByRatingCount(doctorsList)
        {
            return doctorsList.filter(doctor => 
            {
                if(Math.round(doctor.average_rating) >= parseInt(this.ratingSelected))
                {
                    return true
                }
            })
        },
        filterByReviewCount(doctorsList)
        {
            return doctorsList.filter(doctor =>
            {
                if(doctor.reviews.length >= parseInt(this.reviewCountSelected))
                {
                    return true
                }
            })
                
        
        },
        filterBySpecialization(doctorsList)
        {
            const results = doctorsList.filter(doctor => 
                {
                    const specializations = doctor.specializations
                    let itContains = false
                    specializations.forEach((spec) => 
                    {
                        if (spec.name.includes(this.specializationInput)) 
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
            return results
        },
        searchDoctors(city) 
        {
            this.specialization = this.specializationInput
            axios.get(store.API_URL + 'doctors?city=' + city)
            .then((res) => 
            {
                const results = res.data.results.data
                this.filterDoctors(results)
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
    watch:
    {
        'store.doctors'(newValue)
        {
            this.doctors = newValue
        }
    },
    mounted() 
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
                <select v-model="ratingSelected" class="mb-3 mb-md-0 text-doc-blue" name="rating_select" id="rating_select">
                    <option value="all">Media Recensioni</option>
                    <option value="1">1+ stelle</option>
                    <option value="2">2+ stelle</option>
                    <option value="3">3+ stelle</option>
                    <option value="4">4+ stelle</option>
                </select>

                <select v-model="reviewCountSelected" class="mb-3  mb-md-0 text-doc-blue" name="reviews_select" id="reviews_select">
                    <option value="all">Numero Recensioni</option>
                    <option value="1">Qualcuna</option>
                    <option value="10">Tante</option>
                    <option value="50">Tantissime</option>
                </select>


                <div class="mb-3 mb-md-0 h-100 w-100 d-flex">
                    <ButtonComponent @click="handleClick()" :button="true" type="submit" className="primary w-100 m-0" :disabled="city.trim() === ''">Cerca
                    </ButtonComponent>
                </div>
            </div>
        </div>
    </div>
    <section class="doctors-list bg-doc-primary bg-opacity-25 py-3">
        <h6 class="text-doc-blue fw-bold text-center py-4">
            <span v-if="!message && store.doctorsQueried">
                {{ store.doctorsQueried.length }}
                {{ store.doctorsQueried.length > 1 || store.doctorsQueried.length === 0  ? 'risultati' : 'risultato' }} 
                {{ store.doctorsQueried.length > 1 || store.doctorsQueried.length === 0 ? 'trovati' : 'trovato' }}</span>
            <span v-else-if="message">Nessun risultato trovato.</span>
        </h6>
        <div v-if="store.doctorsQueried" class="row row-cols-1 row-cols-lg-2 gx-0 px-1 px-md-5">
            <DoctorCard v-for="doctor in (this.doctors ?? store.doctorsQueried)" :doctor="doctor" />
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