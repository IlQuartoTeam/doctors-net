<template>
    <div class="userInfo w-100">
        <h1 class="px-4 py-2 text-doc-blue">Modifica i tuoi dati</h1>
        <small class="px-4">I campi contrassegnati da * sono obbligatori.</small>
        <form @submit.prevent="handleSubmit()">
            <div class="row row-cols-1 row-cols-md-2 w-100 p-4">
            <div class="col">
                <InputComponent id="doctor_name" label="Nome*" v-model="userInfo.name" type="text" :required="true" />
            </div>
            <div class="col">
                <InputComponent id="doctor_surname" label="Cognome*" v-model="userInfo.surname" type="text" :required="true" />
            </div>
            <Places :modelAddressPlaces="store.address ?? userInfo.address" :modelCityPlaces="store.city ?? userInfo.city" />
            
            <div class="col">
                <InputComponent id="doctor_email" label="Email*" v-model="userInfo.email" type="email" :required="true" />
            </div>
            <div class="col">
                <InputComponent id="doctor_phone" label="Telefono" v-model="userInfo.phone" type="text" :required="false" />
            </div>
            <div class="col flex-grow-1">
                <label class="mb-2 text-doc-blue">Specializzazioni</label>
                 <MultiselectComponent v-if="specializations.length > 0" :array="specializations" :selectedValues="specializationsSelected" @sendResult="setSpecializationsSelected" />
               
            </div>
        </div>
        <div class="text-end px-5">
            <ButtonComponent type="submit" :button="true" className="primary">Modifica</ButtonComponent>
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
import MultiselectComponent from './MultiselectComponent.vue';

export default {
    name: 'SettingUserComponent',
    components: {
        InputComponent,
        Places,
        ButtonComponent,
        MultiselectComponent
    },
    data() {
        return {
            store,
            apiUrl: store.API_URL + 'user/edit',
            userInfo: { ...store.userDoctor },
            error: null,
            specializations: [],
            specializationsSelected: [],
            
        }
    },
    methods: {
        handleSubmit() {

            this.userInfo.address = store.address
            this.userInfo.city = store.city
            this.userInfo.address_lat = store.lat
            this.userInfo.address_long = store.lon

         
            
            const specializationsID = []
            this.specializationsSelected.forEach(element => 
           {

            specializationsID.push(this.specializations.indexOf(element) + 1)
           })

           this.userInfo.specializations = specializationsID
            
            

            const config = 
            { 
                headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}`}
            }
            axios
            .put(this.apiUrl, this.userInfo, config)
            .then(res => 
            {
                if(res.data.status)
                {
                    store.toast.success("Informazioni modificate", {timeout: 1500});
                    store.userDoctor = {...this.userInfo}
                }
                else
                {
                    store.toast.error("Ooops! Si è verificato un errore. Riprova.", {timeout: 1500});
                }
                
            })
            .catch(err =>
            {
                store.toast.error("Ooops! Si è verificato un errore. Riprova.", {timeout: 1500});
            })
        },
        setSpecializationsSelected(result)
        {
          this.specializationsSelected = result
           
        }
    },
    mounted() {
        axios.get(store.API_URL + 'specializations')
        .then(res => 
        {
            const array = res.data.specializations
            array.forEach(element => {
                this.specializations.push(element.name)
                this.userInfo.specializations.forEach(el =>
                {
                    if(element.id === el.id)
                    {
                        this.specializationsSelected.push(el.name)
                    }
                })
            });
        
            
        })
        
        store.address = this.userInfo.address
        store.city = this.userInfo.city
        store.lat = this.userInfo.address_lat
        store.long = this.userInfo.address_long
       
    },
}
</script>

<style lang="scss" scoped></style>
