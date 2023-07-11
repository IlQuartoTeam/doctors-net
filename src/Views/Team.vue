<template>
    <div>
        <h2 class="text-doc-blue fw-bold text-center">Il team dietro</h2>
        <div class="logo-container text-center">
            <h1 class="text-uppercase fw-bold position-relative z-2"><span class="text-doc-accent">Doct</span><span><img
                        src="/img/logo/hearts-no-track.svg" alt=""></span><span class="text-doc-primary">rs Net</span>
            </h1>
        </div>
        <div class="px-5">
            <div class="map py-4">
                <div id="team-map"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        const map = L.map('team-map', { zoomControl: false, dragging: false, doubleClickZoom: false  }).setView([45.90675, 13.30963], 15)

        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 15,
                minZoom: 15,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        )
            .addTo(map)

        const tipsCoordinates = 
        [
            {coordinates: [45.91380, 13.31068], icon: 3, link: 'https://www.linkedin.com/in/raffaelecapaldo/', name: 'Raffaele Capaldo', role: 'Student'},
            {coordinates: [45.91116, 13.31786], icon: 2, link: 'https://www.linkedin.com/in/filippo-verrone-b8540a280/', name: 'Filippo Verrone', role: 'Student'},
            {coordinates: [45.90636,13.32190], icon: 4, link: 'https://www.linkedin.com/in/nicolozibra1/', name: 'Nicolò Zibra', role: 'Student'},
            {coordinates: [45.90101,13.31965], icon: 7, link: 'https://www.linkedin.com/in/marco-acciarri/', name: 'Marco Acciarri', role: 'Tutor' },
            {coordinates: [45.89764,13.31339], icon: 9, link: 'https://www.linkedin.com/in/giuliano-gostinfini/', name: 'Giuliano Gostinfini', role: 'Project Manager'},
            {coordinates: [45.89782,13.30536], icon: 10, link: 'https://www.linkedin.com/in/giuseppe-funicello/',  name: 'Giuseppe Funicello', role: 'Project Manager'},
            {coordinates: [45.90169,13.29926], icon: 8, link: 'https://www.linkedin.com/in/sammyp88/',  name: 'Samuel Panicucci', role: 'Tutor'},
            {coordinates: [45.90719,13.29827], icon: 5, link: 'https://www.linkedin.com/in/gaetano-spampinato-349818280/',  name: 'Gaetano Spampinato', role: 'Student'},
            {coordinates: [45.91196, 13.30279], icon: 1, link: 'https://www.linkedin.com/in/filippogiampapa/',  name: 'Filippo Giampapa', role: 'Student'},
            {coordinates: [45.90535,13.30994], icon: 6, link: 'https://www.linkedin.com/in/clelia-fradella-4641441b/',  name: 'Clelia Fradella', role: 'Teacher'},
            {coordinates: [45.89900, 13.30945], icon: 11, link: 'https://www.linkedin.com/in/adriano-grimaldi-00403597/',  name: 'Adriano Grimaldi', role: 'Manager'}
        ]
        
        const icon = (image) => 
        {
            const newIcon = L.icon(
            {
                iconUrl: `/img/other/pin-team/pin-${image}.png`,
                shadowUrl: '/img/other/pin-leaflet-shadow.png',
                iconSize: [35, 60],
                shadowSize: [35, 60],
                iconAnchor: [17.5, 60],
                shadowAnchor: [17.5, 60],
                popupAnchor: [0, 2]
            })
            return newIcon
        }

            tipsCoordinates.forEach((element) => {
                const marker = L.marker(element.coordinates, {icon: icon(element.icon)}).addTo(map);
                const popup = `
                    <h6 class="markerPopup-name text-center">${element.name}</h6>
                    <p class="text-center m-0 p-0 mb-2">${element.role}</p>
                    <a class="d-block text-center text-doc-primary text-underline popup-link" href="${element.link}">Linkedin</a>
                    `
                marker.bindPopup(popup)
            });

        
    }
}
</script>

<style lang="scss" scoped>
.logo-container {
    max-height: 80px;

    img {
        max-height: 50px;
    }
}
#team-map{
    height: 650px;
}
</style>