<template>
    <div class="container">
        <div>
            <h1 class="text-doc-blue pt-2 fw-bolder">Acquista un pacchetto</h1>
            <p class="text-doc-blue">Appari prima di tutti nelle ricerche degli utenti, acquistando uno dei nostri pacchetti
            </p>
        </div>
        <div class="cards d-flex justify-content-evenly py-5 align-items-center">
            <div class="base d-flex flex-row align-items-center gap-2">
                <div v-for="subscription in store.subscriptions" class="col-4">
                <h6 class="text-doc-blue text-center small">{{ subscription.days_duration === 1 ? 'Base' : subscription.days_duration === 3 ? 'Premium' : 'Gold' }}</h6>
                <h2 class="text-doc-blue fw-bold fs-1 my-0 px-4">{{ subscription.days_duration }} <span class="fw-normal fs-4">{{ subscription.days_duration > 1 ? 'giorni':'giorno' }}</span></h2>
                <hr class=" w-100 my-0 text-doc-blue">
                <h4 class="text-doc-blue text-center fw-bold">{{subscription.price}}€</h4>
                <div class="w-100">
                    <ButtonComponent :button="true" type="submit" className="outline py-2 fw-bold">Acquista</ButtonComponent>            </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonComponent from '../ButtonComponent.vue'
import { store } from '../../store/store';

export default {
    data() {
        return {
            store
        }
    },
    components: {
        ButtonComponent,
    }
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
.container {
    min-height: 600px;
    .base{
        border: 1px solid $doc-blue;
        padding: 10px 20px;
        border-radius: 5px;
    }
}
</style>