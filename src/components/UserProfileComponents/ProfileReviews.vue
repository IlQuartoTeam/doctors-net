<template>
    <div v-if="store.userDoctor?.reviews.length > 0" class="reviewsWrapper">
        <div class="container-fluid mt-5 px-5">
            <div class="box-reviews container-fluid">
                <div class="row mb-5 pt-3" v-for="review in store.userDoctor.reviews">
                    <div class="col-12">
                        <h2 class="fw-semibold name">{{ review.name }}</h2>
                        <div class="date-review d-flex align-items-center gap-5">
                            <span>{{ review.created_at }} </span>
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
    </div>
    <div v-if="store.userDoctor?.reviews.length < 1" class="noReviews text-center pt-3 row justify-content-center">
        <div class="medikit col-6">
            <img class="img-fluid" src="/img/other/medikit.png" alt="">
        </div>
        <h2 class="col-10">Ma non te se ncula popo nessuno eh?!</h2>
        <!-- <h2>Non hai ancora nessun messaggio</h2> -->
    </div>
</template>

<script>
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
        console.log(store.userDoctor);
    },
    methods: {},
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
}
</style>