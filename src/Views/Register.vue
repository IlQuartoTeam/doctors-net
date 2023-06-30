<template>
    <section>
        <h1 class="text-doc-blue text-center">Modulo di Registrazione</h1>
        <h2 class="text-doc-blue">Dati Personali</h2>
        <small class="text-doc-primary mb-3 d-block">I dati obbligatori sono contrassegnati da *</small>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent :invalid="message.name" label="Nome*" id="register_name" type="text" placeholder="Osvaldo" v-model="name" />
                <p class="text-doc-red" v-if="message.name">{{ message.name }}</p>

            </div>
            <div class="col">
                <InputComponent :invalid="message.surname" label="Cognome*" id="register_surname" type="text" placeholder="Bevilacqua"
                    v-model="surname" />
                    <p class="text-doc-red" v-if="message.surname">{{ message.surname }}</p>

            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent :invalid="message.phone" label="Telefono" id="register_phone" type="text" placeholder="368 88 99 555"
                    v-model="phone" />
                    <p class="text-doc-red" v-if="message.phone">{{ message.phone }}</p>
            </div>
            <div class="col">
                <InputComponent :invalid="message.email" label="Email*" id="register_email" type="text" placeholder="osvaldo@mail.com"
                    v-model="email" />
                    <p class="text-doc-red" v-if="message.email">{{ message.email }}</p>

            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent :invalid="message.address" label="Indirizzo*" id="register_address" type="text" placeholder="Corso Inghilterra"
                    v-model="address" />
                    <p class="text-doc-red" v-if="message.address">{{ message.address }}</p>

            </div>
            <div class="col">
                <InputComponent :invalid="message.address" label="Numero Civico*" id="register_address_number" type="number" placeholder="47"
                    v-model="address_number" />
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent :invalid="message.city" label="City*" id="register_city" type="text" placeholder="Torino" v-model="city" />
                <p class="text-doc-red" v-if="message.city">{{ message.city }}</p>
            </div>
        </div>
        <h2 class="text-doc-blue">Dati Account</h2>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent :invalid="message.password" label="Password*" id="register_password" type="password" placeholder="Password"
                    v-model="password" />
                    <p class="text-doc-red" v-if="message.password">{{ message.password }}</p>

            </div>
            <div class="col">
                <InputComponent label="Comferma Password*" id="register_confirm_password" type="password"
                    placeholder="Conferma password" v-model="confirm_password" />
            </div>
        </div>
        <div class="text-end mt-2 mb-5">
            <ButtonComponent @click.prevent="register()" type="submit" className="primary">registrati</ButtonComponent>
        </div>
    </section>
</template>

<script>
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import axios from 'axios'
import { store } from '../store/store';
import router from '../router/router';

export default {
    components: { InputComponent, ButtonComponent },
    data() {
        return {
            name: null,
            surname: null,
            phone: null,
            email: null,
            address: null,
            address_number: null,
            city: null,
            password: null,
            confirm_password: null,
            store,
            message: {}

        }
    },
    methods: {
        register() {
            this.message = {};
            axios.post(store.API_URL + 'register', {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
                phone: this.phone,
                city: this.city,
                address: this.address + ', ' + this.address_number,
                specialization: 1
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
                        this.message.email = messages.email[0]
                        this.loading = false
                    }
                    if (messages.surname){
                        this.message.password = messages.password[0]
                        this.loading = false
                    }
                    if (messages.phone){
                        this.message.email = messages.email[0]
                        this.loading = false
                    }
                    if (messages.email){
                        this.message.password = messages.password[0]
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

        }
    }

}
</script>

<style lang="scss" scoped>
section {
    padding: 1rem 50px;
}
</style>