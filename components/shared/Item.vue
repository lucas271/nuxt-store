<template>
    <v-card class="flex-column d-flex ga-2 bg-teal-lighten-2 rounded-lg w-100" :height="height ? height :'600px'">
        <v-img class="h-50 w-100 " cover :src="img ? img : 'https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg'" :name='id'>
            <slot/>
        </v-img>
        <div class='flex-grow-1 d-flex justify-space-around flex-column'>
            <v-card-title class="font-italic">{{name}}</v-card-title>
            <v-card-subtitle class="text-wrap">{{title}}</v-card-subtitle>
            <v-card-text>R${{ price && price.toFixed(2).replace('.', ',') || '' }}</v-card-text>
            <v-card-actions >
                <v-btn class="text-body-1"  variant="tonal" @click="navigateTo(`/item/${id}`)">
                    Ver mais
                </v-btn>
                <v-btn class="text-body-1 text-center"  variant="tonal" :disabled='cartStore.cartProducts.find(product => product.product.id === id)?.product?.loading' @click='async () => await cartStore.addProduct(id)'>
                    <template v-if='cartStore.cartProducts.find(product => product.product.id === id)?.product?.loading'>
                        <v-progress-circular indeterminate size="25"/>
                    </template>
                    <template v-else>
                        + Carinho
                    </template>
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {useCartStore} from '../../lib/services/cartStore.ts'
import {useProductStore} from '../../lib/services/productStore.ts'

const supabase = useSupabaseClient()
const cartStore = useCartStore()
const route = useRouter()

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
    categoryName?: string,
    loading?: boolean,
    height?: string,
}
defineProps<ItemInterface>()
</script>