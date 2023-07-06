<template>
  <div>
    <div class="container" >
      <div class="row">
        <div class="col">
          <div class="exp">
            <h2>Esperienze Lavorative</h2>
            <timeline v-for="start in filteredExperiences('work')" :key="start.id">
           <timeline-title><p class="title">{{ getStartYear(start.start_date) }}</p></timeline-title>
          <timeline-item v-for="experience in filteredYear('work', getStartYear(start.start_date))" :key="experience.id">
            <div class="info">
              <p class="name">{{ experience.name }}</p>
              <div class="d-flex gap-3">
                <p class="data">data inizio: {{ experience.start_date }}</p>
                <p v-if="experience.end_date" class="data">data fine: {{ experience.end_date }}</p>
                <p v-else class="data">data fine: In corso... </p>
              </div>
            </div>
          </timeline-item>
         </timeline>
          </div>
          <div class="exp">
            <h2>Esperienze Formative</h2>
            <timeline v-for="start in filteredExperiences('education')" :key="start.id">
           <timeline-title><p class="title">{{ getStartYear(start.start_date) }}</p></timeline-title>
          <timeline-item v-for="experience in filteredYear('education', getStartYear(start.start_date))" :key="experience.id">
            <div class="info">
              <p class="name">{{ experience.name }}</p>
              <div class="d-flex gap-3">
                <p class="data">data inizio: {{ experience.start_date }}</p>
                <p v-if="experience.end_date" class="data">data fine: {{ experience.end_date }}</p>
                <p v-else class="data">data fine: In corso... </p>
              </div>
            </div>
          </timeline-item>
         </timeline>
          </div>
        </div>
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
    data () {
        

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

  },
 
  mounted() {
    console.log(this.filteredYear);
  }

}
</script>

<style lang="scss" scoped>

@use "../assets/styles/_variables.scss" as *;

.col {
    display: flex;
    flex-direction: column;
    gap: 80px;
}
.data {
  color:  #A4A4A4;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 15px;
}
.title {
  color:  #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
}

.name {
  color:   #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
}


.exp {
  padding-left: 30px;
}


h2 {
    color: $doc-blue;
   font-weight: bold;
   letter-spacing: 1px;
   padding-bottom: 20px;
   
}







@media only screen and (min-width: 768px) {
   
  .data {
  color:  #A4A4A4;
  font-weight: bold;
  letter-spacing: 1px;
}
.title {
  color:  #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 20px;
}

.name {
  color:   #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 20px;
  
}


.exp {
  padding-left: 100px;
}


h2 {
    color: $doc-blue;
   font-weight: bold;
   letter-spacing: 1px;
   padding-bottom: 20px;
   
}


}






@media only screen and (min-width: 992px) {

    .col {
    display: flex;
     flex-direction: row;
    gap: 0;
}
    
.data {
  color:  #A4A4A4;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 15px;

}
.title {
  color:  #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 20px;
}

.name {
  color:   #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 20px;
  
}

.exp {
  padding-left: 2.5px;
}

h2 {
    color: $doc-blue;
   font-weight: bold;
   letter-spacing: 1px;
   padding-bottom: 30px;
   
}




}






@media only screen and (min-width: 1200px) {

    
.col {
    display: flex;
    justify-content: space-between;
}
    
.data {
  color:  #A4A4A4;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 18px;

}
.title {
  color:  #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 25px;
}

.name {
  color:   #2FB0BD;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 25px;
  
}

.exp {
  padding-left: 10px;
}

h2 {
    color: $doc-blue;
   font-weight: bold;
   letter-spacing: 1px;
   padding-bottom: 30px;
   
}
  


}


</style>