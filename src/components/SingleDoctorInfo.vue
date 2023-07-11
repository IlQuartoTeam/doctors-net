<template>
    <div class="row row-cols-1 row-cols-md-2 w-100 p-md-5 gx-0">
        <div class="col p-4 p-md-0 d-flex justify-content-center align-items-center">
            <img class="img-fluid" :src=doctor.profile_image_url alt="">
        </div>
        <div class="col d-flex flex-column justify-content-center gap-3 p-4 p-md-4 ps-md-4">
            <div class="text-doc-blue ps-md-4">
                <h1 class="text-center text-md-start">{{ doctor.name }} {{ doctor.surname }}</h1>
                <div class="specialization" v-for="specialization in doctor.specializations">
                    <h5 class="fs-4 text-center text-md-start">{{ specialization.name }}</h5>
                </div>
                <div class="d-flex align-items-center justify-content-center justify-content-md-start pb-2 pt-md-0">
                    <span v-for="star in this.stars">
                        <IconStarFilled class="text-doc-accent" v-if="star" />
                        <IconStar v-else />
                    </span>
                </div>
               
            </div>
            <div class="button-container ps-md-4">
                <ButtonComponent @click="contactNow" class="primary w-100">contatta</ButtonComponent>
                <ContactFormComponent v-if="store.contactForm" />
            </div>
            
        </div>

    </div>
</template>

<script>
import { store } from '../store/store';
import { IconStar, IconStarFilled } from '@tabler/icons-vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import ContactFormComponent from '../components/ContactFormComponent.vue';
export default {
    props: ['doctor'],
    components: { IconStar, IconStarFilled, ButtonComponent, ContactFormComponent },
    data() {
        return {
            stars: [],
            store
        }
    },
    methods:
    {
        createStars() {
            const totals = [1, 2, 3, 4, 5]
            const rating = Math.round(this.doctor.average_rating)
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

        },
        contactNow() {
            store.contactForm = !store.contactForm;
        },
    },

    mounted() {
        this.createStars()
    }
}
</script>

<style lang="scss" scoped>

img {
    margin: 0 auto;
    border-radius: 10px;
    max-height: 350px;
}

.button-container{
    width: 100%;
    @media screen and (min-width: 768px) {
        max-width: 300px;
    }

}
</style>