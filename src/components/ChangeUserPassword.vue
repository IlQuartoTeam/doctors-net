<template>
    <div class="changePassword w-100">
        <h1 class="px-4 py-2 text-doc-blue">Modifica password</h1>
        <small class="px-4 d-block">Dovrai inserire la tua password attuale.</small>
        <small class="px-4">I campi contrassegnati da * sono obbligatori.</small>
        <form @submit.prevent="handleSubmit()">
            <div class="row w-100 p-4">
            <div class="col-12">
                <InputComponent id="old_password" label="Vecchia password*" v-model="oldPassword" type="text" :required="true" />
            </div>
            <div class="col-12">
                <InputComponent id="new_password" label="Nuova password*" v-model="newPassword" type="text" :required="true" />
            </div>
            <div class="col-12">
                <InputComponent id="confirm_newpassword" label="Conferma nuova password*" v-model="confirmedNewPassword" type="text" :required="true" />
            </div>
        </div>
        <div class="text-end px-5">
            <ButtonComponent type="submit" :button="true" className="primary">Modifica</ButtonComponent>
        </div>
        </form>
    </div>
</template>

<script>
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
    export default {
     name:'ChangeUserPassword',
     data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmedNewPassword: ''
        }
     },
     components: {
 InputComponent,
 ButtonComponent
     }   
    }
</script>

<style lang="scss" scoped>

</style>