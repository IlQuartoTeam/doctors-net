<template>
  <div v-if="store.addReview === false">
    <div class="box-button text-center text-md-end me-md-5 mt-5">
    <ButtonComponent  @click="addReview" class="outline">
      <IconPencil :width="20" class="mb-1" />
      <span class="ps-2 fw-semibold">Aggiungi una recensione</span>
    </ButtonComponent>
    </div>
    <div class="container-fluid mt-5 px-5" v-if="store.singleDoctor">
      <div class="box-reviews container-fluid">
        <div class="row mb-5 pt-3" v-for="review in store.singleDoctor.reviews">
          <div class="col-12">
            <h2 class="fw-semibold name">{{ review.name }}</h2>
            <div class="date-review d-flex align-items-center gap-5">
              <span>{{ review.created_at }} </span>
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
    </div>
    </div>
    <div class="box-button text-center mt-5 mb-5">
      <ButtonComponent class="outline">
        <IconCirclePlus :width="20" class="mb-1" />
        <span class="ps-2 fw-semibold">Carica altre recensioni</span></ButtonComponent>
    </div>
  </div>
  <div v-if="store.addReview === true">
    <AddReviewComponent />
  </div>
</template>

<script>
import { store } from '../store/store';
import { IconStar, IconStarFilled, IconPencil, IconCirclePlus } from '@tabler/icons-vue';
import AddReviewComponent from './AddReviewComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
export default {
    components: {  IconStar, IconStarFilled, IconPencil, ButtonComponent, IconCirclePlus, AddReviewComponent},
     props: ['review'],
      data() {
        return {
          store,
          visible: false,
          stars: []
        }
    },
    methods: {
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
            console.log(this.stars)
        } 
      },
      addReview(){
        store.addReview = true;
      }
    },
    mounted() {
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