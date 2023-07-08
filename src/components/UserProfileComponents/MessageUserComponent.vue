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
            <tbody>
                <tr v-for="(message, index) in store.userDoctor.messages" @click="openMessage(message)"
                    :class="{ 'beenRead': message.been_read, 'unread': !message.been_read }" class="prev-message d-lg-none">
                    <td class="position-relative text-doc-blue" @click="readMessage(message, true)">
                        <div class="d-flex flex-column pt-2">
                            <div class="smName">
                                <h6 class="mb-0 fw-bold">{{ message.fullname }}</h6>
                            </div>
                            <h6 class="small text-doc-blue mb-0">{{ message.email }}</h6>
                            <div class="smMessageWrap">
                                <p class="smMessage text-doc-blue mb-0"
                                    :style="{ 'max-width': screenSize < 576 ? '80vw' : (store.dashboard.sidebarOpen ? '40vw' : '80vw') }">
                                    {{ message.text }}
                                </p>
                            </div>
                        </div>
                        <div class="date">
                            <p>{{ formatDate(message.created_at) }}</p>
                        </div>
                        <div class="actions position-absolute d-flex align-items-center gap-1 p-2">
                            <div class="delete">
                                <IconTrash />
                            </div>
                            <div @click.stop.once="readMessage(message, true)" v-if="!message.been_read" class="readMail mailIcons d-none d-md-block">
                                <IconMailOpened />
                            </div>
                            <div @click.stop.once="readMessage(message, false)" v-if="message.been_read" class="unreadMail mailIcons d-none d-md-block">
                                <IconMail />
                            </div>
                            <a @click.stop="" :href="'mailto:' + message.email" class="sendMail d-none d-sm-block">
                                <IconAt />
                            </a>

                        </div>
                    </td>
                </tr>
                <tr v-for="(message, index) in store.userDoctor.messages" @click="openMessage(index)"
                    class="prev-message d-none d-lg-table-row"
                    :class="{ 'beenRead': message.been_read, 'unread': !message.been_read }">
                    <td class="lgName">{{ message.fullname }}</td>
                    <td class="lgMail">{{ message.email }}</td>
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
import { IconAt } from '@tabler/icons-vue';
import { IconMail } from '@tabler/icons-vue';
import { IconMailOpened } from '@tabler/icons-vue';
import { IconTrash } from '@tabler/icons-vue';
import { store } from '../../store/store';
import ButtonComponent from '../ButtonComponent.vue';
import axios from 'axios';
export default {
    name: 'MessageUserComponent',
    components: {
        ButtonComponent,
        IconTrash,
        IconMailOpened,
        IconMail,
        IconAt
    },
    data() {
        return {
            store,
            isOpenMessage: false,
            config: { headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` } },
            screenSize: window.innerWidth,
        }
    },
    methods: {
        openMessage(message) {
            this.isOpenMessage = !this.isOpenMessage;
            this.messageToView = message;
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
        readMessage(message, action) {
            if ((message.been_read && action) || (!message.been_read && !action)) {
                return console.log('nope');
            }
            console.log('params: ', message, action);
            const params = {
                readAction: action,
                messageId: message.id
            }
            axios.post(store.API_URL + 'doctors/messages/read', params, this.config).then(res => {
                message.been_read = action ? 1 : 0;
                console.log(res);
                console.log(message);
            }).catch(error => {
                console.log('errore: ', error);
            })
        },
        getResize() {
            this.screenSize = window.innerWidth
        }
    },
    mounted() {
        console.log(this.formatDate(store.userDoctor.messages[0].created_at));
        window.addEventListener('resize', this.getResize);
    },
    beforeUnmount() {

    }
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

.beenRead {
    background-color: #e0e0e070;

    &:hover {
        background-color: #e0e0e070;

        .delete {
            animation: fadeIn .3s forwards;

        }

        .mailIcons {
            animation: fadeIn .3s .1s forwards;

        }

        .sendMail {
            animation: fadeIn .3s .2s forwards;

        }
    }

}

.unread:hover {
    background-color: #0071A220;

    .delete {
        animation: fadeIn .3s forwards;

    }

    .mailIcons {
        animation: fadeIn .3s .1s forwards;

    }

    .sendMail {
        animation: fadeIn .3s .2s forwards;

    }

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

    .lgName {
        white-space: nowrap;
    }

    .actions {
        bottom: .5rem;
        right: .5rem;
        
        .delete {
            transition: all .3s;
            opacity: 0;
            color: $doc-accent;

            &:hover {
                color: $doc-red;
            }
        }

        .mailIcons {
            transition: all .3s;
            opacity: 0;
            color: $doc-primary;

            &:hover {
                color: #0071A250;
            }
        }
        .sendMail {
            transition: all .3s;
            opacity: 0;
            color: #0071A290;

            &:hover {
                color: #01567b;
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

.smMessage {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80vw;
}

.smMessageWrap {}

.medikit {
    max-width: 350px;
    min-width: 200px;
}

td {
    /* white-space: nowrap; */
}

@keyframes fadeIn {
    from {
        opacity: 0;
        scale: 0;
    }

    80% {
        scale: 1.1;
    }

    95% {
        scale: .9;
    }

    to {
        opacity: 1;
        scale: 1;
    }
}</style>