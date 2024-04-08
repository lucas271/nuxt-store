<template>
    <div 
    ref='divRef' 
    class="text-subtitle-2 d-flex ga-3" 
    :style="{position: 'absolute', [x === 'left' ? 'left' : 'right']: '5%', [y === 'top' ? 'top': 'bottom']: '5%'}">
        <v-hover>
            <template v-slot:default="{ isHovering, props }">
                <v-btn v-bind='props' :active="!wishListStore.loading" @click="wishListStore.wishList.find(item => item.product.id == divRef.parentElement.parentElement.attributes.name.value) ? wishListStore.removeFromWishList(divRef.parentElement.parentElement.attributes.name.value) : wishListStore.addToWishList(divRef.parentElement.parentElement.attributes.name.value)" :class="'text-subtitle-2 ' + !isHovering ? 'text-red-darken-2' : 'text-red-darken-4'" :icon="wishListStore.wishList.find(item => item.product.id == divRef?.parentElement.parentElement.attributes.name.value) ? (isHovering ? 'mdi-heart-broken': 'mdi-heart') : (isHovering ? 'mdi-heart' : 'mdi-heart-outline')" density="comfortable"></v-btn>
            </template>
        </v-hover>
    </div>
</template>

<script setup lang='ts'>
    import {useWishListStore} from '../../lib/services/wishListStore.ts'
    const divRef = ref(null) 
    const wishListStore = useWishListStore()

    const emit = defineEmits(['editProduct'])
    defineProps<{x?: 'left' | 'right', y?: 'top' | 'bottom'}>()
</script>