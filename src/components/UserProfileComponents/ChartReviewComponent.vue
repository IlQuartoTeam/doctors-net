<template>
    <div class="wrapper w-100 p-5">
      <div class="barChart pb-5 mb-5">
        <h3 class="text-h3 text-doc-blue fw-semibold mt-4"><span class="text-doc-accent">Recensioni</span> ricevute per <span >{{ this.timeframe }}</span> </h3>
        <div class="timeframe d-flex justify-content-end me-4 gap-1">
            <span @click="getStats('year')" class="badge bg-primary fw-light"
            :class="[this.isSelected === 'year' ? 'selected' : '']">1 Y</span>
            <span @click="getStats('month')" class="badge bg-primary fw-light"
            :class="[this.isSelected === 'month' ? 'selected' : '']">1 M</span>
            <span @click="getStats('week')" class="badge bg-primary fw-light"
            :class="[this.isSelected === 'week' ? 'selected' : '']">1 W</span>
            <span @click="getStats('day')" class="badge bg-primary fw-light"
            :class="[this.isSelected === 'day' ? 'selected' : '']">1 D</span>
        </div>
        <Bar v-if="loaded" :data="data" :options="options" class="p-2"/>
      </div>
    </div>
</template>
    
  <script lang="ts">
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import moment from 'moment'
  import { store } from '../../store/store'
  import axios from 'axios'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  
  export default {
    name: 'BarChartReview',
    components: { Bar },
    data() {
      return {
        store,
        loaded: false,
        isSelected: '',
        timeframe: '',
        reviewStats: null,
        sum: {},
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              label: 'Recensioni Ricevute',
              borderWidth: 3,
              borderColor: '#0071A2',
              backgroundColor: '#2FB0BD',
            }
          ]
        },
        options: {
          responsive: true,
        }
      }
    },
    methods: {
      getStats(time) {
        const startDate = moment().subtract(7, 'year').format('Y-MM-DD');
        const endDate = moment().format('Y-MM-DD');
  
        axios.post(store.API_URL + 'user/reviews/simplestats', {
          start_date: startDate,
          end_date: endDate
        }, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get('session-token')}`
          }
        }).then(res => {
          this.reviewStats = res.data.statsReviews
          if(time === 'year') {
          this.oneYear()
        }
        else if(time === 'month') {
          this.oneMonth()
        }
        else if(time === 'week') {
          this.oneWeek()
        }
        else if(time === 'day') {
          this.oneDay()
        }
   
        });
      },
      oneDay() {
        this.loaded = false;
        let today = moment();
        let labels = [];
        for (let i = 6; i >= 0; i--) {
          let day = today.clone().subtract(i, 'days').format('MM/DD');
          labels.push(day);
        }
        this.data.labels = labels
        setTimeout(() => {
          this.data.labels.forEach((element) => {
  
            for (const date in this.reviewStats) {
  
              const day = moment(date).format('MM/DD');
              if (element === day) {
  
  
                if (this.sum[`${[element]}`]) {
                  this.sum[`${[element]}`] += this.reviewStats[date]
                }
                else {
                  this.sum[`${[element]}`] = 0 + this.reviewStats[date]
                }
  
              }
  
            }
          }),
          this.data.labels.forEach(element => {
            if (this.sum[element]) {
              this.data.datasets[0].data.push(this.sum[element])
            }
            else {
             this.data.datasets[0].data.push(0)
            }
          })
  
         
  
        }, 0);
        setTimeout(() => {
          this.loaded = true
        }, 0);
        this.isSelected = 'day';
        this.timeframe = 'giorno'
    
      },
      oneWeek() {
        this.data.datasets[0].data = [];
        this.sum = {};
        this.loaded = false;
        this.data.labels = [];
        let today = moment();
        let labels = [];
        for (let i = 6; i >= 0; i--) {
          let week = today.clone().subtract(i, 'weeks').format('DD MMM');
          labels.push(week);
        }
        this.data.labels = labels;
        setTimeout(() => {
          this.data.labels.forEach((element) => {
  
            for (const date in this.reviewStats) {
  
              const week = moment(date).format('DD MMM');
              if (element === week) {
  
  
                if (this.sum[`${[element]}`]) {
                  this.sum[`${[element]}`] += this.reviewStats[date]
                }
                else {
                  this.sum[`${[element]}`] = 0 + this.reviewStats[date]
                }
  
              }
  
            }
          }),
          this.data.labels.forEach(element => {
            if (this.sum[element]) {
              this.data.datasets[0].data.push(this.sum[element])
            }
            else {
             this.data.datasets[0].data.push(0)
            }
          })
  
         
  
        }, 0);
        setTimeout(() => {
          this.loaded = true
        }, 0);
        this.isSelected = 'week';
        this.timeframe = 'settimana'
     
      },
      oneMonth() {
        this.data.datasets[0].data = [];
        this.sum = {}
        this.loaded = false;
        this.data.labels = [];

        let today = moment();
        let labels = [];
        for (let i = 6; i >= 0; i--) {
          let month = today.clone().subtract(i, 'months').format('MMMM');
          labels.push(month);
        }
        this.data.labels = labels;
        setTimeout(() => {
          this.data.labels.forEach((element) => {
  
            for (const date in this.reviewStats) {
  
              const month = moment(date).format('MMMM');
              if (element === month) {
  
  
                if (this.sum[`${[element]}`]) {
                  this.sum[`${[element]}`] += this.reviewStats[date]
                }
                else {
                  this.sum[`${[element]}`] = 0 + this.reviewStats[date]
                }
  
              }
  
            }
          }),
          this.data.labels.forEach(element => {
            if (this.sum[element]) {
              this.data.datasets[0].data.push(this.sum[element])
            }
            else {
             this.data.datasets[0].data.push(0)
            }
          })
  
         
  
        }, 0);
        setTimeout(() => {
          this.loaded = true
        }, 0);
        this.isSelected = 'month';
        this.timeframe = 'mese'
   
      },
      oneYear() {
        this.data.datasets[0].data = [];
        this.sum = {}
        this.loaded = false;
        this.data.labels = [];
        let today = moment();
        let labels = [];
        for (let i = 6; i >= 0; i--) {
          let year = today.clone().subtract(i, 'years').format('YYYY');
          labels.push(year);
        }
        this.data.labels = labels;
        setTimeout(() => {
          this.data.labels.forEach((element) => {
  
            for (const date in this.reviewStats) {
  
              const year = moment(date).format('YYYY');
              if (element === year) {
  
  
                if (this.sum[`${[element]}`]) {
                  this.sum[`${[element]}`] += this.reviewStats[date]
                }
                else {
                  this.sum[`${[element]}`] = 0 + this.reviewStats[date]
                }
  
              }
  
            }
          })
  
          this.data.labels.forEach(element => {
            if (this.sum[element]) {
              this.data.datasets[0].data.push(this.sum[element])
            }
            else {
             this.data.datasets[0].data.push(0)
            }
          })
  
         
  
        }, 0);
        setTimeout(() => {
          this.loaded = true
        }, 0)
        this.isSelected = 'year';
        this.timeframe = 'anno'
      
        
  
      }
    },
    mounted() {
      this.getStats('year')
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .timeframe {
    span {
      cursor: pointer;
  
      &:not(.selected):hover {
        background-color: #0071A2 !important;
      }
    }
  }
  
  .selected {
    background-color: #E26439 !important;
    color: black;
    font-weight: bold !important;
    box-shadow: rgba(50, 50, 93, 0.062) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.123) 0px 18px 36px -18px inset;
  }

  .barChart{
    max-height: 400px;
    max-width: 800px;
  }
    </style>