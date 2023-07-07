<template>
    <div class="userInfo w-100">
        <h1 class="px-4 py-2 text-doc-blue fw-bold">Modifica i tuoi dati</h1>
        <small class="px-4">I campi contrassegnati da * sono obbligatori.</small>

        <div class="row row-cols-1 row-cols-md-2 w-100 p-4">
            <form @submit.prevent="addEduItem()">

                <div class="col">

                    <template v-for="(experience, index) in userExperiences">
                        <div>
                            <div v-if="experience.type === 'education'" class="examination mx-1 my-4">
                                <div  @click="removeItem(index, experience.id)"
                                    :key="experience"
                                    class="col d-flex justify-content-between align-items-center">
                                    <span class="py-1 fw-bold"> {{ experience.name }} </span>
                                    
                                        <IconCircleX class="flex-shrink-0" :size="30" />
                            
                                    
                                </div>
                                <div>
                                    <p class="m-0 py-1">Dal {{ experience.start_date }} <span v-if="experience.end_date">al
                                            {{ experience.end_date }}</span></p>
                                </div>

                            </div>
                        </div>
                    </template>

                    <h4 class="text-doc-blue">Aggiungi un'esperienza formativa</h4>
                    <InputComponent type="text" id="userCVEduName" label="Nome dell'esperienza*"
                        placeholder="Università degli studi di Torino" v-model="newEducationName" :required="true" />
                    <InputComponent type="date" id="userCvEduStart" label="Data di inizio*" v-model="newEducationStart"
                        :required="true" />
                    <InputComponent type="date" id="userCvEduEnd" label="Data di fine" v-model="newEducationEnd" />
                    <ButtonComponent :button="true" type="submit" className="primary">Aggiungi</ButtonComponent>
                </div>

            </form>

            <form @submit.prevent="addWorkItem">
                <div class="col">

                    <template v-for="(experience, index) in userExperiences">
                        <div>
                            <div  v-if="experience.type === 'work'" class="examination mx-1 my-4">
                                <div  @click="removeItem(index, experience.id)"
                                    :key="experience"
                                    class="col  d-flex justify-content-between align-items-center">
                                    <span class="py-1 fw-bold"> {{ experience.name }} </span>

                                    <IconCircleX class="flex-shrink-0" :size="30" />
                                </div>
                                <div>
                                    <p class="m-0 py-1">Dal {{ experience.start_date }} <span v-if="experience.end_date">al
                                            {{ experience.end_date }}</span></p>
                                </div>

                            </div>
                        </div>
                    </template>
                    <h4 class="text-doc-blue">Aggiungi un'esperienza lavorativa</h4>
                    <InputComponent type="text" id="userCVWorkName" label="Nome dell'esperienza*"
                        placeholder="Primario presso Ospedale di Milano" v-model="newWorkName" :required="true" />
                    <InputComponent type="date" id="userCVEduName" label="Data di inizio*" v-model="newWorkStart"
                        :required="true" />
                    <InputComponent type="date" id="userCvWorkEnd" label="Data di fine" v-model="newWorkEnd" />
                    <ButtonComponent :button="true" type="submit" className="primary">Aggiungi</ButtonComponent>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { store } from '../../store/store';
import ButtonComponent from '../ButtonComponent.vue'
import InputComponent from '../InputComponent.vue'
import { IconCircleX, IconCircleXFilled } from '@tabler/icons-vue';
export default {
    components: {
        InputComponent,
        ButtonComponent,
        IconCircleX,
        IconCircleXFilled
    },
    data() {
        return {
            store,
            apiUrl: store.API_URL + 'user/experiences',
            userInfo: { ...store.userDoctor },
            userExperiences: store.userDoctor.experiences,
            eduObject: null,
            workObject: null,
            newEducationName: '',
            newEducationStart: '',
            newEducationEnd: '',
            newWorkName: '',
            newWorkStart: '',
            newWorkEnd: '',
        }
    },
    methods:
    {
        addWorkItem() {
            if (this.newWorkEnd != '') {
                this.userExperiences.push(
                    {
                        name: this.newWorkName,
                        type: 'work',
                        start_date: this.newWorkStart,
                        end_date: this.newWorkEnd
                    }
                )
                this.workObject = {
                    name: this.newWorkName,
                    type: 'work',
                    start_date: this.newWorkStart,
                    end_date: this.newWorkEnd
                }
            }
            else {
                this.userExperiences.push(
                    {
                        name: this.newWorkName,
                        type: 'work',
                        start_date: this.newWorkStart,
                    }
                )
                this.workObject = {
                    name: this.newWorkName,
                    type: 'work',
                    start_date: this.newWorkStart,
                }
            }

            this.newWorkEnd = ''
            this.newWorkStart = ''
            this.newWorkName = ''
            this.handleSubmit(this.workObject)
        },
        addEduItem() {
            if (this.newEducationEnd != '') {
                this.userExperiences.push(
                    {
                        name: this.newEducationName,
                        type: 'education',
                        start_date: this.newEducationStart,
                        end_date: this.newEducationEnd
                    }
                )
                this.eduObject = {
                    name: this.newEducationName,
                    type: 'education',
                    start_date: this.newEducationStart,
                    end_date: this.newEducationEnd
                }
            }
            else {
                this.userExperiences.push(
                    {
                        name: this.newEducationName,
                        type: 'education',
                        start_date: this.newEducationStart,
                    }
                )
                this.eduObject = {
                    name: this.newEducationName,
                    type: 'education',
                    start_date: this.newEducationStart,
                }
            }

            this.newEducationEnd = ''
            this.newEducationStart = ''
            this.newEducationName = ''
            this.handleSubmit(this.eduObject)
        },
        removeItem(index, id)//funzione riceve anche id della recensione
        {
            this.userExperiences.splice(index, 1) //la cancella dal front
            const config =
            {
                headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` }
            }
            axios
                .post('api/user/experiences/' + id + '/delete', {}, config)//invia chiamata api alla delete della recensione relativa
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
        },
        handleSubmit(theObject) {
            const config =
            {
                headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` }
            }
            axios
                .post(this.apiUrl, theObject, config)
                .then(res => {
                    if (res.data.status) {
                        store.toast.success("Informazioni modificate", { timeout: 1500 });
                        store.userDoctor = { ...this.userInfo }
                        axios.post(store.API_URL + 'user', { key: 'value' }, config).then(res => {
                            store.userDoctor = { ...res.data.doctor, ...res.data.user }
                            this.userInfo = { ...res.data.doctor, ...res.data.user }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    else {
                        store.toast.error("Ooops! Si è verificato un errore. Riprova.", { timeout: 1500 });
                    }

                })
                .catch(err => {
                    store.toast.error("Ooops! Si è verificato un errore. Riprova.", { timeout: 1500 });
                })
        }
    },
    watch: 
    {
        'store.userDoctor'(newValue)
        {
            this.userExperiences = newValue.experiences
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;



.examination {
    padding: .5rem 1rem;
    margin: 0 10px;
    border-radius: 5px;
    color: /* $doc-blue */ $doc-white;
    background-color: $doc-primary;
    border: 1px solid $doc-primary;
    transition: all .3s ease-in-out;

    &:hover {
        background-color: $doc-red;
        cursor: pointer;
        color: white !important;
        border: 1px solid $doc-accent;
    }
}


</style>