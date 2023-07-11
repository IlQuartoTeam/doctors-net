<template>
    <div v-if="store.userDoctor?.reviews.length > 0" class="reviewsWrapper">
        
        <div class="container-fluid mt-4 px-5">
            <h1 class="text-h2 text-doc-blue fw-semibold">Le tue recensioni</h1>

            <div class="box-reviews container-fluid">
                
                <div class="row mb-5 pt-3" v-for="review in store.personalReviews">
                    <div class="col-12">
                        <h2 class="fw-semibold name" v-if="review.name">{{ review.name }}</h2>
                        <h2 class="fw-semibold name" v-else>Utente anonimo</h2>
                        <div class="date-review d-flex align-items-center gap-5">
                            <span>{{ getFormattedDate(review.created_at) }} </span>
                            <div class="d-flex align-items-center justify-content-center pb-2">
                                <span v-for="(star, index) in review.rating">
                                    <IconStarFilled class="text-doc-accent" v-if="star" />
                                </span>
                                <span v-for="star in (5 - review.rating)">
                                    <IconStar />
                                </span>
                            </div>
                        </div>
                        <p class="mt-2">{{ review.text }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end me-2">
            <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li v-for="page in store.reviewsPagination.links" :class="{active: page.active, disabled: page.url === null}" class="page-item"><a v-html="page.label" class="page-link" href="#"></a></li>
  </ul>
</nav>
        </div>
    </div>
    <div v-if="store.userDoctor?.reviews.length < 1" class="noReviews text-center pt-3 row justify-content-center">
        <div class="medikit col-6">
            <img class="img-fluid" src="/img/other/medikit.png" alt="">
        </div>
        <h2 class="col-10">Non hai nessuna recensione</h2>
        <!-- <h2>Non hai ancora nessun messaggio</h2> -->
    </div>
  
</template>

<script>
import axios from 'axios'
import { IconStar } from '@tabler/icons-vue';
import { IconStarFilled } from '@tabler/icons-vue';
import { store } from '../../store/store';
export default {
    name: "ProfileReviews",
    data() {
        return {
            store,
        };
    },
    mounted() {
        
    },
    methods: {
        getFormattedDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }},
    components: { IconStarFilled, IconStar }
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;

.medikit {
    max-width: 350px;
    min-width: 200px;
}

.name {
    font-size: 24px;
    font-weight: bold;
    color: $doc-blue;
    letter-spacing: 1px;
}</style>