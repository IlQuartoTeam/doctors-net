<template>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <div class="d-flex justify-content-center gap-0">
           <h1 class="call">Trova adesso<br class="d-lg-none"><div class="d-inline-block change"><span ref="scritta" 
             class="special">{{ currentText
            }}</span></div><br>di cui hai bisogno</h1>
        </div>
       
        <ButtonComponent class="cerca fw-bold" className="accent">INIZIA ORA</ButtonComponent>
      </div>
    </div>
  </div>
</template>
      
<script>
import ButtonComponent from '../components/ButtonComponent.vue'
import { store } from '../store/store';
export default {
  components: { ButtonComponent },
  data() {
    return {
      store,
      specializzazioniMediche: [
        'l\'osteopata',
        'il chirurgo',
        'la pediatra',
        'l\'oncologo',
        'il neurologo',
        'la psicologa'

      ],
      specializzazioneCorrente: '',
      showSpecializzazione: true,
      textIndex: 0,


    }
  },
  computed: {
    currentText() {
      return this.specializzazioniMediche[this.textIndex];
    }
  },
  methods: {
    cambiaSpecializzazione() {
      setTimeout(() => {
        this.textIndex++;
        if (this.$refs.scritta) this.$refs.scritta.style.animation = 'fade-in-from-top 1s ease-in-out';
        if (this.textIndex >= this.specializzazioniMediche.length) {
          this.textIndex = 0;
        }
      }, 900);
      if (this.$refs.scritta) this.$refs.scritta.style.animation = 'fade-out-to-bottom 1s ease-in-out';
    
    }
  },
  mounted() {
    this.textAnimation = setInterval(this.cambiaSpecializzazione, 1700) 
  },
  beforeUnmount() {
    clearInterval(this.textAnimation)
  }
};

</script>
      
<style lang="scss">
@use "../assets/styles/_variables.scss" as *;


.call {
  font-size: 40px;
  color: $doc-blue;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 1.5s;
}

.container{
  padding: 100px 0px;
}

.change {
  min-width: 300px
}

.cerca {
  width: 353px;
  font-size: 20px;
  margin-top: 25px;

}

.special {
  color: $doc-accent;
   position: relative;
   display: inline-block;
 

  
}



.fade-in-from-top-element  {
  animation: fade-in-from-top 1s ease-in-out;
}


.fade-out-to-bottom-element {
  animation: fade-out-to-bottom 1s ease-in-out;
}


@media only screen and (min-width: 768px) {

  .call {
    font-size: 40px;
    color: $doc-blue;
    font-weight: bold;
    letter-spacing: 1px;
  }

  /*  .container {
    margin-top: 150px;
    margin-bottom: 150px;
  }  */


  .cerca {
    margin-top: 30px;
  }

}






@media only screen and (min-width: 992px) {

  .call {
    font-size: 48px;
    color: $doc-blue;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .container {
    margin-top: 150px;
    margin-bottom: 150px;
  }

  .cerca {
    margin-top: 70px;
  }
}






@media only screen and (min-width: 1200px) {
  .call {
    font-size: 48px;
    color: $doc-blue;
    font-weight: bold;
    letter-spacing: 1px;
 
  }

  /* .container {
    margin-top: 350px;
    margin-bottom: 200px;
  } */

  .cerca {
    margin-top: 70px;
  }
}



@keyframes fade-in-from-top {
  0% {
    opacity: 0;
    transform: translateY(-25%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


@keyframes fade-out-to-bottom {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(25%);
  }
}

</style>
      
      