<template>
    <v-card tag="section" class="overflow-hidden full-height-minus-navheader d-flex">
        <v-container class="h-100 my-auto d-flex flex-sm-row flex-column overflow-hidden py-4 ga-6 justify-space-evenly">
            <div class="d-flex h-100 flex-column overflow-hidden justify-space-between align-center ga-6 w- flex-shrink text-break word-break">
                <article class="w-100  text-left">
                    <v-card-title class="text-sm-h2 text-h3 text-teal-darken-4 text-wrap mx-0 px-0 overflow-visible" tag="h3">
                        Company name
                    </v-card-title>
                    <v-card-subtitle tag="p" class="mt-3 ml-1 text-sm-subtitle-1 text-subtitle-2 pa-0 ma-0 t text-teal-darken-3 text-wrap">
                        RANDOM SUBTITLE TEST
                    </v-card-subtitle>
                </article>
                <div class="flex-grow-1 flex-shrink-1 w-100 overflow-hidden">
                    <v-lazy>
                        <v-img alt="imagem mulher sentada" preload height='auto'  width='100%' src="https://images.pexels.com/photos/8158947/pexels-photo-8158947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">

                        </v-img >
                    </v-lazy>

                </div>
            </div>
                <div class="w-100 h-100 d-flex flex-column justify-space-between ">
                    <span>
                        <v-card-title tag="span" class="font-weight-bold text-teal-darken-4 text-subtitle-1  text-wrap  text-sm-h5">Random slogan here.</v-card-title>
                        <v-card-subtitle tag="span" class="font-weight-bold text-teal-darken-3 text-wrap text-subtitle-2">RANDOM SUB SLOGAN HERE</v-card-subtitle>
                    </span>


                    <div class="w-100 mx-auto" :style="{position: 'relative'}">

                        <v-card-text tag="h4" class="w-100 d-flex justify-space-between text-teal-darken-4 text-uppercase font-weight-bold">
                            Confira nossos Procedimentos:
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column ga-4 flex-sm-row w-100 font-italic font-weight-bold">
                            <v-btn class="text-subtitle-2 w-100 flex-shrink-1 bg-teal-lighten-2" variant="tonal" >
                                Recomendados 
                            </v-btn>
                            <v-btn class="text-subtitle-2 w-100 flex-shrink-1 ma-0 flex-shrink-1" color="teal-lighten-1" variant="outlined" >
                                Todos
                            </v-btn>
                        </v-card-actions>
                    </div>

                    <div tag="span" class="d-none d-sm-flex w-100 justify-space-between">
                        <v-btn class=" d-flex align-center justify-center ga-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                        <v-btn class="d-flex align-center justify-center ga-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                        <v-btn class="d-flex align-center d-sm-none d-md-inline justify-center ga-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                    </div>

                </div> 
        </v-container>
    </v-card>
</template>