<template>
    <div id="map"></div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'MapComponent',
    props: ['addressess', 'cap', 'city'],
  
    data() {
      return {
        cityData: { long: null, lat: null },
        openStreetApi: `https://nominatim.openstreetmap.org/search?format=json&q=`,
        map: null,
        coordinates: [],
        loading: null
      };
    },
    methods: {
      initializeMap() {
        axios
          .get(this.openStreetApi + this.cap + ',Italy', {withCredentials: false})
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

            this.addressess.forEach(element => {
              const marker = L.marker(element).addTo(this.map);
            });
            

          });
      },
    },
   
    mounted() {
      this.initializeMap();
    },
  };
  </script>
  
  <style>
  #map {
    height: 180px;
  }
  </style>