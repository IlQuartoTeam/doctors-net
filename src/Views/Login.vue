<template>
    <section class="bg-doc-white p-4">
        <div class="w-100">
            <img class="d-block mx-auto img-fluid" src="/img/logo/hearts-no-track.svg" alt="logo">
            <h1 class="text-uppercase text-doc-accent text-center mt-2">doctors<span class="text-doc-primary">net</span></h1>
            <h2 class="text-center text-doc-blue fw-bold">Login</h2>
            <InputComponent id="email_login" label="E-mail" type="e-mail" placeholder="gastanifrinzi@gmail.com" />
            <InputComponent id="password_login" label="Password" type="password" placeholder="Password" />
        </div>
    </section>
</template>

<script>
import InputComponent from '../components/InputComponent.vue';
    export default {
    components: { InputComponent }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
section{
    width: 100%;
    height: 100dvh;
    display: grid;
    place-items: center;
}

h1{
    letter-spacing: 1px;
    font-weight: bold;
}
img{
    max-width: 200px;
}
</style>