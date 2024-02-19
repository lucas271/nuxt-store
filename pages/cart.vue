<template>
    <v-main>
        <v-container>
            <v-card class="h-100 w-100 d-flex flex-column justify-space-between pa-3">
                <header>
                    <v-card-title>Carrinho de compras</v-card-title>
                    <v-card-subtitle>Ao clicar em comprar você será redirecionado para o whatsapp com uma mensagem indicando os produtos selecionados.</v-card-subtitle>
                </header>
                <div class="d-flex justify-space-between align-center ga-4 flex-grow-1 flex-shrink-1 overflow-auto">
                    <v-img>

                    </v-img>
                    <v-card-item class="text-left">
                        <v-card-title>Item bonito</v-card-title>
                        <v-card-subtitle>esse item faz bonitezas</v-card-subtitle>
                        <v-card-text class="pa-0 ma-0">R$ 500,00</v-card-text>
                    </v-card-item>
                    <div class="d-flex ga-2 align-center justify-center">
                        <v-btn>
                            <v-icon>
                                mdi-arrow-left
                            </v-icon>

                        </v-btn>
                        <span>321093102</span>
                        <v-btn>
                            <v-icon >
                                mdi-arrow-right
                            </v-icon>
                        </v-btn>
                    </div>
                    <div>
                            500
                    </div>
                </div>
                <footer class="d-flex w-100 justify-space-between">
                    <v-card-actions>
                        <v-btn>Comprar </v-btn>

                    </v-card-actions>
                    <span>Total: 3000</span>
                </footer>
            </v-card>
        </v-container>
    </v-main>
</template>