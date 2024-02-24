<template>
    <section class="full-height-minus-navheader w-100 bg-teal-lighten-2 ">
        <v-container class="w-100 h-100">
            <v-sheet class="h-100 w-100 bg-transparent d-flex flex-column justify-space-around">
                    <v-card-title class="text-h4 text-center text-wrap text-sm-h4 text-h5 font-weight-bold">Mais vendidos</v-card-title>
                    <v-slide-group center-active class="h-100 d-flex justify-center align-center">                
                        <v-slide-group-item v-for="n in 20" :key="n" >
                            <v-card class="d-flex flex-column ma-3 responsive-card-slide bg-white rounded-lg overflow-hidden">
                                <img src="https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg" width="100%" height="40%"/>
                                <div class="d-flex flex-shrink-1 flex-column justify-space-between ga-2 overflow-hidden py-3">
                                    <article class="d-flex flex-column flex-shrink-1 flex-grow-1 overflow-auto ">
                                        <v-card-title class="text-wrap " >drenagem é coisa de viado NÃO FAZdrenagem é coisa de viado NÃO FAZ</v-card-title>
                                        <v-card-subtitle  class="text-wrap overflow-none">Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!Passe melhor pelo pós cirurgico!</v-card-subtitle>
                                    </article>
                                    <v-card-actions class="d-flex w-100 justify-space-between flex-wrap" :style="{width: '100%', height: 'fit-content'}">
                                        <v-btn variant="tonal" class="text-subtitle-2"> Ver mais </v-btn>
                                        <v-btn variant="tonal" class="text-subtitle-2"> + Carrinho </v-btn>
                                    </v-card-actions>
                                </div>


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