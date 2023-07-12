<template>
  <div class="modal-wrap">
    <div class="doc-modal p-4">
      <h1 class="text-center text-doc-blue fs-2">Stai acquistando</h1>
      <p class="ps-2 text-center text-doc-blue fs-4 fw-bold">{{ store.payment.subscription + ' (' + store.payment.hours +
        ')' + ' - ' + store.payment.price }}€</p>


      <div class="content mt-1 container-fluid">
        <div id="dropin-container"></div>
        <form id="payment-form" action="" method="post">
          <!-- Putting the empty container you plan to pass to
      'braintree.dropin.create' inside a form will make layout and flow
      easier to manage -->
      <div class="d-flex justify-content-center align-items-center gap-2">
        <ButtonComponent :disabled="loadingBrain || paying" id="payment-button" :button="true" type="submit" className="primary flex-grow-1">
      <span v-if="!paying">   {{ !addedCard ? 'Aggiungi una carta' : 'Paga ora' }} </span>
      <span v-else class="d-flex justify-content-center align-items-center gap-2">
                                <span class="spinner-border"></span> Pagando...
                            </span>
          </ButtonComponent>
          
          <ButtonComponent @click="store.payMode = false" :button="false" className="outline-accent flex-grow-1">Annulla
          </ButtonComponent>
      </div>
        

        </form>
      </div>
    </div>
  </div>
  <div>

  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../../store/store'
import ButtonComponent from '../ButtonComponent.vue';



export default {
  data() {
    return {
      token: '',
      nonce: '',
      store,
      paymentAdded: false,
      addedCard: false,
      loadingBrain: true,
      paying: false

    }
  },

  methods: {
    initializePayment(token) {
      console.log('ciao')
      const form = document.querySelector('#payment-form')
      braintree.dropin.create({
        authorization: token,
        container: '#dropin-container',
        locale: 'it_IT',

      }, (error, dropinInstance) => {
        if (error) console.error(error);

        this.loadingBrain = false
        form.addEventListener('submit', event => {
          event.preventDefault();
          

          dropinInstance.requestPaymentMethod((error, payload) => {
            if (error) console.error(error);

            if (this.paymentAdded) {
              this.pay()

            }
            else {

              // Step four: when the user is ready to complete their
              //   transaction, use the dropinInstance to get a payment
              //   method nonce for the user's selected payment method, then add
              //   it a the hidden field before submitting the complete form to
              //   a server-side integration
              this.nonce = payload.nonce;
              this.paymentAdded = true;
              this.addedCard = true;

            }

          });
        });
      });
    },
    getToken() {
      axios.get('api/payment/initialize/')
        .then((res) => {
          this.token = res.data.token
          this.initializePayment(this.token)


        }).catch((err) => {


        })
    },
    pay() {
      this.paying = true
      const paymentData = {
        amount: this.store.payment.price,
        payment_method_nonce: this.nonce,
        subID: this.store.payment.subID
      };
      const config =
      {
        headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` }
      }
      axios.post('/api/payment/process', paymentData, config)
        .then(response => {
          // Elaborazione della risposta dal backend
          const success = response.data.success;
          if (success) {
            store.toast.success('Sottoscrizione acquistata!', { timeout: 1500 });
            this.store.payMode = false;
            this.paying = false
            this.getendDate()
            

          } else {
            store.toast.error('Pagamento non riuscito', { timeout: 1500 });
            const error = response.data.error;
            this.store.payMode = false;
            console.error(error);
          }
        })
        .catch(error => {
          // Gestione degli errori di comunicazione con il backend
          console.error(error)
          this.paying = false;
        })
    },
    getendDate() {
            if (this.$cookies.get("session-token")) {
                const token = this.$cookies.get("session-token")

                const config = { headers: { Authorization: `Bearer ${token}` } }
                axios.post(store.API_URL + 'user', { key: 'value' }, config).then(res => {
                    store.userDoctor.end_date = res.data.doctor.end_date 
                }).catch(err => {
                 
                }
                )
            }
        },
  },
  components: {
    ButtonComponent,

  },
  mounted() {
    this.getToken()


  }
}
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  z-index: 999999;
}

.doc-modal {
  background-color: white;
  width: 500px;
  position: relative;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
}


[data-braintree-id="toggle"] {
  display: none;
}
</style>