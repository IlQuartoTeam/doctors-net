<template>
  <ul ref="timeline" class="timeline">
    <slot />
  </ul>
</template>

<script>
  export default {
    name: 'Timeline',

    props: {
      timelineTheme: {
        type: String,
        default: '#dbdde0'
      },
      timelineBg: {
        type: String,
        default: '#fff',
      }
    },

    mounted() {
      const timeline = this.$refs.timeline
      timeline.style.setProperty('--timelineTheme', this.timelineTheme)
      timeline.style.setProperty('--timelineBg', this.timelineBg)
    }
  }
</script>

<style>



  .timeline {
    padding: 0;
    position: relative;
    list-style: none;
    -webkit-font-smoothing: antialiased;
    margin: 10px 20px;
  }

  .timeline:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    /* background-color: var(--timelineTheme); */
    background-color: black;
  }

  .timeline-item {
    position: relative;
    margin: 1.5em 0 0 28px;
    padding-bottom: 1.5em;
    border-bottom: 1px dotted var(--timelineTheme);
  }
  .timeline-item:last-child {
    border-bottom: none;
  }
  .timeline-circle {
    position: absolute;
    top: .23em;
    left: -32.5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid   #2FB0BD;
    background-color:   #2FB0BD;
    z-index: 1;
    box-sizing: content-box;
  }

  .timeline-circle.hollow {
    background-color: #A4A4A4;
  }

  .timeline-title {
    position: relative;
    display: inline-block;
  

    cursor: crosshair;
    margin: -.15em 0 15px 28px
  }
  .timeline-title:not(:first-child) {
    margin-top: 28px;
  }
  .timeline-title-circle {
    left: -36px;
    top: 1%;
    width: 16px;
    height: 16px;
    background-color:  #E26439;
    border: 1px solid   #E26439;
   
  }
  .timeline-others {
    width: 40px;
    height: auto;
    top: .2em;
    left: -48px;
    line-height: 1;
    padding: 2px 0;
    text-align: center;
    border: none;
    background-color: var(--timelineBg);
  }
</style>
