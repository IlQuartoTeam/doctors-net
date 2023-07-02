<template>
    <nav>
        <div class="menu d-flex justify-content-between align-items-center">
            <div class="box-logo">
                <router-link to="/"><img src="/img/logo/hearts-no-track.svg" class="logo" alt="logo"></router-link>
            </div>
            <div class="box-voices d-flex align-items-center m-auto gap-3">
                <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/">Home</router-link>
                <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/doctors">I nostri specialisti</router-link>
                <span class="py-3 px-3 paragraph-hero-p fw-bold">Chi siamo</span>
                <router-link class="py-3 px-3 paragraph-hero-p fw-bold" to="/help">Assistenza</router-link>
            </div>
            <div class="box-button d-flex align-items-center">
                <button v-if="!store.isAuthenticated || store.userDoctor == null" class="button-doctor button-none"
                    @click="goLogin()">
                    <IconUser class="mb-1" :size="24" /> Sei un medico?
                </button>
                <router-link to="/users/profile">
                    <ButtonComponent v-if="store.isAuthenticated && store.userDoctor" className="button-doctor outline"
                        id="btn-logged">
                        <IconUser /><span v-if="store.userDoctor">{{ store.userDoctor.name }} {{ store.userDoctor.surname
                        }}</span>
                    </ButtonComponent>
                </router-link>
                <div v-if="store.isAuthenticated" class="logout-desk m-auto">
                    <router-link to="/logout">Logout</router-link>
                </div>
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
                        <button v-if="!store.isAuthenticated" class="button-doctor" @click="goLogin()">
                            <IconUser class="mb-1" :size="24" /> Sei un medico?
                        </button>
                        <router-link to="/users/profile">
                            <ButtonComponent v-if="store.isAuthenticated"
                                className="outline d-flex align-items-center gap-2" id="btn-logged">
                                <IconUser /><span v-if="store.userDoctor">{{ store.userDoctor.name }} {{
                                    store.userDoctor.surname }}</span>
                            </ButtonComponent>
                        </router-link>
                    </div>
                    <div v-if="store.isAuthenticated" class="logout m-auto pb-3">
                        <router-link to="/logout">Logout</router-link>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script>
import { store } from '../store/store';
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
            if (this.menuOpen === false) {
                this.menuOpen = true;

            }
            else {
                this.menuOpen = false;
            }
        },
        goLogin() {
            this.$router.push({ name: 'login' })
        }
    },
    mounted() {
        console.log(store.doctor)
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
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
    box-shadow: 0px 14px 12px 0px rgba(0, 0, 0, 0.15);

    span {
        color: #0071A2;
        transition: background-color 0.5s;

        &:hover {
            color: white;
            background: linear-gradient(48deg, rgba(243, 143, 35, 0.00) 0%, rgba(41, 167, 181, 0.00) 100%), #2FB0BD;
            cursor: pointer;
        }
    }
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

.button-none,
#btn-logged {
    display: none;
}

.button-doctor {
    padding: 15px 32px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #2FB0BD;
    color: #0071A2;
    transition: background-color 0.5s, color 0.5s;
}

.button-doctor:hover {
    background-color: #0071A2;
    color: white;
}

.outline {
    background-color: #0071A2;
    color: white;

    &:hover {
        background-color: transparent;
        color: #0071A2;
        border: 1px solid #29A7B5;
    }
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

    .button-doctor,
    #btn-logged {
        display: inline-block;
        margin-right: 40px;
    }
}

@media screen and (min-width:1200px) {
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

    .logout-desk {
        display: inline-block;
    }
}</style>