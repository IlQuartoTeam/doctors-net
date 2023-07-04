<template>
    <div class="button-toggle overflow-hidden d-flex" :class="[store.dashboard.sidebarOpen === false ? 'justify-content-start' : 'justify-content-end']">
        <div v-if="!store.dashboard.sidebarOpen" @click="OpenSidebar" class="open-side d-flex align-items-center" :class="[store.dashboard.messaggesOpen === true ? 'bg-variable' : '']">
            <IconChevronRight class="ms-3" />
        </div>
        <div v-if="store.dashboard.sidebarOpen" @click="OpenSidebar" class="close-side d-flex align-items-center">
            <IconChevronLeft class="ms-2" />
        </div>
    </div>
    
    <div class="sidebar d-flex flex-column" :class="{'d-inline-block': store.dashboard.sidebarOpen, 'side-visible': !store.dashboard.sidebarOpen}">
        <div class="user-details d-flex flex-column align-items-center mt-4">
            <div class="box-image mb-3">
                <img v-if="store.userDoctor" :src="store.userDoctor.profile_image_url" alt="profile-image">
            </div>
            <h6 v-if="store.userDoctor" class="fw-semibold fs-5 text-doc-blue">{{ store.userDoctor.name }} {{ store.userDoctor.surname }}</h6>
            <span v-if="store.userDoctor" class="text-doc-primary fw-semibold">{{ store.userDoctor.specialization }}</span>
        </div>
        <div class="management d-flex flex-column mt-5 px-4 py-2 gap-3 align-items-center align-items-md-start">
            <h6 class="fw-semibold text-doc-blue fs-5">Gestione</h6>
            <!-- FUNZIONE togglemessageActive PROVVISORIA AL CLICK SU DASHBOARD -->
            <span class="text-doc-primary d-flex align-items-center gap-1" :class="{'text-doc-accent' : store.dashboard.heroOpen}" @click="toggleSectionActive('dashboard')"><IconHome /> <span>Dashboard</span></span>
            <span class="text-doc-primary d-flex align-items-center gap-1" :class="{'text-doc-accent' : store.dashboard.messaggesOpen}" @click="toggleSectionActive('messages')"><IconMessageCircle2 /> <span>Messaggi</span></span>
            <span class="text-doc-primary d-flex align-items-center gap-1" :class="{'text-doc-accent' : store.dashboard.reviewsOpen}" @click="toggleSectionActive('reviewsOpen')"><IconUserStar /> <span>Recensioni</span></span>
        </div>
        <div class="settings d-flex flex-column mt-3 px-4 py-2 gap-3 align-items-center align-items-md-start">
            <h6 class="fw-semibold text-doc-blue fs-5">Impostazioni</h6>
            <span class="text-doc-primary d-flex align-items-center gap-1" :class="{'text-doc-accent' : store.dashboard.generalInfo}" @click="toggleSectionActive('generalInfo')"><IconInfoCircle /> <span>Informazioni principali</span></span>
            <span class="text-doc-primary d-flex align-items-center gap-1" :class="{'text-doc-accent' : store.dashboard.experiences}" @click="toggleSectionActive('experiences')"><IconBriefcase /> <span>Le tue esperienze</span></span>
            <span class="text-doc-primary d-flex align-items-center gap-1" :class="{'text-doc-accent' : store.dashboard.performances}" @click="toggleSectionActive('performances')"><IconReceipt2 /> <span>Le tue prestazioni</span></span>
            <span class="text-doc-primary d-flex align-items-center gap-1" :class="{'text-doc-accent' : store.dashboard.changePassword}" @click="toggleSectionActive('changePassword')"><IconShieldLock /> <span>Cambia password</span></span>
        </div>
        <div class="short-link p-4 my-5 d-flex flex-column align-items-center justify-content-center gap-3">
            <router-link to="/"><ButtonComponent className="primary d-flex align-items-center justify-content-center" id="btn-logged"><span>Torna alla Homepage</span></ButtonComponent></router-link>
            <router-link to="/logout"><ButtonComponent className="accent d-flex align-items-center justify-content-center" id="btn-logged"><span>Logout</span></ButtonComponent></router-link>
        </div>
    </div>
</template>

<script>
import { IconShieldLock } from '@tabler/icons-vue';
import { IconReceipt2 } from '@tabler/icons-vue';
import { IconBriefcase } from '@tabler/icons-vue';
import { IconInfoCircle } from '@tabler/icons-vue';
import { store } from '../store/store';
import { IconHome } from '@tabler/icons-vue';
import { IconMessageCircle2 } from '@tabler/icons-vue';
import { IconUserStar } from '@tabler/icons-vue';
import { IconSettings } from '@tabler/icons-vue';
import { IconChevronRight } from '@tabler/icons-vue';
import { IconChevronLeft } from '@tabler/icons-vue';
import ButtonComponent from './ButtonComponent.vue';
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
    IconShieldLock
},
        props: ['doctor'],
        data(){
            return{
                store,
                isOpen: false,
            }
        },
        methods: {
            OpenSidebar(){
                if(store.dashboard.sidebarOpen === false){
                    store.dashboard.sidebarOpen = true;
                    this.scrollToTop();
                }
                else{
                    store.dashboard.sidebarOpen = false;
                }
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
                store.dashboard.sidebarOpen = !store.dashboard.sidebarOpen;
            },
            scrollToTop() {
            window.scrollTo(0, 0);
            },
        },
        mounted() {
           
        }
    }
</script>

<style lang="scss" scoped>
    .button-toggle{
        position: absolute;
        width: 100%;
        top: 25vh;
    }
    .text-light{
        color: #979797;
    }
    .sidebar{
        width: calc(100vw - 12px) ;
        min-height: 100vh;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        overflow: hidden;
        position: relative;
    }
    .box-image{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    .open-side{
        background-color: rgba(255, 255, 255, 0.349);
        width: 50px;
        height: 50px;
        margin-left: -10px;
        border-radius: 5px;
        transition: margin-left 0.3s;
        &:hover{
            cursor: pointer;
            margin-left: -5px;
            background-color: rgba(255, 255, 255, 0.548);
        }
    }
    .bg-variable{
        background-color: rgba(0, 0, 0, 0.158) !important;
    }
    .close-side{
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.158);
        width: 50px;
        height: 50px;
        margin-right: -10px;
        border-radius: 5px;
        transition: margin-right 0.3s;
        &:hover{
            cursor: pointer;
            margin-right: -5px;
            background-color: rgba(0, 0, 0, 0.281);
        }
    }
    .side-visible{
        display: none !important;
    }
    .management, .settings{
        span{
            cursor: pointer;
        }
    }
    #btn-logged{
        min-width: 250px;
    }
    @media screen and (min-width:768px){
        .sidebar{
            max-width: 350px !important;
            overflow: hidden;
        }
        .side-visible{
            display: inline-block !important;
        }
        .open-side, .close-side{
            display: none !important;
        }
        .management, .settings{
            padding-left: 50px !important;
        }

    }
</style>