<template>
    <div 
    ref='divRef' 
    class="text-subtitle-2 d-flex ga-3" 
    :style="{position: 'absolute', [x === 'left' ? 'left' : 'right']: '5%', [y === 'top' ? 'top': 'bottom']: '5%'}">
        <v-hover>
            <template v-slot:default="{ isHovering, props }">
                <v-btn :class="'text-subtitle-2 ' + !isHovering ? 'text-red-darken-2' : 'text-red-darken-4'" :icon="currentWishList ? (isHovering ? 'mdi-heart-broken': 'mdi-heart') : (isHovering ? 'mdi-heart' : 'mdi-heart-outline')" density="comfortable"></v-btn>
            </template>
        </v-hover>
    </div>
</template>

<script setup lang='ts'>
    import {useWishListStore} from '../../lib/services/wishListStore.ts'
    const wishListStore = useWishListStore()
    const currentWishList = wishListStore.wishList.find(item => item.product.id == divRef.value.parentElement.parentElement.attributes.name.value)
    const divRef = ref(null) 
    const emit = defineEmits(['editProduct'])


    defineProps<{x?: 'left' | 'right', y?: 'top' | 'bottom'}>()
</script>