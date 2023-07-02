 <template>
<section class="privacy">
    <div class="text-center mt-5 pt-5"><h1 class="title">Informativa Privacy</h1></div>
       <div class="container-fluid">
           <div class="row">
            <div class="col pt-4 mt-5">
                <ul class="p-3 my-3">
                    <h4>Indice</h4>
                   <li class="mt-2 ps-2" v-for="(item, index) in store.privacyIndex" :key="index">{{ index + 1 }}. <a class="link" :href="`#${item}`">{{ item }}</a></li>
                </ul>
                <!-- <ul>
                    <li class="mt-2 ps-2" v-for="(title, index) in store.privacyData" :key="index"><h2>{{ index + 1 }}. <span>{{ title.title }}</span></h2></li>
                    <ul>
                        <li class="mt-2 ps-2" v-for="(paragraph, index) in store.privacyData" :key="index"><p>{{ index + 1 }}. {{ paragraph}}</p></li>
                    </ul>
                </ul> -->
                <ul class="mt-5 pt-4" v-for="(section, index) in store.privacyData" >
                  <li>
                    <h2 :id="section.title" class="ps-2 mb-3">{{index + 1}}. {{  section.title}}</h2>
                  </li>
                  <li v-for="(row, index) in section.paragraphs">
                    <p class="m-0 paragrafo">{{ index +1}}. {{  row}} </p>
                  </li>
                </ul>
            </div>
           </div>
       </div>
</section>
       
  </template>
  
  <script>
  import { store } from '../store/store';
  export default {
     data() {
         return {
             store,
            
         }
    },
  
  };
  </script>
  
  <style lang="scss">
  @use "../assets/styles/_variables.scss" as *;
  
  .privacy>.title {
    font-size: 24px;
    text-transform: uppercase;
    color: $doc-blue;
    font-weight: bold;
  }

  h2 {
    font-size: 20px;
    color: $doc-blue;
    font-weight: bold;
  }
 h4 {
    font-size: 20px;
    color: $doc-blue;
    font-weight: bold;
 }

 

 li {
    color: $doc-blue;

    .link {
    font-size: 16px;
    color: $doc-blue;
    font-weight: bold;
    text-decoration: underline;
 }
 }
 ul {
  list-style-type: none;
}
 .paragrafo {
    font-size: 15px ;
    color: $doc-blue;
    
 }


 @media only screen and (min-width: 768px)  {
     
    .title {
    font-size: 36px;
    text-transform: uppercase;
    color: $doc-blue;
    font-weight: bold;
  }
  h2 {
    font-size: 32px;
    color: $doc-blue;
    font-weight: bold;
  }
 h4 {
    font-size: 24px;
    color: $doc-blue;
    font-weight: bold;
 }

 link {
    font-size: 20px;
    color: $doc-blue;
    font-weight: bold;
    text-decoration: underline;
 }

 .paragrafo {
    font-size: 20px;
    color: $doc-blue;
    
 }


}






@media only screen and (min-width: 992px)  {
    .title {
    font-size: 64px;
    text-transform: uppercase;
    color: $doc-blue;
    font-weight: bold;
  }
  h2 {
    font-size: 32px;
    color: $doc-blue;
    font-weight: bold;
  }
 h4 {
    font-size: 32px;
    color: $doc-blue;
    font-weight: bold;
 }

 link {
    font-size: 24px;
    color: $doc-blue;
    font-weight: bold;
    text-decoration: underline;
 }

 .paragrafo {
    font-size: 20px;
    color: $doc-blue;
    
 }
}






@media only screen and (min-width: 1200px) {
    .title {
    font-size: 64px;
    text-transform: uppercase;
    color: $doc-blue;
    font-weight: 600;

  }
  h2 {
    font-size: 32px;
    color: $doc-blue;
    font-weight: bold;
  }
 h4 {
    font-size: 32px;
    color: $doc-blue;
    font-weight: bold;
 }

 link {
    font-size: 24px;
    color: $doc-blue;
    font-weight: bold;
    text-decoration: underline;
 }

 .paragrafo {
    font-size: 20px;
    color: $doc-blue;
    
 }
}



  
 


 

  </style>
  
  