<template>
    <div>
        <ButtonComponent type="button" class="primary" @click="generatePDF">Scarica il CV</ButtonComponent>
    </div>
</template>
  
<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import ButtonComponent from './ButtonComponent.vue'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
                    // Esperienze lavorative
                    { text: 'Esperienze lavorative:', style: 'header' },
                    {
                        ul: [
                            'Esperienza 1',
                            'Esperienza 2',
                            'Esperienza 3'
                        ]
                    },
                    // Spazio vuoto per separare le esperienze lavorative dalle esperienze formative
                    { text: '\n\n' },
                    // Esperienze formative
                    { text: 'Esperienze formative:', style: 'header' },
                    {
                        ul: [
                            'Esperienza formativa 1',
                            'Esperienza formativa 2',
                            'Esperienza formativa 3'
                        ]
                    }
                ],
                images: {
                    doc_image: this.doctor.profile_image_url
                },
                styles: {
                    header: {
                        bold: true,
                        fontSize: 14
                    }
                }
            };

            pdfMake.createPdf(documentDefinition).download('CV.pdf');
        }
    }
};
</script>

<style lang="scss" scoped></style>