<template>
    <div>
        <div class="userInfo w-100">
            <h1 class="px-4 py-2 text-doc-blue text-center">Inserisci una nuova recensione</h1>
            <small class="px-4">I campi contrassegnati da * sono obbligatori.</small>
            <form @submit.prevent="handleSubmit()">
                <div class="row row-cols-1 row-cols-md-2 w-100 p-4">
                    <!-- <div class="col">
                        <InputComponent id="doctor_name" label="Nome*" v-model="userInfo.name" type="text" :required="true" />
                    </div>
                    <div class="col">
                        <InputComponent id="doctor_surname" label="Cognome*" v-model="userInfo.surname" type="text" :required="true" />
                    </div>
                    <Places :modelAddressPlaces="store.address ?? userInfo.address" :modelCityPlaces="store.city ?? userInfo.city" />
            
                    <div class="col">
                        <InputComponent id="doctor_email" label="Email*" v-model="userInfo.email" type="email" :required="true" />
                    </div>
                    <div class="col">
                        <InputComponent id="doctor_phone" label="Telefono" v-model="userInfo.phone" type="text" :required="false" />
                    </div>
                    <div class="col flex-grow-1">
                        <label class="mb-2 text-doc-blue">Specializzazioni</label>
                        <MultiselectComponent v-if="specializations.length > 0" :array="specializations" :selectedValues="specializationsSelected" @sendResult="setSpecializationsSelected" />  
                    </div> -->
                </div>
                <div class="text-end px-5">
                    <ButtonComponent type="submit" :button="true" className="primary">Modifica</ButtonComponent>
                </div>
            </form>
        </div>    
    </div>
    <button @click="goBack">torna indietro</button>

</template>

<script>
import { store } from '../store/store';
import InputComponent from '../components/InputComponent.vue'

    export default {
        name: 'AddReviewComponent',
        components: {
            InputComponent
        },
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