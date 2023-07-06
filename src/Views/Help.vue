<template>
    <div ref="privacySection">
       <PrivacyComponent />
       <CtaComponent />
    </div>
</template>

<script>
import PrivacyComponent from '../components/PrivacyComponent.vue';
import CtaComponent from '../components/CtaComponent.vue';
import CookiesCompontent from '../components/CookiesComponent.vue'

export default {
    data() {
        return {
         
        }
    },
    components: {
        PrivacyComponent,
        CtaComponent,
        CookiesCompontent
        
    },
    methods: {
        scrollToSection() {
            console.log('ciao');
            const hash = window.location.hash;
            if (hash) {
                const element = this.$refs[hash.substring(1)];
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        },
    },
    mounted() {
        if (window.location.hash) this.scrollToSection();
    }

}
</script>

<style lang="scss" scoped></style>