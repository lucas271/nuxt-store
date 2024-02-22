<template>
    <v-card class="full-height-minus-navheader w-100 bg-teal-lighten-2 ">
        <v-container class="w-100 h-100">
            <v-sheet class="h-100 w-100 bg-transparent d-flex flex-column justify-space-around">
                    <v-card-title class="text-h4 text-center text-wrap text-sm-h4 text-h5 font-weight-bold">Mais vendidos</v-card-title>
                    <v-slide-group show-arrows center-active class="h-75">                
                        <v-slide-group-item v-for="n in 20" :key="n" >
                            <div class="d-flex flex-column mx-3 h-100 bg-white rounded-lg" :style="{width: '10%'}">
                                <img src="https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg" width="100%" height="50%"/>
                                <v-card-item>
                                    <article>
                                        <v-card-title>drenagem é coisa de viado NÃO FAZ</v-card-title>
                                        <v-card-subtitle>Passe melhor pelo pós cirurgico!</v-card-subtitle>
                                    </article>


                                    <v-card-actions>
                                        <v-btn> Ver mais </v-btn>
                                        <v-btn> + Carrinho </v-btn>
                                    </v-card-actions>
                                </v-card-item>

                            </div>
                        </v-slide-group-item>
                    </v-slide-group>
                    <v-btn style="width: fit-content;" class="mx-auto" variant="tonal">
                        Ver Todos os produtos
                    </v-btn>
            </v-sheet>
        </v-container>
    </v-card>
</template>