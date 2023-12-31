<template>
    <div class="sidebar d-flex flex-column" v-if="store.dashboard.sidebarOpen || windowWidth > 992">
        <div class="button-toggle toggle-tablet overflow-hidden d-flex"
            :class="[store.dashboard.sidebarOpen === false ? 'justify-content-start' : 'justify-content-end']">

            <div v-if="store.dashboard.sidebarOpen" @click="ToggleSidebar"
                class="close-side d-flex d-lg-none align-items-center">
                <IconChevronLeft class="ms-2" />
            </div>
        </div>
        <div class="user-details d-flex flex-column align-items-center mt-4">
            <div class="box-image mb-3 position-relative">
                <img v-if="store.userDoctor" :src="store.userDoctor.profile_image_url" alt="profile-image">
                <div class="changePhotoIcon position-absolute d-flex justify-content-center align-items-center">
                    <IconEdit :size="50" color="#fafafa" />
                </div>
                <div class="uploadImage position-absolute">
                    <input name="image" id="profile-image-upload" type="file" @change="handleFileUpload" />
                </div>
            </div>
            <div v-if="store.userDoctor" class="userMainInfo">
                <h6 class="fw-semibold fs-5 text-doc-blue text-center"><a class="text-doc-blue"
                        :href="'/doctors/' + store.userDoctor.slug">{{ store.userDoctor.name }} {{
                            store.userDoctor.surname }}</a> </h6>
                <div v-if="store.userDoctor.specializations[0] != ''"
                    class="text-doc-primary fw-semibold d-flex flex-column align-items-center">
                    <span class="d-block" v-for="spec in store.userDoctor.specializations">{{ spec.name }}</span>
                </div>
            </div>
        </div>
        <div class="management d-flex flex-column mt-5 px-4 py-2 gap-3 align-items-center align-items-sm-start">
            <h6 class="fw-semibold text-doc-blue fs-5">Gestione</h6>
            <span class="text-doc-primary d-flex align-items-center gap-1"
                :class="{ 'text-doc-accent': store.dashboard.heroOpen }" @click="toggleSectionActive('dashboard')">
                <IconHome /> <span>Dashboard</span>
            </span>
            <span class="text-doc-primary d-flex align-items-center gap-1"
                :class="{ 'text-doc-accent': store.dashboard.messaggesOpen }" @click="toggleSectionActive('messages')">
                <IconMessageCircle2 /> <span class="d-flex justify-content-center align-items-center gap-2">Messaggi <span
                         class="badge rounded-pill text-bg-doc-accent text-white">{{
                            store.dashboard.unreadMessages }}</span></span>
            </span>
            <span class="text-doc-primary d-flex align-items-center gap-1"
                :class="{ 'text-doc-accent': store.dashboard.reviewsOpen }" @click="toggleSectionActive('reviewsOpen')">
                <IconUserStar /> <span>Recensioni</span>
            </span>
            <span class="text-doc-primary d-flex align-items-center gap-1"
                :class="{ 'text-doc-accent': store.dashboard.sponsor }" @click="toggleSectionActive('sponsor')">
                <IconCreditCard /> <span>Sponsorizzazione</span>
            </span>
        </div>
        <div class="settings d-flex flex-column mt-3 px-4 py-2 gap-3 align-items-center align-items-sm-start">
            <h6 class="fw-semibold text-doc-blue fs-5">Impostazioni</h6>
            <span class="text-doc-primary d-flex align-items-center gap-1"
                :class="{ 'text-doc-accent': store.dashboard.generalInfo }" @click="toggleSectionActive('generalInfo')">
                <IconInfoCircle /> <span>Informazioni principali</span>
            </span>
            <span class="text-doc-primary d-flex align-items-center gap-1"
                :class="{ 'text-doc-accent': store.dashboard.experiences }" @click="toggleSectionActive('experiences')">
                <IconBriefcase /> <span>Le tue esperienze</span>
            </span>
            <span class="text-doc-primary d-flex align-items-center gap-1"
                :class="{ 'text-doc-accent': store.dashboard.performances }" @click="toggleSectionActive('performances')">
                <IconReceipt2 /> <span>Le tue prestazioni</span>
            </span>
            <span class="text-doc-primary d-flex align-items-center gap-1"
                :class="{ 'text-doc-accent': store.dashboard.changePassword }"
                @click="toggleSectionActive('changePassword')">
                <IconShieldLock /> <span>Cambia password</span>
            </span>
        </div>
        <div class="short-link p-4 my-5 d-flex flex-column align-items-center justify-content-center gap-3">
            <div @click="scrollToTop">
                <router-link to="/">
                    <ButtonComponent className="primary d-flex align-items-center justify-content-center" id="btn-logged">
                        <span>Torna alla Homepage</span>
                    </ButtonComponent>
                </router-link>
            </div>
            <router-link to="/logout">
                <ButtonComponent className="accent d-flex align-items-center justify-content-center" id="btn-logged">
                    <span>Logout</span>
                </ButtonComponent>
            </router-link>
        </div>
    </div>
</template>

