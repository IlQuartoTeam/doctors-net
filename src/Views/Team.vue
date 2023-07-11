<template>
    <div class=" max-website">
        <h2 class="text-doc-blue fw-bold text-center">Il team dietro</h2>
        <div class="logo-container text-center">
            <h1 class="text-uppercase fw-bold position-relative z-2"><span class="text-doc-accent">Doct</span><span><img
                        src="/img/logo/hearts-no-track.svg" alt=""></span><span class="text-doc-primary">rs Net</span>
            </h1>
        </div>
        <div class="px-5">
            <div id="team-map"></div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        const map = L.map('team-map').setView([45.90480, 13.30963], 14)

        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        )
            .addTo(map)

        const tipsCoordinates = 
        [
            {coordinates: [45.91380, 13.31068]},
            {coordinates: [45.91116, 13.31786]},
            {coordinates: [45.31113,13.31801]},
            {coordinates: [45.90636,13.32190]},
            {coordinates: [45.90101,13.31965]},
            {coordinates: [45.89764,13.31339]},
            {coordinates: [45.89782,13.30536]},
            {coordinates: [45.90169,13.29926]},
            {coordinates: [45.90719,13.29827]},
            {coordinates: [45.91196, 13.30279]},
        ]

        const icon = L.icon(
            {
                iconUrl: '/img/other/pin-leaflet-border.png',
                shadowUrl: '/img/other/pin-leaflet-shadow.png',
                iconSize: [30, 50],
                shadowSize: [30, 50],
                iconAnchor: [15, 50],
                shadowAnchor: [15, 50],
                popupAnchor: [0, 2]
            })

            tipsCoordinates.forEach(element => {
                L.marker(element.coordinates, {icon: icon}).addTo(map);
            });

        
    }
}
</script>

<style lang="scss" scoped>
.logo-container {
    max-height: 80px;

    img {
        max-width: 40px;
    }
}
#team-map{
    height: 450px;
}
</style>