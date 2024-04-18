<template>
    <v-btn
        position="fixed"
        density="comfortable"
        icon="mdi-arrow-up"
        :class="'bg-teal-lighten-2 text-body-1 btn-responsive-position ' + currentClass "
        v-if="!isHidden"
        @click="scrollTop"
        transition="fade-transition"
        style="transform-origin: center center;"
        ref="btnRef"
        aria-label="para cima"
    >

    </v-btn>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';


    const btnRef = ref(null)
    const isHidden = ref(true);
    const currentClass = ref<'slide-in-from-left' | 'slide-out-to-right'>('slide-in-from-left')

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const handleScroll = () => {
        const triggerPoint = 100;
        const isHiddenCv = triggerPoint > window.scrollY
        isHidden.value = isHidden.value === true ? isHiddenCv : isHidden.value
        console.log(isHiddenCv, isHidden.value)
        if(isHiddenCv === true && isHidden.value === false) {
            const btnDomElement = btnRef?.value?.$el
            if(!btnDomElement) return console.log('kkkk')
            currentClass.value = 'slide-out-to-right'
            btnDomElement.addEventListener('animationend', (e) => {
                console.log('oab')
                isHidden.value = true
                currentClass.value = 'slide-in-from-left'
            })
        }
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    });


</script>

<style scoped>

    .btn-responsive-position{
        top: 83%;
        left:2%;
        transformOrigin: center center
    }

    @media (min-height: 800px) { 
        .btn-responsive-position{
            top: 87%;            
        }
    }   
    @media (min-width: 600px){
        .btn-responsive-position{
            top: 90%;            
        }    
    }

    .slide-in-from-left {
        animation: 0.5s ease-in-out 0s 1 slideInFromLeft forwards;
    }
    .slide-out-to-right {
        animation: 0.5s ease-in-out 0s 1 slideOutToRight forwards;
    }

    @keyframes slideInFromLeft {
        0% {
            opacity: 0;
            transform: translateX(-50%);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOutToRight {
        0% {
            opacity: 1;
            transform: translateX(0%);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%);
        }
    }
</style>