<template>
    <section class="full-height-minus-navheader w-100 bg-teal-lighten-2 ">
        <v-container class="w-100 h-100">
            <v-sheet class="h-100 w-100 bg-transparent d-flex flex-column justify-space-around">
                    <v-card-title class="text-h4 text-center text-wrap text-sm-h4 text-h5 font-weight-bold">Mais vendidos</v-card-title>
                    <v-slide-group center-active class="h-75 d-flex justify-center align-center">                
                        <v-slide-group-item v-for="n in 20" :key="n" >
                            <v-card class="d-flex flex-column mx-3   bg-white rounded-lg" height="350px" width="200px">
                                <img src="https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg" width="100%" height="45%"/>
                                <v-card-item class="d-flex flex-column ga-2">
                                    <article class="flex-shrink-1">
                                        <v-card-title class="text-wrap">drenagem é coisa de viado NÃO FAZ</v-card-title>
                                        <v-card-subtitle  class="text-wrap">Passe melhor pelo pós cirurgico!</v-card-subtitle>
                                    </article>


                                    <v-card-actions class="flex flex-wrap ga-2">
                                        <v-btn variant="tonal"> Ver mais </v-btn>
                                        <v-btn variant="tonal ma-0"> + Carrinho </v-btn>
                                    </v-card-actions>
                                </v-card-item>

                            </v-card>
                        </v-slide-group-item>
                    </v-slide-group>
                    <v-btn style="width: fit-content;" class="mx-auto" variant="tonal">
                        Ver Todos os produtos
                    </v-btn>
            </v-sheet>
        </v-container>
    </section>
</template>