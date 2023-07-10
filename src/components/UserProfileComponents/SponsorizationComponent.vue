<template>
    <div class="container">
        <div>
            <h1 class="text-doc-blue pt-2 fw-bolder">Acquista un pacchetto</h1>
            <p class="text-doc-blue">Mostra il tuo profilo nella home e appari prima di tutti nelle ricerche degli utenti, acquistando uno dei nostri pacchetti
            </p>
        </div>
        <div class="cards d-none d-lg-flex justify-content-center gap-3 py-5 flex-wrap align-items-center">
            <div class="baseBorder sub d-flex flex-column align-items-center" :class="{'activeOne' : activeOne == 'base'}" @mouseenter="setActiveOne('base')">
                <h6 class="text-doc-blue small">Base</h6>
                <h2 class="text-doc-blue fw-bold fs-1 my-0 px-4">24 <span class="fw-normal fs-4">ore</span></h2>
                <hr class=" w-100 my-0 text-doc-blue border-2">
                <h4 class="text-doc-blue fw-bold">2,99€</h4>
                <div class="w-100">
                    <ButtonComponent :button="true" type="submit" className="outline py-2 fw-bold">Acquista</ButtonComponent>          
                </div>
            </div>
            <div class="premium sub position-relative d-flex flex-column align-items-center bg-doc-accent" :class="{'activeOne' : activeOne == 'premium'}" @mouseenter="setActiveOne('premium')">
                <h6 class="text-doc-white small">Premium</h6>
                <h2 class="text-doc-white fw-bold fs-1 my-0 px-2">72 <span class="fw-normal fs-4">ore</span></h2>
                <hr class=" w-100 my-0 text-doc-white border-2">
                <h4 class="text-doc-white fw-bold">5,99€</h4>
                <div class="w-100">
                    <ButtonComponent :button="true" type="submit" className="outline-accent border-0 py-2 fw-bold">Acquista</ButtonComponent>       
                </div>
                <div class="mostSelled position-absolute d-flex justify-content-center px-5 bg-white">
                    <span>Il più venduto</span>
                </div>
            </div>
            <div class="top sub d-flex flex-column align-items-center bg-doc-primary" :class="{'activeOne' : activeOne == 'top'}" @mouseenter="setActiveOne('top')">
                <h6 class="text-doc-white small">Top</h6>
                <h2 class="text-doc-white fw-bold fs-1 my-0 px-2">144 <span class="fw-normal fs-4">ore</span></h2>
                <hr class=" w-100 my-0 text-doc-white border-2">
                <h4 class="text-doc-white fw-bold">9,99€</h4>
                <div class="w-100">
                    <ButtonComponent :button="true" type="submit" className="outline-primary border-0 py-2 fw-bold">Acquista</ButtonComponent>       
                </div>
            </div>
        </div>

        <!-- mobile/Tablet -->

        <div class="mobileCards d-flex flex-column align-items-center d-lg-none py-5">
            <div class="baseBorder sub w-100 d-flex flex-column gap-4 align-items-center">
                <h6 class="text-doc-blue small">Base</h6>
                <div class="details d-flex justify-content-evenly w-100 gap-2 align-items-end">
                    <h2 class="text-doc-blue fw-bold m-0 p-0S">24 <span class="fw-normal fs-2">ore</span></h2>
                    <h4 class="text-doc-blue fw-bold m-0">2,99€</h4>
                </div>
                <div class="w-100">
                    <ButtonComponent :button="true" type="submit" className="outline w-100 py-2 fw-bold">Acquista</ButtonComponent>          
                </div>
            </div>
            <div class="premium sub w-100 position-relative d-flex flex-column gap-4 align-items-center bg-doc-accent">
                <h6 class="text-doc-white small">Premium</h6>
                <div class="details d-flex justify-content-evenly w-100 gap-2 align-items-end">
                    <h2 class="text-doc-white fw-bold my-0 px-2">72 <span class="fw-normal fs-2">ore</span></h2>
                    <h4 class="text-doc-white fw-bold m-0">5,99€</h4>
                </div>
                <div class="w-100">
                    <ButtonComponent :button="true" type="submit" className="outline-accent w-100 border-0 py-2 fw-bold">Acquista</ButtonComponent>       
                </div>
                <div class="mostSelled position-absolute d-flex justify-content-center px-5 bg-white">
                    <span>Il più venduto</span>
                </div>
            </div>
            <div class="top sub w-100 d-flex flex-column gap-4 align-items-center bg-doc-primary">
                <h6 class="text-doc-white small">Top</h6>
                <div class="details d-flex justify-content-evenly w-100 gap-2 align-items-end">
                    <h2 class="text-doc-white fw-bold m-0 p-0S">144 <span class="fw-normal fs-2">ore</span></h2>
                    <h4 class="text-doc-white fw-bold m-0">9,99€</h4>
                </div>
                <div class="w-100">
                    <ButtonComponent :button="true" type="submit" className="outline-primary w-100 py-2 fw-bold">Acquista</ButtonComponent>          
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonComponent from '../ButtonComponent.vue'
export default {
    data() {
        return {
            activeOne: 'premium'
        }
    },
    components: {
        ButtonComponent,
    },
    methods: {
        setActiveOne(name){
            this.activeOne = name
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *; 
.container {
    min-height: 600px;
    .baseBorder{
        border: 1px solid $doc-blue;
    }

    .mobileCards{
        h2{
            font-size: 2.5rem;
        }
        h4{
            font-size: 1.6rem;
            padding-bottom: 0.1rem;
        }
        .sub{
            max-width: 350px;
        }
    }

    .sub{
        padding: 10px 20px;
        margin: 20px;
        border-radius: 5px;
        transition: all .5s;
        gap: .5rem;
        cursor: pointer;
    }
    .premium{
        border: 1px solid $doc-accent;
        overflow: hidden;
        .mostSelled{
            font-size: 12px;
            top: 10px;
            left: -50px;
            transform: rotateZ(-35deg);
            padding: 3px;
            white-space: nowrap;
            span{
                font-weight: 500;
                color: $doc-blue;
            }
        }
    }
    .activeOne{
        padding: 20px 30px;
        margin: 0;
        gap: .85rem;
    }

}
</style>