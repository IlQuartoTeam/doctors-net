<template>
   <!-- {{ $route.params.id }}
   {{ store.user }}
   {{ store.doctor }} -->
    <div class="box-component">
        <SidebarComponent @updateMessageActive="updateMessageActive" />
        <HeroUserComponent v-if="!this.messageActive" />
        <MessageUserComponent v-if="this.messageActive" />
    </div>
    
   
   
   
</template>

<script>
import DoctorCard from '../components/DoctorCard.vue';
import axios from 'axios';
import router from '../router/router';
import { store } from '../store/store';
import HeroUserComponent from '../components/HeroUserComponent.vue';
import SidebarComponent from '../components/SidebarComponent.vue';
import MessageUserComponent from '../components/MessageUserComponent.vue';

    export default {
        components: { DoctorCard, HeroUserComponent, SidebarComponent, MessageUserComponent },
        data(){
            return{
                store,
                messageActive: false
            }
        },
        methods: {
            getUser(){
                if ( this.$cookies.get("session-token")){
                    const token = this.$cookies.get("session-token")
               
                    const config = { headers: { Authorization: `Bearer ${token}` }}
                    axios.post(store.API_URL + 'user', {key: 'value'}, config).then(res => {
                            store.doctor = res.data.doctor
                            store.doctor.specialization = res.data.doctor.specializations[0].name
                            store.user = res.data.user
                            store.userDoctor = {...res.data.doctor, ...res.data.user}
                            console.log(store.userDoctor)
                            router.push('/users/profile')

                        }).catch(err => {
                            this.message.text = 'Ooops! Si è verificato un errore.'
                            this.loading = false
                        })
            }
        },
        updateMessageActive(value) {
            this.messageActive = value;
        },
        mounted(){
            if (!this.$cookies.get("session-token") && !store.user){
                router.push('/login')
            } else {
                this.getUser()
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    @media screen and (min-width:1200px){
        .box-component{
            display: flex;
        }
    }
</style>