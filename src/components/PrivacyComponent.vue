 <template>
       <div class="text-center pt-2"><h1>Informativa Privacy</h1></div>
       <div class="container-fluid">
           <div class="row">
            <div class="col ps-5">
                <h4>indice</h4>
                <ul>
                   <li v-for="(item, index) in store.privacyIndex" :key="index">{{ index + 1 }}.{{ item }}</li>
                </ul>
            </div>
           </div>
       </div>
  </template>
  
  <script>
  import { store } from '../store/store';
  export default {
     data() {
         return {
            store
         }
    },
  
  };
  </script>
  
  <style lang="scss">
  @use "../assets/styles/_variables.scss" as *;
  

  h1 {
    font-size: 64px;
    text-transform: uppercase;
    color: $doc-blue;
    font-weight: bold;
  }
 h4 {
    font-size: 32px;
    color: $doc-blue;
    font-weight: bold;
 }
  </style>
  
  