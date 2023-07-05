<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col info">
                <p class="d-flex align-items-center"><IconMapPin :color="$doc-primary"/><span class="ps-2">{{ store.singleDoctor.address }}</span><span class="ps-2">{{ store.singleDoctor.city }}</span></p>
                <p class="d-flex align-items-center gap-2"><IconPhone :color="$doc-primary" /><span>{{ store.singleDoctor.phone }}</span></p>
                <p class="d-flex align-items-center gap-2"><IconMail :color="$doc-primary" /><span>{{ store.singleDoctor.email }}</span></p>
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                
                
            </div>
        </div>
    
    </div>
</template>

<script>
import { store } from '../store/store';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-vue';
export default {
    components: { IconMail, IconPhone, IconMapPin},
    data () {
        

        return {
            store
        }
    },
    mounted() {
        'ciao'
    },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;

span {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    color: rgba($doc-dark, 0.6);
    display: inline-block;
}

p { 
    color:$doc-primary;
    padding-left: 35px;
}
.container-fluid {
    display: flex;
    flex-direction: column-reverse;
    gap: 30px;
}




@media only screen and (min-width: 768px) {


    .container-fluid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 40px;
}


p { 
    padding: 8px 0 8px 15px;
}



}






@media only screen and (min-width: 992px) {

    .container-fluid {
    display: flex;
    justify-content: space-between;
    
}
}






@media only screen and (min-width: 1200px) {



    .container-fluid {
    display: flex;
    justify-content: space-between;
    padding: 0 60px;
    


}
}

</style>