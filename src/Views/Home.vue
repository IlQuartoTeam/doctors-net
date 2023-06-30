<template>
    <div class="hero py-3">

        <div
            class="top d-flex ps-md-5 flex-column overflow-hidden align-items-center flex-md-row-reverse w-100 justify-content-center justify-content-lg-between">
            <ThreeObject class="medikit py-4" w="500" h="250" yRot="0.7" xRot="0.004" far="6"
                path="/threeObjects/firstAid.gltf" />
            <div class="title text-center text-md-start">
                <h1 class="text-uppercase fw-bold"><span class="text-doc-accent">Doct</span><span><img
                            src="/img/logo/hearts-no-track.svg" alt=""></span><span class="text-doc-primary">rs Net</span>
                </h1>
                <p class="text-doc-light-dark fw-normal">Migliaia di dottori a portata di click. Cerca lo specialista adatto
                    a te e richiedi subito la tua visita!</p>
            </div>
        </div>
        <div class="searchBar">
            <form class="d-flex gap-3 align-items-center" action="">
                <div class="inputContainer">
                    <InputComponent :invalid="error" :required="true" v-model="email" id="email_login"
                        type="text" placeholder="Cardiologo, Dermatologo, Ginecologo..." />
                </div>
                <ButtonComponent className="primary formButton">cerca</ButtonComponent>
            </form>
        </div>
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
    }
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
    }
}</style>