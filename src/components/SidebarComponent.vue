<template>
    <div class="open-side d-flex align-items-center">
        <IconChevronRight v-if="!this.isOpen" @click="OpenSidebar" class="ms-3 ps-1" />
    </div>
    <div class="sidebar d-flex flex-column" :class="{'d-inline-block': this.isOpen, 'side-visible': !this.isOpen}">
        <div class="user-details d-flex flex-column align-items-center">
            <div class="box-image mb-3">
                <img v-if="store.userDoctor" :src="store.userDoctor.profile_image_url" alt="profile-image">
            </div>
            <h6 v-if="store.userDoctor" class="fw-semibold">{{ store.userDoctor.name }} {{ store.userDoctor.surname }}</h6>
            <span class="text-light fw-semibold">Qui la specializzazione</span>
        </div>
        <div class="management d-flex flex-column mt-5 px-4 py-2 gap-3">
            <h6 class="fw-semibold">Gestione</h6>
            <span><IconHome /> <span class="text-light">Dashboard</span></span>
            <span><IconMessageCircle2 /> <span class="text-light">Messaggi</span></span>
            <span><IconUserStar /> <span class="text-light">Recensioni</span></span>
        </div>
        <div class="settings d-flex flex-column mt-3 px-4 py-2 gap-3">
            <h6 class="fw-semibold">Impostazioni</h6>
            <span><IconSettings /> <span class="text-light">Account</span></span>
        </div>
    </div>
    <div class="close-side d-flex align-items-center">
        <IconChevronLeft v-if="this.isOpen" @click="OpenSidebar" class="me-3 pe-1" />
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
    export default {
        name: 'SidebarComponent',
        components: {
            IconHome,
            IconMessageCircle2,
            IconUserStar,
            IconSettings,
            IconChevronRight,
            IconChevronLeft
        },
        props: ['doctor'],
        data(){
            return{
                store,
                isOpen: false
            }
        },
        methods: {
            OpenSidebar(){
                if(this.isOpen === false){
                    this.isOpen = true;
                   
                }
                else{
                    this.isOpen = false;
                }
            }
        },
        mounted() {
            console.log(store.doctor)
        }
    }
</script>

<style lang="scss" scoped>
    .text-light{
        color: #979797;
    }
    .sidebar{
        width: calc(100vw - 20px);
        height: 100vh;
        background-color: white;
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
        background-color: rgba(0, 0, 0, 0.158);
        height: 50px;
        border-radius: 5px;
        transition: padding-left 0.3s;
        &:hover{
            cursor: pointer;
            padding-left: 10px;
            background-color: rgba(66, 66, 66, 0.158);;
        }
    }
    .close-side{
        position: absolute;
        top: 50%;
        right: -40px;
        transform: translate(-50%);
        background-color: rgba(0, 0, 0, 0.158);
        height: 52px;
        border-radius: 5px;
        transition: padding-right 0.3s;
        &:hover{
            cursor: pointer;
            padding-right: 5px;
        }
    }
    .side-visible{
        display: none !important;
    }
    @media screen and (min-width:1200px){
        .sidebar{
            max-width: 400px !important;
            border: 1px solid red;
            overflow: hidden;
        }
        .side-visible{
            display: inline-block !important;
        }
        .open-side, .close-side{
            display: none !important;
        }

    }
</style>