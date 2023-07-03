<template>
    <div class="userInfo">
        
    </div>
</template>

<script>
import { store } from '../store/store';
export default {
    name: 'SettingUserComponent',
    data() {
        return {
            store,
            
        }
    },
    mounted() {
        console.log(store.userDoctor);
    }
}
</script>

<style lang="scss" scoped>
/*
info da showare pè fozza:

    address, city, email, examinations, experiences, name, surname, phone, profile_image_url, specializations,


info carine:

    created_at, email_verified_at, 


*/

</style>
