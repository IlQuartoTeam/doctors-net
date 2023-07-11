<template>
    <div v-if="store.personalMessages.length > 0 && !isOpenMessage" class="w-100 px-lg-2 pb-5 py-2" id="index">
        <h1 class="text-h2 p-3 text-doc-blue fw-semibold">I tuoi messaggi</h1>
        <table class="table">
            <thead>
                <tr class="d-none d-lg-table-row">
                    <th scope="col" class=" text-doc-blue"></th>
                    <th scope="col" class=" w-100 text-doc-blue"></th>
                    <th scope="col" class=" text-doc-blue"></th>
                    <!-- <th scope="col" class="text-doc-blue"></th> -->
                </tr>
            </thead>
            <tbody>
                <!-- MOBILE & TABLET -->
                <tr v-for="(message, index) in store.personalMessages" @click="openMessage(message)"
                    :class="{ 'beenRead': message.been_read, 'unread': !message.been_read }" class="prev-message d-lg-none">
                    <td class="position-relative text-doc-blue" @click="readMessage(message, true)">
                        <div class="d-flex flex-column pt-2">
                            <div class="">
                                <h6 class="mb-0 smName">{{ message.fullname }}</h6>
                            </div>
                            <h6 class="small smMail mb-0">{{ message.email }}</h6>
                            <div class="smMessageWrap">
                                <p class="smMessage mb-0"
                                    :style="{ 'max-width': screenSize < 576 ? '80vw' : (store.dashboard.sidebarOpen ? '40vw' : '80vw') }">
                                    {{ message.text }}
                                </p>
                            </div>
                        </div>
                        <div class="date">
                            <p>{{ formatDate(message.created_at) }}</p>
                        </div>
                        <div class="actions position-absolute d-flex align-items-center gap-1 p-2">
                            <div class="delete" @click.stop.once="deleteMessage(message, index)">
                                <IconTrash />
                            </div>
                            <div @click.stop.once="readMessage(message, true)" v-if="!message.been_read"
                                class="readMail mailIcons d-none d-sm-block">
                                <IconMailOpened />
                            </div>
                            <div @click.stop.once="readMessage(message, false)" v-if="message.been_read"
                                class="unreadMail mailIcons d-none d-sm-block">
                                <IconMail />
                            </div>
                            <a @click.stop="" :href="'mailto:' + message.email" class="sendMail d-none d-md-block">
                                <IconAt />
                            </a>

                        </div>
                    </td>
                </tr>
                <!-- PC -->
                <tr v-for="(message, index) in store.personalMessages" @click="openMessage(message, true)"
                    class="prev-message pcTable d-none d-lg-table-row text-doc-blue position-relative"
                    :class="{ 'beenRead': message.been_read, 'unread': !message.been_read }">
                    <td class="lgName">{{ message.fullname }}</td>

                    <td class="message">
                        {{ message.text }}
                    </td>
                    <!-- <td class="d-none">{{ truncateMessage(message.text, 30) }}</td> -->
                    <td class="lgDate text-end">
                        <p class="mb-0">{{ formatDate(message.created_at) }}</p>
                    </td>
                    <td class="large actions">
                        <div class="actionsContainer d-flex justify-content-end align-items-center gap-1">
                            <div class="delete" @click.stop.once="deleteMessage(message, index)">
                                <IconTrash />
                            </div>
                            <div @click.stop.once="readMessage(message, true)" v-if="!message.been_read"
                                class="readMail mailIcons d-none d-sm-block">
                                <IconMailOpened />
                            </div>
                            <div @click.stop.once="readMessage(message, false)" v-if="message.been_read"
                                class="unreadMail mailIcons d-none d-sm-block">
                                <IconMail />
                            </div>
                            <a @click.stop="" :href="'mailto:' + message.email" class="sendMail d-none d-md-block">
                                <IconAt />
                            </a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-end">
            <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li v-for="page in store.messagesPagination.links" :class="{active: page.active, disabled: page.url === null}" class="page-item"><a v-html="page.label" class="page-link" href="#"></a></li>
  </ul>
