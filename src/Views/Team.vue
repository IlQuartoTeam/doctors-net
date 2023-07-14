<template>
    <div class=" max-website">
        <h1 class="text-doc-blue fw-bold text-center">Il team dietro <br> <span class="text-doc-primary">DOCTORS NET</span></h1>
        <small class="d-block text-center py-3 text-doc-blue">Siamo la carica dei <code class="fw-bold text-doc-blue">101</code> <em>full stack developers</em>.</small>
        <div class="px-2 px-md-5">
            <div class="map py-4">
                <div id="team-map"></div>
            </div>
            <div class="greetings p-2">
                <h2 class="text-doc-blue"><strong>I ringraziamenti essenziali</strong></h2>
                <p class="text-doc-blue">Innazitutto un grazie a noi stessi: 
                    <a href="https://github.com/raffaelecapaldo">Raffaele</a>, 
                    <a href="https://github.com/Gaetano26">Gaetano</a>, 
                    <a href="https://github.com/Lip-7">Filippo</a>, 
                    <a href="https://github.com/nicolozibra1">Nicol&ograve;</a>, 
                    <a href="https://github.com/filecc">Filippo</a>, senza le ore passate davanti allo schermo, senza essere paperelle 
                    l&apos;uno dell'altro non saremmo arrivati a scrivere queste righe. Quindi, ✨ bravi tutti✨.
                </p>
                <h2 class="text-doc-blue"><strong>I ringraziamenti importanti</strong></h2>
                <p class="text-doc-blue">
                    Un grazie speciale a tutte le ragazze e a tutti i ragazzi di Classe 92, senza i quali questi 6 mesi sarebbero stati decisamente meno entusiasmanti, grazie per tutte le risate, i messaggi su telegram e discord, i giochi, le ore passate a condividere schermi, a fare altre lezioni e a confrontarsi. Grazie.
                    
                </p>
                <h2 class="text-doc-blue"><strong>I ringraziamenti necessari</strong></h2>
                <p class="text-doc-blue">
                    Necessari, ma non fatti controvoglia. Un grazie speciale a Clelia Fradella, la nostra insegnante, che con instancabile dedizione ha spiegato per 6 mesi, moltissime ore, da come si centra un <code>div</code> a come si imposta l'API da Laravel. <span class="text-uppercase">&egrave;</span> stato un viaggio intenso, l'abbiamo affrontato a testa alta ed eccoci qui, su questo sito web che sta davvero in piedi da solo. <br><br> Grazie ai nostri tutor, Marco e Samuel, senza i quali nei pomeriggi di studio avremmo dovuto avere 12 ore in pi&ugrave;. E senza i quali sicuramente non avremmo scoperto molte cose nuove.
                </p>
                <h2 class="text-doc-blue"><strong>I ringraziamenti finali</strong></h2>
                <p class="text-doc-blue">
                    Arrivano alla fine, ma non per importanza. Grazie ai nostri Project Manager, Giuseppe e Giuliano, e grazie al nostro coordinatore di classe, Adriano. Soprattutto in questa ultima fase, siete stati un buon appoggio e un ottimo stimolo. 
                    <br><br>E grazie a Boolean, senza la quale alla fine di tutto, niente sarebbe stato possibile. 
                    Ne &egrave; valsa la pena.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        
        let zoom = 15
        const windowWidth = window.innerWidth
        if(windowWidth < 1000)
        {
            zoom = 14
        }
        
        const map = L.map('team-map', { zoomControl: false, doubleClickZoom: false  }).setView([45.90675, 13.30963], zoom)

        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: zoom,
                minZoom: zoom,
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
    

    img {
        max-height: 40px;
    }
}
#team-map{
    height: 30rem;
    border-radius: 20px;
    margin: 0 auto;
    @media screen and (min-width: 700px) {
        height: 40rem;
    }
    @media screen and (min-width: 1000px) {
        height: 46rem;
    }
}
.greetings{
    columns: 1;
    @media screen and (min-width: 768px) {
        columns: 2;
    }
    @media screen and (min-width: 992px) {
        columns: 3;
    }
    
}
</style>