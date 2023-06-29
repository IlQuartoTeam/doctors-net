<template>
    <footer class="bg-doc-primary">
        <div class="iconAndCall d-flex justify-content-between w-100 flex-wrap">
            <div class="icon d-flex align-items-center gap-2">
                <div class="logo">
                    <img class="img-fluid" src="/img/logo/hearts.svg" alt="doctorsnet logo">
                </div>
                <div class="title text-uppercase">
                    <h5 class="fw-bold text-white mb-0">Doctors net</h5>
                </div>
            </div>
            <div class="doctorButton">
                <ButtonComponent title="Sei un medico? Iscriviti gratis" className="outline"  />
            </div>
        </div>
        <div class="linksAndPayment mt-5 d-flex justify-content-between align-items-center flex-wrap">
            <div class="links">
                <div class="linksrow d-flex gap-4 my-1">
                    <a class="text-white" href="#">I nostri specialisti</a>
                    <a class="text-white" href="#">Assistenza</a>
                </div>
                <div class="linksrow d-flex gap-4 my-1">
                    <a class="text-white" href="#">Termini e Condizioni</a>
                    <a class="text-white" href="#">Chi siamo</a>
                </div>
                <div class="linksrow d-flex gap-4 my-1">
                    <a class="text-white" href="#">Privacy Policy</a>
                </div>
            </div>
            <div class="paymentButton">
                <a href="#" class="w-100">
                    <img src="/img/logo/braintree.png" alt="Braintree button">
                </a>
            </div>
        </div>
        <div class="socials d-flex justify-content-end">
            <div class="icons d-flex">

            </div>
        </div>
    </footer>
</template>
  
<script>
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
    ButtonComponent
},
    mounted() {

    }
}
</script>
  
<style lang="scss" scoped>
footer{
    padding: 20px 50px;
    .logo{
        width: 50px;
    }
    .linksrow{
       font-size: 18px;
    }
}

</style>