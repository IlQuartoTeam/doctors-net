<template>
    <div class="open-side d-flex align-items-center">
        <IconChevronRight v-if="!this.isOpen" @click="OpenSidebar" class="ms-3 ps-1" />
    </div>
    <div class="sidebar d-flex flex-column" :class="{'d-inline-block': this.isOpen, 'side-visible': !this.isOpen}">
        <div class="user-details d-flex flex-column align-items-center mt-4">
            <div class="box-image mb-3">
                <img v-if="store.userDoctor" :src="store.userDoctor.profile_image_url" alt="profile-image">
            </div>
            <h6 v-if="store.userDoctor" class="fw-semibold">{{ store.userDoctor.name }} {{ store.userDoctor.surname }}</h6>
            <span v-if="store.userDoctor" class="text-light fw-semibold">{{ store.userDoctor.specialization }}</span>
        </div>
        <div class="management d-flex flex-column mt-5 px-4 py-2 gap-3">
            <h6 class="fw-semibold">Gestione</h6>
            <!-- FUNZIONE togglemessageActive PROVVISORIA AL CLICK SU DASHBOARD -->
            <span @click="toggledashboardActive"><IconHome /> <span class="text-light">Dashboard</span></span>
            <span @click="togglemessageActive"><IconMessageCircle2 /> <span class="text-light">Messaggi</span></span>
            <span><IconUserStar /> <span class="text-light">Recensioni</span></span>
        </div>
        <div class="settings d-flex flex-column mt-3 px-4 py-2 gap-3">
            <h6 class="fw-semibold">Impostazioni</h6>
            <span @click="togglesettingActive"><IconSettings /> <span class="text-light">Account</span></span>
        </div>
        <div class="short-link p-4 mt-5 d-flex flex-column align-items-center justify-content-center gap-3">
            <router-link to="/"><ButtonComponent className="primary d-flex align-items-center justify-content-center" id="btn-logged"><span>Torna alla Homepage</span></ButtonComponent></router-link>
            <router-link to="/logout"><ButtonComponent className="accent d-flex align-items-center justify-content-center" id="btn-logged"><span>Logout</span></ButtonComponent></router-link>
        </div>
    </div>
    <div class="close-side d-flex align-items-center">
        <IconChevronLeft v-if="this.isOpen" @click="OpenSidebar" class="me-3 ps-2" />
    </div>
</template>

<script>
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
            ButtonComponent
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
                if(this.isOpen === false){
                    this.isOpen = true;
                    this.scrollToTop();
                }
                else{
                    this.isOpen = false;
                }
            },
            togglemessageActive() {
                if(store.dashboard.messaggesOpen === false) {
                    store.dashboard.heroOpen = false;
                    store.dashboard.messaggesOpen = true;
                    store.dashboard.settingsOpen = false;
                    store.dashboard.chartsOpen = false;
                    this.isOpen = !this.isOpen;
                }
                else if(store.dashboard.messaggesOpen === true){
                    store.dashboard.messaggesOpen = true;
                    this.isOpen = !this.isOpen;
                }
                console.log(store.dashboard.messaggesOpen)
            },
            toggledashboardActive() {
                if(store.dashboard.heroOpen === false) {
                    store.dashboard.heroOpen = true;
                    store.dashboard.chartsOpen = true;
                    store.dashboard.messaggesOpen = false;
                    store.dashboard.settingsOpen = false;
                    this.isOpen = !this.isOpen;
                }
                else if(store.dashboard.heroOpen === true){
                    store.dashboard.heroOpen = true;
                    this.isOpen = !this.isOpen;
                }
            },
            togglesettingActive(){
                if(store.dashboard.settingsOpen === false) {
                    store.dashboard.settingsOpen = true;
                    store.dashboard.heroOpen = false;
                    store.dashboard.messaggesOpen = false;
                    store.dashboard.chartsOpen = false;
                    this.isOpen = !this.isOpen;
                }
                else if(store.dashboard.messaggesOpen === true){
                    store.dashboard.settingsOpen = true;
                    this.isOpen = !this.isOpen;
                }
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
    .text-light{
        color: #979797;
    }
    .sidebar{
        width: calc(100vw - 17px);
        padding-bottom: 200px;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        overflow: hidden;
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
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(-50%);
        background-color: rgba(255, 255, 255, 0.349);
        height: 50px;
        border-radius: 5px;
        transition: padding-left 0.3s;
        &:hover{
            cursor: pointer;
            padding-left: 10px;
            background-color: rgba(255, 255, 255, 0.548);
        }
    }
    .close-side{
        position: absolute;
        top: 50%;
        right: -20px;
        transform: translate(-50%);
        background-color: rgba(0, 0, 0, 0.158);
        height: 52px;
        border-radius: 5px;
        transition: padding-right 0.3s;
        &:hover{
            cursor: pointer;
            padding-right: 5px;
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
    @media screen and (min-width:1200px){
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