<template>
    <div v-if="store.userDoctor.messages.length > 0 && !isOpenMessage" class="w-100 px-lg-2 pb-5 py-2" id="index">
        <h1 class="text-h2 p-3 text-doc-blue fw-semibold">I tuoi messaggi</h1>
        <table class="table">
            <thead>
                <tr class="d-none d-lg-table-row">
                    <th scope="col" class=" text-doc-blue">Nome</th>
                    <th scope="col" class=" text-doc-blue">Email</th>
                    <th scope="col" class="w-100 text-doc-blue">Messaggio</th>
                    <th scope="col" class="text-doc-blue">Gestisci</th>
                </tr>
            </thead>
            <tbody v-for="(message, index) in store.userDoctor.messages">
                <tr @click="openMessage(index)" class="prev-message d-lg-none">
                    <td class="position-relative text-doc-blue">
                        <div class="d-flex flex-column pt-2">
                            <div class="name">
                                <h6 class="mb-0 fw-bold">{{ message.fullname }}</h6>
                            </div>
                            <h6 class="small text-doc-blue mb-0">{{ message.email }}</h6>
                            <p class="prevMessage text-doc-blue mb-0">
                                {{ message.text }}
                            </p>
                        </div>
                        <div class="date">
                            <p>{{ formatDate(message.created_at) }}</p>
                        </div>
                        <div class="actions position-absolute d-flex">
                            <div class="delete p-2">
                                <IconTrash/>
                            </div>
                            
                        </div>
                    </td>
                    <!-- <td>{{ message.fullname }}</td>
                    <td class="message">
                        {{ message.text }}
                    </td>
                    <td>
                        elimina
                    </td> -->
                </tr>
                <tr @click="openMessage(index)" class="prev-message d-none d-lg-table-row">
                    <td>{{ message.fullname }}</td>
                    <td>{{ message.email }}</td>
                    <!-- <td class="d-none">{{ truncateMessage(message.text, 30) }}</td> -->
                    <td class="message">
                        {{ message.text }}
                    </td>
                    <td>
                        elimina
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- MESSAGGIO SINGOLO APERTO -->


    <div v-if="isOpenMessage" class="container-fluid mt-4" id="show">
        <h1 class="text-h2 text-doc-blue fw-semibold text-center mb-4">Messaggio</h1>
        <div class="message-details d-flex flex-column gap-2">
            <h6><span class="fw-semibold text-doc-primary">Ricevuto da: </span>{{ messageToView.fullname }}</h6>
            <h6><span class="fw-semibold text-doc-primary">Email: </span>{{ messageToView.email }}</h6>
            <h6><span class="fw-semibold text-doc-primary">Messaggio: </span>{{ messageToView.text }}</h6>
        </div>
        <!-- <div v-for="(message, index) in store.userDoctor.messages" class="message-details d-flex flex-column gap-2">
            <h6><span class="fw-semibold">Ricevuto da: </span>{{ message.fullname }}</h6>
            <h6><span class="fw-semibold">Email: </span>{{ message.email }}</h6>
            <h6><span class="fw-semibold">Messaggio: </span>{{ message.text }}</h6>
        </div> -->
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
import { IconTrash } from '@tabler/icons-vue';
import { store } from '../../store/store';
import ButtonComponent from '../ButtonComponent.vue';
export default {
    name: 'MessageUserComponent',
    components: {
        ButtonComponent,
        IconTrash
    },
    data() {
        return {
            store,
            isOpenMessage: false
        }
    },
    methods: {
        openMessage(index) {
            this.isOpenMessage = !this.isOpenMessage;
            this.messageToView = store.userDoctor.messages[index];
        },
        toggledashboardActive() {
            store.dashboard.heroOpen = !store.dashboard.heroOpen;
            store.dashboard.messaggesOpen = !store.dashboard.messaggesOpen;
            this.isOpen = !this.isOpen
        },
        formatDate(dateString) {
            const date = new Date(dateString);

            const day = date.getDate();
            const month = new Intl.DateTimeFormat('it-IT', { month: 'short' }).format(date);
            const year = date.getFullYear();

            const currentYear = new Date().getFullYear();

            if (year === currentYear) {
                return `${this.addZero(day)} ${month}`;
            } else {
                return `${this.addZero(day)} ${month} ${year}`;
            }
        },
        addZero(number) {
            return number < 10 ? `0${number}` : number;
        },
    },
    mounted() {
        console.log(this.formatDate(store.userDoctor.messages[0].created_at));
    },
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
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
    transition: all .5s;
    .date {
        position: absolute;
        top: .5rem;
        right: .5rem;
    }

    .small {
        opacity: .7;
    }

    &:hover {
        background-color: #F38F2320;
        .delete{
            animation: fadeIn .3s forwards;
            
        }
    }
    .actions{
        bottom: .5rem;
        right: .5rem;
        .delete{
            opacity: 0;
            color: $doc-accent;
            &:hover{
                color: $doc-red;
            }
        }
    }
}

.message {
    max-width: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.prevMessage {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80vw;
}

.medikit {
    max-width: 350px;
    min-width: 200px;
}

td {
    /* white-space: nowrap; */
}
@keyframes fadeIn {
    from{
        opacity: 0;
        scale: 0;
    }
    80%{
        scale: 1.1;
    }
    95%{
        scale: .9;
    }
    to{
        opacity: 1;
        scale: 1;
    }
}

</style>