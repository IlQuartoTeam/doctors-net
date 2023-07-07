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
    data() {
        return {
            store,
            addresses: [],
            doctors: store.doctorsQueried,
            specialization: store.specialization,
            city: 'Roma',
            message: null,
            specializationInput: store.specialization,
            ratingSelected: 'all',
            reviewCountSelected: 'all',
            loading: true,
            paginationItems: [],
            loadingMore: false,
            total: null
        }
    },
    methods:
    {
        handleClick() {
            store.citySearched = this.city
            this.searchDoctors(this.city)
        },
        filterDoctors(resultsFromDB) {
            store.doctorsQueried = resultsFromDB

            let results = null
            if (this.specialization.trim() != '') {
                results = this.filterBySpecialization(resultsFromDB)
                store.doctorsQueried = results

            }
            if (this.ratingSelected != 'all') {
                results = this.filterByRatingCount(results ?? resultsFromDB)

                store.doctorsQueried = results

            }
            if (this.reviewCountSelected != 'all') {
                results = this.filterByReviewCount(results ?? resultsFromDB)
                console.log(results);
                store.doctorsQueried = results

            }

        },
        filterByRatingCount(doctorsList) {

            return doctorsList.filter(doctor => {
                if (Math.round(doctor.average_rating) >= parseInt(this.ratingSelected)) {
                    return true
                }
            })
        },
        filterByReviewCount(doctorsList) {

            return doctorsList.filter(doctor => {
                if (doctor.reviews.length >= parseInt(this.reviewCountSelected)) {
                    return true
                }
            })


        },
        filterBySpecialization(doctorsList) {

            const results = doctorsList.filter(doctor => {
                const specializations = doctor.specializations
                let itContains = false
                specializations.forEach((spec) => {
                    if (spec.name.toLowerCase().includes(this.specialization.toLowerCase().trim())) {
                        itContains = true
                    }
                });
                if (itContains) {
                    itContains = false
                    return true
                }
            })
            return results
        },
        searchDoctors(city) {
            this.paginationItems = []
            // this.specialization = this.specializationInput ?? ''
           
            const rankSelected = (this.ratingSelected === 'all') ? '' : this.ratingSelected
            const specializationSelected = this.specialization ?? ''
            const numberOfReviews = this.reviewCountSelected === 'all' ? '' : this.reviewCountSelected
            
            const apiURL = store.API_URL + 'doctors?city=' 
            + city.trim() 
            + '&specialization=' + specializationSelected 
            +'&vote=' + rankSelected
            + '&nReviews=' + numberOfReviews
            
            console.log(apiURL);
            axios.get(apiURL)
                .then((res) => {
                    this.total = res.data.results.total
                    const results = res.data.results.data
                    this.filterDoctors(this.sortByPremium(results))
                    this.message = null
                    this.paginationItems = res.data.results


                })
                .catch((err) => {
                    const success = err.response.data.success
                    if (!success) {
                        this.message = "Nessun risultato trovato"
                        store.doctorsQueried = null

                    }
                })
        },
        sortByPremium(results) {
            results.sort((a, b) => {
                if (a.premium && !b.premium) {
                    return -1; // a viene prima di b
                } else if (!a.premium && b.premium) {
                    return 1; // b viene prima di a
                } else {
                    return 0; // mantieni l'ordine originale
                }
            });

            return results;
        },
        loadMore() {
            this.loadingMore = true
            axios.get(this.paginationItems.next_page_url)
                .then((res) => {
                    
                    let results = null
                    if (this.specialization.trim() != '') {
                        results = this.filterBySpecialization(this.sortByPremium(res.data.results.data))
                        store.doctorsQueried = store.doctorsQueried.concat(results)
                    }
                    if (this.ratingSelected != 'all') {
                        results = this.filterByRatingCount(results ?? this.sortByPremium(res.data.results.data))

                        store.doctorsQueried = store.doctorsQueried.concat(results)

                    }
                    if (this.reviewCountSelected != 'all') {
                        results = this.filterByReviewCount(results ?? this.sortByPremium(res.data.results.data))
                        store.doctorsQueried = store.doctorsQueried.concat(results)

                    }
                    if(!results)
                    {
                        store.doctorsQueried = store.doctorsQueried.concat(res.data.results.data)
                    }

                    this.message = null
                    this.paginationItems = res.data.results
                    this.loadingMore = false

                })
                .catch((err) => {
                    console.log(err);
                    const success = err.response.data.success
                    if (!success) {
                        this.message = "C'è stato un problema"
                        store.doctorsQueried = null

                    }
                })
        },
    },

    watch:
    {
        'store.doctorsQueried'(newValue) {
            this.doctors = newValue

        }
    },
    mounted() {
        this.searchDoctors(this.store.citySearched)
        axios.get(store.API_URL + 'specializations')
        .then(res => 
        {
            console.log(res.data);
            const array = res.data.specializations
            array.forEach(element => {
                store.specializationsSet.push(element.name)
            });
        })
        .catch(err => {
            console.log(err);
        })
       
    }
}
</script>

