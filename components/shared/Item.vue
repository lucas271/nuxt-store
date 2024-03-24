<template>
    <v-card class="flex-column d-flex ga-2 bg-teal-lighten-2 rounded-lg w-100" height="600px">
        <v-img class="h-50 w-100 " cover :src="img ? img : 'https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg'">
            <slot/>
            <v-btn variant="" class="text-subtitle-2 text-blue-grey-darken-1 bg-blue-grey-lighten-3" icon="mdi-heart-outline" density="comfortable" position="absolute" :style="{top: '5%', right: '5%'}"></v-btn>

        </v-img>
        <div class='flex-grow-1 d-flex justify-space-around flex-column'>
            <v-card-title class="font-italic">{{name}}</v-card-title>
            <v-card-subtitle class="text-wrap">{{title}}</v-card-subtitle>
            <v-card-text>R${{ price.toFixed(2).replace('.', ',') || '' }}</v-card-text>
            <v-card-actions >
                <v-btn class="text-body-1"  variant="tonal">
                    Ver mais
                </v-btn>
                <v-btn class="text-body-1 text-center"  variant="tonal" :disabled='cartStore.loading' @click='cartStore.addProduct(id)'>
                    <template v-if='cartStore.loading'>
                        <v-progress-circular indeterminate size="50"/>
                    </template>
                    <template v-else>
                        + carrinho
                    </template>
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script setup lang="ts">

import {useCartStore} from '../../lib/services/cartStore.ts'

const cartStore = useCartStore()

interface ItemInterface {
    id: string,
    createdAt?: string,
    updatedAt?:string,
    name: string,
    description?: string,
    title: string
    price: number,
    img?: string,
    quantity?: number
    is_available?: boolean,
    categoryName?: string
}
defineProps<ItemInterface>()
</script>