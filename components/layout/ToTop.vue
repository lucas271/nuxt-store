<template>
    <v-btn
        position="fixed"
        density="comfortable"
        icon="mdi-arrow-up"
        class="bg-teal-lighten-2 text-body-1 btn-responsive-position"
        
    >
    </v-btn>
</template>

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
</style>