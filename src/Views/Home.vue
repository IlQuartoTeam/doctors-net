<template>
    <div class="hero">

        <div
            class="top d-flex ps-md-5 flex-column overflow-hidden align-items-center flex-md-row-reverse w-100 justify-content-center justify-content-lg-between">
            <ThreeObject class="medikit py-4" w="500" h="250" yRot="0.7" xRot="0.004" ambLight="5" isRotOnMouse="true" directLight="10" rotOnMouse="0.0003" far="6"
                path="/threeObjects/firstAid-mod.gltf" />
            <div class="title text-center text-md-start position-relative">
                <h1 class="text-uppercase fw-bold position-relative z-2"><span class="text-doc-accent">Doct</span><span><img
                            src="/img/logo/hearts-no-track.svg" alt=""></span><span class="text-doc-primary">rs Net</span>
                </h1>
                <p class="text-doc-light-dark fw-normal">Migliaia di dottori a portata di click. Cerca lo specialista adatto
                    a te e richiedi subito la tua visita!
                </p>
                <div class="pills position-absolute d-none d-xxl-block">
                    <ThreeObject w="300" h="150" yRot="0.5" xRot="-0.01" far="10" ambLight="0" kebab="true" kebabSpeed="0.001" directLight="3" path="/threeObjects/pills-blue.gltf"/>
                </div> 
                <div class="register z-1 position-absolute d-none d-xxl-block">
                    <ThreeObject w="300" h="150" yRot="0.5" xRot="-0.01" isRotOnMouse="true" ambLight="4" rotOnMouse="0.00008" directLight="1" path="/threeObjects/medicalRecord-mod.gltf"/>
                </div>
            </div>
        </div>
        <div class="searchBar">
            <div class="d-flex flex-column flex-md-row gap-3 align-items-center px-3">
                <InputComponent class="formInput" :invalid="error" :required="true" v-model="email" className="searchHero"
                    id="searchHero" type="text" placeholder="Cardiologo, Dermatologo, Ginecologo..." />
                <ButtonComponent className="primary heroButton mb-3">cerca</ButtonComponent>
            </div>
        </div>
    </div>
    <div class="separator w-100">
        <img class="w-100 waves" src="/img/other/waves.svg" alt="waves">
    </div>
</template>

<script>
import InputComponent from '../components/InputComponent.vue'
import ThreeObject from '../components/ThreeObject.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
export default {
    data() {
        return {

        }
    },
    components: {
        ThreeObject,
        ButtonComponent,
        InputComponent
    }
}
</script>

<style lang="scss" scoped>
.hero {
    padding: 100px 0;
    .title {

        h1 {
            font-size: 40px;

            img {
                width: 40px;
                padding-bottom: 8px;
            }
        }

        p {
            max-width: 450px;
            font-size: 15px;
            line-height: 25px;
        }
        .pills{
            bottom: -50px;
            right: -50px;
        }
        .register{
            top: -65px;
            left: -50px;
        }
    }
    
}
.waves{
    filter: invert(64%) sepia(85%) saturate(353%) hue-rotate(137deg) brightness(79%) contrast(93%);
    rotate: 180deg;
}

@media screen and (min-width: 990px) {
    .hero {
        .title {
            h1 {
                font-size: 56px;

                img {
                    width: 56px;
                    padding-bottom: 10px;
                }
            }
        }
    }
}

@media screen and (min-width: 1400px) {
    .hero {
        .title {
            h1 {
                font-size: 96px;

                img {
                    width: 96px;
                    padding-bottom: 20px;
                }
            }

            p {
                line-height: 35px;
            }
        }

        .searchBar {
            .formInput {
                width: 50%;
            }
        }
    }
}
</style>