<template>
    <div>
        <ButtonComponent type="button" class="primary" @click="generatePDF">Scarica il CV</ButtonComponent>
    </div>
</template>
  
<script>
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;
import ButtonComponent from './ButtonComponent.vue'


export default {
    props: ['doctor'],
    components: {
        ButtonComponent,
    },
    methods: {
        generatePDF() {
            const documentDefinition = {
                // Definisci la struttura del PDF personalizzato qui
                content: [
                    {
                        svg: '<svg width="50" height="50" viewBox="0 0 400 200"><defs><style>.cls-1{fill:#f38f23;}.cls-2{fill:#29a7b5;}</style></defs><path class="cls-1" d="M176.8,55.37c23.74-10.62,47.73-11.11,71.74-1.23,17.35,7.14,31,19,41.2,34.66a100.71,100.71,0,0,1,12.19,28.31c6.15,22.25,8.7,45,10.34,68s1.3,45.73.82,68.61c-.61,28.94-1,57.89-1.6,86.84,0,1.17.6,2.86-.66,3.4-1,.44-1.94-1-2.82-1.73q-17.14-13.74-34.25-27.51c-21.22-17.15-42.73-34-63.53-51.61a431.48,431.48,0,0,1-54-54.56c-9.12-11.07-17.85-22.4-23.59-35.66a89.13,89.13,0,0,1-4.4-60A88,88,0,0,1,155,69.45,81.6,81.6,0,0,1,176.8,55.37Z" transform="translate(-125 -47)"/><path class="cls-2" d="M444.8,55.56C468.19,66.91,484,85,491.85,109.72c5.68,17.88,5.41,35.95-.07,53.84-3,9.93-7.95,19-13.85,27.54-13.09,19-28.9,35.61-45.41,51.61s-34.2,30.38-52,44.72c-22.56,18.14-45,36.41-67.55,54.59-.91.74-1.8,2.3-3,1.68-1-.51-.46-2.14-.48-3.27q-.51-22-.95-43.92c-.5-27.28-1.45-54.56-1.3-81.84a432.12,432.12,0,0,1,7.09-76.43c2.62-14.1,5.7-28.07,12.16-41a89.18,89.18,0,0,1,43.16-42A88,88,0,0,1,420,47.94,81.41,81.41,0,0,1,444.8,55.56ZM425.18,97.81c-26.55-13.17-58.57-.27-70.68,25.6-12.45,26.57-.62,58.44,24.72,70.51,26.18,12.46,58.43.93,70.75-25.56C462.43,141.55,451.44,110.1,425.18,97.81Z" transform="translate(-125 -47)"/></svg>',
                        style: {
                            alignment: 'right'
                        }
                    },
                    { text: '\n\n' },
                    {
                        columns: [
                            // Colonna sinistra con l'immagine
                            {
                                width: '50%',
                                image: 'doc_image',
                                fit: [200, 200] // Dimensioni dell'immagine
                            },
                            // Colonna destra con le informazioni personali
                            {
                                width: '*',
                                text: [
                                    { text: 'Nome: ', bold: true },
                                    { text: `${this.doctor.name} ${this.doctor.surname}` + '\n\n' },
                                    { text: 'Indirizzo: ', bold: true },
                                    { text: `${this.doctor.address}` + '\n\n' },
                                    { text: 'Telefono: ', bold: true },
                                    { text: `${this.doctor.phone}` + '\n\n' },
                                    { text: 'Email: ', bold: true },
                                    { text: `${this.doctor.email}` + '\n\n' }
                                ]
                            }
                        ]
                    },
                    // Spazio vuoto per separare le colonne dall'elenco delle esperienze lavorative e formative
                    { text: '\n\n' },
                    { text: '\n\n' },
                    { text: '\n\n' },
                    // Esperienze lavorative
                    { text: 'Esperienze lavorative:', style: 'header' },
                    { text: '\n' },

                    {
                        ul: this.workExperiences,
                        lineHeight: 2
                    },
                    // Spazio vuoto per separare le esperienze lavorative dalle esperienze formative
                    { text: '\n\n' },
                    // Esperienze formative
                    { text: 'Esperienze formative:', style: 'header' },
                    { text: '\n' },
                    {
                        ul: this.studyExperiences,
                        lineHeight: 2
                    }
                ],
                images: {
                    doc_image: this.doctor.profile_image_url,
                    /* logo: 'https://photos.app.goo.gl/7AHiEDbiQCbEyASR9', */

                },
                styles: {
                    header: {
                        bold: true,
                        fontSize: 14
                    }
                }
            };

            pdfMake.createPdf(documentDefinition).download('CV.pdf');
        },
        getExperiences() {
            const fullExper = this.doctor.experiences;
            this.workExperiences = fullExper.filter(val => {
                return val.type == 'work';
            });
            this.studyExperiences = fullExper.filter(val => {
                return val.type == 'education';
            });
            this.studyExperiences = this.studyExperiences.map(val => {
                return `${val.name} dal ${val.start_date} ${val.end_date ? 'al ' + val.end_date : 'e tuttora in corso'}`
            })
            this.workExperiences = this.workExperiences.map(val => {
                return `${val.name} dal ${val.start_date} ${val.end_date ? 'al ' + val.end_date : 'e tuttora in corso'}`
            })
        }
    },
    mounted() {
        this.getExperiences();
    }
};
</script>

<style lang="scss" scoped></style>