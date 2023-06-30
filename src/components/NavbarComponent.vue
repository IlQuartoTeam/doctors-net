<template>
    <nav>
        <div class="menu d-flex justify-content-between align-items-center">
            <div class="box-logo">
                <img src="/img/logo/hearts-no-track.svg" class="logo" alt="logo">
            </div>
            <div class="box-voices d-flex align-items-center m-auto gap-3">
                <span class="py-3 px-3 paragraph-hero-p fw-bold">I nostri specialisti</span>
                <span class="py-3 px-3 paragraph-hero-p fw-bold">Chi siamo</span>
                <span class="py-3 px-3 paragraph-hero-p fw-bold">Assistenza</span>
            </div>
            <div class="box-button">
                <button class="button-doctor button-none">Sei un medico?<IconUser class="mb-1" :size="24" /></button>
               
                <IconMenu2 :size="60" v-if="!menuOpen" class="hamb-icon pe-3" alt="icon-menu" @click="openMenu" />
                <IconX :size="60" v-if="menuOpen" class="hamb-icon pe-3" alt="icon-menu" @click="openMenu" />
            </div>
        </div>
        <Transition name="fade-in">
            <div v-if="menuOpen" class="fade-in">
                <div class="menu-open d-flex flex-column">
                    <div class="menu-link d-flex flex-column">
                        <span class="py-3 px-3 paragraph-hero-p fw-bold">I nostri specialisti</span>
                        <span class="py-3 px-3 paragraph-hero-p fw-bold">Chi siamo</span>
                        <span class="py-3 px-3 paragraph-hero-p fw-bold">Assistenza</span>
                    </div>
                    <div class="menu-button p-3 m-auto">
                        <button class="button-doctor">Sei un medico?<IconUser class="mb-1" :size="24" /></button>
                    </div>
                </div>
            </div>   
        </Transition>
    </nav>
    
</template>

<script>
import { IconUser } from '@tabler/icons-vue';
import { IconMenu2 } from '@tabler/icons-vue';
import { IconX } from '@tabler/icons-vue';
    export default {
        name: 'NavbarComponent',
        components: {
    IconUser,
    IconMenu2,
    IconX
},
        data(){
            return{
                menuOpen: false
            }
        },
        methods: {
            openMenu() {
                if(this.menuOpen === false){
                    this.menuOpen = true;
                   
                }
                else{
                    this.menuOpen = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu{
        padding: 10px 15px;
    }
    .box-logo{
        width: 60px;
        height: 50px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .box-voices{
        display: none !important;
    }
    .menu-open{
        box-shadow: 0px 14px 12px 0px rgba(0, 0, 0, 0.15);
        span{
            transition: background-color 0.5s;
            &:hover{
                color: white;
                background: linear-gradient(48deg, rgba(243, 143, 35, 0.00) 0%, rgba(41, 167, 181, 0.00) 100%), #2FB0BD;
                cursor: pointer;
            }
        }
    }
    .fade-in {
        opacity: 1;
        transition: opacity 0.5s;
    }
    .fade-in-enter-active {
        opacity: 0;
    }
    button{
        border: 1px solid transparent;
    }
    .button-none{
        display: none;
    }
    .button-doctor {
        padding: 15px 32px;
        border-radius: 5px;
        background-color: white;
        border: 1px solid #2FB0BD;
        color:  #0071A2;
        transition: background-color 0.5s, color 0.5s;
    }
    .button-doctor:hover {
        background-color:#0071A2;
        color: white;
    }

    @media screen and (min-width:576px){
        .menu{
        padding: 20px 50px;
        }
        .menu-button{
            display: none;
        }
        .button-doctor{
            display: inline-block;
            margin-right: 40px;
        }
    }
    @media screen and (min-width:1200px){
        .hamb-icon{
            display: none;
        }
        .button-doctor{
            margin-right: 0;
        }
        .box-voices{
            color:  #0071A2;
            display: inline-block !important;
            span{
                transition: color 0.5s;
                &:hover{
                    color: #29A7B5;
                    cursor: pointer;
                }
            }
        }
    }
</style>