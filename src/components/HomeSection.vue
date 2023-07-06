<template>
    <div class="wrapper d-flex justify-content-center mb-5 py-5 py-md-4">
        <div class="singleSectionWrap text-doc-white row g-5" :class="className, { 'flex-row-reverse': reverse }">
            <div class="textPart text-center text-lg-start d-flex flex-column justify-content-center col-12 col-lg-6">
                <h3 class="text-doc-white pb-3">{{ title }}</h3>
                <p>{{ subTitle }}</p>
            </div>
            <div class="imgPart mx-auto d-flex justify-content-center col-12 col-lg-6">
                <!-- <img class="img-fluid" :src="imgPath + imgLg + imgExt" :alt="imgName"> -->
                <picture>
                    <source media="(max-width: 768px)" :srcset="imgPath + imgs.imgSm + imgExt">
                    <source media="(max-width: 992px)" :srcset="imgPath + imgs.imgMd + imgExt">
                    <img class="img-fluid" :src="imgPath + imgs.imgLg + imgExt" :alt="imgs.imgLg">
                </picture>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'Cerca tra centinaia di medici vicini a te o nella città che preferisci',
            subTitle: 'Scegli la città e usa tutte le potenzialità di Doctors NET. Filtra tutti i risultati visualizzati in base alle tue preferenze.',
            imgPath: '/img/other/',
            imgExt: '.png',
        }
    },
    props: ['className', 'reverse', 'imgs'],

}
</script>

<style lang="scss" scoped>
.singleSectionWrap {
    h3 {
        font-size: 30px;
    }
    p{
        font-size: 15px;
    }
    .imgPart{
        max-width: 500px;
        @media screen and (min-width: 768px) {
            max-width: 100%;
        }
    }
}


@media screen and (min-width: 768px) {
    .singleSectionWrap {
        h3 {
            font-size: 40px;
        }
        p{
            font-size: 20px;
        }
    }


}
</style>