<script>
import { IconCreditCard } from '@tabler/icons-vue';
import { IconEdit } from '@tabler/icons-vue';
import { IconShieldLock } from '@tabler/icons-vue';
import { IconReceipt2 } from '@tabler/icons-vue';
import { IconBriefcase } from '@tabler/icons-vue';
import { IconInfoCircle } from '@tabler/icons-vue';
import { store } from '../../store/store';
import { IconHome } from '@tabler/icons-vue';
import { IconMessageCircle2 } from '@tabler/icons-vue';
import { IconUserStar } from '@tabler/icons-vue';
import { IconSettings } from '@tabler/icons-vue';
import { IconChevronRight } from '@tabler/icons-vue';
import { IconChevronLeft } from '@tabler/icons-vue';
import ButtonComponent from '../ButtonComponent.vue';
import axios from 'axios';

export default {
    name: 'SidebarComponent',
    components: {
        IconHome,
        IconMessageCircle2,
        IconUserStar,
        IconSettings,
        IconChevronRight,
        IconChevronLeft,
        ButtonComponent,
        IconInfoCircle,
        IconBriefcase,
        IconReceipt2,
        IconShieldLock,
        IconEdit,
        IconCreditCard
    },
    props: ['doctor'],
    data() {
        return {
            store,
            isOpen: false,
            windowWidth: innerWidth,
        }
    },
    methods: {
        ToggleSidebar() {
            store.dashboard.sidebarOpen = !store.dashboard.sidebarOpen
        },
        toggleSectionActive(section) {
            store.dashboard.heroOpen = section === 'dashboard';
            store.dashboard.messaggesOpen = section === 'messages';
            store.dashboard.generalInfo = section === 'generalInfo';
            store.dashboard.experiences = section === 'experiences';
            store.dashboard.performances = section === 'performances';
            store.dashboard.changePassword = section === 'changePassword';
            store.dashboard.chartsOpen = section === 'dashboard';
            store.dashboard.reviewsOpen = section === 'reviewsOpen';
            store.dashboard.sponsor = section === 'sponsor';
            store.dashboard.sidebarOpen = !store.dashboard.sidebarOpen;
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        getSize() {
            this.windowWidth = innerWidth;
        },
        handleFileUpload(event) {
            axios.get('/sanctum/csrf-cookie').then(() => {
                const file = event.target.files[0];
                if (!file) return
                const formData = new FormData();
                formData.append('image', file);
                axios.post('/api/user/image', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${this.$cookies.get('session-token')}`
                    }
                })
                    .then(response => {
                        store.toast.success("Immagine modificata", { timeout: 1500 });
                        store.userDoctor.profile_image_url = response.data.imagelink;
                    })
                    .catch(error => {
                        console.error(error);
                        store.toast.error("Ooops! Si è verificato un errore. Riprova.", { timeout: 1500 });
                    });
            });
        },
        getMessagesStatus() {
            let unreads = 0
            store.userDoctor.messages.forEach(element => {
                if (element.been_read === 0) {
                    unreads++
                }
            });
            if (unreads === 0) {
                unreads = null
            }
            store.dashboard.unreadMessages = unreads

        },
        getUser()
        {
            if (this.$cookies.get("session-token")) {
                const token = this.$cookies.get("session-token")
                const config = { headers: { Authorization: `Bearer ${token}` } }
                axios.post(store.API_URL + 'user', { key: 'value' }, config).then(res => {
                    store.userDoctor = { ...res.data.doctor, ...res.data.user }
                    this.getMessagesStatus()
                }).catch(err => {})
            }
        }

    },
    watch: {
        'store.dashboard.unreadMessages'()
        {
            this.getMessagesStatus()
            this.getUser()
        },
        'store.personalMessages'()
        {
            this.getMessagesStatus()
            this.getUser()
        }
    },
    mounted() {
        window.addEventListener('resize', this.getSize)
        this.getUser()
            
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.getSize)
    }

}
</script>

<style lang="scss" scoped>
@use "../../assets/styles/_variables.scss" as *;

.button-toggle {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 999999;
}
.toggle-tablet{
    width: fit-content;
    height: fit-content;
}

.text-light {
    color: #979797;
}

.sidebar {
    width: 100vw;
    min-height: 100vh;
    background-color: white;
    box-shadow: rgb(255, 255, 255) 1.95px 1.95px 2.6px;
    position: relative;
}

.box-image {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;

    .uploadImage {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;


        input {
            cursor: pointer;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }

    &:hover .changePhotoIcon {
        opacity: 1;
        backdrop-filter: blur(2px);
        background-color: #00000020;
    }

    .changePhotoIcon {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        transition: all .3s;
        opacity: 0;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.bg-variable {
    background-color: rgba(0, 0, 0, 0.158) !important;
}

.close-side {
    z-index: 2;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0.24, 0.24, 0, 0.24) 0px 3px 6px;
    width: 50px;
    height: 50px;
    margin-right: -10px;
    border-radius: 5px;
    transition: margin-right 0.3s;

    &:hover {
        cursor: pointer;
        margin-right: -5px;
    }
}

.side-visible {
    display: none !important;
}

.management,
.settings {
    span {
        cursor: pointer;
    }
}

#btn-logged {
    min-width: 250px;
}

@media screen and (min-width:768px) {
    .sidebar {
        min-width: 350px !important;
    }

    .side-visible {
        display: inline-block !important;
    }

    .toggle-mobile {
        display: none !important;
    }

    .management,
    .settings {
        padding-left: 50px !important;
    }

}

@media screen and (min-width:576px) {
    .sidebar {
        width: 100%;
    }
}
</style>