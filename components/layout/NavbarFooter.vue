<template>
    <div class="w-100">
        <v-bottom-navigation class="d-sm-none w-100 d-flex justify-center items-center ga-3 bg-teal-lighten-5 text-teal-lighten-3" height="60" fixed shift tag="footer">
            <v-btn class="h-100 text-subtitle-1 px-3" >
                <v-badge floating tag="span" aria-label="Ir para carrinho" offset-y="32" offset-x="12" :content="cartStore.cartProducts.reduce((cv, pv) => ({quantity: cv.quantity + pv.quantity}), {quantity: 0}).quantity"  @click="navigateTo('cart')">
                    <v-icon>mdi-cart-outline</v-icon>
                </v-badge>
            </v-btn>
            <v-btn :aria-label="!data?.session ? 'ir para pagina de autentificação' : 'sair'" class="h-100 text-subtitle-1 px-3" @click="navigateTo('auth')">
                <v-icon v-if="!data?.session" >mdi-account-outline</v-icon>
                <v-icon v-if="data.session" >mdi-exit-run</v-icon>
            </v-btn>

            <v-btn aria-label="ir para favoritos" class="h-100 text-subtitle-1 px-3" v-if="data?.session" @click="navigateTo('wishList')">
                <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>

</template>


<script setup lang="ts">
    import {useCartStore} from '../../lib/services/cartStore'

    const client = useSupabaseClient()
    const cartStore = useCartStore()
    const { data, error } = await client.auth.getSession()

</script>