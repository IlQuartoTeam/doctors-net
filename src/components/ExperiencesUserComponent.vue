<template>
    <div class="userInfo w-100">
        <h1 class="px-4 py-2 text-doc-blue">Modifica i tuoi dati</h1>
        <small class="px-4">I campi contrassegnati da * sono obbligatori.</small>
        <div class="row row-cols-1 row-cols-md-2 w-100 p-4">
            <form @submit.prevent="handleSubmit">
                <div class="col">
                    <ul v-if="useExperiences">
                        <template v-for="experience in useExperiences">
                            <li v-if="experience.type === 'work'">{{ experience.name }}</li>
                        </template>
                    </ul>
                    <InputComponent type="text" id="userCVEduName" label="Nome dell'esperienza"
                        placeholder="Università degli studi di Torino"  v-model="newEducationName" :required="true" />
                    <InputComponent type="date" id="userCvEduStart" label="Data di inizio"  v-model="newEducationStart"
                        :required="true" />
                    <InputComponent type="date" id="userCvEduEnd" label="Data di fine"  v-model="newEducationEnd" />
                    <ButtonComponent :button="true" type="submit" className="primary">Aggiungi</ButtonComponent>
                </div>

            </form>
            <form @submit.prevent="handleSubmit">
                <div class="col">
                    <ul v-if="useExperiences">
                        <template v-for="experience in useExperiences">
                            <li v-if="experience.type === 'education'">{{ experience.name }}</li>
                        </template>
                    </ul>
                    <InputComponent type="text" id="userCVWorkName" label="Nome dell'esperienza"
                        placeholder="Primario presso Ospedale di Milano"  v-model="newWorkName" :required="true" />
                    <InputComponent type="date" id="userCVEduName" label="Data di inizio"  v-model="newWorkStart"
                        :required="true" />
                    <InputComponent type="date" id="userCvWorkEnd" label="Data di fine" v-model="newWorkEnd" />
                    <ButtonComponent :button="true" type="submit" className="primary">Aggiungi</ButtonComponent>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { store } from '../store/store';
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
export default {
    components: {
        InputComponent,
        ButtonComponent
    },
    data() {
        return {
            store,
            userInfo: { ...store.userDoctor },
            useExperiences: { ...store.userDoctor.experiences },
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
        handleSubmit() {
            console.log('submitted');
            console.log(this.newEducationStart);
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped></style>