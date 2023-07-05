<template>
    <div>
        ciao
        <button @click="goBack">torna indietro</button>
    </div>

</template>

<script>
import { store } from '../store/store';

    export default {
        name: 'AddReviewComponent',
        data() {
            return {

            }
        },
        methods: {
            goBack(){
                store.addReview = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>