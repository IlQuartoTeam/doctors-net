<template>
    <nav class="">
        <div class="px-2 px-md-5 py-3 max-website d-flex justify-content-between align-items-center">
            <div class="box-logo">
                <router-link to="/"><img src="/img/logo/hearts-no-track.svg" class="logo" alt="logo"></router-link>
            </div>
            <div class="d-none d-lg-flex justify-content-center align-items-center gap-3 fw-bold">
                <template v-for="link in [{href: '/', text: 'Home'}, {href: '/doctors', text: 'I nostri specialisti'}, {href: '/team', text: 'Chi siamo'}, {href: '/help', text: 'Assistenza'}]">
                    <router-link :class="(this.$route.path === link.href) && 'text-doc-accent'" :to="link.href">{{ link.text }}</router-link>
                </template>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <div class="d-none d-md-block">
                    <ButtonComponent href="/login" v-if="!store.isAuthenticated" class="outline-primary">
                        <IconUser :size="24" /> Sei un medico?
                    </ButtonComponent>
                </div>

                <div class="d-none d-md-block">
                    <ButtonComponent href="/users/profile" v-if="store.isAuthenticated && store.userDoctor"
                        className="outline w-100">
                        <IconUser /><span v-if="store.userDoctor">{{ store.userDoctor.name }} {{ store.userDoctor.surname
                        }}</span>
                    </ButtonComponent>
                </div>

                <div>
                    <IconMenu2 :size="60" v-if="!menuOpen" class="hamb-icon p-2 d-lg-none" alt="icon-menu" @click="openMenu" />
                    <IconX :size="60" v-if="menuOpen" class="hamb-icon p-2 d-lg-none" alt="icon-menu" @click="openMenu" />
                </div>
            </div>
        </div>

        <Transition name="fade-in">
            <div v-if="menuOpen" class="fade-in d-lg-none">
                <div class="menu-open d-flex flex-column gap-3 pb-4">
                    <div class="menu-link d-flex flex-column">
                        <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/" @click="openMenu">Home</router-link>
                        <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/doctors" @click="openMenu">I nostri
                            specialisti</router-link>
                        <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/team" @click="openMenu">Chi
                            siamo</router-link>
                        <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/help"
                            @click="openMenu">Assistenza</router-link>
                    </div>
                    <div class="px-2">
                        <div class="d-md-none">
                            <ButtonComponent href="/login" v-if="!store.isAuthenticated" class="outline-primary w-100">
                                <IconUser :size="24" /> Sei un medico?
                            </ButtonComponent>
                        </div>

                        <ButtonComponent href="/users/profile" v-if="store.isAuthenticated" className="outline w-100">
                            <IconUser /><span v-if="store.userDoctor">{{ store.userDoctor.name }} {{
                                store.userDoctor.surname }}</span>
                        </ButtonComponent>

                    </div>
                    <div v-if="store.isAuthenticated" class="logout d-flex justify-content-center px-2">

                        <ButtonComponent href="/logout" className="accent w-100">
                            logout
                        </ButtonComponent>

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
        getUser() {
            if (this.$cookies.get("session-token")) {
                const token = this.$cookies.get("session-token")

                const config = { headers: { Authorization: `Bearer ${token}` } }
                axios.post(store.API_URL + 'user', { key: 'value' }, config).then(res => {
                    store.doctor = res.data.doctor
                    store.doctor.specialization = res.data.doctor.specializations[0].name
                    store.user = res.data.user
                    store.userDoctor = { ...res.data.doctor, ...res.data.user }
                    router.push('/users/profile')
                }).catch(err => {

                    this.loading = false
                })
            }
        },
    },
    mounted() {
        this.getUser()
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;


.box-logo {
    width: 60px;
    height: 50px;

    img {
        width: 100%;
        height: 100%;
    }
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



@media screen and (min-width:1200px) {

    .hamb-icon {
        display: none;
    }

    .box-logo {
        width: 250px;
        height: 50px;

        img {
            width: 60px;
            height: 100%;
        }
    }
}</style>