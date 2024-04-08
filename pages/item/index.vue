<template>
        
    <v-container>
        
        <h2 class="text-left mt-4 mb-8">Tratamentos</h2>
        <v-header class="w-100 h-50">
            <sharedItemFilter/>
            <div class="w-100 mt-6">
                <sharedDisplayErrors v-if="productStore.errors.length > 0 " :errors="productStore.errors" :filter="filter" :refreshFunc="productStore.getAllProducts" :loading="productStore.loading"/>
            </div>
        </v-header>
        <sharedItemsGrid :products="productStore.products" :loading="productStore.loading" :take="take" :skip="(cvPage - 1) * take" :storeFunc="productStore.getAllProducts" :watchVariable="filter">
            <template v-slot:icon-slot="{ data }">
                <sharedDefaultProductIcons y='top'/>
            </template>
        </sharedItemsGrid>
        <v-pagination v-model="cvPage" :take="take" :length="Math.ceil(productStore.productCount / take)"></v-pagination>
    </v-container>
</template>

<script lang="ts" setup>

    import {useProductStore} from '../../lib/services/productStore.ts'
    import {useWishListStore} from '../../lib/services/wishListStore.ts'
    const filter = useFilterState()
    const cvPage = ref<number>(1)
    const take = ref<number>(5)
    const productStore = useProductStore()
    const wishListStore = useWishListStore()

    onMounted(async () => {
        watch(cvPage, async () => {
            await productStore.getAllProducts(filter.value, take.value, (cvPage.value - 1) * take.value)
        })

        await productStore.getAllProducts(filter.value, take.value, (cvPage.value - 1) * take.value)
        wishListStore.getAllWishListProducts()
    })

</script>