<template>
    <div v-if="!loading" class="hero d-flex flex-column align-items-center gap-4 mt-5 mx-4 px-5 pb-5">
        <div class="box-image">
            <img :src=store.singleDoctor.profile_image_url alt="">
        </div>
        <div class="doctor-details d-flex flex-column align-items-center text-center gap-2">
            <h1 class="fw-semibold">{{ store.singleDoctor.name }} {{ store.singleDoctor.surname }}</h1>
            <div class="specialization" v-for="specialization in store.singleDoctor.specializations">
                <h5 class="fs-4">{{ specialization.name }}</h5>
            </div>
            <div class="d-flex align-items-center justify-content-center pb-2 pt-md-0">
                <span v-for="star in this.stars">
                    <IconStarFilled class="text-doc-accent" v-if="star" />
                    <IconStar v-else />
                </span>
            </div>
            <ButtonComponent class="primary w-75"><span class="text-uppercase ">contatta</span></ButtonComponent>
        </div>
    </div>
    <div class="advanced mt-3">
        <div v-if="store.singleDoctor" class="box-section d-flex ms-5 gap-2">
            <span @click="openSection('info')" :class="[this.isSelected === 'info' ? 'selected' : '']" class="fw-semibold pe-5">Informazioni</span>
            <span @click="openSection('review')" :class="[this.isSelected === 'review' ? 'selected' : '']" class="fw-semibold pe-5">Recensioni ({{ store.singleDoctor.reviews.length }})</span>
            <span @click="openSection('curriculum')" :class="[this.isSelected === 'curriculum' ? 'selected' : '']" class="fw-semibold pe-5">Curriculum Vitae</span>
        </div>
       
    </div>
    <div v-if="store.singleDoctor" class="components">
        <div v-if="isOpen === 'info'" class="info-doctor">
            <InfoDoctorMapComponent />
            <ExaminationsComponent doctor="store.singleDoctor" />
        </div>
        <ReviewComponent v-if="isOpen === 'review'" />
        <ExperiencesComponent v-if="isOpen === 'curriculum'" />   
    </div>
    
</template>

<script>
import { store } from '../store/store';
import axios from 'axios';
import { IconStar, IconStarFilled } from '@tabler/icons-vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import ExaminationsComponent from '../components/ExaminationsComponent.vue';
import ReviewComponent from '../components/ReviewComponent.vue';
import ExperiencesComponent from '../components/ExperiencesComponent.vue';
import InfoDoctorMapComponent from '../components/InfoDoctorMapComponent.vue';

    export default {
        components: { IconStar, IconStarFilled, ButtonComponent, ExperiencesComponent, ExaminationsComponent, ReviewComponent, InfoDoctorMapComponent},
        data () {
            return {
                store,
                stars: [],
                loading: true,
                isOpen: 'info',
                isSelected: 'info'
            }
        },
        methods: {
            getDoctor() {
                axios.get(store.API_URL + 'doctors/' + this.$route.params.user).then(res => {
                    store.singleDoctor = res.data.results;
                    this.loading = false
                }).catch(err => {
                    this.message.text = 'Ooops! Si è verificato un errore.'
                    this.loading = false
                });
            },
            createStars() {
                if(store.singleDoctor) {
                    const totals = [1, 2, 3, 4, 5]
                    const rating = Math.round(store.singleDoctor.average_rating)
                    let stars = []
                    totals.forEach(number => {
                        if (number <= rating) {
                            stars.push(true)
                        } 
                        else 
                        {
                            stars.push(false)
                        }
                    });
                    this.stars = stars
                } 
            },
            openSection(section){
                this.isOpen = section;
                this.isSelected = section;
            }
        },
        mounted() {
            this.getDoctor()
             setTimeout(() => {
                 this.createStars()
            }, 1000);
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
    .advanced{
        &::-webkit-scrollbar{
            display: none;
        }
        white-space: nowrap;
        overflow-x: auto;
    }
    .box-section{
        span{
            color: $doc-primary;
            display: inline-block;
            cursor: pointer;
            transition: color 0.3s;
            &:hover{
                color: $doc-blue;
            }
        }
        .selected {
            color: $doc-accent !important;
        }
    }
    .components{
        overflow: hidden;
    }
    @media screen and (min-width: 576px) {
        .box-section{
            justify-content: center;
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