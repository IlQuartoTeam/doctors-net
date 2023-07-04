<template>
  <div class="wrapper w-100 p-5">
    <h1 class="text-h2 text-doc-blue fw-semibold text-center mt-4">La tua dashboard</h1>
    <div class="">
      <div class="row g-0">
        <div class="col-12 col-lg-6 px-5 pt-4">
          <div class="timeframe d-flex justify-content-end me-4 gap-1">
            <span @click="oneYear" class="badge bg-primary fw-light"
              :class="[this.isSelected === 'year' ? 'selected' : '']">1 Y</span>
            <span @click="oneMonth" class="badge bg-primary fw-light"
              :class="[this.isSelected === 'month' ? 'selected' : '']">1 M</span>
            <span @click="oneWeek" class="badge bg-primary fw-light"
              :class="[this.isSelected === 'week' ? 'selected' : '']">1 W</span>
            <span @click="oneDay" class="badge bg-primary fw-light" :class="[this.isSelected === 'day' ? 'selected' : '']">1
              D</span>
          </div>
          <Line v-if="loaded" :data="data" :options="options" />
        </div>
      </div>
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
import { Line } from 'vue-chartjs';
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
      isSelected: '',
      data: {
        labels: [],
        datasets: [
          {
            data: [40, 80, 60, 120, 10, 30],
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
  methods: {
    oneDay() {
      this.loaded = false;
      let today = moment();
      let labels = [];
      for (let i = 6; i >= 0; i--) {
        let day = today.clone().subtract(i, 'days').format('DD/MM');
        labels.push(day);
      }
      this.data.labels = labels
      setTimeout(() => {
        this.loaded = true;
      }, 100);
      this.isSelected = 'day';
    },
    oneWeek() {
      this.loaded = false;
      this.data.labels = [];
      console.log(this.data.labels);
      let today = moment();
      let labels = [];
      for (let i = 6; i >= 0; i--) {
        let week = today.clone().subtract(i, 'weeks').format('DD MMM');
        labels.push(week);
      }
      this.data.labels = labels;
      setTimeout(() => {
        this.loaded = true;
      }, 100);
      this.isSelected = 'week';
    },
    oneMonth() {
      this.loaded = false;
      this.data.labels = [];
      console.log(this.data.labels);
      let today = moment();
      let labels = [];
      for (let i = 6; i >= 0; i--) {
        let month = today.clone().subtract(i, 'months').format('MMMM');
        labels.push(month);
      }
      this.data.labels = labels;
      setTimeout(() => {
        this.loaded = true;
      }, 100);
      this.isSelected = 'month';
    },
    oneYear() {
      this.loaded = false;
      this.data.labels = [];
      console.log(this.data.labels);
      let today = moment();
      let labels = [];
      for (let i = 6; i >= 0; i--) {
        let year = today.clone().subtract(i, 'years').format('YYYY');
        labels.push(year);
      }
      this.data.labels = labels;
      setTimeout(() => {
        this.loaded = true;
      }, 100);
      this.isSelected = 'year';
    }
  },
  mounted() {
    this.oneDay()
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
}</style>