<template>
  <div class="row px-5 bg-doc-primary bg-opacity-25 py-5 gx-0">
    <div class="col">
      <h2>Esperienze Lavorative</h2>
      <timeline v-for="start in filteredExperiences('work')" :key="start.id">
        <timeline-title>
          <p class="title text-doc-red">{{ getStartYear(start.start_date) }}</p>
        </timeline-title>
        <timeline-item v-for="experience in filteredYear('work', getStartYear(start.start_date))" :key="experience.id">
          <div class="info">
            <p class="name text-doc-blue">{{ experience.name }}</p>
            <div class="d-flex gap-2">
              <p class="data">inizio: {{ getFormattedDate(experience.start_date) }}</p>
              <p class="fw-bold data"> - </p>
              <p v-if="experience.end_date" class="data">fine: {{ getFormattedDate(experience.end_date) }}</p>
              <p v-else class="data">In corso </p>
            </div>
          </div>
        </timeline-item>
      </timeline>
    </div>
    <div class="col">
      <h2>Esperienze Formative</h2>
      <div>
        <timeline v-for="start in filteredExperiences('education')" :key="start.id">
          <timeline-title>
            <p class="title">{{ getStartYear(start.start_date) }}</p>
          </timeline-title>
          <timeline-item v-for="experience in filteredYear('education', getStartYear(start.start_date))"
            :key="experience.id">
            <div class="info">
              <p class="name">{{ experience.name }}</p>
              <div class="d-flex gap-2">
                <p class="data">inizio: {{ getFormattedDate(experience.start_date) }}</p>
                <p class="fw-bold data"> - </p>
                <p v-if="experience.end_date" class="data">fine: {{ getFormattedDate(experience.end_date) }}</p>
                <p v-else class="data">In corso</p>
              </div>
            </div>
          </timeline-item>
        </timeline>
      </div>

    </div>

  </div>
</template>


<script>
import timeline from '../components/timeline.vue'
import timelineItem from '../components/timelineItem.vue'
import timelineTitle from '../components/timelineTitle.vue'
import { store } from '../store/store';
export default {
  components: {
    timeline,
    timelineItem,
    timelineTitle
  },
  data() {


    return {
      store
    }
  },
  methods: {
    filteredExperiences(type) {
      return this.store.singleDoctor.experiences.filter(experience => experience.type === type);
    },
    getStartYear(dateString) {
      const startDate = new Date(dateString);
      return startDate.getFullYear();
    },
    filteredYear(type, year) {
      return this.store.singleDoctor.experiences.filter(experience => {
        return experience.type === type && this.getStartYear(experience.start_date) === year;
      });
    },
    getFormattedDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

  },



}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;
$gray: #626262;

.data {
  color: $gray;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 15px;
}

.title {
  color: #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
}

.name {
  color: #2FB0BD;
  font-weight: bold;
  letter-spacing: 2px;
}

h2 {
  font-size: 20px;
  color: $doc-blue;
  font-weight: bold;
  letter-spacing: 1px;
  padding-bottom: 18px;

}







@media only screen and (min-width: 768px) {

  .data {
    color: $gray;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .title {
    color: #2FB0BD;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 20px;
  }

  .name {
    color: #2FB0BD;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 20px;

  }


  .exp {
    padding-left: 100px;
  }


  h2 {
    font-size: 22px;
    color: $doc-blue;
    font-weight: bold;
    letter-spacing: 1px;
    padding-bottom: 20px;

  }


}






@media only screen and (min-width: 992px) {

  .data {
    color: $gray;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 13px;

  }

  .title {
    color: #2FB0BD;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 18px;
  }

  .name {
    color: #2FB0BD;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 18px;

  }

  .exp {
    padding-left: 8px;
  }

  h2 {
    font-size: 22px;
    color: $doc-blue;
    font-weight: bold;
    letter-spacing: 1px;
    padding-bottom: 30px;

  }

}



@media only screen and (min-width: 1200px) {

  .data {
    color: $gray;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 17px;

  }

  .title {
    color: #2FB0BD;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 20px;
  }

  .name {
    color: #2FB0BD;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 20px;

  }

  .exp {
    padding-left: 10px;
  }

  h2 {
    font-size: 24px;
    color: $doc-blue;
    font-weight: bold;
    letter-spacing: 1px;
    padding-bottom: 25px;

  }



}
</style>