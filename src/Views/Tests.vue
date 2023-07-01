<template>
    <div class="py-5">
        <MultiselectComponent :array="myArray" @sendResult="selectionz"/>
        <h2>{{ myArray }}</h2>
        <h3 v-if="selection">{{ selection }}</h3>
    </div>
</template>

<script>
import MultiselectComponent from '../components/MultiselectComponent.vue';
export default {
    data() {
        return {
            myArray: ['io', 'tu'],
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