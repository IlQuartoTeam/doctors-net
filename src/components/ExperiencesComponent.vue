<template>
  <div>
    <div class="container m-0">
      <div class="row">
        <div class="col">
          <div class="exp">
            <h2>Esperienze Lavorative</h2>
            <ul class="p-0">
              <li v-for="experience in filteredExperiences('work')" :key="experience.id">
                <div class="d-flex flex-column">
                  <span>{{ experience.name }}</span>
                 <div class="d-flex gap-4">
                  <p class="dark">Data inizio: {{ experience.start_date }}</p>
                  <p class="dark">Data fine: <span v-if="experience.end_date">{{ experience.end_date }}</span><span v-else>In corso</span></p>
                </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="exp">
            <h2>Esperienze Lavorative</h2>
            <ul class="p-0">
              <li v-for="experience in filteredExperiences('education')" :key="experience.id">
                <div class="d-flex flex-column">
                  <span>{{ experience.name }}</span>
                 <div class="d-flex gap-4">
                  <p class="dark">Data inizio: {{ experience.start_date }}</p>
                  <p class="dark">Data fine: <span v-if="experience.end_date">{{ experience.end_date }}</span><span v-else>In corso</span></p>
                </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { store } from '../store/store';
export default {
    data () {
        

        return {
            store
        }
    },
    methods: {
    filteredExperiences(type) {
      return this.store.singleDoctor.experiences.filter(experience => experience.type === type);
    }
  }
}

</script>

<style lang="scss" scoped>

@use "../assets/styles/_variables.scss" as *;

.dark {
  color: black;
}
.exp {
  padding-left: 15px;
}
p {
  color: rgba($doc-dark, 0.6);
  font-weight: bold;
}

h2 {
    color: $doc-blue;
   font-weight: bold;
   letter-spacing: 1px;
   
}
ul {
  list-style-type: none; 
}

li {
  position: relative; 
  padding-left: 25px; 
  color: rgba($doc-dark, 0.6);
  font-weight: bold;
}

li:before {
  content: "";
  position: absolute; 
  left: 3%; 
  top: 18%; 
  transform: translate(-50%, -50%); 
  width: 8px; 
  height: 8px; 
  border: 1px solid $doc-primary; 
  border-radius: 50%;
}






@media only screen and (min-width: 768px) {
   
  .exp {
  padding-left: 20px;
}

    li {
  position: relative; 
  padding-left: 20px; 
}

li:before {
  content: "";
  position: absolute; 
  left: 1.6%; 
  top: 18%; 
  transform: translate(-50%, -50%); 
  width: 8px; 
  height: 8px; 
  border: 1px solid  $doc-primary; 
  border-radius: 50%;
}

}






@media only screen and (min-width: 992px) {

    .col {
    display: flex;
   
    justify-content: space-between;
}
    
    
h2 {
   font-size: 30px;
   
}

    li {
  position: relative; 
  padding-left: 27px; 
  font-size: 20px;
}

li:before {
  content: "";
  position: absolute; 
  left: 3%; 
  top: 20%; 
  transform: translate(-50%, -50%); 
  width: 10px; 
  height: 10px; 
  border: 1px solid  $doc-primary; 
  border-radius: 50%;
}


}






@media only screen and (min-width: 1200px) {

    
.col {
    display: flex;
   
    justify-content: space-between;
}
    
    h2 {
   font-size: 32px;
   
}
   
    li {
  position: relative; 
  padding-left: 27px;
  font-size: 24px; 
}

li:before {
  content: "";
  position: absolute; 
  left: 2.3%; 
  top: 20%; 
  transform: translate(-50%, -50%); 
  width: 10px; 
  height: 10px; 
  border: 1px solid $doc-primary; 
  border-radius: 50%;


}
}

</style>