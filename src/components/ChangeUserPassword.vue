<template>
    <div class="changePassword w-100">
        <h1 class="px-4 py-2 text-doc-blue">Modifica password</h1>
        <small class="px-4 d-block">Dovrai inserire la tua password attuale.</small>
        <small class="px-4">I campi contrassegnati da * sono obbligatori.</small>
        <form @submit.prevent="changePassword()">
            <div class="row w-100 p-4">
                <div class="col-12">
                    <InputComponent id="old_password" label="Vecchia password*" v-model="oldPassword" type="password"
                        :required="true" />
                </div>
                <div class="col-12">
                    <InputComponent id="new_password" label="Nuova password*" v-model="newPassword" type="password"
                        :required="true" />
                </div>
                <div class="col-12">
                    <InputComponent id="confirm_newpassword" label="Conferma nuova password*" v-model="confirmedNewPassword"
                        type="password" :required="true" />
                        <p class="text-doc-red" v-if="notMatching">La conferma password non coincide con password</p>

                </div>
            </div>
            <div class="text-end px-5">
                <ButtonComponent type="submit" :button="true" className="primary">Modifica</ButtonComponent>

            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import { store } from '../store/store';

export default {
    name: 'ChangeUserPassword',
    data() {
        return {
            apiUrl: 'api/user/password',
            oldPassword: '',
            newPassword: '',
            confirmedNewPassword: '',
            notMatching: false,
            badPassword: false,
            message: '',
            store,
        }
    },
    components: {
        InputComponent,
        ButtonComponent
    },
    methods: {
        changePassword() {
            this.message =  '',
            this.notMatching = false;
            if (this.newPassword != this.confirmedNewPassword) {
                this.notMatching = true;
                return
            }
            const data = {
                oldPassword : this.oldPassword,
                newPassword : this.newPassword
            }
            const config =
            {
                headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` }
            }
            axios
                .patch(this.apiUrl, data, config)
                .then(res => {
                    this.message = res.data.message;
                    store.toast.success(this.message, {timeout: 1500});


                   

                })
                .catch(err => {
                    if (err.response.data.errors) {
                        console.log(err.response.data)
                        this.message = err.response.data.errors.newPassword[0]
                    }
                    else {
                        this.message = err.response.data.message;
                    }
                    store.toast.error(this.message, {timeout: 1500});

                }).finally(fin => {
                    this.oldPassword = '',
                    this.newPassword = '',
                    this.confirmedNewPassword = ''
                } )
        }
    }
}
</script>

<style lang="scss" scoped></style>