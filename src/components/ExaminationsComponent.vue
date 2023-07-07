<template>
  <ul class="d-flex flex-column gap-2">
    <li v-for="(examination, index) in examinations.split(';')" :key="index">{{ examination }} </li>
  </ul>
</template>

<script>
import { store } from '../store/store';
export default {
  props: ['examinations'],
  data() {
    return {
      store

    }
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;

ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
li{
  background-color: $doc-primary;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  max-width: fit-content;
}



</style>