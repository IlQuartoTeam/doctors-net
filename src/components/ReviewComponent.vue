<template>
  <div v-if="store.reviewOrdered">
    <h3 class="px-5 pt-5 text-doc-blue fw-bold text-center text-md-start">Le recensioni più recenti ({{ reviewsPagination.total }})</h3>
    <div class="box-button text-center text-md-end me-md-5 mt-5">
    <ButtonComponent  @click="addReview" class="outline">
      <IconPencil :width="20" class="mb-1" />
      <span class="ps-2 fw-semibold">Aggiungi una recensione</span>
    </ButtonComponent>
    </div>
    <div class="container-fluid mt-5 px-5" >
      <div class="box-reviews container-fluid">
        <div class="row mb-5 pt-3" v-for="review in reviews">
          <div class="col-12">
            <h2 class="fw-semibold name" v-if="review.name">{{ review.name }}</h2>
            <h2 class="fw-semibold name" v-else>Utente anonimo</h2>
            <div class="date-review d-flex align-items-center gap-5">
              <span>{{ getFormattedDate(review.created_at) }} </span>
            <div class="d-flex align-items-center justify-content-center pb-2">
              <span v-for="(star, index) in review.rating">
                <IconStarFilled class="text-doc-accent" v-if="star" />
              </span>
              <span v-for="star in (5 - review.rating)"><IconStar /></span>
            </div>
          </div>
          <p class="mt-2">{{ review.text }}</p>
        </div>
      </div>
      <div class="py-4 text-center d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
        <ButtonComponent @click="nextPage(reviewsPagination.prev_page_url)" :disabled="(reviewsPagination.prev_page_url === null) ? true : false" :button="true" className="primary" >pagina precedente</ButtonComponent>
        <ButtonComponent @click="nextPage(reviewsPagination.next_page_url)" :disabled="(reviewsPagination.next_page_url === null) ? true : false" :button="true" className="primary" >pagina successiva</ButtonComponent>
        
      </div>
     
    </div>
    </div>
  
  </div>
  <div v-if="store.addReview">
    <AddReviewComponent />
  </div>
</template>

<script>
import { store } from '../store/store';
import axios from 'axios';
import { IconStar, IconStarFilled, IconPencil, IconCirclePlus } from '@tabler/icons-vue';
import AddReviewComponent from './AddReviewComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
export default {
    components: {  IconStar, IconStarFilled, IconPencil, ButtonComponent, IconCirclePlus, AddReviewComponent},
     props: ['reviews'],
      data() {
        return {
          store,
          visible: false,
          stars: [],
          reviewsPagination: null
        }
    },
    methods: {
      getReview(page) {
        const apiURL = page ?? (store.API_URL + 'doctors/' + store.singleDoctor.id + '/reviews')
        axios.get(apiURL).then(res => {
          store.reviewOrdered = res.data.data;
          this.reviewsPagination = res.data
          console.log(this.reviewsPagination);
        });
      },
      nextPage(page)
      {
        this.getReview(page)
      },
      createStars(index) {
        if(store.singleDoctor) {
            const totals = [1, 2, 3, 4, 5]
            let rating = Math.round(store.singleDoctor.reviews.rating)
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
      getFormattedDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      addReview(){
        store.addReview = !store.addReview;
      }
    },
    mounted() {
      this.nextPage()
      setTimeout(() => {
        this.createStars()
      }, 1000);
    }
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;
.name {
    font-size: 24px;
    font-weight: bold;
    color: $doc-blue;
    letter-spacing: 1px;
}
</style>