<template></template>

<script>
import axios from 'axios';
import { store } from '../store/store';
import router from '../router/router';

    export default {
        mounted(){
            if(store.isAuthenticated){
                const config = { headers: { Authorization: `Bearer ${this.$cookies.get('session-token')}` }}
                axios.post(store.API_URL + 'logout', {}, config).then(res => {
                    this.$cookies.remove('session-token')
                    store.isAuthenticated = false
                    router.push('/')
                }).catch(err => {

                })
                
            } else {
                router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>