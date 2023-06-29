<template>
    <section class="bg-doc-white p-4">
        <div class="w-100">
            <img class="d-block mx-auto img-fluid" src="/img/logo/hearts-no-track.svg" alt="logo">
            <h1 class="text-uppercase text-doc-accent text-center mt-2">doctors<span class="text-doc-primary">net</span>
            </h1>
            <h2 class="text-center text-doc-blue fw-bold">Login</h2>
            <InputComponent 
            v-model="email"
            id="email_login" label="E-mail" type="e-mail" placeholder="gastanifrinzi@gmail.com" />
            <form action="">
                <InputComponent v-model="password" id="password_login" label="Password" type="password" placeholder="Password" />
                <ButtonComponent @click.prevent="login()" type="submit" title="Login" className="primary" />
            </form>

        </div>
    </section>
</template>

<script>
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import axios from 'axios'
export default {
    components: { InputComponent, ButtonComponent },
    data() {
        return {
            isAuthenticated: false,
            password: null,
            email: null
        }
    },
    methods: {
        login() {
            axios.post('http://127.0.0.1:8000/api/login', 
            {
                email: this.email,
                password: this.password
            }).then((res) => {
                if (res.data.access_token)
                {
                    this.isAuthenticated = true
                }
            })
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
}</style>