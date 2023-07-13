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
            ratingSelected: null,
            reviewCountSelected: null,
            loading: true,
            paginationItems: [],
            loadingMore: false,
            total: null,
            specializationLoaded: [],
            firstAccess: true
        }
    },
    methods:
    {
        handleClick() {
            this.paginationItems = [];
            store.citySearched = this.city
            if (this.city.trim() !== '') {
                this.searchDoctors(this.city);
            } else {
                const cityFromQuery = this.$route.query.city;
                if (cityFromQuery) {
                    this.searchDoctors(cityFromQuery);
                }
            }
        },
        filterDoctors(resultsFromDB) {
            store.doctorsQueried = resultsFromDB

            let results = null
            if (this.specialization != '') {
                results = this.filterBySpecialization(resultsFromDB)
                store.doctorsQueried = results

            }
            if (this.ratingSelected != 'all') {
                results = this.filterByRatingCount(results ?? resultsFromDB)

                store.doctorsQueried = results

            }
            if (this.reviewCountSelected != 'all') {
                results = this.filterByReviewCount(results ?? resultsFromDB)
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
            if (this.specialization) {
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
            }
            else {
                return doctorsList
            }


        },
        searchDoctors(city) {
            this.message = null;
            console.log('we')

            const cityToSearch = city || this.$route.query.city || '';
            let specialization = ''
            if (this.specialization === null && this.firstAccess === false) {
             specialization = ''
            }
            else {
                 specialization = this.specialization || this.$route.query.specialization || '';
            }
            const rating = this.ratingSelected || this.$route.query.vote || 'all';
            const reviewCount = this.reviewCountSelected || this.$route.query.nReviews || 'all';

            this.city = cityToSearch;
            this.specialization = specialization;
            this.ratingSelected = rating;
            this.reviewCountSelected = reviewCount;
            this.firstAccess = false;

            const query = {
                city: this.city.trim(),
                specialization: this.specialization,
                vote: this.ratingSelected,
                nReviews: this.reviewCountSelected
            };

            this.$router.push({ path: '/doctors', query })
            .then(res => {
                this.fetchDoctors()

                })
            .catch(err => {
                this.fetchDoctors()
                });
        },
        fetchDoctors() {
            const city = this.$route.query.city || this.city;

            const specializationSelected = this.$route.query.specialization || '';
            const rankSelected = this.$route.query.vote || '';
            const numberOfReviews = this.$route.query.nReviews || '';

            const apiURL = store.API_URL + 'doctors?city='
                + city.trim()
                + '&specialization=' + specializationSelected
                + '&vote=' + rankSelected
                + '&nReviews=' + numberOfReviews;

            axios.get(apiURL)
                .then(res => {
                    this.paginationItems = res.data.results;
                    this.total = res.data.results.total;
                    const results = res.data.results.data;
                    this.filterDoctors(results);
                    this.message = null;
                })
                .catch(err => {
                    const success = err.response.data.success
                    if (!success) {
                        this.message = "Nessun risultato trovato"
                        store.doctorsQueried = null}
                });
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
                    if (this.specialization) {
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
                    if (!results) {
                        store.doctorsQueried = store.doctorsQueried.concat(res.data.results.data)
                    }

                    this.message = null
                    this.paginationItems = res.data.results
                    this.loadingMore = false

                })
                .catch((err) => {
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



        },

      
    },
    mounted() {
        if (this.$route.query.city) {
            this.searchDoctors(this.$route.query.city)

        }
        else {
            this.searchDoctors('Roma')
        }
        this.fetchDoctors()
        axios.get(store.API_URL + 'specializations')
            .then(res => {
                const array = res.data.specializations
                array.forEach(element => {
                    this.specializationLoaded.push(element.name)
                });


            })
            .catch(err => {

            })

    },
    created() {
    }
}
</script>

<template>
    <div class="px-3 px-md-5 max-website">
        <MapComponent />
        <div class="py-3 mt-3 d-md-flex flex-md-column gap-3 flex-lg-row">
            <div class="d-md-flex justify-content-between align-items-center gap-2 flex-lg-grow-1">
                <div class="searchDoctors w-100 py-3">
                    <v-select v-model="specialization" placeholder="Specializzazione" :options="specializationLoaded"
                        class="w-100">
                        <template #no-options="{ search, searching, loading }">Sembra non ci sia nulla con quella
                            parola.</template>
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
                        <option value="all">Qualsiasi valutazione</option>
                        <option value="1">1+ stelle</option>
                        <option value="2">2+ stelle</option>
                        <option value="3">3+ stelle</option>
                        <option value="4">4+ stelle</option>
                    </select>
                </div>


                <div class="w-100 select-container">
                    <select v-model="reviewCountSelected" class="mb-3  mb-md-0 text-doc-blue" name="reviews_select"
                        id="reviews_select">
                        <option value="all">Qualsiasi recensione</option>
                        <option value="1">Qualcuna (1+)</option>
                        <option value="5">Tante (5+)</option>
                        <option value="10">Tantissime (10+)</option>
                    </select>
                </div>



                <div class="mb-3 mb-md-0 w-100">
                    <ButtonComponent @click="handleClick()" :button="true" type="submit" className="primary w-100"
                        :disabled="city.trim() === ''">Cerca
                    </ButtonComponent>
                </div>
            </div>
        </div>
    </div>

    <section class="doctors-list max-website">
        <h6 class="text-doc-blue fw-bold text-center py-4">
            <span v-if="message">Nessun risultato trovato.</span>
        </h6>
        <div v-if="store.doctorsQueried" class="row row-cols-1 row-cols-lg-2 gx-0 px-1 px-md-5">
            <DoctorCard :key="doctor.email" v-for="doctor in store.doctorsQueried" :doctor="doctor" />
        </div>
        <div class="load-more d-flex justify-content-center">
            <ButtonComponent v-if="paginationItems.next_page_url != null && !loadingMore" @click="loadMore()" :button="true"
                className="outline m-0">Mostra altro
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

section.doctors-list {
    padding: 1rem 0px 5rem;

    .load-more {
        margin-top: 5rem;
    }
}

.select-container {
    position: relative;

}
</style>