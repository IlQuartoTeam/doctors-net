<template>
    <div> 
        <div class="container m-0">
            <div class="row">
                <div class="col">
                  <ul class="py-4">
                        <h2>Esperienze</h2>
                        <li  v-for="(experience, index) in data.experiences">suca</li>
                    </ul>
                    <ul class="py-4">
                        <h2>Formazione</h2>
                        <li v-for="(formation, index) in data.formations">suca</li>
                    </ul>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        

        return {
            data: {}
        }
    }
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;


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
  padding-left: 27px; 
  color: rgba($doc-dark, 0.6);
  font-weight: bold;
}

li:before {
  content: "";
  position: absolute; 
  left: 3.5%; 
  top: 50%; 
  transform: translate(-50%, -50%); 
  width: 8px; 
  height: 8px; 
  border: 1px solid $doc-primary; 
  border-radius: 50%;
}






@media only screen and (min-width: 768px) {


    li {
  position: relative; 
  padding-left: 27px; 
}

li:before {
  content: "";
  position: absolute; 
  left: 2.5%; 
  top: 50%; 
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
  left: 1.7%; 
  top: 50%; 
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
  left: 1.3%; 
  top: 50%; 
  transform: translate(-50%, -50%); 
  width: 10px; 
  height: 10px; 
  border: 1px solid $doc-primary; 
  border-radius: 50%;


}
}

</style>