<template>
    <section class="bg-doc-white p-4 p-lg-0">
        <div class="image-container"></div>
        <div class="login-container">
            <img class="d-block mx-auto img-fluid" src="/img/logo/hearts-no-track.svg" alt="logo">
            <h1 class="text-uppercase text-doc-accent text-center mt-2">doctors<span class="text-doc-primary">net</span>
            </h1>
            <form @submit.prevent="login()" action="#">
            <h2 class="text-center text-doc-blue fw-bold">Login</h2>


            <InputComponent :invalid="message.email || error" :required="true" v-model="email" id="email_login"
                label="E-mail" type="email" placeholder="gastanifrinzi@gmail.com" />
            <p class="text-doc-red" v-if="message.email || error">{{ message.email }}</p>

            <div class="position-relative">
                <IconEye v-if="revealPassword" @click="reveal()" class="position-absolute eye" />
                <IconEyeClosed v-if="!revealPassword" @click="reveal()" class="position-absolute eye" />
                <InputComponent :invalid="message.password || error" :required="true" v-model="password" id="password_login"
                label="Password" :type="revealPassword ? 'text' : 'password'" placeholder="Password" />
            </div>
                <p class="text-doc-red" v-if="message.password || error">{{ message.password }}</p>
            
            

            <div class="text-center d-flex flex-column gap-2">
                <ButtonComponent :button="true" type="submit" className="primary">Login</ButtonComponent>
                <ButtonComponent link="/register" className="outline">Registrati</ButtonComponent>
            </div>
            <p v-if="message.text" class="text-doc-red text-center mt-2">{{ message.text }}</p>
        </form>

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
import { IconRefresh } from '@tabler/icons-vue';
import router from '../router/router'
import { store } from '../store/store'
import { IconEye } from '@tabler/icons-vue';
import { IconEyeClosed } from '@tabler/icons-vue';

export default {
    components: { InputComponent, ButtonComponent, IconRefresh, SmallLoaderComponent, IconEye, IconEyeClosed },
    data() {
        return {
            password: null,
            email: null,
            message: { email: null, password: null },
            loading: false,
            store,
            error: false,
            revealPassword: false
        }
    },
    methods: {
        /**
         * Logging in a single user
         * is successfull set the cookie 'sessione-token'
         */
         reveal()
         {
            this.revealPassword = !this.revealPassword
         },
        login() {
            this.message.text = '';
            this.error = false
            this.message.email = '';
            this.message.password = '';
            this.loading = true
            axios.post(store.API_URL + 'login',
                {
                    email: this.email,
                    password: this.password
                }).then((res) => {
                    if (res.data.access_token) {
                        this.store.isAuthenticated = true
                        this.$cookies.set("session-token", res.data.access_token)
                        this.getUser()
                    }

                }).catch(error => {
                    const messages = error.response.data.errors
                    const invalid = error.response.data.message

                    if (invalid) {
                        this.message.email = null
                        this.message.password = null
                        this.message.text = invalid
                        this.loading = false
                        this.error = true

                    }

                    if (messages.email) {
                        this.message.email = messages.email[0]
                        this.loading = false
                    }
                    if (messages.password) {
                        this.message.password = messages.password[0]
                        this.loading = false
                    }

                })
        },
        getUser() {
            if (this.$cookies.get("session-token")) {
                const token = this.$cookies.get("session-token")

                const config = { headers: { Authorization: `Bearer ${token}` } }
                axios.post(store.API_URL + 'user', { key: 'value' }, config).then(res => {
                    store.doctor = res.data.doctor
                    store.doctor.specialization = res.data.doctor.specializations[0].name
                    store.user = res.data.user
                    store.userDoctor = { ...res.data.doctor, ...res.data.user }
                    router.push('/users/profile')
                }).catch(err => {
                  //  this.message.text = 'Ooops! Si è verificato un errore.'
                    this.loading = false
                })
            }
        }
    },
    mounted() {
        /**
         * If already logged in call getUser() e push him to his dashbaord
         */
        if (this.$cookies.get("session-token")) {
            this.getUser()
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

    .login-container {
        width: 100%;
    }

    @media screen and (min-width: 550px) {
        background: url('/img/other/login-image.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: grid;
        place-items: center;

        .login-container {
            width: 400px;
            margin: 0 auto;
            padding: 2rem;
            border-radius: 20px;
            background-color: white;
        }

    }

    @media screen and (min-width: 992px) {
        background: #FAFAFA;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .image-container {
            background: url('/img/other/login-image.jpg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            width: 50%;
            height: 100dvh;
        }

        .login-container {
            background-color: #fafafa;
        }
    }
}

h1 {
    letter-spacing: 1px;
    font-weight: bold;
}

img {
    max-width: 100px;
}

.eye{
    top: 55%;
    right: 5%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: $doc-blue;
    
}
</style>