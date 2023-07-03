<template>
    <section>
        <h1 class="text-doc-blue text-center">Modulo di Registrazione</h1>
        <h2 class="text-doc-blue">Dati Personali</h2>
        <small class="text-doc-primary mb-3 d-block">I dati obbligatori sono contrassegnati da *</small>
        <form @submit.prevent="register()"> 
            <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent :required="true" :invalid="message.name" label="Nome*" id="register_name" type="text" placeholder="Osvaldo" v-model="name" />
                <p class="text-doc-red" v-if="message.name">{{ message.name }}</p>

            </div>
            <div class="col">
                <InputComponent :required="true" :invalid="message.surname" label="Cognome*" id="register_surname" type="text" placeholder="Bevilacqua"
                    v-model="surname" />
                    <p class="text-doc-red" v-if="message.surname">{{ message.surname }}</p>

            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent :invalid="message.phone" label="Telefono" id="register_phone" type="number" placeholder="368 88 99 555"
                    v-model="phone" />
                    <p class="text-doc-red" v-if="message.phone">{{ message.phone }}</p>
            </div>
            <div class="col">
                <InputComponent :required="true" :invalid="message.email" label="Email*" id="register_email" type="email" placeholder="osvaldo@mail.com"
                    v-model="email" />
                    <p class="text-doc-red" v-if="message.email">{{ message.email }}</p>

            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
                <Places />
        </div>
        <h2 class="text-doc-blue">Dati Account</h2>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent :required="true" :invalid="message.password" label="Password*" id="register_password" type="password" placeholder="Password"
                    v-model="password" />
                    <p class="text-doc-red" v-if="message.password">{{ message.password }}</p>

            </div>
            <div class="col">
                <InputComponent :required="true" label="Conferma Password*" id="register_confirm_password" type="password"
                    placeholder="Conferma password" v-model="confirmPassword" />
                    <p class="text-doc-red" v-if="errPsw">La conferma password non coincide con password</p>

            </div>
        </div>
        <div class="text-end mt-2 mb-5">
            <ButtonComponent :button="true" type="submit" className="primary">registrati</ButtonComponent>
        </div>
        </form>
        
    
        
    </section>
</template>

<script>
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import Places from '../components/Places.vue';
import axios from 'axios'
import { store } from '../store/store';
import router from '../router/router';

export default {
    components: { InputComponent, ButtonComponent, Places },
    data() {
        return {
            openStreetApi: `https://nominatim.openstreetmap.org/search?format=json&q=`,
            store,
            name: null,
            surname: null,
            phone: null,
            email: null,
            address: null,
            address_number: null,
            city: null,
            password: null,
            confirmPassword: null,
            lat: null, 
            lon: null,
            message: {},
            errPsw: false
            
          

        }
    },
    methods: {
        register() {
            this.message = {};
            this.errPsw = false;
            if (this.password != this.confirmPassword){
                this.errPsw = true;
                return
            }
            axios.post(store.API_URL + 'register', {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
                phone: this.phone,
                city: this.store.city,
                address: store.address,
                specialization: 1,
                lat: this.store.lat,
                long: this.store.lon
            }).then((res) => {
                if(res.data.access_token)
                {
                    this.store.isAuthenticated = true
                    this.$cookies.set("session-token", res.data.access_token)
                    router.push('/users/profile')
                }
                
            }).catch(error => {
                    const messages = error.response.data.errors
    
                    if (messages.name){
                        this.message.name = messages.name[0]
                        this.loading = false
                    }
                    if (messages.surname){
                        this.message.surname = messages.surname[0]
                        this.loading = false
                    }
                    if (messages.phone){
                        this.message.phone = messages.phone[0]
                        this.loading = false
                    }
                    if (messages.email){
                        this.message.email = messages.email[0]
                        this.loading = false
                    }
                    if (messages.address){
                        this.message.address = messages.address[0]
                        this.loading = false
                    }
                    if (messages.city){
                        this.message.city = messages.city[0]
                        this.loading = false

                    }
                    if (messages.password){
                        this.message.password = messages.password[0]
                        this.loading = false

                    }
                })

        },
    }

}
</script>

<style lang="scss" scoped>
section {
    padding: 1rem 50px;
}
</style>