<template>
    <v-hover>
        <template v-slot:default="{isHovering, props}">
            <span v-bind="props" :style="{opacity: isHovering ? 1 : 0.5, width: '30px', height: '85px', transformOrigin: 'center center', position: 'fixed'}" class="btn-responsive-position justify-space-around rounded-lg align-center pa-1 text-body-2 bg-teal-lighten-3 text-teal-darken-4 d-flex flex-column">
                <v-hover>
                    <template  v-slot:default="{ isHovering, props }">
                        <v-icon v-bind="props" :class="`cursor-pointer ${!isHovering? 'text-teal-darken-5': 'text-teal-darken-2'}`">mdi-instagram</v-icon>
                    </template>
                </v-hover>
                <v-hover>
                    <template  v-slot:default="{ isHovering, props }">
                        <v-icon v-bind="props" :class="`cursor-pointer ${!isHovering? 'text-teal-darken-5': 'text-teal-darken-2'}`">mdi-facebook</v-icon>
                    </template>
                </v-hover>
            </span>
        </template>
        
    </v-hover>

</template>

<style scoped>

    .btn-responsive-position{
        top: 60%;
        left: 2.5%; 
        right: 50%; 
        
    }
    @media (min-width: 700px) { 
        .btn-responsive-position{
            left: 0.5%
        }
    }   
</style>