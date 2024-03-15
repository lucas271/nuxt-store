<template>
        <v-row class="flex-grow-1">

            
            <template v-if="!productStore.loading">
                <v-col cols="12" md="4" sm="6" v-if="$slots.default">
                    <slot/>
                </v-col>
                <v-col cols="12" md="4" sm="6" v-for="product in productStore.products">
                    <sharedItem :id="product.id" :name="product.name" :description="product.description" :img="product.img" :title="product.title" :price="product.price" :quantity="product.quantity" :is_available="product.is_available" />
                </v-col>
            </template>
            <template v-else>
                <span class="flex-grow-1 flex-shrink-1 d-flex justify-center align-center">
                    <v-progress-circular indeterminate size="50"/>
                </span>
            </template>
        </v-row>

</template>

<script setup lang="ts">
    import {useProductStore} from '../../lib/services/productStore.ts'
    const filter = useFilterState()
    
    const productStore = useProductStore()

    await productStore.getAllProducts(filter.value)

    watch(filter.value, async () => {
        await productStore.getAllProducts(filter.value)
    })
</script>