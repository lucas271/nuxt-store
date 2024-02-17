<template>
    <v-card height="100%" class="overflow-hidden">
        <v-container class="h-100 d-flex flex-sm-row flex-column">
            <div class="bg-white ga-6 h-75 my-auto w-full">
                <div class="d-flex h-100 flex-column justify-space-between align-center ga-6 w-75 text-break word-break">
                    <article>
                        <v-card-title tag="h2" class="font-weight-bold text-teal-darken-4 text-wrap">Equilíbrio e harmonia em cada medida.</v-card-title>
                        <v-card-subtitle tag="span" class="font-weight-bold text-teal-darken-3 ">Cuide de você e encontre sua melhor versão.</v-card-subtitle>
                    </article>
                    <div class="w-100">
                        <v-img height='400px' width='100%' src="https://images.pexels.com/photos/8158947/pexels-photo-8158947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">

                        </v-img >
                    </div>
                </div>
            </div>
            <div class='flex-grow-1 h-75 my-auto ' :style="{position: 'relative'}">
                <div class="w-100 h-100 d-flex flex-column justify-space-between align-center">
                    <div class="w-100 text-left">
                        <v-card-title class="text-h2 text-teal-darken-4 ">
                            LifeCris
                        </v-card-title>
                        <v-card-subtitle class="mt-3 ml-1 text-subtitle-1 text-teal-darken-3 text-wrap">
                           Clinica de estética com o melhor preço do mercado
                        </v-card-subtitle>
                    </div>

                    <div class="w-100 mx-auto" :style="{position: 'relative'}">

                        <v-card-text class="w-100 d-flex justify-space-between text-teal-darken-4 text-uppercase font-weight-bold">
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

                    <div class="d-flex w-100 justify-space-between">
                        <v-btn class=" d-flex align-center justify-center gap-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                        <v-btn class="d-flex align-center justify-center gap-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                        <v-btn class="d-flex align-center d-sm-none d-md-inline justify-center gap-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                    </div>

                </div> 
            </div>
        </v-container>
    </v-card>

</template>
<script lang="ts">
</script>