<template>
    <div class="px-3 px-md-5">
        <MapComponent />
        <div class="py-3 mt-3 d-md-flex flex-md-column gap-3 flex-lg-row">
            <div class="d-md-flex justify-content-between align-items-center gap-2 flex-lg-grow-1">
                <div class="searchDoctors w-100">
                    <v-select
                    v-model="specialization"
                    placeholder="Specializzazione"
                    :options="store.specializationsSet"
                    class="w-100"
                    >
                 <template #no-options="{ search, searching, loading }">Nessun risultato</template>
                </v-select>
                </div>
                    
                <p class="d-none d-md-block m-0 p-0">a</p>
                <input @keyup.enter="city != '' && handleClick()" id="city_search_doctors" type="text" placeholder="Roma"
                    v-model="city" class="text-doc-blue mb-3 mb-md-0" />
            </div>
            <div class="d-md-flex justify-content-between align-items-center gap-2 flex-lg-grow-1">
                <div class="w-100 select-container">
                    
                    <select v-model="ratingSelected" class="mb-3 mb-md-0 text-doc-blue" name="rating_select"
                        id="rating_select">
                        <option value="all">Media Recensioni</option>
                        <option value="1">1+ stelle</option>
                        <option value="2">2+ stelle</option>
                        <option value="3">3+ stelle</option>
                        <option value="4">4+ stelle</option>
                    </select>
                </div>


                <div class="w-100 select-container">
                    <select v-model="reviewCountSelected" class="mb-3  mb-md-0 text-doc-blue" name="reviews_select"
                        id="reviews_select">
                        <option value="all">Numero Recensioni</option>
                        <option value="1">Qualcuna</option>
                        <option value="5">Tante</option>
                        <option value="10">Tantissime</option>
                    </select>
                </div>



                <div class="mb-3 mb-md-0 h-100 w-100 d-flex">
                    <ButtonComponent @click="handleClick()" :button="true" type="submit" className="primary w-100 m-0"
                        :disabled="city.trim() === ''">Cerca
                    </ButtonComponent>
                </div>
            </div>
        </div>
    </div>
    <section class="doctors-list bg-opacity-25 ">
        <h6 class="text-doc-blue fw-bold text-center py-4">
            <!-- <span v-if="!message && store.doctorsQueried">
                {{ store.doctorsQueried.length > 1 || store.doctorsQueried.length === 0 ? 'Risultati' : 'Risultato' }}
                {{ store.doctorsQueried.length }}
                <span v-if="total"> di {{ total }} </span>   
                {{ store.doctorsQueried.length > 1 || store.doctorsQueried.length === 0 ? 'totali' : 'totale' }}
               
            
            </span>
            <span v-else-if="message">Nessun risultato trovato.</span> -->
        </h6>
        <div v-if="store.doctorsQueried" class="row row-cols-1 row-cols-lg-2 gx-0 px-1 px-md-5">
            <DoctorCard :key="doctor.email" v-for="doctor in store.doctorsQueried" :doctor="doctor" />
        </div>
        <div class="load-more d-flex justify-content-center">
            <ButtonComponent v-if="paginationItems.next_page_url != null && !loadingMore" @click="loadMore()" :button="true"
                className="outline w-25 m-0">Mostra altro
            </ButtonComponent>
            <div v-if="loadingMore" class="spinner-border text-primary mt-1" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
@use '../assets/styles/variables' as *;


input,
select {
    position: relative;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
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

section.doctors-list{
    padding: 1rem 0px 5rem;
    .load-more{
        margin-top: 5rem;
    }
}

.select-container {
    position: relative;

}

</style>