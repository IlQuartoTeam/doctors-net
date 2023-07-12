<template>
        <div v-if="!loading && store.singleDoctor" class="d-flex flex-column gap-4">
            <div class="d-flex flex-column gap-4 w-100 max-website">
                <SingleDoctorInfo :doctor="store.singleDoctor" />
                <InfoDoctorMapComponent :doctor="store.singleDoctor" />
            </div>
            <ExperiencesComponent />
            <div class="max-website w-100">
                <ReviewComponent :reviews="store.reviewOrdered" />
            </div>
        </div>
        <div :class="(store.contactForm || store.addReview) && 'layover'"></div>
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
import SingleDoctorInfo from '../components/SingleDoctorInfo.vue';
import ContactFormComponent from '../components/ContactFormComponent.vue';

export default {
    components: { IconStar, IconStarFilled, ButtonComponent, ExperiencesComponent, ExaminationsComponent, ReviewComponent, InfoDoctorMapComponent, ContactFormComponent, SingleDoctorInfo },
    data() {
        return {
            store,
            stars: [],
            loading: true,
            isOpen: 'info',
            isSelected: 'info'
        }
    },
    methods: {
        /**
         * get information about single doctor show
         * requested by this.$route.params.user
         */
        getDoctor() {
            axios.get(store.API_URL + 'doctors/' + this.$route.params.user).then(res => {
                store.singleDoctor = res.data.results;
                console.log(res.data.results);
                this.loading = false
            }).catch(err => {
                this.message.text = 'Ooops! Si è verificato un errore.'
                this.loading = false
            });
        },
        /**
         * this method convert the average rating in stars (fill and unfilled)
         */
        createStars() {
            if (store.singleDoctor) {
                const totals = [1, 2, 3, 4, 5]
                const rating = Math.round(store.singleDoctor.average_rating)
                let stars = []
                totals.forEach(number => {
                    if (number <= rating) {
                        stars.push(true)
                    }
                    else {
                        stars.push(false)
                    }
                });
                this.stars = stars
            }
        },
        openSection(section) {
            this.isOpen = section;
            this.isSelected = section;
        },
        /**
         * Start the modal form for sending a message
         */
        contactNow() {
            store.contactForm = !store.contactForm;
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

.hero {
    border-bottom: 1px solid $doc-primary;

    .box-image {
        width: 300px;
        height: 300px;
        border-radius: 20px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    h1 {
        color: $doc-blue;
        font-size: 40px;
    }

    h5 {
        color: $doc-blue;
    }
}

.advanced {
    &::-webkit-scrollbar {
        display: none;
    }

    white-space: nowrap;
    overflow-x: auto;
}

.box-section {
    span {
        color: $doc-primary;
        display: inline-block;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: $doc-blue;
        }
    }

    .selected {
        color: $doc-accent !important;
    }
}

.components {
    overflow: hidden;
}

.layover {
    position: fixed;
    width: 100%;
    height: 100dvh;
    top: 0;
    right: 0;
    z-index: 888888;
    background-color: rgba(0, 0, 0, 0.267);
}

@media screen and (min-width: 576px) {
    .box-section {
        justify-content: center;
    }
}

@media screen and (min-width: 768px) {
    .hero {
        display: flex;
        flex-direction: row !important;
    }

    .doctor-details {
        justify-content: start !important;
        align-items: start !important;
    }
}</style>