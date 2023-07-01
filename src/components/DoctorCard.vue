<template>
  <div class="col p-2 flex d-flex flex-column flex-md-row">
    <div class="doc-card d-md-flex align-items-center gap-5 py-4 px-4 h-100 w-100">
      <div class="col-md-5">
        <p v-if="doctor.specializations" class="cons d-md-none pt-3 pb-2">Consigliato</p>
        <div class="card-img mx-auto m-md-0">
          <img :src="doctor.profile_image_url" :alt="'immagine profilo di ' + doctor.name">
        </div>
        <div class="card-title d-sm-flex flex-column">
          <h3 class="mt-3">{{ doctor.name }} {{ doctor.surname }}</h3>
          <p class="mt-2 mb-2 mb-md-2 mt-md-0 spec">
            <span v-for="spec in doctor.specializations">{{ spec.name }} <br></span>
          </p>
          <div class="mb-2">
            <span v-for="star in createStars">
              <IconStarFilled class="text-doc-accent" v-if="star" />
              <IconStar v-else />
            </span>
          </div>
          <p v-for="rating in doctor.reviews" class="p-0 mb-2">{{ rating.rating }}</p>
          <p class="address">{{ removeCommaAndCAP }} {{ doctor.city }}</p>
        </div>
      </div>
      <div class="d-md-flex flex-column justify-content-between h-100 w-100">
        <div class="card-content d-md-flex flex-column mb-md-5 pb-md-5">
          <h3>Tariffe</h3>
          <p v-for="examination in splittedText" class="mt-1 mb-0 spec">{{ examination }}</p>
        </div>
        <div class="d-flex flex-column justify-content-between align-items-center gx-0 cont-btn">
          <div class="col-12 mb-3">
            <span class="cons d-none d-md-block">Consigliato</span>
          </div>
        <div class="col-12">
          <ButtonComponent class="btn-card w-100" :link="doctor.slug" className="primary">Dettagli</ButtonComponent>
        </div>
         
        </div>

      </div>



    </div>
  </div>
</template>
  
<script>
import ButtonComponent from './ButtonComponent.vue';
import { IconStar, IconStarFilled } from '@tabler/icons-vue';
export default {
  components: { ButtonComponent, IconStar, IconStarFilled },
  props: ['doctor'],
  data() {
    return {
      stars: []
    }
  },

  computed: {
    splittedText() {
      return this.doctor.examinations.split(';');
    },
    removeCommaAndCAP() {
      return this.doctor.address.replace(/, ([0-9]{5})$/, '');
    },
    createStars() {
      const totals = [1, 2, 3, 4, 5]
      const rating = Math.round(this.doctor.average_rating)
      const stars = []
      totals.forEach(number => {
        if (number <= rating) {
          stars.push(true)
        } else {
          stars.push(false)
        }
      });
      return stars
    }
  },

}




</script>
  
<style lang="scss">
@use "../assets/styles/_variables.scss" as *;


.doc-card {
  border-radius: 20px;
  background-color: #fff;
  margin: 0 0 1rem 0;
}

.card-img {
  max-width: 150px;
  max-height: 150px;
  border-radius: 600px;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }
}

h3 {
  font-size: 20px;
  color: $doc-blue;
  font-weight: bold;
  letter-spacing: 1px;
}

;

.card-title {
  text-align: center;

  .address {
    font-size: 13px;
    font-weight: bold;
    color: $doc-light-dark;
    letter-spacing: 1px;
  }

  @media only screen and (min-width: 768px) {
    text-align: start;
  }

  @media only screen and (min-width: 992px) {
    text-align: start;
  }


  @media only screen and (min-width: 1200px) {

    text-align: start;

  }
}

.spec {
  font-size: 15px;
  font-weight: bold;
  color: $doc-light-dark;
  letter-spacing: 1px;
}


.cons {
  font-size: 13px;
  letter-spacing: 2px;
  color: $doc-accent;
  font-weight: medium;
  text-transform: uppercase;
  text-align: center;
}

.cont-btn {
  width: 100%;
  text-align: center;
  padding-top: 30px;
}
</style>
  
  