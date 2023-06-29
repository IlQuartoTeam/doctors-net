<template>
    <nav>
        <div class="mobile-menu d-flex justify-content-between align-items-center p-2">
            <div class="box-logo">
                <img src="/img/logo/hearts-no-track.svg" class="logo" alt="logo">
            </div>
            <img src="/img/icon-menu.svg" class="pe-3" alt="icon-menu" @click="openMenu">
        </div>
        <div class="menu-open d-flex flex-column" v-if="menuOpen">
            <div class="menu-link d-flex flex-column">
                <span class="py-3 px-3 paragraph-hero-p fw-bold">I nostri specialisti</span>
                <span class="py-3 px-3 paragraph-hero-p fw-bold">Chi siamo</span>
                <span class="py-3 px-3 paragraph-hero-p fw-bold">Assistenza</span>
            </div>
            <div class="menu-button p-3 m-auto">
                <button class="button-primary">Sei un medico?</button>
            </div>
        </div>
    </nav>
    
</template>

<script>
    export default {
        name: 'NavbarComponent',
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
    .box-logo{
        width: 60px;
        height: 50px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .menu-open{
        box-shadow: 0px 14px 12px 0px rgba(0, 0, 0, 0.15);
    }
    button{
        border: 1px solid transparent;
    }

    .button-primary {
        padding: 16px 32px;
        border-radius: 5px;
        background-color: white;
        border: 1px solid #2FB0BD;
        color: #2FB0BD;
    }
    .button-primary:hover {
        background-color:#0071A2;
        color: white;
    }
</style>