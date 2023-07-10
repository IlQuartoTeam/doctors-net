<template>
    <div class="title py-4 pb-0">
        <h2 class="text-center text-doc-blue fw-bold pt-4">In evidenza</h2>
        <p class="text-center text-doc-blue px-5">Dai un&apos;occhiata alle nostre migliori dottoresse ai nostri migliori dottori
        </p>
    </div>
    <div v-if="premiumUsers" class="gallery-container">
        <swiper 
        :navigation="true"
        :modules="modules" 
        class="gallery" 
        :slidesPerView="1" 
        :spaceBetween="30"
        :mousewheel="true"
        :breakpoints="{
        650: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3
        },
        1300: {
            slidesPerView: 4
        }
        }"
        >
            <swiper-slide v-for="user in premiumUsers">
                <div class="card-container d-flex flex-column gap-3 text-center shadow-sm text-doc-blue">
                   <h6 class="text-uppercase fw-bold text-center">{{ user.slug.split('-')[0] }} {{ user.slug.split('-')[1] }}</h6>
                   <div class="img-container">
                    <img class="img-fluid" :src="user.profile_image_url" />
                   </div>
                   <p class="p-0 m-0 fw-bold" v-for="spec in user.specializations">{{ spec.name }}</p>
                   <p class="p-0 m-0">{{ user.address }}</p>
                   <p class="p-0 m-0 d-flex align-items-center gap-1 justify-content-center"><IconMapPin />{{ user.city }}</p>
                   <ButtonComponent :href="'/doctors/' + user.slug" className="primary">dettagli</ButtonComponent>
                </div>
                
            </swiper-slide>
        </swiper>
    </div>

</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import ButtonComponent from './ButtonComponent.vue';
import DoctorCard from './DoctorCard.vue';
import { IconMapPin } from '@tabler/icons-vue';
import 'swiper/css';
import 'swiper/css/navigation';


export default {
    components: {
    Swiper,
    SwiperSlide,
    ButtonComponent,
    IconMapPin
},
    data() {
        return {
            premiumUsers: null
        }
    },
    setup() {
        return {
            modules: [Navigation],
        };
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/doctors/premium')
            .then((res) => {
                this.premiumUsers = res.data.premiumUsers

            })
    }
};
</script>
<style lang="scss" scoped>

.gallery{
    padding: 2rem;
}
img{
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
}

.card-container{
    padding: 2rem;
    border-radius: 20px;
    background-color: white;

}





</style>