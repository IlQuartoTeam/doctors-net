<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="m-0 name">{{ review.name }}</h1>
                  <div class="d-flex aling-items-center gap-5 pt-1">
                    <p class="pt-1 data">{{ review.created_at }}</p>
                    <div class="pb-5">
                            <span v-for="star in createStars">
                            <IconStarFilled class="text-doc-accent" v-if="star" />
                            <IconStar v-else />
                            </span>
                    </div>
                   
                </div>
                <div>
                    <p class="text">
                        {{review.text}}
                    </p>
                </div>
            </div>
        </div>
           
    </div>
</template>

<script>

import { IconStar, IconStarFilled } from '@tabler/icons-vue';
export default {
    components: {  IconStar, IconStarFilled },
     props: ['review'],
    setup () {
        

        return {
            stars: [],
         
        }
    },
    computed:
  {
  
    createStars() 
    {
      const totals = [1, 2, 3, 4, 5]
      const vote = Math.round(this.review.rating)
      const stars = []
      totals.forEach(number => 
      {
        if (number <= vote) 
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


.col {
    padding: 0 50px;
}

.name {
    font-size: 24px;
    font-weight: bold;
    color: $doc-blue;
    letter-spacing: 1px;
}

.data {
    font-size: 16px;
    letter-spacing: 1px;
}

.text {
    font-size: 20px;
    letter-spacing: 1px;
}


@media only screen and (min-width: 768px) {


.col {
    padding : 0;
}

}






@media only screen and (min-width: 992px) {

}






@media only screen and (min-width: 1200px) {

}

</style>