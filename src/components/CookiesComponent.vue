<template>
    <div class="container-fluid py-5">
        <div class="row">
            <div class="col text-center">
               <h1 class="cockie">A proposito di cookies</h1>
               <p class="text mt-5 text-doc-blue">Utilizziamo cookie e metodi simili per riconoscere i visitatori iscritti al sito e ricordare la loro permanenza sul sito. Nessun cookie di profilazione e/o per fini pubblicitari viene impostato da questo sito sul tuo computer.  e/o dispositivo mobile. Toccando “ACCETTA questo banner viene chiuso e la tua navigazione continua come prima. </p>
             <div class="w-100 text-center">
               <ButtonComponent @click="acceptCookies()" class="accetta mt-5" :button="true" className="primary">Accetta</ButtonComponent>
             </div>
             
            </div>
        </div>
             
    </div>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue';
import { store } from '../store/store';

export default {
    components: {
       ButtonComponent,
    },
    data() {
        return {}
    },
    methods:
    {
        acceptCookies()
        {
            store.showCookie = false
            this.$cookies.set("privacy","seen","24d");
        }
    }
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;


.container-fluid{
    position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 999;
  box-shadow: $doc-shadow;
}
.cockie {
    font-size: 25px;
    color: $doc-blue;
   font-weight: bold;
   letter-spacing: 1px;
}


.col {
    padding: 0 35px;
}

.text {
    font-size: 13px;
   letter-spacing: 1px;
    
}


@media only screen and (min-width: 768px) {

.cockie {
   font-size: 28px;
   

}

.col {
    padding: 0 170px;
}


.text {
   font-size: 15px;
   
}


}






@media only screen and (min-width: 992px) {
.cockie {
   font-size: 30px;
   
}

.col {
    padding: 0 250px;
}
.text {
   font-size: 15px;
  

}
}






@media only screen and (min-width: 1200px) {
    .cockie {
   font-size: 32px;
   
}

.text {
   font-size: 17px;
  

}


.col {
    padding: 0 350px;
}
}

</style>