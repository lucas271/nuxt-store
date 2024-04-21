<template>
        
    <v-container>
        
        <h2 class="text-left mt-4 mb-8">Tratamentos</h2>
        <header class="w-100 h-50">
            <sharedItemFilter/>
            <div class="w-100 mt-6">
                <sharedDisplayErrors v-if="productStore.errors.length > 0 " :errors="productStore.errors" :filter="filter" :refreshFunc="productStore.getAllProducts" :loading="productStore.loading"/>
            </div>
        </header>
        <sharedItemsGrid :products="productStore.products" :loading="productStore.loading" :take="take" :skip="(cvPage - 1) * take" :storeFunc="productStore.getAllProducts" :watchVariable="filter">
            <template v-slot:icon-slot="{ data }">
                <sharedDefaultProductIcons y='top'/>
            </template>
        </sharedItemsGrid>
        <v-pagination v-model="cvPage" :take="take" :length="Math.ceil(productStore?.productCount / take)"></v-pagination>
    </v-container>
</template>

<script lang="ts" setup>

    import {useProductStore} from '../../lib/services/productStore'
    import {useWishListStore} from '../../lib/services/wishListStore'
    const filter = useFilterState()
    const cvPage = ref<number>(1)
    const take = ref<number>(5)
    const productStore = useProductStore()
    const wishListStore = useWishListStore()
    useSeoMeta({
        title: `Todos os produtos - localizado Proximo ao km32, jardim paraíso`,
        ogTitle: `Todos os produtos`,
        description: "Aqui você encontrará todos os produtos disponiveis.",
        keywords: 'tratamento1, tratamento2, tratamento3',
    })


        watch(cvPage, async () => {
            await useAsyncData('products', async () => await productStore.getAllProducts(filter.value, take.value, (cvPage.value - 1) * take.value).then(() => {
                return productStore.products
            }))
        })
        await useAsyncData('products', async () => (await productStore.getAllProducts(filter.value, take.value, (cvPage.value - 1) * take.value)).then(() => {
            return productStore.products
        }))
        await useAsyncData('wishlist', async () => await wishListStore.getAllWishListProducts().then(() => wishListStore.wishList))

</script>