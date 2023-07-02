<template>
    <div class="hero">

        <div
            class="top d-flex ps-md-5 flex-column overflow-hidden align-items-center flex-md-row-reverse w-100 justify-content-center justify-content-lg-between">

            <!-- <ThreeObject class="medikit py-4" w="500" h="250" yRot="0.7" xRot="0.004" ambLight="5" isRotOnMouse="true" directLight="10" rotOnMouse="0.0003" far="6"
                path="/threeObjects/firstAid-mod.gltf" /> -->
            <FirstAid />
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
        <svg class="waves w-100"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" ><path  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill" fill="#2FB0BD" fill-opacity="1"></path></svg>
    </div>
    <div class="sections bg-doc-primary">
        <HomeSection :imgs="indexImgs"/>
        <HomeSection :imgs="showImgs" reverse="true"/>
        <HomeSection :imgs="contactImgs"/>
    </div>
    <CtaComponent/>
</template>

<script>
import CtaComponent from '../components/CtaComponent.vue';
import HomeSection from '../components/HomeSection.vue';
import InputComponent from '../components/InputComponent.vue'
import ThreeObject from '../components/ThreeObject.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import FirstAid from '../components/FirstAid.vue';
export default {
    data() {
        return {
            indexImgs: {
                imgSm: 'indexMobile',
                imgMd: 'indexTablet',
                imgLg: 'indexLg',
            },
            showImgs: {
                imgSm: 'showMobile',
                imgMd: 'showLg',
                imgLg: 'showLg',
            },
            contactImgs: {
                imgSm: 'contactMobile',
                imgMd: 'contactLg',
                imgLg: 'contactLg',
            },
        }
    },
    components: {
    ThreeObject,
    ButtonComponent,
    InputComponent,
    FirstAid,
    HomeSection,
    CtaComponent
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
.sections{
    padding: 120px 50px 100px;
}
.waves{
    rotate: 180deg;
    margin: 0;
    padding: 0;
    position: relative;
    bottom: -3px;
}

@media screen and (min-width: 992px) {
    .sections{
    padding: 80px 50px 80px;
}
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
                line-height: 30px;
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