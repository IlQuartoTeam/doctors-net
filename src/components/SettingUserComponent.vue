<template>
   
    <div class="userInfo w-100">
        <h1 class="px-4 py-2 text-doc-blue">Modifica i tuoi dati</h1>
        <small class="px-4">I campi contrassegnati da * sono obbligatori.</small>
        <form @submit.prevent="handleSubmit()">
            <div class="row row-cols-1 row-cols-md-2 w-100 p-4">
            <div class="col">
                <InputComponent id="doctor_name" label="Nome*" v-model="userInfo.name" type="text" :required="true" />
            </div>
            <div class="col">
                <InputComponent id="doctor_surname" label="Cognome*" v-model="userInfo.surname" type="text" :required="true" />
            </div>
            <Places :modelAddressPlaces="userInfo.address" :modelCityPlaces="userInfo.city" />
            <div class="col">
                <InputComponent id="doctor_email" label="Email*" v-model="userInfo.email" type="email" :required="true" />
            </div>
            <div class="col">
                <InputComponent id="doctor_phone" label="Telefono" v-model="userInfo.phone" type="text" :required="false" />
            </div>
        </div>
        <div class="text-end px-5">
            <ButtonComponent type="submit" :button="true" className="primary">Modifica</ButtonComponent>
        </div>
        </form>
       
      
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store/store';
import InputComponent from '../components/InputComponent.vue'
import Places from '../components/Places.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

export default {
    name: 'SettingUserComponent',
    components: {
        InputComponent,
        Places,
        ButtonComponent
    },
    data() {
        return {
            store,
            apiUrl: store.API_URL + 'user/edit',
            userInfo: { ...store.userDoctor },
            error:null,
            
        }
    },
    methods: {
        handleSubmit() {
            console.log('submitted');
            const config = 
            { 
                headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}`}
            }
            axios
            .put(this.apiUrl, this.userInfo, config)
            .then(res => 
            {
                console.log(res);
            })
            .catch(err =>
            {
                console.log(err);
            })
        }
    },
    mounted() {
        console.log(store.userDoctor);
    }
}
</script>

<style lang="scss" scoped>
/*
info da showare pè fozza:

    address, city, email, examinations, experiences, name, surname, phone, profile_image_url, specializations,


info carine:

    created_at, email_verified_at, 


*/

</style>
