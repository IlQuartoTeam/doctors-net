<template>
    <div class="userInfo">
        <h1>ciao</h1>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store/store';
export default {
    name: 'SettingUserComponent',
    data() {
        return {
            store,
            apiUrl: '/api/user/edit',
            userInfo: { ...store.userDoctor },
            error:null,
            
        }
    },
    methods: {
        postChanges() {
            if (!store.isAuthenticated) {
                return this.$route.push({path: '/'})
            }
            const config = { headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` }}
            axios.post(this.apiUrl, this.userInfo, config).then(res => {
                
            })
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
