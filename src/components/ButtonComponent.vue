<template>
  <button v-if="button === true" :type="type" class="btn" :class="className">
    <slot></slot>
  </button>
  <a v-else :href="link" class="btn" :class="className">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: ['type', 'button', 'className', 'link'],

};
</script>

<style lang="scss">
@use "../assets/styles/_variables.scss" as *;

.btn {

  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 13px;
  font-weight: medium;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  color: $doc-white;
}

.btn:hover {
  cursor: pointer;
}

.primary {
  background-color: $doc-primary;
  border: $doc-primary;

  &:active {
    background-color: $doc-blue !important;
    color: $doc-white !important;
  }
}

.primary:hover {
  background-color: $doc-blue;
  color: $doc-white;
}

.outline {
  background-color: $doc-white;
  border: 1px solid $doc-blue;
  color: $doc-blue;
}
.outline-accent {
  background-color: $doc-white;
  border: 1px solid $doc-red;
  color: $doc-accent;
  &:hover{
    background-color: $doc-red;
    color: $doc-white;
  }
}
.outline-primary {
  background-color: $doc-white;
  border: 1px solid $doc-primary;
  color: $doc-primary;
  &:hover{
    background-color: $doc-blue;
    color: $doc-white;
  }
}

.outline:hover {
  background-color: $doc-blue;
  color: $doc-white;
}

.accent {
  background-color: $doc-accent;
  border: $doc-accent;
  color: $doc-white;

  &:active {
    background-color: $doc-red !important;
    color: $doc-white !important;
  }
}

.accent:hover {
  background-color: $doc-red;
  color: $doc-white;
}

.heroButton {
  width: 100%;
  padding: 15px 32px;
  font-size: inherit;
}

@media screen and (min-width: 768px) {
  .heroButton {
    width: fit-content;
    padding: 15px 100px;

  }
}
</style>

