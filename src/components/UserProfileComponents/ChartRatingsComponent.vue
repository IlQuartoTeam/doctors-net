<template>
    <div class="position-relative">
        <h4 class="py-4 px-4 text-doc-blue fw-bold">Le tue recensioni: {{ total }}</h4>
        <div class="d-flex justify-content-start gap-3 p-4">
            <div class="col-3">
                <label class="py-1" for="year_select">Seleziona anno</label>
                <select :disabled="loading" id="year_select" @change="setRange()" v-model="yearSelected">
                    <option disabled value="">Anno</option>
                    <option>2023</option>
                    <option>2022</option>
                </select>
            </div>


            <div class="col-3">
                <label class="py-1" for="month_select">Seleziona mese</label>
                <select :disabled="loading" id="month_select" @change="setRange()" v-model="month">
                    <option value="">Tutti i mesi</option>
                    <option value="01">Gennaio</option>
                    <option value="02">Febbario</option>
                    <option value="03">Marzo</option>
                    <option value="04">Aprile</option>
                    <option value="05">Maggio</option>
                    <option value="06">Giugno</option>
                    <option value="07">Luglio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Settembre</option>
                    <option value="10">Ottobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Dicembre</option>
                </select>
            </div>



        </div>

        <div class="p-4 position-relative chart-container">
            <canvas class="my-4 w-100" id="myChart" width="900" height="380" ref="ratings"></canvas>
            <h3 v-if="noReviews()">Nessuna recensione ricevuta</h3>
        </div>


    </div>
</template>

<script>
import axios from 'axios';
import { Chart } from 'chart.js';

export default
    {
        data() {
            return {
                reviewsData: [0, 0, 0, 0, 0],
                yearSelected: '2023',
                canvas: null,
                chart: null,
                start: '2000-01-01',
                end: '2023-12-31',
                year: 2023,
                labels: ['1 Stella', '2 Stelle', '3 Stelle', '4 Stelle', '5 Stelle'],
                month: '',
                total: 0,
                loading: false
            }
        },
        methods:
        {
            noReviews() {
                let reviews = true
                this.reviewsData.forEach(element => {
                    if (element > 0) {
                        reviews = false
                    }
                });
                return reviews
            },
            setRange() {
                this.loading = true
                if (this.month === '') {
                    this.start = this.yearSelected + '-01-01'
                    this.end = this.yearSelected + '-12-31'
                }
                else {
                    this.start = this.yearSelected + '-' + this.month + '-01'
                    this.end = this.yearSelected + '-' + this.month + '-31'
                }

                this.chart.destroy()
                this.getReviews('year')
            },
            getReviews(type) {
                this.total = 0
                if (this.$cookies.get("session-token")) {
                    const token = this.$cookies.get("session-token")

                    const config = { headers: { Authorization: `Bearer ${token}` } }
                    axios.post('/api/user/reviews/stats', { start_date: this.start, end_date: this.end, type: type }, config)
                        .then(res => {

                            if (res.data.statsReviews.length === 0) {
                                this.reviewsData = [0, 0, 0, 0, 0]
                            }
                            else {
                                const stats = res.data.statsReviews[this.yearSelected]
                                const stars = [1, 2, 3, 4, 5]
                                stars.forEach((star, index) => {
                                    stats[star] ? (this.reviewsData[index] = stats[star]) : (this.reviewsData[index] = 0)
                                    stats[star] ? (this.total += stats[star]) : (this.total += 0)
                                });
                            }


                            this.drawCharts()
                            this.loading = false

                        })
                        .catch((err) => {
                            this.reviewsData = [0, 0, 0, 0, 0]
                        })

                }

            },
            drawCharts() {

                const ctx = this.$refs.ratings;
                this.canvas = ctx.getContext("2d", {
                    antialias: false,
                    depth: false,
                });
                this.chart = new Chart(this.canvas, {
                    type: 'bar',
                    data: {
                        labels: this.labels,
                        datasets: [{
                            label: 'Recensioni',
                            data: this.reviewsData,
                            borderWidth: 3,
                            borderColor: '#0071A2',
                            backgroundColor: '#2FB0BD',
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                boxPadding: 3
                            }
                        }
                    }
                });



            }
        },
        mounted() {
            this.getReviews('year')
        }
    }


</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;

.chart-container {
    width: 100%;
    max-height: 400px;
    max-width: 800px;
}

canvas {
    width: 100% !important;
   
}

h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    opacity: .6;
    display: grid;
    place-items: center;

    @media screen and (max-width: 550px) {
        font-size: 20px;
    }
}


select {
    position: relative;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    border: 1px solid $doc-primary;
    border-radius: 5px;
    padding: 1rem 20px;
    display: block;

    &::placeholder {
        color: $doc-blue;
        opacity: 60%;
    }

    &:focus-visible {
        outline: 2px solid $doc-blue;
    }

    &.invalid {
        border: 1px solid $doc-red;

        &:focus-visible {
            outline: 2px solid $doc-red;
        }
    }


}
</style>