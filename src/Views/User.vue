<template>
   {{ $route.params.id }}
   {{ store.user }}
   {{ store.doctor }}

</template>

<script>
import axios from 'axios';
import router from '../router/router';
import { store } from '../store/store';

    export default {
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
                    axios.post('/api/me', {key: 'value'}, config).then(res => {
                            store.doctor = res.data.doctor
                            store.user = res.data.user
                            const id = store.user.id
                            const name = store.user.name.toLowerCase()
                            const surname = store.user.surname.toLowerCase()
                            router.push('/users/'+id+'-'+name+'-'+surname)

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