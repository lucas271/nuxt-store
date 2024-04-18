<template>
    <v-card class="bg-teal-lighten-5 pa-2 rounded-md text-blue-grey-darken-4 d-flex flex-column"       width="50vw" height="45vh">
        <v-card-title class="d-flex justify-start ga-2 items-center "><v-icon>mdi-cart-outline</v-icon> Carrinho</v-card-title>
        
        <v-divider :thickness="4"/>
        <div class="w-full d-flex justify-space-between text-subtitle-1 text-blue-grey-darken-2">
            <span class="w-25 text-center text-sm-subtitle-1">Produto</span>
            <span class="w-25 text-center">Subtotal</span>
        </div>
        <v-divider :thickness="4"/>
        <template v-if='!cartStore.loading'>
            <div class="d-flex flex-column ga-4 flex-shrink-1 flex-grow-1  my-3 overflow-y-auto overflow-x-hidden px-sm-4">
                <div class="d-flex w-100 h-75 overflow-hidden flex-shrink-0 ga-2 justify-space-between" :style="{position: 'relative'}" v-if='cartStore?.cartProducts?.length > 0' v-for='item in cartStore.cartProducts'>
                    <div class="w-25 d-flex align-center justify-center">
                        <v-img
                        aspect-ratio="4/3"
                        :src="item.product.img"
                        width="100%"
                        height="100%"
                        
                        ></v-img>
                    </div>
                    <div class="pa-2 d-flex py-1  px-1 h-100 overflow-auto justify-center justify-lg-space-evenly align-center flex-shrink-1 flex-grow-1 ga-4 w-50  my-auto">
                        <div class="d-flex ga-1 flex-column  align-lg-center align-md-start h-auto flex-shrink-1 justify-lg-center overflow-auto flex-grow-1">
                            <v-card-title class="text-md-h6 text-sm-subtitle-1 ma-0 pa-0 text-blue-grey-darken-3 text-wrap flex-shrink-1 flex-grow-1 flex-lg-grow-0">{{item.product.name}}</v-card-title>
                            <v-card-subtitle class="text-break text-wrap ma-0 pa-0 text-caption text-lg-center text-blue-grey-darken-5 font-bold">UN: R${{Number(item.product.price).toFixed(2).replace('.', ',')}}</v-card-subtitle>
                        </div>
                        <div class="d-flex flex-column ga-3">
                            <span class="text-lg-body-2   text-wrap font-italic">R${{Number(item.quantity * item.product.price).toFixed(2).replace('.', ',')}}</span>


                            <div class="d-flex justify-space-between align-center text-blue-grey-darken-2 ga-2">
                                <v-btn :active='item.product?.loading === false' class="rounded-xl text-blue-grey-darken-2" size="small" density="comfortable" variant='tonal' icon="mdi-arrow-left text-subtitle-2" @click='cartStore.deleteSingleCartProduct(item.product.id)'></v-btn>
                                <div class="flex-grow-1 text-center text-sm-body-2 text-md-body-1 text-subtitle-2" v-if="!item.product?.loading">{{item.quantity}}</div>
                                <div class="flex-grow-1 text-center text-sm-body-2 text-md-body-1 text-subtitle-2 d-flex justify-center align-center" v-else> <v-progress-circular indeterminate/> </div>
                                <v-btn :active='item.product?.loading === false' class="rounded-xl text-blue-grey-darken-2" size="small" density="comfortable" variant='tonal' icon="mdi-arrow-right text-subtitle-2" @click='cartStore.addProduct(item.product.id)'></v-btn>
                            </div>
                            <v-btn class="text-subtitle-2 font-weight-bold text-uppercase" variant='tonal' @click="navigateTo(`/item/${item.product.id}`)">ver +</v-btn>

                        </div>

                    </div>

                </div>
                <div  class="d-flex w-100 h-75 overflow-hidden flex-shrink-0 justify-space-evenly align-center flex-column" v-else>
                    <article class='text-center'>
                        <h3 class="text-h4"> Seu carrinho está vazio... </h3>
                        <p class="text-subtitle-2"> Clique no botão para procurar items </p>
                    </article>

                    <v-btn @click="changeRoute('/item')">
                        todos os items
                        {{cartStore.cartProducts}}
                    </v-btn> 
                </div>
            </div>

            <v-card-text tag="span" class="w-100 pt-2 text-subtitle-2 d-flex justify-space-between align-center">
                <v-btn class="text-subtitle-2" variant='tonal' @click="changeRoute('/cart')">Ir para carrinho</v-btn>
                <span class='text-teal-darken-3 text-uppercase text-subtitle-1 '>R${{cartStore.cartProducts.reduce((pv, cv) => ({totalPrice: (cv.quantity * cv.product.price) + pv.totalPrice}), {totalPrice: 0, quantity: 0}).totalPrice.toFixed(2).replace('.', ',')}}</span>
            </v-card-text>
        </template>
        <div class='flex-grow-1 d-flex align-center justify-center' v-else>
            <v-progress-circular indeterminate/>
        </div>
    </v-card>
</template>

<script setup lang='ts'>

    import {useCartStore} from '../../lib/services/cartStore.ts'
    async function changeRoute(path?: string) {
        window.location.href = path || '/';
    }  
    const cartStore = useCartStore()

</script>
