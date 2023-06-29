<template>
    <nav>
        <div class="mobile-menu d-flex justify-content-between align-items-center p-2">
            <div class="box-logo">
                <img src="/img/logo/hearts-no-track.svg" class="logo" alt="logo">
            </div>
            <img src="/img/icon-menu.svg" class="pe-3" alt="icon-menu">
        </div>
        <div class="menu-open d-flex flex-column">
            <div class="menu-link d-flex flex-column">
                <span class="py-2 px-3 paragraph-hero-p fw-bold">I nostri specialisti</span>
                <span class="py-2 px-3 paragraph-hero-p fw-bold">Chi siamo</span>
                <span class="py-2 px-3 paragraph-hero-p fw-bold">Assistenza</span>
            </div>
            <div class="menu-button p-3">
                <div class="button-info">Sei un medico?</div>
            </div>
        </div>
    </nav>
    
</template>

<script>
    export default {
        name: 'NavbarComponent'
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
</style>