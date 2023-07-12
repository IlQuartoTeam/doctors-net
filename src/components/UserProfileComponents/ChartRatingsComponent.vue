<template>
    <div class="position-relative">
        <select @change="setRange()" v-model="yearSelected">
            <option disabled value="">Anno</option>
            <option>2023</option> 
            <option>2022</option>
        </select>
        <select @change="setRange()" v-model="month">
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

        <canvas ref="ratings"></canvas>
        <h3 v-if="noReviews()">Nessuna recensione ricevuta <br>nel periodo specificato</h3>
    </div>
</template>

<script>
import axios from 'axios';
import { Chart } from 'chart.js';

export default
    {
        data()
        {
            return {
                reviewsData: [0,0,0,0,0],
                yearSelected: '2022',
                canvas: null,
                chart: null,
                start: '2000-01-01',
                end: '2022-12-31',
                year: 2022,
                labels: ['1 Stella', '2 Stelle', '3 Stelle', '4 Stelle', '5 Stelle'],
                month: '',
            }
        },
        methods:
        {
            noReviews()
            {
                let reviews = true
                this.reviewsData.forEach(element => {
                    if (element > 0)
                    {
                        reviews = false
                    }
                });
                return reviews
            },
            setRange()
            {
                if (this.month === '')
                {
                    this.start = this.yearSelected + '-01-01'
                    this.end = this.yearSelected + '-12-31'
                }
                else
                {
                    this.start = this.yearSelected + '-' + this.month + '-01'
                    this.end = this.yearSelected + '-' + this.month + '-31'
                }
                
                this.chart.destroy()
                this.getReviews('year')
            },
            getReviews(type)
            {
                if(this.$cookies.get("session-token"))
                {
                const token = this.$cookies.get("session-token")

                const config = { headers: { Authorization: `Bearer ${token}` } }
                axios.post('/api/user/reviews/stats?start_date='+ this.start + '&end_date=' + this.end + '&type=' + type, { key: 'value' }, config)
                .then(res => 
                {
                    
                    if (res.data.statsReviews.length === 0)
                    {
                        this.reviewsData = [0,0,0,0,0]
                    }
                    else
                    {
                        const stats = res.data.statsReviews[this.yearSelected]
                        const stars = [1, 2, 3, 4 ,5]
                        stars.forEach((star, index) => {
                            stats[star] ? (this.reviewsData[index] = stats[star]) : (this.reviewsData[index] = 0)           
                        }); 
                    }
                    
                
                    this.drawCharts() 
                    
                })
                .catch((err) =>
                {
                    this.reviewsData = [0,0,0,0,0]
                })
                
                }
                
            },
            drawCharts()
            {
                
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
                            borderWidth: 3
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            },
                            
                         
                        },
                        
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
div {
    width: 100%;
}

canvas {
    width: 100%;
}
h3{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    opacity: .6;
    display: grid;
    place-items: center;
    
    
}
</style>