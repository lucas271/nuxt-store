<template>
    <v-card class="bg-white text-teal-darken-1">

        <v-container class="d-flex justify-space-between ga-4 align-center flex-sm-row flex-column h-100 responsive-height">
            <v-avatar rounded="0" class="h-100 w-100 flex-grow-1 flex-shrink-1">
                <v-img height="100%"  src="https://img.freepik.com/free-photo/girl-deciding-what-product-better-look-up-thoughtful-touch-chin-thinking-smiling-shopping-alone-making-choice-considering-proposals_176420-44746.jpg">
                    
                </v-img>
            </v-avatar>
            <div class="d-flex flex-column justify-space-evenly" :style="{minWidth: '45%',}">
                <div>
                    <v-card-title class='text-h6 text-wrap text-sm-h5'>Não sabe o que quer?</v-card-title>
                    <v-card-subtitle class="text-wrap text-subtitle-2 text-sm-subtitle-1">Descubra algumas das possibilidades.</v-card-subtitle>
                </div>

                <div>
                    <v-card-text class="text-wrap text-caption">O teste irá te apresentar alguns dos tratamentos disponiveis para o seu caso</v-card-text>
                    <v-card-actions>
                        <v-btn variant="outlined">Fazer o teste</v-btn>
                    </v-card-actions>
                </div>
            </div>

        </v-container>
    </v-card>
</template>