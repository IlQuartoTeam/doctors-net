<template>
    <div class="userInfo w-100 p-4">
        <h1 class="py-2 text-doc-blue fw-bold">Modifica o aggiungi le tue prestazioni</h1>
        <p>Inserisci una nuova prestazione o rimuovi quelle esistenti</p>
        
        <div class="row row-cols-auto gx-0 py-4">
            <transition-group name="list" tag="div">
            <div @click="removeFromList(index)" v-for="(examination, index) in userExaminations" :key="examination" class="col examination d-flex justify-content-between align-items-center text-white m-1">
                <span> {{ examination }} </span>
                <IconCircleX class="ms-2 flex-shrink-0" />
            </div>
            </transition-group>
        </div>
       
        <form @submit.prevent="handleSubmit()">
            <div class="row row-cols-1 row-cols-lg-2 mt-4">
                <div class="col flex-grow-1">
                    <InputComponent id="ex_text" label="Nome della prestazione" type="text" placeholder="Prima visita" v-model="newExamination" />
                </div>
                <div class="col col-lg-2">
                    <InputComponent id="ex_price" label="Prezzo €" type="number" placeholder="49.99" v-model="newPrice"   />
                </div>
               
                
            </div>
            
            <div class="text-end py-3 row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center align-items-center justify-content-lg-end">
                <div class="col p-2 text-center">
                    <ButtonComponent @click.prevent="addItem()" type="button" :button="true" className="primary w-100" :disabled="(newExamination.trim() === '') || (newPrice.trim() === '')">aggiungi prestazione</ButtonComponent>
                </div>
                <div class="col p-2 text-center">
                    <ButtonComponent type="submit" :button="true" className="w-100 primary" :disabled="!isModified">completa modifica</ButtonComponent>
                </div>
               
                
            </div>
            <div class="text-end px-5 pt-3">
               
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store/store';
import InputComponent from '../components/InputComponent.vue'
import Places from '../components/Places.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import { IconCircleX, IconCircleXFilled } from '@tabler/icons-vue';

export default {
    components: {
        InputComponent,
        Places,
        ButtonComponent,
        IconCircleX,
        IconCircleXFilled
    },
    data() {
        return {
            store,
            apiUrl: store.API_URL + 'user/examinations', //nuovo endpoint, pullare
            userInfo: { ...store.userDoctor },
            userExaminations: store.userDoctor.examinations ? [ ...store.userDoctor.examinations.split(';')] : [],
            newExamination: '',
            newPrice: '',
            isModified: false
        }
    },
    methods: {
        handleSubmit() 
        {
            this.userInfo.examinations = this.userExaminations.join(';')
            const config =
            {
                headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` }
            }

            const examinationsString = this.userExaminations.join(';');//User examinations da un console.log era un array, qui uso join 
            //per rendere l'array una stringa divisa da ;
            console.log(examinationsString);


            const data = {
                examinations: examinationsString,//invio all'endpoint creato per sicurezza da zero, la stringa
            }
            axios
                .post(this.apiUrl, data, config)
                .then(res => {
                    if (res.data.status) {
                        store.toast.success("Informazioni modificate", { timeout: 1500 });
                        store.userDoctor = { ...this.userInfo }
                    }
                    else {
                        store.toast.error("Ooops! Si è verificato un errore. Riprova.", { timeout: 1500 });
                    }

                })
                .catch(err => {
                    store.toast.error("Ooops! Si è verificato un errore. Riprova.", { timeout: 1500 });
                })
                this.isModified = false
        },
        removeFromList(index)
        {
            if(this.userExaminations.length === 0)
            {
                this.userExaminations = []
                
            }
            else
            {
                this.userExaminations.splice(index, 1)
            }
            
        },
        addItem()
        {
            if(this.newExamination.trim() != '' && this.newPrice.trim() != '')
            {
                this.userExaminations.push(this.newExamination + ': ' + this.newPrice + '€')
                this.newExamination = ''
                this.newPrice = ''
                
            }
            
        },
        isTheSameArray()
        {
            
            const originalArray = store.userDoctor.examinations ? store.userDoctor.examinations.split(';') : []

            if(originalArray != this.userExaminations)
            {
                this.isModified = true
            }
        }
    },
    watch:
    {
        'userExaminations.length'()
        {
            this.isTheSameArray()
        }
    },
  
    mounted() {
       
       
    },
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

    textarea {
        outline: none;
        resize: none;
        overflow: auto;
        width: 100%;
        min-height: 300px;
        padding: 10px;
    }
    .examination{
        padding: .5rem 1rem;
        margin: 0 10px;
        border-radius: 5px;
        background-color: $doc-primary;
        transition: all .3s ease-in-out;

        &:hover{
            background-color: $doc-red;
            cursor: pointer;
        }
    }

    .list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
