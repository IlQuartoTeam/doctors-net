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
    background-color: var(--timelineTheme);
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
    top: .24em;
    left: -34px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid   #F38F23;
    background-color:   #F38F23;
    z-index: 1;
    box-sizing: content-box;
  }

  .timeline-circle.hollow {
    background-color: #A4A4A4;
  }

  .timeline-title {
    position: relative;
    display: inline-block;
  
    /**
     * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素）
     */
    cursor: crosshair;
    margin: -.15em 0 15px 28px
  }
  .timeline-title:not(:first-child) {
    margin-top: 28px;
  }
  .timeline-title-circle {
    left: -36px;
    top: .15em;
    width: 16px;
    height: 16px;
    background-color:  #2FB0BD;
    border: 1px solid   #2FB0BD;
   
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
