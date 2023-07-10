<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 p-2 p-md-5 h-100 gx-0">
        <div class="col text-doc-blue flex-grow-1 p-4 p-md-0">
            <h3 class="py-2">Informazioni</h3>
            <p class="d-flex align-items-center gap-2">
                <IconMapPin  />
                <span>{{ doctor.address }} - {{ doctor.city }}</span>
            </p>
            <p class="d-flex align-items-center gap-2">
                <IconPhone  />
                <span>{{ doctor.phone }}</span>
            </p>
            <p class="d-flex align-items-center gap-2">
                <IconMail />
                <span>{{ doctor.email }}</span>
            </p>
            <div class="text-doc-blue">
                <h3 class="py-2">Prestazioni</h3>
                <ExaminationsComponent :examinations="doctor.examinations" />
            </div>
        </div>
        <div class="col flex-grow-1 bg-info map-container p-4 p-md-0">
            <div id="doctor-map"></div>
        </div>
    </div>
</template>

<script>
import { store } from '../store/store';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-vue';
import ExaminationsComponent from '../components/ExaminationsComponent.vue';

export default {
    components: { IconMail, IconPhone, IconMapPin, ExaminationsComponent },
    props: ['doctor'],
    data() {
        return {
            store
        }
    },
    mounted() {
        const map = L.map('doctor-map').setView([this.doctor.address_lat, this.doctor.address_long], 16)

        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        )
            .addTo(map)

        const icon = L.icon(
            {
                iconUrl: '/img/other/pin-leaflet-border.png',
                shadowUrl: '/img/other/pin-leaflet-shadow.png',
                iconSize: [30, 50],
                shadowSize: [30, 50],
                iconAnchor: [15, 0],
                shadowAnchor: [15, 0],
                popupAnchor: [0, 2]
            })

        L.marker([this.doctor.address_lat, this.doctor.address_long], { icon: icon }).addTo(map);
    },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;

#doctor-map {
    width: 100%;
    height: 250px;
    max-height: 500px;
    @media screen and (min-width: 768px) {
        height: 100%;
    }
    
}

.map-container{
    max-width: 100%;
    @media screen and (min-width: 768px) {
    max-width: 100%;
    }
    
}
</style>