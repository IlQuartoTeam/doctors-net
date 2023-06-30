<template>
    <label :for="id" class="text-doc-blue mb-2 fs-6 fw-medium">{{ label }}</label>
    <input 
    :class="invalid && 'invalid'"
    :required="required"
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)" :id="id" class="w-100 mb-3" :type="type" :placeholder="placeholder">
</template>

<script>
export default {
props: ['id', 'label', 'type', 'placeholder', 'modelValue', 'required', 'invalid'],
emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

input {
   
    border: 1px solid $doc-primary;
    border-radius: 5px;
    padding: 1rem 20px;
    display: block;

    &::placeholder{
        color: $doc-blue;
        opacity: 60%;
    }
    &:focus-visible{
        outline: 2px solid $doc-blue;
    }
    &.invalid{
        border: 1px solid $doc-red;
        &:focus-visible{
        outline: 2px solid $doc-red;
    }
    }

    #searchHero{
        max-width: 800px;
    }

}
</style>