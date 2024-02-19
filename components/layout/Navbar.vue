<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
    <v-app-bar :elevation="2" rounded height="60" class="text-teal-darken-4">
        <template v-slot:prepend >
            <v-app-bar-title>LifeCris</v-app-bar-title>
        </template>
        <v-spacer />
            <v-text-field
                class="d-sm-inline-block d-none"
                :loading="loading"
                density="compact"
                variant="solo"
                label="Procurar tratamentos"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
            ></v-text-field>
        <v-spacer />
        <template v-slot:append>
            <div class="d-none d-sm-flex">
                <v-btn>
                    <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">

                            <v-badge floating tag="span" offset-y="28" offset-x="10" content="100">
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <v-card class="bg-teal-lighten-5 pa-2 rounded-md text-blue-grey-darken-4 d-flex flex-column"       width="50vw" height="45vh">
                        <v-card-title class="d-flex justify-start ga-2 items-center "><v-icon>mdi-cart-outline</v-icon> Carrinho</v-card-title>
                        
                        <v-divider :thickness="4"/>
                        <div class="w-full d-flex justify-space-between text-subtitle-1 text-blue-grey-darken-2">
                            <span class="w-25 text-center text-sm-subtitle-1">Produto</span>
                            <span class="w-25 text-center">Subtotal</span>
                        </div>
                        <v-divider :thickness="4"/>

                        <div class="d-flex flex-column ga-4 flex-shrink-1 flex-grow-1  my-3 overflow-y-auto overflow-x-hidden">
                            <div class="d-flex w-100 h-75 overflow-hidden flex-shrink-0 ga-2 justify-space-between" :style="{position: 'relative'}">
                                <div class="w-25 d-flex align-center justify-center">
                                    <v-img
                                    aspect-ratio="4/3"
                                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                    width="100%"
                                    height="100%"
                                    cover
                                    ></v-img>
                                </div>
                                <div class="d-flex py-1 px-1 h-100 overflow-auto justify-lg-space-between items-center flex-shrink-1 flex-grow-1 ga-4 w-50 flex-column flex-lg-row my-auto">
                                    <div class="d-flex ga-1 flex-column  align-lg-center align-md-start h-auto flex-shrink-1 justify-lg-center overflow-auto">
                                        <v-card-title class="text-md-h6 text-sm-subtitle-1 ma-0 pa-0 text-blue-grey-darken-3 text-wrap flex-shrink-1 flex-grow-1 flex-lg-grow-0">Titulo do produto</v-card-title>
                                        <v-card-subtitle class="text-break ma-0 pa-0 text-caption text-lg-center text-blue-grey-darken-5 font-bold">R$1000,00</v-card-subtitle>
                                    </div>
                                    <div class="d-flex justify-between align-center text-blue-grey-darken-2 ga-2">
                                        <v-btn class="rounded-xl text-blue-grey-darken-2" size="small" density="comfortable" icon="mdi-arrow-left text-subtitle-2"></v-btn>
                                        <div class="flex-grow-1 text-center text-sm-body-2 text-md-body-1 text-subtitle-2">R$1000</div>
                                        <v-btn class="rounded-xl text-blue-grey-darken-2" size="small" density="comfortable" icon="mdi-arrow-right text-subtitle-2"></v-btn>
                                    </div>
                                </div>
 
                                <div class="d-flex pa-1 w-25 flex-column justify-space-between overflow-hidden  justify-lg-center text-center text-blue-grey-darken-4">
                                    <span class="text-body-2  text-wrap overflow-auto">R$6000,00</span>
                                    <v-btn class="text-subtitle-2">ver</v-btn>
                                </div>
                            </div>
                        </div>

                        <v-cart-text tag="span" class="w-100 pt-2 text-subtitle-2 d-flex justify-space-between align-center">
                            <v-btn class="text-subtitle-2">Ir para carrinho</v-btn>
                            <span>Total: R$300000,00</span>
                        </v-cart-text>
                    </v-card>
                </v-menu>
                <v-btn >
                    <v-icon>mdi-account-outline</v-icon>
                </v-btn>
            </div>

            <v-app-bar-nav-icon class="d-sm-none" @click="isOpen = !isOpen"/>
        </template>
    </v-app-bar>
    <div class="d-sm-none">
        <v-navigation-drawer
        location="top"  
        v-model="isOpen"
        temporary
        >
        </v-navigation-drawer>

    </div>

</template>