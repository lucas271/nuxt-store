<template>
    <section class="full-height-minus-navheader w-100 bg-teal-lighten-2 ">
        <v-container class="w-100 h-100">
            <v-sheet class="h-100 w-100 bg-transparent d-flex flex-column justify-space-around">
                    <v-card-title class="text-h4 text-center text-wrap text-sm-h4 pa-sm-2 pa-0 text-h5 font-weight-bold">Mais vendidos</v-card-title>

                    <v-lazy v-if='!loading'>
                        <div class="d-flex justify-center align-center overflow-hidden mx-sm-auto">
                            <v-slide-group  v-if="selectedProducts?.length > 0">         
                                <v-slide-group-item v-for="product in selectedProducts"   :key="product.id"  >
                                    <div class="mx-sm-6 mx-2  pa-1 responsive-card-slide overflow-hidden my-auto" style="height: 90%;" >
                                        <sharedItem bg-color="bg-teal-darken-3" :id="product?.id" :name="product?.name" :category_name="product?.category_name" :sessions="product?.sessions" :body_part="product?.body_part" :description="product?.description" :img="product?.img" :title="product?.title" :price="product?.price" :quantity="product?.quantity" :is_available="product?.is_available" >

                                        </sharedItem>

                                    </div>
                                </v-slide-group-item>

                            </v-slide-group>
                            <div v-else class="bg-teal-darken-4 d-flex align-center justify-center h-100  pa-4 rounded-lg">
                                <h4 class="text-sm-h4 font-weight-bold text-center">Nenhum item no site ainda <br/><v-icon>mdi-sad-face</v-icon></h4>
                            </div>
                        </div>
                    </v-lazy>
                    <div v-else class="d-flex justify-center align-center h-100">
                        <v-progress-circular indeterminate/>
                    </div>
                    <v-btn style="width: fit-content;" @click="navigateTo('/item')" class="mx-auto" variant="tonal">
                        Ver Todos os produtos
                    </v-btn>
            </v-sheet>
        </v-container>

    </section>
</template>

<script setup lang="ts">
    const {data: selectedProducts, pending: loading} = useAsyncData("mostSold",async () => {
        return await $fetch('/api/product?data='+JSON.stringify({sortBy: {isMostFavorites: true,}, take: 5, skip: 0, type: 'products'})).then(res => {
        try {
            return res?.product?.products || {errors: 'Erro no servidor'}
        } catch (error) {
            return {errors: 'Erro no servidor'}
        }
    }).catch(res => {
        try {

            return {errors: JSON.parse(res.data.message).errors}
        } catch (error) {
            return {errors: 'Erro no servidor'}
        }
    })}, {lazy: true})
</script>


<style>
    .responsive-card-slide{
        height: 75%;

        @media (max-width: 700px) {
            height:85%;
        }
    }

</style>