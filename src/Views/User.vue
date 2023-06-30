<template>
   <!-- {{ $route.params.id }}
   {{ store.user }}
   {{ store.doctor }} -->
   
   
</template>

<script>
import DoctorCard from '../components/DoctorCard.vue';
import axios from 'axios';
import router from '../router/router';
import { store } from '../store/store';
import HeroUserComponent from '../components/HeroUserComponent.vue';

    export default {
        components: { DoctorCard, HeroUserComponent },
        data(){
            return{
                store
            }
        },
        methods: {
            getUser(){
            if ( this.$cookies.get("session-token")){
                const token = this.$cookies.get("session-token")
               
                const config = { headers: { Authorization: `Bearer ${token}` }}
                    axios.post(store.API_URL + 'user', {key: 'value'}, config).then(res => {
                            store.doctor = res.data.doctor
                            store.user = res.data.user
                            store.userDoctor = {...res.data.doctor, ...res.data.user}
                            console.log(store.userDoctor)
                            router.push('/users/profile')

                        }).catch(err => {
                            this.message.text = 'Ooops! Si è verificato un errore.'
                            this.loading = false
                        })
            }
        }
        },
        mounted(){
            if (!this.$cookies.get("session-token") && !store.user){
                router.push('/login')
            } else {
                this.getUser()
            }
            
        }
    }
</script>

<style lang="scss" scoped>

</style>