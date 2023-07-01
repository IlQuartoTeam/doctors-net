<template>
    <div id="map"></div>
  </template>
  
  <script>
  import axios from 'axios';
  import ButtonComponent from './ButtonComponent.vue'
  import { store } from '../store/store';
  import { ref } from 'vue';

  export default {
    components: {ButtonComponent},
  
    data() {
      return {
        store,
        cityData: { long: null, lat: null },
        openStreetApi: `https://nominatim.openstreetmap.org/search?format=json&q=`,
        map: null,
        city: store.citySearched,
        doctors: store.doctorsQueried
      };
    },
    
    methods: {
      initializeMap() {
        axios
          .get(this.openStreetApi + (this.city) + ',Italy', {withCredentials: false})
          .then((response) => {
            this.cityData.lat = response.data[0].lat;
            this.cityData.long = response.data[0].lon;
            this.map = L.map('map').setView(
              [this.cityData.lat, this.cityData.long],
              12
            );
  
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map);

            const icon = L.icon(
              {
                iconUrl: '/img/other/pin-leaflet-border.png',
                shadowUrl: '/img/other/pin-leaflet-shadow.png',
              
                iconSize: [30, 50],
                shadowSize: [30, 50],
                iconAnchor: [15, 0],
                shadowAnchor: [15, 0],
                popupAnchor: [0, 2]
              }
            )

            this.doctors.forEach(element => {
              const marker = L.marker([element.address_lat, element.address_long], {icon: icon}).addTo(this.map);
              const popup = `
              <h6 class="markerPopup-name text-center">${element.name} ${element.surname}</h6>
              <p class="text-center m-0 p-0 mb-2">${element.specializations[0].name ?? 'Medicina Generale'}</p>
              <a class="d-block text-center text-doc-primary text-underline popup-link" href="/doctors/${element.slug}">Dettagli</a>
              `
              marker.bindPopup(popup)
            });
            

          });
      },
    },
    watch: {
        'store.citySearched'(newValue){
        this.city = newValue
        this.map.remove();
        this.initializeMap()
      },
      'store.doctorsQueried'(newValue){
        this.doctors = newValue
        this.map.remove();
        this.initializeMap()
      }
    },
    
    mounted() {
      this.initializeMap();
    }
  }
  </script>
  
  <style lang="scss">
  @use '../assets/styles/variables' as *;

  #map {
    height: 250px;
    @media screen and (min-width: 560px) {
        height: 350px;
    }
  }
 
  .leaflet-popup-content-wrapper{
    border-radius: 5px;
    background-color: $doc-white;
    color: $doc-blue;
    font-weight: bold;
    width: auto;
  }
  .popup-link{
    &:hover{
      cursor: pointer;
    }
    
  }
  
  
  
  </style>