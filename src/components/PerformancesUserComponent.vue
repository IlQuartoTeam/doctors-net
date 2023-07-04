<template>
    <div class="userInfo w-100">
        <h1 class="px-4 py-2 text-doc-blue">Modifica le tue prestazioni</h1>
        <p class="px-4">Inserisci le prestazioni seguendo queste regole:</p>
        
        <div class="row row-cols-auto gx-0">
            <div @click="removeFromList(index)" v-for="(examination, index) in userExaminations" :key="examination" class="col examination d-flex justify-content-between align-items-center text-white">
                <span> {{ examination }} </span>
                <IconCircleX class="ms-2" />
            </div>
        </div>
       
        <form @submit.prevent="handleSubmit()">
            <div class="row">
                <div class="col-10">
                    <InputComponent id="ex_text" label="Nome della prestazione" type="text" placeholder="Prima visita" v-model="newExamination" />
                </div>
                <div class="col-2">
                    <InputComponent id="ex_price" label="Prezzo €" type="number" placeholder="49.99" :required="(newExamination.trim() != '') ? true : false" v-model="newPrice" />
                </div>
               
                
            </div>
            
            <div class="text-end px-5">
                <ButtonComponent @click.prevent="addItem()" type="button" :button="true" className="primary">aggiungi prestazione</ButtonComponent>
                <ButtonComponent type="submit" :button="true" className="outline ms-3">completa modifica</ButtonComponent>
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
            apiUrl: store.API_URL + 'user/edit',
            userInfo: { ...store.userDoctor },
            userExaminations: store.userDoctor.examinations.split(';'),
            newExamination: '',
            newPrice: ''
        }
    },
    methods: {
        handleSubmit() 
        {
            console.log(this.userExaminations.join(';'));
            // this.userInfo.examinations = this.userExaminations.join('')
            // const config =
            // {
            //     headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` }
            // }
            // axios
            //     .put(this.apiUrl, this.userInfo, config)
            //     .then(res => {
            //         if (res.data.status) {
            //             store.toast.success("Informazioni modificate", { timeout: 1500 });
            //             store.userDoctor = { ...this.userInfo }
            //         }
            //         else {
            //             store.toast.error("Ooops! Si è verificato un errore. Riprova.", { timeout: 1500 });
            //         }

            //     })
            //     .catch(err => {
            //         store.toast.error("Ooops! Si è verificato un errore. Riprova.", { timeout: 1500 });
            //     })
        },
        removeFromList(index)
        {
            console.log(index);
            console.log(this.userExaminations[index]);
            this.userExaminations.splice(index, 1)
        },
        addItem()
        {
            this.userExaminations.push(this.newExamination + ': ' + this.newPrice + '€')
            this.newExamination = ''
            this.newPrice = ''
        }
    },
    mounted() {
        console.log(store.userDoctor);
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
</style>
