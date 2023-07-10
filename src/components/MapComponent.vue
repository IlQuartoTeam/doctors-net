<template>
  <div id="map"></div>
</template>

<script>
import axios from 'axios';
import ButtonComponent from './ButtonComponent.vue'
import { store } from '../store/store';

export default {
  components: { ButtonComponent },

  data() {
    return {
      store,
      cityData: { long: null, lat: null },
      openStreetApi: `https://nominatim.openstreetmap.org/search?format=json&q=`,
      map: null,
      lastCityExist: store.citySearched,
      lastRightCoordinates: null,
      doctors: store.doctorsQueried
    };
  },

  methods: {
    initializeMap(cityToSearch) {
      axios
        .get(this.openStreetApi + (cityToSearch) + ',Italy', { withCredentials: false })
        .then((response) => {
          if (response.data.length > 0) {
            this.cityData.lat = response.data[0].lat;
            this.cityData.long = response.data[0].lon;
            this.lastRightCoordinates = { lat: this.cityData.lat, long: this.cityData.long }
            this.map = L.map('map').setView(
              [this.cityData.lat, this.cityData.long],
              14
            );

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map)
          }
          else {
            store.toast.error("La città cercata è errata", { timeout: 2000 });
            this.map = L.map('map').setView(
              [this.lastRightCoordinates.lat, this.lastRightCoordinates.long],
              14
            );

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map)
          }
          setTimeout(this.putPinsOnMap, 600)
        })
        .catch((err) => {

        })

    },
    reInitializateMap(value) {
      if (this.map) {
        this.map.off()
        this.map.remove()
        this.initializeMap(value)
      }
    },
    putPinsOnMap() {
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
      const premiumIcon = L.icon(
        {
          iconUrl: '/img/other/pin-leaflet-premium.png',

          iconSize: [30, 50],
          iconAnchor: [15, 0],
          popupAnchor: [0, 2]
        }
      )
      if (this.doctors) {
        this.doctors.forEach((element, index) => {
          const marker = L.marker([element.address_lat, element.address_long], { icon: element.premium ? premiumIcon : icon }).addTo(this.map);
  
          
          const specialization = element.specializations[0].name ?? 'Medicina Generale'
          const popup = `
            <h6 class="markerPopup-name text-center">${element.name} ${element.surname}</h6>
            <p class="text-center m-0 p-0 mb-2">${specialization}</p>
            <a class="d-block text-center text-doc-primary text-underline popup-link" href="/doctors/${element.slug}">Dettagli</a>
            `
          marker.bindPopup(popup)
        })
       

  
        
      }

    }
  },
  watch: {
    'store.citySearched'(newValue, oldValue) {
      this.lastCityExist = oldValue
    },
    'store.doctorsQueried'(newValue) {
      this.doctors = newValue
      this.reInitializateMap(store.citySearched)
     

    }
  },

  mounted() {
    this.initializeMap(store.citySearched ?? 'Roma');
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

.leaflet-popup-content-wrapper {
  border-radius: 5px;
  background-color: $doc-white;
  color: $doc-blue;
  font-weight: bold;
  width: auto;
}

.popup-link {
  &:hover {
    cursor: pointer;
  }

}
</style>


