<template>
    <div class="py-5">
        <MultiselectComponent :array="myArray" @sendResult="selectionz"/>
    </div>
</template>

<script>
import MultiselectComponent from '../components/MultiselectComponent.vue';
export default {
    data() {
        return {
            myArray: ['brignozzi', 'noiliak', 'lip'],
            selection: null,
        }
    },
    components: {
        MultiselectComponent
    },
    methods: {
        selectionz(selectedOptions) {
            this.selection = selectedOptions
            console.log(selectedOptions);
            console.log('kitestramuort')
        }
    }
}
</script>

<style lang="scss" scoped>
div{
    padding-right: 6px;
}
</style>