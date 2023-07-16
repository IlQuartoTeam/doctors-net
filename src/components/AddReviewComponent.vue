<template>
    <div class="modal-wrap">
        <div class="doc-modal py-2 px-4 md-py-0 px-md-0 px-md-4 py-md-4 text-doc-blue">
            <div class="content container-fluid text-center">
                <h1 class="fs-3">Aggiungi una recensione</h1>
                <small>Seleziona obbligatoriamente almeno una stella</small>
                <form @submit.prevent="sendReview()">
                    <div class="stars d-flex align-items-center justify-content-center mt-4 pb-2"
                        @mouseleave="resetStars()">
                        <span v-for="(star, index) in totals" @click="starSelected(index)" @mouseover="starHovered(index)">
                            <IconStar v-if="index > starVote" />
                            <IconStarFilled v-else class="text-doc-accent" />

                        </span>

                    </div>
                    <p v-if="noVote" class="text-doc-red text-center mt-2">Seleziona almeno una stella</p>
                    
                    <div v-if="!anonymous" class="row mt-3">
                        <div class="col-12 text-start">
                            <InputComponent id="user_name" type="text" v-model="name" placeholder="Giovanna"
                                label="Il tuo nome" />
                            <InputComponent id="user_email" type="email" v-model="email" placeholder="giovanna@mail.com"
                                label="La tua e-mail" />
                            <textarea id="user_messagge" type="textarea" v-model="text" placeholder="Messaggio"
                                class="mt-5"></textarea>
                        </div>
                    </div>
                    <div v-else-if="anonymous" class="d-flex justify-content-center gap-3 align-items-center py-3">
                          <p class="text-doc-blue text-center p-0 m-0"> Utente anonimo?</p>
                        <input class="p-0 m-0 checkbox" type="checkbox" v-model="anonymous" checked>
                    </div>
                    <div class="d-flex flex-column gap-3">
                        <ButtonComponent type="submit" :button="true" class="primary">
                            <span v-if="!loading">invia recensione</span>
                            <span v-else class="d-flex justify-content-center align-items-center gap-2">
                                <span class="spinner-border"></span> Caricamento...
                            </span>

                        </ButtonComponent>
                        <ButtonComponent @click="goBack" class="outline-accent">
                            chiudi
                        </ButtonComponent>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store/store';
import { IconX, IconStar, IconStarFilled } from '@tabler/icons-vue';
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import axios from 'axios';
export default {
    name: 'AddReviewComponent',
    components: {
        IconX,
        IconStar,
        IconStarFilled,
        InputComponent,
        ButtonComponent
    },
    data() {
        return {
            store,
            name: null,
            email: null,
            text: null,
            rating: null,
            totals: [1, 2, 3, 4, 5],
            starVote: -1,
            message: '',
            noVote: false,
            loading: false,
            anonymous: true
        }
    },
    methods: {
        handleAnon()
        {
            console.log(this.anonymous);
            this.anonymous = false
        },
        goBack() {
            store.addReview = false;
        },
        starSelected(value) {
            this.noVote = false
            this.starVote = value;
            this.rating = value + 1;
        },
        starHovered(index) {
            if (this.rating === null) {
                this.starVote = index;
            }
        },
        resetStars() {
            if (this.rating === null) {
                this.starVote = -1;
            }
        },
        sendReview() {
            if (this.starVote === -1) {
                this.noVote = true
                return
            }
            else {
                this.noVote = false
            }
            this.loading = true
            axios.post(store.API_URL + 'doctors/' + store.singleDoctor.id + '/reviews', {
                email: this.email,
                name: this.name,
                rating: this.rating,
                text: this.text
            }).then(res => {
                this.message = 'Recensione aggiunta con successo';

                setTimeout(() => {
                    store.addReview = !store.addReview
                    this.loading = false
                    store.toast.success(this.message, { timeout: 1500 });
                    axios.get(store.API_URL + 'doctors/' + store.singleDoctor.id + '/reviews').then(res => {
                        store.reviewOrdered = res.data.data;
                        store.newItemsReviews = res.data.total
                    });

                }, 2000);
            }).catch(err => {
                if (err.response.data.errors.rating) {
                    this.message = err.response.data.errors.rating[1];
                    store.toast.error(this.message, { timeout: 1500 });
                }
            })
        },
    },
    mounted() {

    }

}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;

.modal-wrap {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    z-index: 999999;
}

.doc-modal {
    background-color: white;
    width: 500px;
    position: relative;
    border-radius: 10px;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
}

.content {
    @media screen and (min-width: 768px) {
        margin-top: 0 !important
    }
}

.stars {
    cursor: pointer;
}

.back {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 10px;
    border-radius: 50%;
    color: $doc-blue;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
        background-color: $doc-accent;
        color: white;
    }
}

textarea {
    border: 1px solid $doc-primary;
    border-radius: 5px;
    padding: 1rem 20px;
    resize: none;
    width: 100%;
    min-height: 100px;
    display: block;
    color: $doc-primary;
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;

    &::placeholder {
        color: $doc-blue;
        opacity: 60%;
    }

    &:focus-visible {
        outline: 2px solid $doc-blue;
    }
}</style>