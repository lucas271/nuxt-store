<template>
    <v-btn
    icon="mdi-whatsapp"
    class="bg-teal-lighten-2 text-body-1 btn-responsive-position"
    
    >
    </v-btn>
</template>

<style scoped>

    .btn-responsive-position{
        position: fixed;
        top: 81.5%;
        right:2%;
        transformOrigin: center center
    }

    @media (min-height: 800px) { 
        .btn-responsive-position{
            top: 85.5%;            
        }
    }   
    @media (min-width: 600px){
        .btn-responsive-position{
            top: 88.5%;            
        }    
    }
</style>