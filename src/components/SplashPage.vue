<template>
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
      <div class="logo-container d-flex align-items-center justify-content-center">
        <div class="box-logo d-flex align-items-center">
          <div class="title title-left d-flex align-items-center" v-for="letter in lettersLeft">
            <span class="h-100">{{ letter }}</span>
          </div>
          <div class="box-image pt-2">
            <img src="/img/logo/hearts-no-track.png" class="heart locator" alt="" />
            <div class="circle-animation circle" ref="circle" :class="['animate', { scaleAnimation: this.count < 2, bigAnimation: this.count >= 2 }]"></div>
          </div>
          <div class="title title-right d-flex align-items-center" v-for="letter in lettersRight">
            <span class="h-100">{{ letter }}</span>
          </div>
        </div>
      </div>
      <div>
        <span class="slogan d-flex justify-content-center text-uppercase">trova lo specialista pi&ugrave; adatto per le tue esigenze</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SplashPage',
    data(){
      return{
        lettersLeft: [],
        lettersRight: [],
        count: 0,
        isBigAnimation: false,
        isScaleAnimate: false
      }
    },
    methods: {
      animateCircle() {
        const circle = this.$refs.circle;
        const circleAnimation = setInterval(() => {
          console.log(this.count)
          this.count++;
          if(this.count < 2) {
            this.isScaleAnimation = true;
          }
          else if (this.count > 2) {
            this.isBigAnimation = true;
          }
          else if (this.count === 2) {
            clearInterval(circleAnimation);
          }
        }, 1000);
      },
    },
    mounted() {
      const titleTextLeft = 'DOCT';
      this.lettersLeft = titleTextLeft.split('');
      const titleTextRight = 'RS NET';
      this.lettersRight = titleTextRight.split('');
      this.animateCircle();
    },
  };
  </script>
  
  <style lang="scss" scoped>
      /* TYPOGRAPHY */
  .logo-container{
    animation: opacity 5s;
  }
  @keyframes opacity{
    0% {
      opacity: 0
    }
    100%{
      opacity: 1;
    }
  }
  .title-left{
    color: #F38F23;
    font-size: 96px;
    font-family: NT Somic;
    line-height: 25px;
    letter-spacing: 0.929px;
    min-height: 100px;
  }
  .title-right{
    color: #2FB0BD;
    font-size: 96px;
    font-family: NT Somic;
    line-height: 25px;
    letter-spacing: 0.929px;
    min-height: 100px;
  }
  .title span {
    display: inline-block;
    animation: scaleIn 2.2s;
    animation-delay: 3.5s;
  }
  @keyframes scaleIn {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  .slogan{
    color: rgba(0, 0, 0, 0.60);
    font-size: 22px;
    font-family: NT Somic;
    line-height: 35px;
    letter-spacing: 0.929px;
    opacity: 0;
    animation: opacity 3s forwards;
    animation-delay: 1.5s;
  }
  @keyframes opacity {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  .box-image{
    position: relative;
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
  .bigAnimation {
    animation: bigAnimation 5s forwards;
  }
  
  @keyframes bigAnimation {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.3);
    }
    50% {
      transform: scale(1);
    }
    75% {
        transform: scale(0.3);
        animation-timing-function: ease-in-out;
        animation-duration: 4s;
    }
    90% {
        transform: scale(100);
        animation-timing-function: ease-in-out;
        animation-duration: 4s;
    }
    100% {
        transform: scale(1);
        animation-timing-function: ease-in-out;
        animation-duration: 4s;
    }
  }
  </style>