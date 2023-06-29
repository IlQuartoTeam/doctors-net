<template>
    <div id="map"></div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'MapComponent',
    props: ['indirizzi', 'cap', 'city'],
  
    data() {
      return {
        cityData: { long: null, lat: null },
      };
    },
    methods: {
      initializeMap() {
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${this.cap},Italy`
          )
          .then((response) => {
            console.log(response);
            this.cityData.lat = response.data[0].lat;
            this.cityData.long = response.data[0].lon;
            let map = L.map('map').setView(
              [this.cityData.lat, this.cityData.long],
              12
            );
  
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
  
            this.indirizzi.forEach(function (indirizzo) {
              let marker = L.marker([
                indirizzo.latitudine,
                indirizzo.longitudine,
              ]).addTo(map);
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