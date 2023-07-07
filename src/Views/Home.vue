<template>
    <div class="hero">

        <div
            class="top d-flex ps-md-5 flex-column overflow-hidden align-items-center flex-md-row-reverse w-100 justify-content-center justify-content-lg-between">
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
        <div class="searchBar ">
            <div class="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-center px-5">
                <div class="flex-grow-1 w-100 d-flex align-items-start searchHome"> 
                    <v-select
                    v-model="specialization"
                    placeholder="Scegli una specializzazione"
                    :options="store.specializationsSet"
                    class="w-100"
                    >
                 <template #no-options="{ search, searching, loading }">Sembra non ci sia nulla con quella parola.</template>
                </v-select>
                </div>
               
        
                    <div class="button-conatiner">
                        <ButtonComponent @click="handleClick()" className="primary heroButton">cerca</ButtonComponent>
                    </div>
               
            </div>
        </div>
    </div>
    <div class="separator w-100">
        <svg class="waves w-100"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" ><path  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill" fill="#2FB0BD" fill-opacity="1"></path></svg>
    </div>
    <div class="sections bg-doc-primary">
        <HomeSection 
        :imgs="indexImgs" 
        title="Cerca tra centinaia di medici nella città che preferisci"
        subTitle="Scegli la citt&agrave; e usa tutte le potenzialità di Doctors NET. Filtra tutti i risultati visualizzati in base alle tue preferenze."
        />

        <HomeSection 
        :imgs="showImgs" 
        title="Visualizza i dettagli del medico scelto o della specialista"
        sub-title="Sono disponibili anche tutte le recensioni di pazienti proprio come te, leggile prima di inviare la tua richiesta."
        reverse="true"/>
        <HomeSection 
        :imgs="contactImgs"
        title="Il tuo prossimo appuntamento &egrave; a portata di click"
        sub-title="Invia una richiesta allo specialista, sar&agrave; sua cura ricontattarti il prima possibile per fissare un incontro."
        />
    </div>
</template>

<script>
import axios from 'axios';
import CtaComponent from '../components/CtaComponent.vue';
import HomeSection from '../components/HomeSection.vue';
import InputComponent from '../components/InputComponent.vue'
import ThreeObject from '../components/ThreeObject.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import FirstAid from '../components/FirstAid.vue';
import { store } from '../store/store';

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
                imgMd: 'showTablet',
                imgLg: 'showLg',
            },
            contactImgs: {
                imgSm: 'contactLg',
                imgMd: 'contactLg',
                imgLg: 'contactLg',
            },
            specialization: null,
            store
        }
    },
    components: {
    ThreeObject,
    ButtonComponent,
    InputComponent,
    FirstAid,
    HomeSection,
    CtaComponent
},
methods: {
    handleClick()
    {
        store.specialization = this.specialization
        this.$router.push('/doctors')
    }
},
mounted()
{
    axios.get(store.API_URL + 'specializations')
        .then(res => 
        {
            console.log(res.data);
            const array = res.data.specializations
            array.forEach(element => {
                store.specializationsSet.push(element.name)
            });
        })
        .catch(err => {
            console.log(err);
        })
}
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.button-conatiner{
    
    display: grid;
    place-items: center;
    width: 100%;
    @media screen and (min-width:768px) {
        width: fit-content;
    }
}

.hero {
    padding: 2rem 0;
    @media screen and (min-width: 768px) {
        padding: 4rem 0;
    }
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
                max-width: 530px;
                line-height: 30px;
                font-size: 20px;
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