<template>
    <!-- Modal -->

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container" v-if="!userIsPremium">
        <div>
            <h1 class="text-doc-blue pt-2 fw-bolder">Acquista un pacchetto</h1>
            <p class="text-doc-blue">Mostra il tuo profilo nella home e appari prima di tutti nelle ricerche degli utenti,
                acquistando uno dei nostri pacchetti
            </p>
        </div>
        <div class="cards d-none d-lg-flex justify-content-center gap-3 py-5 flex-wrap align-items-center">
            <div class="baseBorder sub d-flex flex-column align-items-center" :class="{ 'activeOne': activeOne == 'base' }"
                @mouseenter="setActiveOne('base')">
                <h6 class="text-doc-blue small">Base</h6>
                <h2 class="text-doc-blue fw-bold fs-1 my-0 px-4">24 <span class="fw-normal fs-4">ore</span></h2>
                <hr class=" w-100 my-0 text-doc-blue border-2">
                <h4 class="text-doc-blue fw-bold">2,99€</h4>
                <div class="w-100">
                    <ButtonComponent @click="callPay(1, 2.99, 'Base', '24 ore')" :button="true" type="submit"
                        className="outline py-2 fw-bold">Acquista</ButtonComponent>
                </div>
            </div>
            <div class="premium sub position-relative d-flex flex-column align-items-center bg-doc-accent"
                :class="{ 'activeOne': activeOne == 'premium' }" @mouseenter="setActiveOne('premium')">
                <h6 class="text-doc-white small">Premium</h6>
                <h2 class="text-doc-white fw-bold fs-1 my-0 px-2">72 <span class="fw-normal fs-4">ore</span></h2>
                <hr class=" w-100 my-0 text-doc-white border-2">
                <h4 class="text-doc-white fw-bold">5,99€</h4>
                <div class="w-100">
                    <ButtonComponent @click="callPay(2, 5.99, 'Premium', '72 ore')" :button="true" type="submit"
                        className="outline-accent border-0 py-2 fw-bold">Acquista</ButtonComponent>
                </div>
                <div class="mostSelled position-absolute d-flex justify-content-center px-5 bg-white">
                    <span>Il più venduto</span>
                </div>
            </div>
            <div class="top sub d-flex flex-column align-items-center bg-doc-primary"
                :class="{ 'activeOne': activeOne == 'top' }" @mouseenter="setActiveOne('top')">
                <h6 class="text-doc-white small">Top</h6>
                <h2 class="text-doc-white fw-bold fs-1 my-0 px-2">144 <span class="fw-normal fs-4">ore</span></h2>
                <hr class=" w-100 my-0 text-doc-white border-2">
                <h4 class="text-doc-white fw-bold">9,99€</h4>
                <div class="w-100">
                    <ButtonComponent @click="callPay(3, 9.99, 'Top', '144 ore')" :button="true" type="submit"
                        className="outline-primary border-0 py-2 fw-bold">Acquista</ButtonComponent>
                </div>
            </div>
        </div>

        <!-- mobile/Tablet -->

        <div class="mobileCards d-flex flex-column align-items-center d-lg-none py-5">
            <div class="baseBorder sub w-100 d-flex flex-column gap-4 align-items-center">
                <h6 class="text-doc-blue small">Base</h6>
                <div class="details d-flex justify-content-evenly w-100 gap-2 align-items-end">
                    <h2 class="text-doc-blue fw-bold m-0 p-0S">24 <span class="fw-normal fs-2">ore</span></h2>
                    <h4 class="text-doc-blue fw-bold m-0">2,99€</h4>
                </div>
                <div class="w-100">
                    <ButtonComponent @click="callPay(1, 2.99, 'Base', '24 ore')" :button="true" type="submit"
                        className="outline w-100 py-2 fw-bold">Acquista</ButtonComponent>
                </div>
            </div>
            <div class="premium sub w-100 position-relative d-flex flex-column gap-4 align-items-center bg-doc-accent">
                <h6 class="text-doc-white small">Premium</h6>
                <div class="details d-flex justify-content-evenly w-100 gap-2 align-items-end">
                    <h2 class="text-doc-white fw-bold my-0 px-2">72 <span class="fw-normal fs-2">ore</span></h2>
                    <h4 class="text-doc-white fw-bold m-0">5,99€</h4>
                </div>
                <div class="w-100">
                    <ButtonComponent @click="callPay(2, 5.99, 'Premium', '72 ore')" :button="true" type="submit"
                        className="outline-accent w-100 border-0 py-2 fw-bold">Acquista</ButtonComponent>
                </div>
                <div class="mostSelled position-absolute d-flex justify-content-center px-5 bg-white">
                    <span>Il più venduto</span>
                </div>
            </div>
            <div class="top sub w-100 d-flex flex-column gap-4 align-items-center bg-doc-primary">
                <h6 class="text-doc-white small">Top</h6>
                <div class="details d-flex justify-content-evenly w-100 gap-2 align-items-end">
                    <h2 class="text-doc-white fw-bold m-0 p-0S">144 <span class="fw-normal fs-2">ore</span></h2>
                    <h4 class="text-doc-white fw-bold m-0">9,99€</h4>
                </div>
                <div class="w-100">
                    <ButtonComponent @click="callPay(3, 9.99, 'Top', '144 ore')" :button="true" type="submit"
                        className="outline-primary w-100 py-2 fw-bold">Acquista</ButtonComponent>
                </div>
            </div>
        </div>
    </div>
    <div class="container p-5 premiumView text-doc-blue" v-if="userIsPremium">
        <div class="wrap p-5 d-flex flex-column align-items-center">
            <div>
                <h1 class="text-center">Sei un membro Partner</h1>
                <p class="pt-3">Comparirai in homepage e sarai il primo a comparire nelle ricerche ancora per...</p>
            </div>
            <div ref="countdown" class="w-100 py-4">
                <ul class="d-flex justify-content-evenly w-100 flex-wrap gap-4 flex-lg-row">
                    <li class="d-flex flex-column align-items-center"><span class="fs-1">{{ days }}</span><span>Giorni</span></li>
                    <li class="d-flex flex-column align-items-center"><span class="fs-1">{{ hours }}</span>Ore</li>
                    <li class="d-flex flex-column align-items-center"><span class="fs-1">{{ minutes }}</span>Minuti</li>
                    <li class="d-flex flex-column align-items-center"><span class="fs-1">{{ seconds }}</span>Secondi</li>
                </ul>
            </div>
        </div>
    </div>
    <div v-if="store.payMode" class="layover"></div>
    <Payments v-if="store.payMode" />
