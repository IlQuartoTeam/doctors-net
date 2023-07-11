<template>
    <nav>
        <div class="menu max-website d-flex justify-content-between align-items-center">
            <div class="box-logo">
                <router-link to="/"><img src="/img/logo/hearts-no-track.svg" class="logo" alt="logo"></router-link>
            </div>
            <div class="box-voices d-flex align-items-center m-auto gap-3">
                <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/">Home</router-link>
                <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/doctors">I nostri specialisti</router-link>
                <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/team">Chi siamo</router-link>
                <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/help">Assistenza</router-link>
            </div>
            <div class="box-button d-flex align-items-center gap-3">
                <button v-if="!store.isAuthenticated" class="button-doctor button-none"
                    @click="goLogin()">
                    <IconUser class="mb-1" :size="24" /> Sei un medico?
                </button>
                <router-link to="/users/profile">
                    <ButtonComponent v-if="store.isAuthenticated && store.userDoctor" className="button-doctor outline m-0"
                        id="btn-logged">
                        <IconUser /><span v-if="store.userDoctor">{{ store.userDoctor.name }} {{ store.userDoctor.surname
                        }}</span>
                    </ButtonComponent>
                </router-link>
                <div>
                    <IconMenu2 :size="60" v-if="!menuOpen" class="hamb-icon p-2" alt="icon-menu" @click="openMenu" />
                    <IconX :size="60" v-if="menuOpen" class="hamb-icon p-2" alt="icon-menu" @click="openMenu" />
                </div>
            </div>
        </div>
        <Transition name="fade-in">
            <div v-if="menuOpen" class="fade-in">
                <div class="menu-open d-flex flex-column">
                    <div class="menu-link d-flex flex-column">
                        <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/" @click="openMenu">Home</router-link>
                        <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/doctors" @click="openMenu">I nostri specialisti</router-link>
                        <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/team" @click="openMenu">Chi siamo</router-link>
                        <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/help" @click="openMenu">Assistenza</router-link>
                    </div>
                    <div class="menu-button p-3 m-auto">
                        <button v-if="!store.isAuthenticated" class="button-doctor button-mobile" @click="goLogin()">
                            <IconUser class="mb-1" :size="24" /> Sei un medico?
                        </button>
                        <router-link to="/users/profile">
                            <ButtonComponent v-if="store.isAuthenticated"
                                className="outline d-flex align-items-center gap-2">
                                <IconUser /><span v-if="store.userDoctor">{{ store.userDoctor.name }} {{
                                    store.userDoctor.surname }}</span>
                            </ButtonComponent>
                        </router-link>
                    </div>
                    <div v-if="store.isAuthenticated" class="logout d-flex justify-content-center mb-3">
                        <router-link to="/logout"><ButtonComponent className="accent d-flex align-items-center justify-content-center" id="btn-logged"><span>Logout</span></ButtonComponent></router-link>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script>
import { store } from '../store/store';
import axios from 'axios';
import { IconUser } from '@tabler/icons-vue';
import { IconBrandGoogleHome } from '@tabler/icons-vue';
import { IconMenu2 } from '@tabler/icons-vue';
import { IconX } from '@tabler/icons-vue';
import ButtonComponent from './ButtonComponent.vue';
export default {
    name: 'NavbarComponent',
    components: {
        IconUser,
        IconMenu2,
        IconX,
        ButtonComponent
    },
    props: ['doctor'],
    data() {
        return {
            store,
            menuOpen: false
        }
    },
    methods: {
        openMenu() {
            this.menuOpen = !this.menuOpen
        },
        goLogin() {
            this.$router.push({ name: 'login' })
        },
        getUser(){
            if ( this.$cookies.get("session-token")){
                const token = this.$cookies.get("session-token")
               
                const config = { headers: { Authorization: `Bearer ${token}` }}
                    axios.post(store.API_URL + 'user', {key: 'value'}, config).then(res => {
                    store.doctor = res.data.doctor
                    store.doctor.specialization = res.data.doctor.specializations[0].name
                    store.user = res.data.user
                    store.userDoctor = {...res.data.doctor, ...res.data.user}
                    router.push('/users/profile')
                }).catch(err => {
                   
                    this.loading = false
                })
            }
        },
    },
    mounted(){
        this.getUser()
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
nav{
    height: 100px;
}
.router-link-exact-active {
    color: $doc-accent;
}
.menu {
    padding: 10px 15px;
}

.box-logo {
    width: 60px;
    height: 50px;

    img {
        width: 100%;
        height: 100%;
    }
}

.box-voices {
    display: none !important;
}

.hamb-icon {
    cursor: pointer;
}

.menu-open {
    position: relative;
    z-index: 9999;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
    background-color: $doc-white;
}

.fade-in {
    opacity: 1;
    transition: opacity 0.1s;
}

.fade-in-enter-active {
    opacity: 0;
}

button {
    border: 1px solid transparent;
}

#btn-logged {
    display: none;
    padding: 16px 65px;
}
.button-doctor {
    display: none;
    padding: 15px 32px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #2FB0BD;
    color: #0071A2;
    transition: background-color 0.5s, color 0.5s;
}

.button-mobile{
    display: inline-block;
}

.button-doctor:hover {
    background-color: #0071A2;
    color: white;
}

.logout-desk {
    display: none;
}

@media screen and (min-width:576px) {
    .menu {
        padding: 20px 50px;
    }

    .menu-button {
        display: none;
    }

    .button-doctor{
        display: inline-block;
    }
        #btn-logged {
            display: inline-block;
        }
    }

@media screen and (min-width:1200px) {
    .menu-open{
        display: none !important;
    }
    .hamb-icon {
        display: none;
    }

    .button-doctor {
        margin-right: 0;
    }

    .box-voices {
        color: #0071A2;
        display: inline-block !important;

        span {
            transition: color 0.5s;

            &:hover {
                color: #29A7B5;
                cursor: pointer;
            }
        }
    }
    .box-logo {
        width: 250px;
        height: 50px;

    img {
        width: 60px;
        height: 100%;
    }
}

    .logout-desk {
        display: inline-block;
    }
}</style>