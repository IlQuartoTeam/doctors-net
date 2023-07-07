<template>
    <div class="modal-wrap">
        <div class="doc-modal p-4">
            <div class="content mt-5 container-fluid">
                
                <h2 class="text-doc-primary fw-bold fs-3 text-center"><span class="fs-3 text-doc-blue">Contatta </span>{{ store.singleDoctor.name + ' ' + store.singleDoctor.surname }}</h2>
                <form @submit.prevent="sendMessage()">
                    <div class="row mt-3">
                        <div class="col-12">
                            <InputComponent id="user_name" type="text" :required="true" v-model="name"
                                placeholder="Giovanna" />
                            <InputComponent id="user_email" type="email" :required="true" v-model="email"
                                placeholder="giovanna@mail.com" />
                            <textarea id="user_messagge" label="Messaggio*" type="textarea" v-model="message"
                                :required="true" placeholder="Messaggio" class="mt-5"></textarea>
                        </div>
                    </div>
                    <div class="d-flex flex-column gap-3">
                        <ButtonComponent class="primary d-flex">
                            <span class="m-auto">invia richiesta</span>
                        </ButtonComponent>
                        <ButtonComponent @click="goBack" class="accent d-flex">
                            <span class="m-auto">chiudi</span>
                        </ButtonComponent>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store/store';
import { IconX } from '@tabler/icons-vue';
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import axios from 'axios';
export default {
    name: 'ContactFormComponent',
    components: {
        IconX,
        InputComponent,
        ButtonComponent
    },
    data() {
        return {
            store,
            name: null,
            email: null,
            message: null
        }
    },
    methods: {
        goBack() {
            store.contactForm = false;
        },
        sendMessage() {
            axios.post(store.API_URL + '')
        }
    }
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;

.modal-wrap{
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
.content{
    @media screen and (min-width: 768px) {
        margin-top: 0 !important
    }
}

.back {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 10px;
    border-radius: 50%;
    color: $doc-blue;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
        background-color: $doc-accent;
        color: white;
    }
}

textarea {
    border: 1px solid $doc-primary;
    border-radius: 5px;
    padding: 1rem 20px;
    resize: none;
    width: 100%;
    min-height: 100px;
    display: block;
    color: $doc-primary;
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;

    &::placeholder {
        color: $doc-blue;
        opacity: 60%;
    }

    &:focus-visible {
        outline: 2px solid $doc-blue;
    }
}
</style>