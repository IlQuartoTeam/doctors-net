<template>
  <div class="col p-2 flex d-flex flex-column flex-md-row">

    <div class="doc-card d-md-flex align-items-start gap-5 py-4 px-4 w-100 h-100">
      <div class="left-container col-md-5 d-flex flex-column justify-content-between">
        <div class="col-12 d-md-none">
            <p class="cons fw-bold pb-2">Consigliato</p>
          </div>
        <div class="card-img mx-auto m-md-0">
          <img :src="doctor.profile_image_url" :alt="'immagine profilo di ' + doctor.name">
        </div>

        <div class="card-title d-md-flex flex-column align-items-center justify-content-between">
          <div class="col-12 d-none d-md-block">
            <p class="cons fw-bold pb-2 text-center">Consigliato</p>
          </div>

          <div class="d-flex align-items-center justify-content-center pt-3 pt-md-0">
            <span v-for="star in createStars">
              <IconStarFilled class="text-doc-accent" v-if="star" />
              <IconStar v-else />
            </span>
            <span class="ms-2">({{ doctor.reviews.length ?? 0 }})</span>
          </div>
          <p class="address m-0 p-0 pt-1">{{ removeCommaAndCAP }} {{ doctor.city }}</p>
        </div>
      </div>

      <div class="d-md-flex flex-column justify-content-between h-100 w-100">
        <div class="card-content d-md-flex flex-column">
          <h2 class="text-center text-md-start text-h2">{{ doctor.name }} {{ doctor.surname }}</h2>
          <p class="spec text-center text-md-start">
            <span v-for="spec in doctor.specializations">{{ spec.name }} <br></span>
          </p>
          <h4>Tariffe</h4>
          <p v-for="examination in splittedText" class="mb-0 spec">{{ examination }}</p>
        </div>
        <div class="d-flex flex-column justify-content-between align-items-center gx-0">
          <div class="col-12 pt-3 pt-md-0">
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
  data() 
  {
    return {
      stars: [],
    }
  },
  computed:
  {
    splittedText() 
    {
      if (this.doctor.examination)
      {return this.doctor.examinations.split(';');}
    },
    removeCommaAndCAP() 
    {
      return this.doctor.address.replace(/, ([0-9]{5})$/, '');
    },
    createStars() 
    {
      const totals = [1, 2, 3, 4, 5]
      const rating = Math.round(this.doctor.average_rating)
      const stars = []
      totals.forEach(number => 
      {
        if (number <= rating) 
        {
          stars.push(true)
        } 
        else 
        {
          stars.push(false)
        }
      });
      return stars
    }
  }

}




</script>
  
<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;

.left-container{
  height: auto;
  @media screen and (min-width: 990px) {
    height: 100%;
  }
  
}

h2{
    font-size: 34px;
  }

.doc-card {
  border-radius: 20px;
  background-color: #fff;
  margin: 0 0 1rem 0;
}

.card-img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
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

h4{
  @media screen and (min-width: 990px) {
    font-size: 20px;
  }
}


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
</style>
  
  