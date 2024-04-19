

<template>
    <v-app-bar :elevation="2" rounded height="60" class="allow_overflow text-teal-darken-4 overflow-visible" style="overflow: visible !important; z-index: 1012; ">
        <template v-slot:prepend >
            <v-app-bar-title tag="h1" @click="navigateTo('/')" class="cursor-pointer text-sm-h5 text-h6">LifeCris</v-app-bar-title>
        </template>
        <v-spacer />
            <div class='w-50 d-sm-inline-block d-none h-auto relative pa-0 ma-0' :style="{position: 'relative'}" ref="searchRef">
                <v-text-field
                class="w-100"
                density="compact"
                variant="solo"
                id="searchBar"
                label="Procurar tratamentos"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                v-model='searchbarQuery'
                @focus='isSearchResponseFocused= true'
                @update:modelValue='searchProducts()'
                ></v-text-field>


                <v-list ref="responseRef" v-if='isSearchResponseFocused && products?.length > 0 ' class='py-0 bg-teal-darken-2 rounded-lg responsiveWidth rounded-b-lg d-flex flex-column ga-2'  dense :style="{position: 'absolute', top: '85%', left: '50%', transform: 'translateX(-50%)', overflow: 'visible', width:'fit-content', height: 'fit-content', maxHeight: '500px', minWidth: '70%', maxWidth: '80vw'}">
                    <template v-if="!responseLoading">
                        <v-hover  v-for='product in products'  v-if='!products?.errors'>
                            <template v-slot:default="{ isHovering, props }" >
                                <div v-bind="props" @click='navigateTo(`/item/${product?.id}`)' :class="`d-flex ga-2 pa-2 cursor-pointer justify-space-between align-center overflow-hidden w-100 ${isHovering ? 'bg-teal-darken-4' : ''}`"  style="height: 125px;">
                                    <v-list-item-media class='h-100 flex-shrink-1'>
                                        <v-img :src="product.img" height="200px" width="200px" />
                                    </v-list-item-media>
                                    <div class='d-flex flex-column ga-3 flex-grow-1 h-100 justify-space-around overflow-hidden' :style="{position: 'relative'}">
                                        <div class='overflow-hidden flex-shrink-1' :style="{position: 'relative'}">
                                            <v-list-item-title class='overflow-hidden text-sm-h6 text-subtitle-2 font-weight-bold text-left'>
                                            {{product.name}}
                                            </v-list-item-title >
                                            <v-list-item-subtitle class='overflow-hidden text-subtitle-2 text-wrap  text-sm-center text-md-left flex-shrink-1'>
                                                {{product.description}}                         
                                            </v-list-item-subtitle>

                                        </div>
                                        <v-list-item-subtitle class='text-sm-center text-md-left pa-1'>
                                            R${{Number(product.price).toFixed(2).replace('.', ',')}}
                                        </v-list-item-subtitle>
                                    </div>
                                </div>
                                <v-divider />
                            </template>
                        </v-hover>
                        <v-list-item class='bg-red' v-for='error in products?.errors' v-else>
                            <v-list-item-title>
                                {{error}}
                            </v-list-item-title>
                        </v-list-item>
                    </template>
                    <v-list-item class='bg-red d-flex justify-center align center' v-for='error in products?.errors' v-else>
                        <v-progress-circular indeterminate />
                    </v-list-item>


                </v-list>
            </div>
        <v-spacer />
        <template v-slot:append>
            <div class="d-none d-sm-flex">
                <v-btn aria-label="ir para Favoritos"  class="text-subtitle-1" v-if='data' @click="navigateTo('/wishList')">
                    <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" aria-label="abrir preview do carrinho" class="text-subtitle-1">

                            <v-badge floating tag="span" offset-y="28" offset-x="10" :content="cartStore.cartProducts.reduce((cv, pv) => ({quantity: cv.quantity + pv.quantity}), {quantity: 0}).quantity">
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <layoutCartPreview/>
                </v-menu>
                <v-btn :aria-label="data ? 'sair da conta': 'logar na conta'" class="text-subtitle-1" @click="data ? handleSignOut() : navigateTo('/auth')">
                    <v-icon v-if='isUserActive'>  mdi-exit-run</v-icon>
                    <v-icon v-else>mdi-account-outline</v-icon>
                </v-btn>
            </div>

            <v-app-bar-nav-icon class="d-sm-none" aria-label="extensor da navbar" @click="isOpen = !isOpen"/>
        </template>
    </v-app-bar>
    <v-lazy>
        <div class="d-sm-none" >
            <v-navigation-drawer
            location="top"  
            v-model="isOpen"
            temporary
            >
            </v-navigation-drawer>
        </div>
    </v-lazy>

</template>

<script lang="ts" setup>

    import {ref} from 'vue'
    import {useCartStore} from '../../lib/services/cartStore'

    const searchRef = ref(null)
    const responseRef = ref(null)
    const isOpen = ref<boolean>(false)
    const isSearchResponseFocused = ref<boolean>(false)
    const searchbarQuery = ref<string>('')
    const client = useSupabaseClient()
    const products = ref<any[] | {errors: string[]}>([])
    const data =  (await client.auth.getSession()).data.session?.user
    const isUserActive = ref<boolean>(false) 
    const cartStore = useCartStore()


    watch(data, (cv) => {
        console.log(cv)
        isUserActive.value = cv ? true : false
    })
    const handleOutsideClick = (e: any) => {
        if(searchRef.value?.contains(e.target) || responseRef.value?.$el?.contains(e.target) || e.target === responseRef.value?.$el || e.target === searchRef.value) return
        isSearchResponseFocused.value = false
    }
    onMounted(async () => {
        cartStore.cartProducts?.length < 1 && cartStore.getCart()
    })

    watch(isSearchResponseFocused, (cv) => !cv ? document.removeEventListener("click", handleOutsideClick) : document.addEventListener("click", handleOutsideClick))

    const responseLoading = ref<boolean>(false)
    const searchProducts = async () =>{
        responseLoading.value = true
        products.value = searchbarQuery && await $fetch('/api/product?data='+JSON.stringify({
        startsWith: searchbarQuery.value,
        take: 5,
        type: 'products'})).then(res => {
            responseLoading.value = false
            return res?.product?.products ? res?.product?.products : {errors: ['nenhum produto']}
        }).catch(res => {
            responseLoading.value = false
            return {errors: JSON.parse(res.data.message)?.errors || ['Erro ao procurar produtos']}
        })}
    const handleSignOut = async () => {
    try {
      await client.auth.signOut({redirectTo: '/'})
      return reloadNuxtApp() 
    } catch (err) {
    }
  }
</script>

<style>
    .responsiveWidth{
        @media (max-width: 700px){
            width: 200%;
        }
    }
    .allow_overflow .v-toolbar__content{
        overflow: visible !important;
    }
</style>