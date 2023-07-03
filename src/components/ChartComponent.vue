<template>
    <div v-if="loaded" class="chart-container">
        <Line :data="data" :options="options" />
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
          datasets: [{ data: [40, 80, 60, 120, 10, 30] }]
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