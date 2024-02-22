<template>
    <v-main class="full-height-minus-navheader">
        <v-container class="h-100 w-100">
            <v-card class="h-100 w-100 d-flex flex-column justify-space-between pa-3">
                <header>
                    <v-card-title class="text-center text-sm-left text-wrap text-uppercase">Carrinho de compras</v-card-title>
                    <v-card-subtitle class="text-wrap text-caption text-sm-subtitle-2">Ao clicar em comprar você será redirecionado para o whatsapp com uma mensagem indicando os produtos selecionados.</v-card-subtitle>
                </header>
                
                <div class="d-flex flex-column ga-4 overflow-auto my-3 w-100 flex-grow-1 flex-shrink-1" >
                    <div class="h-75" v-for='i in 12'>
                        <div class="d-flex justify-space-evenly py-2 px-1 flex-column flex-md-row align-center ga-4 flex-grow-1 flex-shrink-1 overflow-auto">
                            <div class="d-flex w-100 h-100 justify-between">
                                <v-img class="w-50 h-75" height="75%" src="https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg"/>
                                <v-card-item class=" w-50 pa-1 pa-sm-2 text-center">
                                    <v-card-title class="text-sm-h6 text-subtitle-1 text-wrap">Item bonito</v-card-title>
                                    <v-card-subtitle class="text-sm-subtitle-1 text-subtitle-2 text-wrap overflow-auto">esse item faz bonitezas</v-card-subtitle>
                                    <v-card-text class="pa-0 ma-0 text-body-1 text-wrap  text-sm-subtitle-2">R$ 500,00</v-card-text>
                                </v-card-item>
                            </div>
                            <div class="d-flex  flex-sm-row flex-column ga-2 align-center justify-space-between w-100">
                                <div class="d-flex w-100 ga-2 justify-space-between align-center">
                                    <v-btn density="compact" icon="mdi-arrow-left"/>

                                    <span class="text-body-2">321093102</span>
                                    <v-btn density="compact" icon="mdi-arrow-right"/>
                                </div>

                                <div class="w-100 flex-shrink-1 text-left text-sm-right mt-1 text-nowrap">
                                    <span class="d-md-none d-inline">subtotal: </span>R$500.00
                                </div>
                            </div>
                        </div>
                        <v-divider thickness="2">

                        </v-divider>
                    </div>
                    
                </div>
                
                <footer class="d-flex w-100 justify-space-between align-center">
                    <v-card-actions>
                        <v-btn variant="tonal">Comprar </v-btn>

                    </v-card-actions>
                    <span>Total: 3000</span>
                </footer>
            </v-card>
        </v-container>
    </v-main>
</template>