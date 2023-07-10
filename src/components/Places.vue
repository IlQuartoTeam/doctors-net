<template>
<div class="col">
    <InputComponent ref="address" :required="true" label="Indirizzo*" id="autocomplete" type="text"
      placeholder="Corso Inghilterra" :modelValue="modelAddressPlaces" :invalid="store.addressError" />
    </div>
    <div class="col">
    <InputComponent ref="city" :required="true" label="Città*" id="city" type="text"
      placeholder="Torino" :modelValue="modelCityPlaces" :invalid="store.addressError" />
  </div>
</template>

<script>
import { store } from '../store/store';
import InputComponent from './InputComponent.vue'

export default {
  props: ['modelAddressPlaces', 'modelCityPlaces'],
  data() {
    return {
      location: '',
      searchResults: [],
      service: null,
      store,
    };
  },

  methods: {
    MapsInit() {
      this.service = new window.google.maps.places.AutocompleteService()
    }
  },

  components: {
    InputComponent
  },

  mounted() {
    this.MapsInit();
    const options = {
      componentRestrictions: { country: "it" }
    };
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.address_components) {
        const addressComponents = place.address_components;
        const address = addressComponents
          .filter(component => component.types.includes('street_number') || component.types.includes('route'))
          .map(component => component.long_name)
          .reverse()
          .join(' ');
        const city = addressComponents
          .filter(component => component.types.includes('locality'))
          .map(component => component.long_name)
          .join(', ');
        this.store.address = address;
        this.store.city = city;
        this.store.lat = place.geometry.location.lat();
        this.store.lon = place.geometry.location.lng();
      }
    });
  }
}
</script>

<style lang="scss" scoped></style>
