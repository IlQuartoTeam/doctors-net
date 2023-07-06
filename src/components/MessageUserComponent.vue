<template>
    <div v-if="store.userDoctor.messages.length > 0" class="container-fluid" id="index">
        <h1 class="text-h2 text-doc-blue fw-semibold text-center">I tuoi messaggi</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" class="w-25 d-none">Nome</th>
                    <th scope="col" class="w-25">Email</th>
                    <th scope="col" class="w-50">Messaggio</th>
                </tr>
            </thead>
            <tbody v-for="(message, index) in store.userDoctor.messages">
                <tr @click="openMessage" class="prev-message">
                    <td class="d-none">{{ message.fullname }}</td>
                    <td>{{ message.email }}</td>
                    <!-- <td class="d-none">{{ truncateMessage(message.text, 30) }}</td> -->
                    <td class="message">
                        {{ message.text }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="text-center mt-4">
            <ButtonComponent @click="toggledashboardActive" className="button-doctor outline">Torna alla Dashboard
            </ButtonComponent>
        </div>
    </div>
    <div v-if="isOpenMessage" class="container-fluid mt-4" id="show">
        <h1 class="text-h2 text-doc-blue fw-semibold text-center mb-4">Messaggio</h1>
        <div v-for="(message, index) in store.userDoctor.messages" class="message-details d-flex flex-column gap-2">
            <h6><span class="fw-semibold">Ricevuto da: </span>{{ message.fullname }}</h6>
            <h6><span class="fw-semibold">Email: </span>{{ message.email }}</h6>
            <h6><span class="fw-semibold">Messaggio: </span>{{ message.text }}</h6>
        </div>
        <div class="text-center mt-4">
            <ButtonComponent @click="openMessage" className="button-doctor outline">Indietro</ButtonComponent>
        </div>
    </div>
    <div v-if="store.userDoctor.messages.length < 1" class="noMessage text-center pt-3 row justify-content-center">
        <div class="medikit col-6">
            <img class="img-fluid" src="/img/other/medikit.png" alt="">
        </div>
        <h2 class="col-10">Fra ma non hai manco un messaggio?! che sfigato</h2>
        <!-- <h2>Non hai ancora nessun messaggio</h2> -->
    </div>
</template>

<script>
import { store } from '../store/store';
import ButtonComponent from './ButtonComponent.vue';
export default {
    name: 'MessageUserComponent',
    components: {
        ButtonComponent
    },
    data() {
        return {
            store,
            isOpenMessage: false
        }
    },
    methods: {
        truncateMessage(message, length) {
            if (message.length <= length) {
                return message;
            }
            else {
                return message.slice(0, length) + "...";
            }
        },
        openMessage() {
            this.isOpenMessage = !this.isOpenMessage
        },
        toggledashboardActive() {
            store.dashboard.heroOpen = !store.dashboard.heroOpen;
            store.dashboard.messaggesOpen = !store.dashboard.messaggesOpen;
            this.isOpen = !this.isOpen
        },
    }
}
</script>

<style lang="scss" scoped>
#index,
#show {
    min-height: 50vh;
}

.table {
    --bs-table-bg: transparent;
    --bs-table-border-color: #0071A2;
    width: 100%;
    border-collapse: collapse;
}

.prev-message {
    cursor: pointer;
}

.message {
    max-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.medikit{
    max-width: 350px;
    min-width: 200px;
}
</style>