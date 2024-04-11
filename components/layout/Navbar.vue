

<template>
    <v-app-bar :elevation="2" rounded height="60" class="text-teal-darken-4 overflow-visible">
        <template v-slot:prepend >
            <v-app-bar-title @click="navigateTo('/')" class="cursor-pointer">LifeCris</v-app-bar-title>
        </template>
        <v-spacer />
            <div class='w-50 h-auto relative pa-0 ma-0' :style="{position: 'relative'}" ref='searchRef'>
                <v-text-field
                class="d-sm-inline-block w-100 d-none"
                density="compact"
                variant="solo"
                label="Procurar tratamentos"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                v-model='searchbarQuery'
                @focus='isSearchResponseFocused= true'
                @update:modelValue='searchProducts()'
                ></v-text-field>


                <v-list v-if='isSearchResponseFocused && products?.length > 0' class='pa-2 w-100 bg-blue-grey-lighten-4 z-50 rounded-b-lg d-flex flex-column ga-2'  dense :style="{position: 'absolute', top: '85%', left: '0%', maxHeight: '300px'}">
                    <div v-for='product in products' v-if='!products?.errors ' class='d-flex ga-2 w-100 h-50 justify-space-between align-center overflow-hidden'  style='postition: relative;'>
                        <v-list-item-media class='w-50 h-100'>
                            <v-img :src='product.img' cover class='w-100 h-100'/>
                        </v-list-item-media>
                        <div class='d-flex flex-column flex-shrink-1' :style="{position: 'relative'}">
                            <div class='' :style="{position: 'relative'}">
                                <v-list-item-title class='overflow-hidden text-sm-center text-md-left'>
                                {{product.name}}
                                </v-list-item-title >
                                <v-list-item-text class='overflow-hidden text-subtitle-2 text-grey-darken-2 text-sm-center text-md-left flex-shrink-1'>
                                    {{product.description}}
                                </v-list-item-text>

                            </div>
                            <v-list-item-subtitle class='text-sm-center text-md-left'>
                                R${{Number(product.price).toFixed(2).replace('.', ',')}}
                                {{searchRef}}
                            </v-list-item-subtitle>
                        </div>

                    </div>
                    <v-list-item class='bg-red' v-for='error in products?.errors' v-else>
                        <v-list-item-title>
                            {{error}}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        <v-spacer />
        <template v-slot:append>
            <div class="d-none d-sm-flex">
                <v-btn v-if='data.session' @click="navigateTo('/wishList')">
                    <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">

                            <v-badge floating tag="span" offset-y="28" offset-x="10" :content="cartStore.cartProducts.reduce((cv, pv) => ({quantity: cv.quantity + pv.quantity}), {quantity: 0}).quantity">
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <layoutCartPreview/>
                </v-menu>
                <v-btn @click="data.session ? handleSignOut() : navigateTo('/auth')"}>
                    <v-icon>{{data.session ? "mdi-exit-run" : "mdi-account-outline"}}</v-icon>
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

<script lang="ts" setup>
    import {ref} from 'vue'
    import {useCartStore} from '../../lib/services/cartStore.ts'
    const isOpen = ref<boolean>(false)
    const isSearchResponseFocused = ref<boolean>(false)
    const searchbarQuery = ref<string>('')
    const client = useSupabaseClient()
    const router = useRouter()
    const products = ref<any[] | {errors: string[]}>([])
    const { data, error } = await client.auth.getSession()
    const searchRef = ref(null)
    const cartStore = useCartStore()
    onMounted(async () => {
        cartStore.cartProducts?.length < 1 && cartStore.getCart()
    })

    const searchProducts = async () => products.value = searchbarQuery && await $fetch('/api/product?data='+JSON.stringify({
        startsWith: searchbarQuery.value,
        take: 5,
        type: 'products'})).then(res => res?.product?.products ? res?.product?.products : {errors: ['nenhum produto']}).catch(res => {
        return {errors: JSON.parse(res.data.message)?.errors || ['Erro ao procurar produtos']}
    })
    const handleSignOut = async () => {
    try {
      await client.auth.signOut({redirectTo: '/'})
      return await reloadNuxtApp() 
    } catch (err) {
    }
  }
</script>onMounted, 