</nav>
        </div>
    </div>

    <!-- THE SHOW -->


    <div v-if="isOpenMessage" class="container-fluid pb-5 messageShow" id="show">
        <div class="miniNav d-flex justify-content-between align-items-center py-3">
            <div class="return text-doc-blue" @click="openMessage">
                <IconArrowLeft />
            </div>
            <div class="buttons d-flex align-items-center gap-1 p-2">
                <div class="destroy" @click.stop.once="deleteMessage(messageToView, index, true)">
                    <IconTrash />
                </div>
                <a @click.stop="" :href="'mailto:' + messageToView.email" class="sendMail">
                    <IconAt />
                </a>

            </div>

        </div>
        <div class="message-details d-flex p-2 justify-content-between">
            <div>
                <h6 class="mb-0 text-doc-blue senderName">{{ messageToView.fullname }}</h6>
                <h6 class="mb-0 text-doc-blue senderMail">({{ messageToView.email }})</h6>
                <p class="text-doc-blue small mt-2">{{ messageToView.prefered_date  ? `Gradirei la visita il ${formatDate(messageToView.prefered_date)}` : 'Non specificata' }}</p>
            </div>
            <div class="showDate">
                <p class="mb-0 text-doc-blue">{{ formatDate(messageToView.created_at) }}</p>
            </div>
        </div>
        <div class="messageContent mt-1 p-2">
            <p class="senderText">{{ messageToView.text }}</p>

        </div>
        <!-- <div v-for="(message, index) in store.userDoctor.messages" class="message-details d-flex flex-column gap-2">
            <h6><span class="fw-semibold">Ricevuto da: </span>{{ message.fullname }}</h6>
            <h6><span class="fw-semibold">Email: </span>{{ message.email }}</h6>
            <h6><span class="fw-semibold">Messaggio: </span>{{ message.text }}</h6>
        </div> -->
    </div>




    <!-- NO MESSAGES SECTION -->
    <div v-if="store.personalMessages.length < 1"
        class="noMessage text-center d-flex h-100 align-items-center justify-content-center">
        <div class="row justify-content-center align-items-center pb-5">
            <div class="medikit col-6">
                <img class="img-fluid" src="/img/other/medikit.png" alt="">
            </div>
            <h2 class="col-10 pb-4">Non hai ancora ricevuto nessun messaggio</h2>
        </div>
        <!-- <h2>Non hai ancora nessun messaggio</h2> -->
    </div>
</template>

<script>
import { IconArrowLeft } from '@tabler/icons-vue';
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
        IconAt,
        IconArrowLeft

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
        openMessage(message, setRead = false) {
            this.isOpenMessage = !this.isOpenMessage;
            this.messageToView = message;
            console.log(this.messageToView);

            if (setRead) {
                this.readMessage(message, true)
            }
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
                return
            }
            const params = {
                readAction: action,
                messageId: message.id
            }
            axios.post(store.API_URL + 'doctors/messages/read', params, this.config).then(res => {
                message.been_read = action ? 1 : 0;
                action ? store.dashboard.unreadMessages-- : store.dashboard.unreadMessages++
            }).catch(error => {

            })
        },
        deleteMessage(message, index, goBack = false) {
            if (!message) {
                return
            }
            axios.post(`${store.API_URL}messages/${message.id}/delete`, { message }, this.config).then(res => {

                store.personalMessages.splice(index, 1)
                1 ?  store.dashboard.unreadMessages-- : store.dashboard.unreadMessages++
                store.toast.success('Messaggio cancellato', {timeout: 1500})
                               
            }).catch(err => {

            })
            if (goBack) {
                this.openMessage(message)
            }
            
        },
        getResize() {
            this.screenSize = window.innerWidth
        }
    },
    mounted() {
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

.messageShow {
    .miniNav {}

    .senderName {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .senderMail {
        font-size: .8rem;
    }

    .senderText {
        color: #0D0D0D99;
    }

    .messageContent {
        background-color: #e6e6e660;
        border-radius: 5px;
        min-height: 300px;
    }

    .destroy {
        transition: all .3s;
        color: $doc-accent;
        cursor: pointer;

        &:hover {
            color: $doc-red;
        }
    }

    .return {
        cursor: pointer;
    }
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
        background-color: #aeaeae40;

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


    .lgDate {
        white-space: nowrap;
        color: $doc-primary;
    }

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

.pcTable {
    &:hover {
        .lgDate {
            display: none;
        }

        .actions {
            display: table-cell;
        }

    }

    .actions {
        display: none;
    }
}

/* .pcTable {
    .actions {
        top: 1px;
        bottom: 1px;
        right: 0px;
        padding: .5rem .5rem .5rem 1rem;
        opacity: 0;
        transition: all .3;
    }
}

.beenRead {
    &:hover {
        .actions {
            background-color: #D8D8D8;
            opacity: 1;
        }
    }
}
.unread {
    &:hover {
        .actions {
            opacity: 1;
            background-color: #DBE9EF;
        }
    }
}
 */
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

.beenRead {

    .smName,
    .lgName {
        color: $doc-dark;
        font-weight: 400;
        opacity: .8;
    }

    .smMail {
        color: $doc-dark;
        opacity: .8;
    }
    .smMessage , .message{
        color: $doc-dark;
        opacity: .8;
    }

    .date , .lgDate {
        color: $doc-dark;
        opacity: .8;
    }
}

.unread {

    .smName,
    .lgName {
        color: $doc-blue;
        font-weight: 600;
    }
    .smMessage , .message{
        color: $doc-blue;
    }
    .date , .lgDate {
        font-weight: 500;
    }
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