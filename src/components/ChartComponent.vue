<template>
  <h1 class="text-h2 text-doc-blue fw-semibold text-center mt-4">La tua dashboard</h1>
    <div v-if="loaded" class="row">
      <div class="col-12 col-lg-6 px-5 pt-4">
        <div class="timeframe d-flex justify-content-end me-4 gap-1">
          <span class="badge bg-primary fw-light">1 Y</span>
          <span class="badge bg-primary fw-light">1 M</span>
          <span class="badge bg-primary fw-light">1 W</span>
          <span class="badge bg-primary fw-light selected">1 D</span>
        </div>
        <Line :data="data" :options="options" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
  import { Line } from 'vue-chartjs'
  import moment from 'moment'
  import { store } from '../store/store'
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
  
  export default {
    name: 'ChartComponent',
    components: {
      Line
    },
    data() {
      return {
        store,
        loaded: false,
        data: {
          labels: [],
          datasets: [
            { data: [40, 80, 60, 120, 10, 30],
              label: 'Messaggi Ricevuti',
              backgroundColor: '#F38F23',
            }
          ]
        },
        options: {
            responsive: true,
        }
      }
    },
    mounted() {
        let today = moment(); // Oggi
        let labels = [];

        for (let i = 6; i >= 0; i--) {
            let day = today.clone().subtract(i, 'days').format('DD/MM');
            labels.push(day);
        }

        this.data.labels = labels

        console.log(store.userDoctor.messages.length)
        console.log(this.data.labels)
        this.loaded = true;
    }
  }
  </script>

<style>
  .selected{
    background-color: #E26439 !important;
    color: black;
    font-weight: bold !important;
    box-shadow: rgba(50, 50, 93, 0.062) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.123) 0px 18px 36px -18px inset;
  }
</style>