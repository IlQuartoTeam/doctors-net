<template>
    <div class="col col-md px-2">
      <div class="doc-card my-2 d-md-flex align-items-center gap-4 py-3">
        <div class="ms-md-4 mt-md-4 mb-md-2">
            <p class="cons d-md-none pt-3 pb-2">Consigliato</p>
            <div class="card-img mx-auto ms-md-3">
              <img src="https://c8.alamy.com/compit/cw05m4/dottore-in-piedi-con-le-braccia-incrociate-cw05m4.jpg" alt="Image">
            </div>
            <div class="card-title d-sm-flex flex-column ms-md-3 gap-0">
                <h3 class="mt-3">Gastani Frinzi</h3>
                <p class="mt-2 mb-2 mb-md-2 mt-md-0 spec">Dermatologia</p>
                <p class="p-0 mb-2">stelle</p>
                <p class="address">Via San Siro 43, Milano</p>
             </div>
        </div>
        <div class="ms-md-4 w-md-50 d-md-flex flex-column gap-5">
          <div class="card-content d-md-flex flex-column mb-md-5 pb-md-2">
                <h3>Tariffe</h3>
                <p class="mt-1 spec">Visita Dermatologica: da 130&euro;</p>
            </div>
            <div class=" d-md-flex justify-content-between gap-5 cont-btn mt-md-3">
              <p class="cons d-none d-md-block mt-3">Consigliato</p>
               <ButtonComponent class="btn-card" title="Vedi Dettagli" className="primary" />
            </div>

        </div>  
           
           

      </div>
    </div>
   
   
</template>
  
  <script>
  import ButtonComponent from './ButtonComponent.vue';
  export default {
    components: { ButtonComponent, ButtonComponent },
    props: ['doctor'],
  };
  </script>
  
  <style lang="scss">
  @use "../assets/styles/_variables.scss" as *;


.doc-card {
    border-radius: 20px;
    border: 1px solid black;
    
}
  
  .card-img {

    max-width: 150px;
    max-height: 150px;
    border-radius: 600px;
    overflow: hidden;
    

   
    img {
        
        width: 100%;
        object-fit: cover;
        

    }

  

  }

  h3 {
        font-size: 20px;
        color: $doc-blue;
        font-weight: bold;
        letter-spacing: 1px;
    };

  .card-title {
    text-align: center;



   

    .address {
        font-size: 13px;
        font-weight: bold;
        color: $doc-light-dark;
        letter-spacing: 1px;
    }
  }
  .spec {
        font-size: 15px;
        font-weight: bold;
        color: $doc-light-dark;
        letter-spacing: 1px;
    };
  .card-content {
    padding-left: 30px;
  }

.cons {
    font-size: 13px;
    letter-spacing: 2px;
    color: $doc-accent;
    font-weight: medium;
    text-transform: uppercase;
    text-align: center;
}

.btn-card {
    width: 333px;
    
}

.cont-btn {
    width: 100%;
    text-align: center;
    padding-top: 30px;
}
@media only screen and (min-width: 768px) and (max-width: 991px) {

  .card-title {
    text-align: start;
  }

  .btn-card {
    width: 174px;
    margin-left: 40px;
  }
  
  .cons {
    margin-left: 60x;
    padding-left: 30px;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .card-title {
    text-align: start;
  }

  .btn-card {
    width: 174px;
    margin-left: 30px;
  }
  
  .cons {
    margin-left: 30x;
    padding-left: 20px;
  }
  }

  @media only screen and (min-width: 1200px) {
    .card-title {
    text-align: start;
  }

  .btn-card {
    width: 174px;
    margin-left: 18px;
    margin-right: 5px;
    
   
  }
  
   
}


  </style>
  
  