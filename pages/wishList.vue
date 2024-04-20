<template>
    <header class="mx-sm-12 mx-4 my-4  border-b-2 ">
        <div class="d-flex justify-space-between py-2 align-center">
            <h2 class="text-left  d-flex align-center ga-1 ga-sm-2 text-sm-h6 text-subtitle-2"><v-icon class='text-red-darken-2'>mdi-heart-outline</v-icon> Meus Favoritos</h2>
            <v-btn density="comfortable" class="text-caption text-sm-subtitle-1" @click="deleteAll()">Apagar tudo</v-btn>
        </div>


        <div class="w-100 mt-6">
            <sharedDisplayErrors v-if="wishListStore.errors.length > 0 " :errors="wishListStore.errors" :filter="filter" :refreshFunc="wishListStore.getAllWishListProducts" :loading="wishListStore.loading"/>
        </div>
    </header>

    <v-divider thickness="3"></v-divider>
    <v-container>
        <sharedItemsGrid :products="wishListStore.wishList.map(item => ({...item.product}))" :loading="wishListStore.loading" :storeFunc="wishListStore.getAllWishListProducts" >
            <template v-slot:icon-slot="{ data }">
                <sharedDefaultProductIcons y='top'/>
            </template>
        </sharedItemsGrid>
    </v-container>
</template>

<script setup lang="ts">
    import {useWishListStore} from '../lib/services/wishListStore.ts'
    const wishListStore = useWishListStore()
    const deleteAll = async () => {
        const isSure = confirm('Tem certeza que deseja remover todos os items do seus favoritos?')
        isSure && await wishListStore.removeAllFromWishList()
    }
    await useAsyncData('wishlist', async () => await wishListStore.getAllWishListProducts())

    definePageMeta({
        middleware: 'need-user'
    })

    useSeoMeta({
        title: `Favoritos`,
        ogTitle: `Favoritos`,
        description: "Aqui você encontrará todos os salvos por você como favoritos.",
    })
</script>
