<template>
    <div 
    v-if="client?.data?.session"
    ref='divRef' 
    class="text-subtitle-2 d-flex ga-3 " 
    :style="{position: 'absolute', [x === 'left' ? 'left' : 'right']: '2.5%', [y === 'top' ? 'top': 'bottom']: '2.5%'}">
        <v-hover>
            <template v-slot:default="{ isHovering, props }">
                <v-btn v-bind='props' :active="!wishListStore.loading" @click="wishListStore.wishList.find(item => item.product.id == (id || divRef?.parentElement?.parentElement?.attributes?.name?.value)) ? wishListStore.removeFromWishList(id || divRef?.parentElement?.parentElement?.attributes?.name?.value) : wishListStore.addToWishList(id || divRef?.parentElement?.parentElement?.attributes?.name?.value)" :class="'text-subtitle-2 ' + !isHovering ? 'text-red-darken-2' : 'text-red-darken-4'" :icon="wishListStore.wishList.find(item => item.product.id == (id || divRef?.parentElement?.parentElement?.attributes?.name?.value)) ? (isHovering ? 'mdi-heart-broken': 'mdi-heart') : (isHovering ? 'mdi-heart' : 'mdi-heart-outline')" density="comfortable"></v-btn>
            </template>
        </v-hover>
    </div>
</template>

<script setup lang='ts'>
    import {useWishListStore} from '../../lib/services/wishListStore.ts'
    const props = defineProps<{x?: 'left' | 'right', y?: 'top' | 'bottom', id: string}>()
    const client = await (await useSupabaseClient()).auth?.getSession()
    
    const divRef = ref(null) 
    const wishListStore = useWishListStore()

    wishListStore.wishList?.length < 1 && wishListStore.getAllWishListProducts(props?.id || divRef.value?.parentElement?.parentElement?.attributes?.name?.value)
    const emit = defineEmits(['editProduct'])
</script>