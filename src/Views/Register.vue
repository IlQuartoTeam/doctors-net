<template>
    <section>
        <h1 class="text-doc-blue text-center">Modulo di Registrazione</h1>
        <h2 class="text-doc-blue">Dati Personali</h2>
        <small class="text-doc-primary mb-3 d-block">I dati obbligatori sono contrassegnati da *</small>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent label="Nome*" id="register_name" type="text" placeholder="Osvaldo" v-model="name" />
            </div>
            <div class="col">
                <InputComponent label="Cognome*" id="register_surname" type="text" placeholder="Bevilacqua"
                    v-model="surname" />
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent label="Telefono" id="register_phone" type="text" placeholder="368 88 99 555"
                    v-model="phone" />
            </div>
            <div class="col">
                <InputComponent label="Email*" id="register_email" type="text" placeholder="osvaldo@mail.com"
                    v-model="email" />
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent label="Indirizzo*" id="register_address" type="text" placeholder="Corso Inghilterra"
                    v-model="address" />
            </div>
            <div class="col">
                <InputComponent label="Numero Civico*" id="register_address_number" type="number" placeholder="47"
                    v-model="address_number" />
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent label="City*" id="register_city" type="text" placeholder="Torino" v-model="city" />
            </div>
        </div>
        <h2 class="text-doc-blue">Dati Account</h2>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
                <InputComponent label="Password*" id="register_password" type="password" placeholder="Password"
                    v-model="password" />
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
            store

        }
    },
    methods: {
        register() {
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