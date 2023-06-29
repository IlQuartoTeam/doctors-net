<template>
    <section class="bg-doc-white p-4">
        <div class="w-100">
            <img class="d-block mx-auto img-fluid" src="/img/logo/hearts-no-track.svg" alt="logo">
            <h1 class="text-uppercase text-doc-accent text-center mt-2">doctors<span class="text-doc-primary">net</span>
            </h1>
            <h2 class="text-center text-doc-blue fw-bold">Login</h2>
          
                <InputComponent
                :invalid="invalidEmail"
                :required="true" 
                v-model="email" 
                id="email_login" 
                label="E-mail" 
                type="email"
                placeholder="gastanifrinzi@gmail.com" />
                <p class="text-doc-red" v-if="invalidEmail && !email">Inserisci un indirizzo email</p>
                
                <InputComponent 
                    :invalid="invalidPassword"
                    :required="true" 
                    v-model="password" 
                    id="password_login" 
                    label="Password" 
                    type="password"
                    placeholder="Password" />
                <p class="text-doc-red" v-if="invalidPassword && !password">Inserisci una password</p>
              
                <div class="text-center">
                    <ButtonComponent @click.prevent="login()" type="submit" title="Login" className="primary" />
                </div>
                <p v-if="email && password && invalidEmail && invalidPassword" class="text-doc-red text-center mt-2">Email o Password errata. Riprova.</p>
               
                <div class="loader text-center mt-4">
                  <div v-if="loading" class="spinner-border text-primary">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
               

        </div>
    </section>
</template>

<script>
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import SmallLoaderComponent from '../components/SmallLoaderComponent.vue';
import axios from 'axios'
import {IconRefresh} from '@tabler/icons-vue';
import router from '../router/router'

export default {
    components: { InputComponent, ButtonComponent, IconRefresh, SmallLoaderComponent },
    data() {
        return {
            isAuthenticated: false,
            password: null,
            email: null,
            invalidEmail: false,
            invalidPassword: false,
            loading: false
        }
    },
    methods: {
        setInvalid(){
            this.invalidEmail = true
            this.invalidPassword = true
            this.loading = false
        },
        login() {
            this.loading = true;
            if(this.email && this.password)
            {
                if(this.email.trim() && this.password.trim())
                {
                    axios.post('http://127.0.0.1:8000/api/login',
                {
                    email: this.email,
                    password: this.password
                }).then((res) => {
                    if (res.data.access_token) {
                        this.isAuthenticated = true
                        this.$cookies.set("session-token",res.data.access_token)
                        router.push('/users/user')
                    }
                    this.loading = false
                }).catch(error => {
                   this.setInvalid()
                })
                } else {
                    this.setInvalid()
                }
            } else {
                this.setInvalid()
            }
            
        },
    },
    mounted(){
        if ( this.$cookies.get("session-token")){
            router.push('/users/user')
        }
        
       
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

section {
    width: 100%;
    height: 100dvh;
    display: grid;
    place-items: center;
}

h1 {
    letter-spacing: 1px;
    font-weight: bold;
}

img {
    max-width: 200px;
}
</style>