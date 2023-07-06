<template>
    <div class="doc-modal px-2">
        <div @click="goBack" class="back">
            <IconX />
        </div>
        <div class="content container-fluid">
            <h1>Contatta</h1>
            <h1 class="text-doc-primary fw-bold">{{ store.singleDoctor.name + ' ' + store.singleDoctor.surname }}</h1>
            <form submit.prevent>
                <div class="row mt-4">
                    <div class="col-12">
                        <InputComponent id="user_name" type="text" :required="true" placeholder="Giovanna" />
                        <InputComponent id="user_email" type="email" :required="true" placeholder="giovanna@mail.com" />
                        <textarea id="user_messagge" label="Messaggio*" type="textarea" :required="true" placeholder="Messaggio" class="mt-5"></textarea>
                    </div>
                </div>
                <div>
                    <ButtonComponent class="primary d-flex"><span class="m-auto">invia richiesta</span></ButtonComponent>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { store } from '../store/store';
import { IconX } from '@tabler/icons-vue';
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
    export default {
        name: 'ContactFormComponent',
        components: {
            IconX,
            InputComponent,
            ButtonComponent
        },
        data() {
            return{
                store,
            }
        },
        methods: {
            goBack() {
                store.contactForm = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;

.doc-modal{
    position: absolute;
    top: 0;
    background-color: white;
    width: 100vw;
    height: 100vh;
    z-index: 2;
}
.content{
    margin-top: 40px;
}
.back{
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 10px;
    border-radius: 50%;
    color: $doc-blue;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s;
    &:hover{
        background-color: $doc-accent;
        color: white;
    }
}
textarea{
    border: 1px solid $doc-primary;
    border-radius: 5px;
    padding: 1rem 20px;
    width: 100%;
    min-height: 200px;;
    display: block;
    color: $doc-primary;
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;

    &::placeholder{
        color: $doc-blue;
        opacity: 60%;
    }
    &:focus-visible{
        outline: 2px solid $doc-blue;
    } 
}

@media screen and (min-width:768px) {
    .doc-modal{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0px 60px !important;
        width: 30vw;
        min-width: 500px;
        height: 80vh;
        min-height: 700px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        background-color: white;
        box-shadow: $doc-shadow;
        z-index: 2;
    }
    .content{
        margin-top: 0 !important;
    }
}
</style>