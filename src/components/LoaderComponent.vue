<template>
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
        <div class="box-image pt-2">
            <img src="/img/hearts-no-track.png" class="heart locator" alt="" />
            <div class="circle-animation circle" ref="circle" :class="['animate', { scaleAnimation: this.count < 2, bigAnimation: this.count >= 2 }]"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoaderComponent',
    data() {
        return{
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .box-image{
        position: relative;
        animation: heartBeat 2s infinite;
    }
    @keyframes heartBeat {
        0% {
            scale: 1;
        }
        50% {
            scale: 0.9;
        }
        100% {
            scale: 1;
        }
    }
    .circle{
        position: absolute;
        top: 17px;
        right: 9px;
        background-color: white;
        height: 28px;
        width: 28px;
        border-radius: 50%;
        z-index: 2;
    }
    .circle-animation{
        animation: loading 2s infinite;
    }
    @keyframes loading {
        0% {
            scale: 1;
        }
        50% {
            scale: 0.3;
        }
        100% {
            scale: 1;
        }
    }
</style>