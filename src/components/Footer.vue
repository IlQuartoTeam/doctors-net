<template>
    <footer class="bg-doc-primary">
        <div
            class="iconAndCall d-flex justify-content-center gap-4 align-items-center flex-md-row flex-column w-100 flex-wrap justify-content-md-between">
            <div class="icon d-flex align-items-center gap-2">
                <div class="logo">
                    <img  class="img-fluid" src="/img/logo/hearts.svg" alt="doctorsnet logo">
                </div>
                <div class="title text-uppercase">
                    <h5 class="fw-bold text-white mb-0">Doctors net</h5>
                </div>
            </div>
            <div class="doctorButton d-flex">

                <ButtonComponent @click="goRegister()" className="outline d-flex align-items-center gap-2">
                    <IconUser /> Sei un medico? Iscriviti gratis
                </ButtonComponent>
            </div>
        </div>
        <div
            class="linksAndPayment mt-4 gap-4 d-flex justify-content-center align-items-center flex-md-row flex-column w-100 flex-wrap justify-content-md-between">
            <div class="links d-flex gap-4">
                <div class="linksrow flex-column d-flex gap-2 my-1">
                    <RouterLink class="routeLink" :to="{ path: '/doctors' }">I nostri specialisti</RouterLink>
                    <RouterLink class="routeLink" :to="{ path: '/help' }">Termini e Condizioni</RouterLink>
                    <RouterLink class="routeLink" :to="{ path: '/help'}">Privacy Policy</RouterLink>
                </div>
                <div class="linksrow flex-column d-flex gap-2 my-1">
                    <RouterLink class="routeLink" :to="{ path: '/help'}">Assistenza</RouterLink>
                    <RouterLink class="routeLink" :to="{ path: '/team' }">Chi siamo</RouterLink>
                </div>
            </div>
            <div class="paymentButton">
                <a href="#" class="w-100">
                    <img src="/img/logo/braintree.png" alt="Braintree button">
                </a>
            </div>
        </div>
        <div class="socials my-3 d-flex justify-content-center justify-content-md-end">
            <div class="icons d-flex align-items-center gap-2">
                <a href="#">
                    <IconBrandFacebook :size="30" />
                </a>
                <a href="#">
                    <IconBrandInstagram :size="30" />
                </a>
                <a href="#">
                    <IconBrandTwitter :size="30" />
                </a>
                <a href="#">
                    <IconBrandLinkedin :size="30" />
                </a>
            </div>
        </div>
        <div class="copyright mt-4 d-flex align-items-center flex-column align-items-md-end">
            <p class="copyTitle mb-0">Copyright© - 2023</p>
            <p> <a href="https://github.com/filecc">filecc</a> - <a href="https://github.com/Lip-7">lip</a> - <a
                    href="https://github.com/raffaelecapaldo">raffaelecapaldo</a> - <a
                    href="https://github.com/nicolozibra1">nicolozibra1</a> - <a
                    href="https://github.com/Gaetano26">gaetano26</a></p>
        </div>
    </footer>
</template>
  
<script>
import { IconBrandTwitter } from '@tabler/icons-vue';
import { IconBrandFacebook } from '@tabler/icons-vue';
import { IconBrandInstagram } from '@tabler/icons-vue';
import { IconBrandLinkedin } from '@tabler/icons-vue';
import { IconUser } from '@tabler/icons-vue';
import ButtonComponent from './ButtonComponent.vue';
export default {
    name: 'FooterComponent',
    data() {
        return {

        }
    },
    methods: {
        goRegister() {
            this.$router.push({ name: 'register' })
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },

    },
    components: {
        ButtonComponent,
        IconUser,
        IconBrandFacebook,
        IconBrandInstagram,
        IconBrandLinkedin,
        IconBrandTwitter,
    },
    mounted() {

    }
}
</script>
  
<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

footer {
    padding: 30px 50px;

    .logo {
        width: 50px;
    }

    .linksrow {
        font-size: 18px;

        .routeLink {
            color: $doc-white;
        }
    }

    .socials {
        a {
            color: $doc-white;
        }
    }

    .copyright {

        p,
        p>a {
            font-size: 13px;
            color: $doc-white;
            opacity: .8;
        }
    }
}</style>