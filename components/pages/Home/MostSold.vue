<template>
    <section class="full-height-minus-navheader w-100 bg-teal-lighten-2 ">
        <v-container class="w-100 h-100">
            <v-sheet class="h-100 w-100 bg-transparent d-flex flex-column justify-space-around">
                    <v-card-title class="text-h4 text-center text-wrap text-sm-h4 text-h5 font-weight-bold">Mais vendidos</v-card-title>

                    <v-slide-group center-active class="h-100 d-flex justify-center align-center h-100 mx-sm-auto" v-if='!loading'>                
                        <v-slide-group-item v-for="product in selectedProducts"  :key="product.id" >
                            <div class="mx-2 h-100 pa-1 responsive-card-slide overflow-hidden ">
                                <sharedItem  height="100%" width="100%" :id="product.id" :name="product.name" :category_name="product.category_name" :sessions="product.sessions" :body_part="product.body_part" :description="product.description" :img="product.img" :title="product.title" :price="product.price" :quantity="product.quantity" :is_available="product.is_available" >

                                </sharedItem>
                            </div>

                        </v-slide-group-item>
                    </v-slide-group>
                    <div v-else class="d-flex justify-center align-center h-100">
                        <v-progress-circular indeterminate/>
                    </div>
                    <v-btn style="width: fit-content;" class="mx-auto" variant="tonal">
                        Ver Todos os produtos
                    </v-btn>
            </v-sheet>
        </v-container>

    </section>
</template>

<script setup lang="ts">
    const loading = ref<boolean>(false)
    const selectedProducts = await (async () => {
        loading.value = true
        return await $fetch('/api/product?data='+JSON.stringify({sortBy: {isMostFavorites: true,}, take: 5, skip: 0, type: 'products'})).then(res => {
        try {
            loading.value = false
            return res?.product?.products || {errors: 'Erro no servidor'}
        } catch (error) {
            loading.value = false

            return {errors: 'Erro no servidor'}
            
        }
    }).catch(res => {
        try {
            loading.value = false

            return {errors: JSON.parse(res.data.message).errors}
        } catch (error) {
            loading.value = false

            return {errors: 'Erro no servidor'}
        }
    })})()
</script>