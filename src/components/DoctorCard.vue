<template>
    <div class="col">
        <div class="card">
            <div class="card-image-top">
                <img  src="https://c8.alamy.com/compit/cw05m4/dottore-in-piedi-con-le-braccia-incrociate-cw05m4.jpg" alt="Image">
            </div>
            <div class="card-title d-sm-flex flex-column gap-0">
                <h3 class="mt-2">Gastani Frinzi</h3>
                <p class="mt-1 spec">Dermatologia</p>
                <p>stelle</p>
                <p class="address">Via San Siro 43, Milano</p>
            </div>
            <div class="card-content">
                <h3>Tariffe</h3>
            </div>
        </div>
    </div>
   
   
</template>
  
  <script>
  export default {
    props: ['doctor'],
  };
  </script>
  
  <style lang="scss">
  @use "../assets/styles/_variables.scss" as *;


.card {
    border-radius: 20px;
}
  
  .card-image-top {

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
    };

  .card-title {
    text-align: center;



    .spec {
        font-size: 15px;
        font-weight: bold;
        color: $doc-light-dark;
    };

    .address {
        font-size: 13px;
        font-weight: bold;
        color: $doc-light-dark;
    }
  }
  

  </style>
  
  