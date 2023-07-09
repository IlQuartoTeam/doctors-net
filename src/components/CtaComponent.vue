<template>
  <div class="container">
    <div>
      <div class=" mx-0 text-center">
        <div class="d-flex justify-content-center gap-0">
          <h1 class="call">Trova adesso<br class="d-lg-none">
            <div class="d-inline-block change"><span ref="scritta" class="special">{{ currentText
            }}</span></div><br>di cui hai bisogno
          </h1>
        </div>

        <ButtonComponent @click="sendToDoctors" class="cerca fw-bold" className="accent px-6">INIZIA ORA</ButtonComponent>
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
      this.textIndex++;
      if (this.$refs.scritta) this.$refs.scritta.style.animation = 'fade-in-from-top 0.5s ease-in-out';
      if (this.textIndex >= this.specializzazioniMediche.length) {
        this.textIndex = 0;
      }
      setTimeout(() => {
        if (this.$refs.scritta) this.$refs.scritta.style.animation = 'fade-out-to-bottom 0.5s ease-in-out forwards';
        
      }, 600);

    },
    sendToDoctors() {
      this.$router.push({ path: '/doctors' })
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    this.textAnimation = setInterval(this.cambiaSpecializzazione, 1200)
  },
  beforeUnmount() {
    clearInterval(this.textAnimation)
  }
};

</script>
      
<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;


.call {
  font-size: 40px;
  color: $doc-blue;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 1.5s;
}

.container {
  padding: 100px 0px;
}

.change {
  min-width: 300px
}

.cerca {
  font-size: 20px;
  margin-top: 25px;

}

.special {
  color: $doc-accent;
  position: relative;
  display: inline-block;



}



.fade-in-from-top-element {
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

  .container {
    padding: 8rem 0px;

  }

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
    padding: 8rem 0px;

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
      
      