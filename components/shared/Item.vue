<template>
    <v-card class="flex-column d-flex ga-2 bg-teal-lighten-2 rounded-lg overflow-hidden h-100" >
        <v-img class="h-50 w-100 " cover :src="img ? img : 'https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg'" :name='id'>
            <slot/>
        </v-img>
        <div class='flex-grow-1 d-flex justify-space-around flex-column overflow-hidden px-1'>
            <v-card-title class="font-italic text-sm-h6 text-subtitle-1 font-weight-bold">{{name}} </v-card-title>
            
            <v-card-subtitle class="text-wrap flex-shrink-1 text-sm-body-2 text-caption  flex-shrink-1 overflow-auto">{{title}}dsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdas</v-card-subtitle>
            <div>
                <v-chip-group class=" ma-2 d-flex flex-wrap">
                    <v-chip class="text-sm-body-2 text-caption">{{ sessions }} {{sessions && sessions > 1 ? 'sessões' : 'sessão'}}</v-chip>
                    <v-chip class="text-sm-body-2 text-caption"> {{ body_part }}</v-chip>
                    <v-chip class="text-sm-body-2 text-caption"> {{ category_name }}</v-chip>
                </v-chip-group>
            </div>

            <v-card-text>R${{ price && price.toFixed(2).replace('.', ',') || '' }}</v-card-text>
            <v-card-actions class="d-flex justify-space-between">
                <v-btn class="text-caption text-sm-body-1 w-50 flex-shrink-1"  variant="tonal" @click="navigateTo(`/item/${id}`)">
                    Ver mais
                </v-btn>
                <v-btn class="text-body-1 w-50 flex-shrink-1 text-sm-body-1 text-caption text-center"  variant="tonal" :disabled='cartStore.cartProducts.find(product => product.product.id === id)?.product?.loading' @click='async () => await cartStore.addProduct(id)'>
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
    category_name?: string,
    sessions?: number,
    body_part?: string,
    loading?: boolean,
    height?: string,
    width?: string,
}
defineProps<ItemInterface>()
</script>