</template>

<script>
import Payments from './Payments.vue'
import ButtonComponent from '../ButtonComponent.vue'
import { store } from '../../store/store'

export default {
    data() {
        return {
            activeOne: 'premium',
            store,
            userIsPremium: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },
    components: {
        ButtonComponent,
        Payments
    },
    methods: {
        setActiveOne(name) {
            this.activeOne = name
        },
        callPay(subID, price, subscription, hours) {
            this.store.payment.price = price
            this.store.payment.subscription = subscription
            this.store.payment.hours = hours
            this.store.payment.subID = subID
            store.payMode = true
        },
        timer() {
            const second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24;
            this.countDown = setInterval(() => {
                const toDay = new Date().getTime()
                const distance = this.endTime - toDay;

                this.days = Math.floor(distance / (day)),
                    this.hours = Math.floor((distance % (day)) / (hour)),
                    this.minutes = Math.floor((distance % (hour)) / (minute)),
                    this.seconds = Math.floor((distance % (minute)) / second);

                console.log(this.endTime - toDay);

            }, 1000)
        }
    },
    mounted() {
        if (store.userDoctor.end_date) {
            this.endTime = new Date(store.userDoctor.end_date).getTime();
            this.timer();
        } else {
            this.userIsPremium = false
        }
        console.log(store.userDoctor);
        console.log(new Date().getTime());
        console.log(new Date("2023-07-12 15:50:16").getTime());

    },
    beforeUnmount() {
        clearInterval(this.countDown)
    }
}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;

.premiumView {
  
}

ul {
    margin: 0;
    padding: 0;
}


.container {
    min-height: 600px;

    .baseBorder {
        border: 1px solid $doc-blue;
    }

    .mobileCards {
        h2 {
            font-size: 2.5rem;
        }

        h4 {
            font-size: 1.6rem;
            padding-bottom: 0.1rem;
        }

        .sub {
            max-width: 350px;
        }
    }

    .sub {
        padding: 10px 20px;
        margin: 20px;
        border-radius: 5px;
        transition: all .5s;
        gap: .5rem;
        cursor: pointer;
    }

    .premium {
        border: 1px solid $doc-accent;
        overflow: hidden;

        .mostSelled {
            font-size: 12px;
            top: 10px;
            left: -50px;
            transform: rotateZ(-35deg);
            padding: 3px;
            white-space: nowrap;

            span {
                font-weight: 500;
                color: $doc-blue;
            }
        }
    }

    .activeOne {
        padding: 20px 30px;
        margin: 0;
        gap: .85rem;
    }

}

.layover {
    position: fixed;
    width: 100%;
    height: 100dvh;
    top: 0;
    right: 0;
    z-index: 888888;
    background-color: rgba(0, 0, 0, 0.267);
}
</style>