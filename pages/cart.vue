<template>
        <v-container class="h-100 w-100">
            <v-card class="h-100 w-100 d-flex flex-column justify-space-between pa-3 bg-teal-lighten-4 ">
                <header class='text-teal-darken-4'>
                    <v-card-title class="text-center font-weight-bold text-sm-left text-wrap text-uppercase ">Carrinho de compras</v-card-title>
                    <v-card-subtitle class="text-wrap text-caption text-sm-subtitle-2">Ao clicar em comprar você será redirecionado para o whatsapp com uma mensagem indicando os produtos selecionados.</v-card-subtitle>
                </header>
                
                <div class="d-flex flex-column ga-4 overflow-auto my-3 w-100 flex-grow-1 flex-shrink-1" >
                    <v-divider thickness="2" class=''/>

                    <template v-if="!cartStore.loading" >
                        <template v-if="cartStore.cartProducts.length > 0" v-for='product in cartStore.cartProducts'>
                            <div class="h-75 w-100 d-flex align-center" >
                                <div class="d-flex w-100 h-100 text-grey-darken-4 justify-space-evenly py-2 px-1 flex-column flex-md-row align-center ga-4 flex-grow-1 flex-shrink-1 overflow-auto">
                                    <div class="d-flex flex-shrink-1 flex-grow-1 h-100 w-100 justify-between align-center overflow-hidden">
                                        <v-img class="w-50 h-100"  :src="product.product.img"/>
                                        <article class=" w-50 pa-1 pa-sm-2 text-center overflow-hidden">
                                            <v-card-title class="text-sm-h6 text-subtitle-1 text-wrap">{{product.product.name}}</v-card-title>
                                            <v-card-subtitle class="text-sm-subtitle-1 text-subtitle-2 text-wrap overflow-auto" >{{product.product.description}}</v-card-subtitle>
                                            <v-card-text class="pa-0 ma-0 text-body-1 text-wrap  text-sm-subtitle-2">R${{product.product.price.toFixed(2).replace('.', ',')}}</v-card-text>
                                        </article>
                                    </div>
                                <div class="d-flex  flex-sm-row flex-column ga-2 align-center justify-space-between w-100">
                                    <div class="d-flex w-100 ga-2 justify-space-between align-center">
                                        <v-btn :active='product.product?.loading === false' density="compact" variant='tonal' icon="mdi-arrow-left" @click='cartStore.deleteSingleCartProduct(product.product.id)'/>
                                        <span class="text-body-2" v-if='!product.product.loading'>{{product.quantity}}</span>
                                        <span v-else> <v-progress-circular indeterminate/> </span>
                                        <v-btn :active='product.product?.loading === false' density="compact" variant='tonal' icon="mdi-arrow-right" @click='cartStore.addProduct(product.product.id)' />
                                    </div>

                                    <div class="w-100 flex-shrink-1 text-left text-sm-right mt-1 text-nowrap">
                                        <span class="d-inline font-weight-bold italic text-uppercase">subtotal: R${{(product.quantity * product.product.price).toFixed(2).replace('.', ',')}}</span>
                                    </div>
                                </div>
                                </div>

                            </div>
                            <v-divider thickness="2" class=''/>

                        </template>
                        <template v-else>
                            <article class='h-100 d-flex justify-center align-center ga-3 flex-column'>
                                <h3 class='text-h3'> Carrinho vazio! </h3>
                                <p class='text-subtitle-1 mb-3'> Infelizmente seu carrinho está vazio...</p>
                                <v-btn variant='tonal' @click="navigateTo('/item')"> Procurar itens </v-btn>
                            </article>
                        </template>
                    </template>
                    <template v-else>
                        <div class='flex-grow-1 d-flex justify-center align-center w-100'>
                            <v-progress-circular indeterminate/>
                        </div>
                    </template>
                </div>
                
                <footer class="d-flex w-100 justify-space-between align-center">
                    <v-card-actions>
                        <v-btn variant="tonal">Comprar </v-btn>

                    </v-card-actions>
                    <span class='font-weight-bold text-uppercase text-teal-darken-2'>Total R${{cartStore.cartProducts.reduce((pv, cv) => ({totalPrice: (cv.quantity * cv.product.price) + pv.totalPrice}), {totalPrice: 0, quantity: 0}).totalPrice.toFixed(2).replace('.', ',')}}</span>
                </footer>
            </v-card>
        </v-container>
</template>

<script setup lang='ts'>
    import {useCartStore} from '../lib/services/cartStore.ts'
    const cartStore = useCartStore()

    onMounted(async () => {
        cartStore.cartProducts?.length < 1 && cartStore.getCart()
    })
</script>
