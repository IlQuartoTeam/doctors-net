<template>
    <!-- {{ $route.params.id }}
    {{ store.user }}
    {{ store.doctor }} -->
    <div class="box-component d-flex w-100 overflow-hidden overflow-sm-auto">
        <div class="sidebar">
            <SidebarComponent />
        </div>
        <div class="content position-relative flex-grow-1">
            <HeroUserComponent v-if="store.dashboard.heroOpen" />
            <ChartMessageComponent v-if="store.dashboard.chartsOpen" />
            <ChartReviewComponent v-if="store.dashboard.chartsOpen" />
            <MessageUserComponent v-if="store.dashboard.messaggesOpen" />
            <SettingUserComponent v-if="store.dashboard.generalInfo" />
            <ExperiencesUserComponent v-if="store.dashboard.experiences" />
            <ProfileReviews v-if="store.dashboard.reviewsOpen"/>
            <PerformancesUserComponent v-if="store.dashboard.performances" />
            <SponsorizationComponent v-if="store.dashboard.sponsor"/>
            <ChangeUserPassword v-if="store.dashboard.changePassword" />
            <div class="sideButton d-inline-block d-lg-none">
                <div v-if="!store.dashboard.sidebarOpen"
                    @click="() => store.dashboard.sidebarOpen = !store.dashboard.sidebarOpen"
                    class="open-side d-flex align-items-center"
                    :class="[store.dashboard.messaggesOpen === true ? 'bg-variable' : '']">
                    <IconChevronRight class="ms-3" />
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import SponsorizationComponent from '../components/UserProfileComponents/SponsorizationComponent.vue';
import ProfileReviews from '../components/UserProfileComponents/ProfileReviews.vue';
import DoctorCard from '../components/DoctorCard.vue';
import axios from 'axios';
import router from '../router/router';
import { store } from '../store/store';
import { IconHome } from '@tabler/icons-vue';
import { IconChevronRight } from '@tabler/icons-vue';
import HeroUserComponent from '../components/UserProfileComponents/HeroUserComponent.vue';
import ChartMessageComponent from '../components/UserProfileComponents/ChartMessageComponent.vue';
import ChartReviewComponent from '../components/UserProfileComponents/ChartReviewComponent.vue';
import SidebarComponent from '../components/UserProfileComponents/SidebarComponent.vue';
import MessageUserComponent from '../components/UserProfileComponents/MessageUserComponent.vue';
import SettingUserComponent from '../components/UserProfileComponents/SettingUserComponent.vue';
import PerformancesUserComponent from '../components/UserProfileComponents/PerformancesUserComponent.vue';
import ChangeUserPassword from '../components/UserProfileComponents/ChangeUserPassword.vue';
import ExperiencesUserComponent from '../components/UserProfileComponents/ExperiencesUserComponent.vue';

export default {
    components: { DoctorCard, HeroUserComponent, SidebarComponent, MessageUserComponent, SettingUserComponent, PerformancesUserComponent, ChartMessageComponent, ChartReviewComponent, ChangeUserPassword, IconChevronRight, ExperiencesUserComponent, ProfileReviews, SponsorizationComponent },
    data() {
        return {
            store,
        }
    },
    methods: {
        /**
         * Function to get actual logged user from DB
         * After login we push user to his dashboard @ /users/profile
         * Next we call 
         *  this.getReviews()
            this.getMessages()
            this.getSubscriptions()
         * for getting his information
         */
        getUser() {
            if (this.$cookies.get("session-token")) {
                const token = this.$cookies.get("session-token")

                const config = { headers: { Authorization: `Bearer ${token}` } }
                axios.post(store.API_URL + 'user', { key: 'value' }, config).then(res => {
                    store.doctor = res.data.doctor
                    store.user = res.data.user
                    store.userDoctor = { ...res.data.doctor, ...res.data.user }
                    router.push('/users/profile')
                    this.getReviews()
                    this.getMessages()
                    this.getSubscriptions()
                }).catch(err => {
                    this.message.text = 'Ooops! Si è verificato un errore.'
                    this.loading = false
                }
                )
            }
        },
        getReviews() {
            axios.get('api/doctors/' + store.userDoctor.id + '/reviews')
            .then((res) => {
                store.personalReviews = res.data.data
                store.reviewsPagination = res.data



            }).catch((err) => {


            })
        },
        getMessages() {
            axios.get('api/doctors/' + store.userDoctor.id + '/messages')
            .then((res) => {
                store.personalMessages = res.data.data
                store.messagesPagination = res.data

            }).catch((err) => {


            })
        },
        getSubscriptions() {
            axios.get('api/subscriptions')
            .then((res) => {
                store.subscriptions = res.data


            }).catch((err) => {


            })
        }
    },
    mounted() {
        /**
         * Check if the user is already logged in, otherwise push it 
         * back to the login page where he could login or register as a new user
         */
        if (!this.$cookies.get("session-token") && !store.user) {
            router.push('/login')
        } else {
            this.getUser()
        }
    }
}
</script>
 
<style lang="scss" scoped>
.sideButton {
    position: fixed;
    top: 80%;
    left: 0px;
    transform: translateY(-50%);
}

.open-side {
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0.24, 0.24, 0, 0.24) 0px 3px 6px;
    width: 50px;
    height: 50px;
    margin-left: -10px;
    border-radius: 5px;
    transition: margin-left 0.3s;

    &:hover {
        cursor: pointer;
        margin-left: -5px;
    }
}

@media screen and (min-width:1200px) {
    /*   */
}
</style>