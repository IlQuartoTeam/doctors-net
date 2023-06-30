<template>
    <footer class="bg-doc-primary">
        <div
            class="iconAndCall d-flex justify-content-center gap-4 align-items-center flex-md-row flex-column w-100 flex-wrap justify-content-md-between">
            <div class="icon d-flex align-items-center gap-2">
                <div class="logo">
                    <img class="img-fluid" src="/img/logo/hearts.svg" alt="doctorsnet logo">
                </div>
                <div class="title text-uppercase">
                    <h5 class="fw-bold text-white mb-0">Doctors net</h5>
                </div>
            </div>
            <div class="doctorButton d-flex">

                <ButtonComponent title="Sei un medico? Iscriviti gratis" className="outline" />
            </div>
        </div>
        <div
            class="linksAndPayment mt-4 gap-4 d-flex justify-content-center align-items-center flex-md-row flex-column w-100 flex-wrap justify-content-md-between">
            <div class="links">
                <div class="linksrow d-flex gap-4 my-1">
                    <RouterLink class="routeLink" :to="{name: ''}">I nostri specialisti</RouterLink>
                    <RouterLink class="routeLink" :to="{name: ''}">Assistenza</RouterLink>
                </div>
                <div class="linksrow d-flex gap-4 my-1">
                    <RouterLink class="routeLink" :to="{name: ''}">Termini e Condizioni</RouterLink>
                    <RouterLink class="routeLink" :to="{name: ''}">Chi siamo</RouterLink>
                </div>
                <div class="linksrow d-flex gap-4 my-1">
                    <RouterLink class="routeLink" :to="{name: ''}">Privacy Policy</RouterLink>
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
                <a href="#"><IconBrandFacebook :size="30"/></a>
                <a href="#"><IconBrandInstagram :size="30"/></a>
                <a href="#"><IconBrandTwitter :size="30"/></a>
                <a href="#"><IconBrandLinkedin :size="30"/></a>
            </div>
        </div>
        <div class="copyright">
            <p>filecc - lip07 - raffaelecapaldo - nicolozibra1 - gaetano26</p>
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
        .routeLink{
            color: $doc-white;
        }
    }
    .socials{
        a{
            color: $doc-white;
        }
    }
}

</style>