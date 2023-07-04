<template>
    <div v-if="!loading" class="hero d-flex flex-column align-items-center gap-4 mt-5 px-5 pb-5">
        <div class="box-image">
            <img :src=store.singleDoctor.profile_image_url alt="">
        </div>
        <div class="doctor-details d-flex flex-column align-items-center gap-2">
            <h1 class="fw-semibold">{{ store.singleDoctor.name }} {{ store.singleDoctor.surname }}</h1>
            <div class="specialization" v-for="specialization in store.singleDoctor.specializations">
                <h5 class="fs-4">{{ specialization.name }}</h5>
            </div>
            <div class="d-flex align-items-center justify-content-center pt-3 pt-md-0">
                <span v-for="star in createStars(store.singleDoctor.average_rating)">
                    <IconStarFilled class="text-doc-accent" v-if="star" />
                    <IconStar v-else />
                </span>
            </div>
            <ButtonComponent class="primary w-75"><span class="text-uppercase ">contatta</span></ButtonComponent>

        </div>
    </div>




    <div>
       <ExperiencesComponent />
       <ExaminationsComponent  doctor="store.singleDoctor" />
    </div>
</template>

<script>
import { store } from '../store/store';
import axios from 'axios';
import { IconStar, IconStarFilled } from '@tabler/icons-vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import ExperiencesComponent from '../components/ExperiencesComponent.vue';
import ExaminationsComponent from '../components/ExaminationsComponent.vue';

    export default {
        components: { IconStar, IconStarFilled, ButtonComponent, ExperiencesComponent, ExaminationsComponent},
        data () {
            return {
                store,
                stars: [],
                loading: true
            }
        },
        methods: {
            getDoctor() {
                axios.get(store.API_URL + 'doctors/' + this.$route.params.user).then(res => {
                    store.singleDoctor = res.data.results;
                    this.loading = false
                    console.log(store.singleDoctor)
                }).catch(err => {
                    this.message.text = 'Ooops! Si è verificato un errore.'
                    this.loading = false
                });
            },
            createStars(doctor_rating) {
                const totals = [1, 2, 3, 4, 5]
                const rating = Math.round(doctor_rating)
                const stars = []
                totals.forEach(number => {
                    if (number <= rating) {
                        stars.push(true)
                    } 
                    else 
                    {
                        stars.push(false)
                    }
                    return stars
                });
                
            }
        },
        mounted() {
            this.getDoctor()
            
        }
    }
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;
    .hero{
        border-bottom: 1px solid $doc-primary;
        .box-image{
            width: 300px;
            height: 300px;
            border-radius: 50%;
            overflow: hidden;

            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        h1{
            color: $doc-blue;
            font-size: 40px;
        }
        h5{
            color: $doc-blue;
        }
    }
    @media screen and (min-width: 768px) {
        .hero{
            display: flex;
            flex-direction: row !important;
        }
        .doctor-details{
            justify-content: start !important;
            align-items: start !important;
        }
    }
</style>