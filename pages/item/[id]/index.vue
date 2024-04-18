<template>
    <v-container class=" d-flex align-center justify-center overflow-hidden">
        <v-card class="bg-teal-lighten-1 responsive_card d-flex flex-column w-100 h-100 overflow-hidden  flex-md-row flex-column">
            <sharedDefaultProductIcons y='top' x="left" :id='route?.params?.id'/>
            <div>
                
            </div>
            <v-img class="text-start responsive_img " :alt="'imagem ' + productStore.product.name ? 'de' + productStore.product.name : 'não encontrada'"  cover :src="productStore.product?.img"/>
            <div class="ga-3 flex-column flex-shrink-1 overflow-hidden d-flex justify-space-between flex-grow-1 pa-sm-5 pa-6">
                <article class="d-flex flex-column w-100 ga-3 overflow-hidden">
                    <v-card-title v-if='productStore.product?.name' class="text-sm-h4 text-h6 font-weight-bold text-wrap py-1 px-0 ma-0">
                        {{productStore.product?.name}}
                    </v-card-title>
                    <div class="flex-shrink-1 flex-grow-1">
                        <v-card-subtitle class="pa-0 text-sm-subtitle-1 text-subtitle-2 flex-shrink-1 overflow-auto text-wrap">{{productStore.product?.title}}</v-card-subtitle>
                    </div>

                    <v-chip-group>
                        <v-chip class="text-sm-body-2 text-caption"> {{ productStore.product?.sessions }} {{productStore.product?.sessions && productStore.product?.sessions > 1 ? 'sessões' : 'sessão'}} </v-chip>
                        <v-chip class="text-sm-body-2 text-caption"> {{productStore.product?.body_part}} </v-chip>
                        <v-chip class="text-sm-body-2 text-caption" v-if="productStore.product?.category_name && productStore.product?.category_name.length > 0" v-for="category in productStore.product?.category_name">{{category.name}} </v-chip>

                    </v-chip-group>
                </article>

                <div class="flex-shrink-1   bg-grey-darken-1 rounded-xl overflow-auto">
                    <p class="text-caption text-wrap text-sm-subtitle-1  pa-3 overflow-auto"> {{productStore.product?.description}} </p>

                </div>
                <div>
                    <v-card-subtitle class="text-md-subtitle-1 text-sm-subtitle-2 text-subtitle-1 pa-0 ma-0 my-5 font-weight-bold text-uppercase">R${{productStore.product?.price?.toFixed(2).replace('.', ',')}}</v-card-subtitle>
                    <v-card-actions class="pa-0 d-flex flex-sm-nowrap flex-wrap ga-2 justify-space-between align-center">
                        <v-btn variant="tonal" class="text-body-2 w-100 flex-shrink-1" :disabled="cartStore.loading" @click="cartStore.addProduct(route.params?.id || undefined)">
                            <template v-if="cartStore.cartProducts.find(product => product.product.id === productStore.product?.id)?.product?.loading" >
                                <v-progress-circular indeterminate/>
                            </template>
                            <template v-else>
                                Adicionar ao carrinho
                            </template>
                        </v-btn>
                        <v-btn variant="tonal" class="text-body-2 ma-0 w-100 flex-shrink-1" active :disabled="cartStore.loading">
                            <template v-if="cartStore.cartProducts.find(product => product.product.id === productStore.product?.id)?.product?.loading" >
                                <v-progress-circular indeterminate/>
                            </template>
                            <template v-else>
                                Entrar em contato
                            </template>
                        </v-btn>
                    </v-card-actions>
                </div>

            </div>
        </v-card>
    </v-container>
    <v-sheet class="w-100 pa-8" v-if="selectedProducts.filter((product: any) => productStore?.product?.id !== productStore.product?.id).length > 0">
        <h3 class="my-5 text-teal-darken-3">Outros items recomendados </h3>

        <v-slide-group >

            <v-slide-group-item v-for="product in selectedProducts.filter((product: any) => productStore?.product?.id !== product?.id)">
                <div class="mr-4 responsive-item my-auto " style="width: fit-content; height: fit-content;"> 
                    <sharedItem     
                        :id='product?.id'
                        :name='product?.name'
                        :description='product?.description'
                        :title='product?.title'
                        :price='product?.price'
                        :img='product?.img'
                        :quantity='product?.quantity'
                        :category_name='product?.category_name'
                        :loading='productStore.loading'
                        :sessions="product?.sessions"
                        :body_part="product?.body_part" 
                        height="500px"
                    />
                </div>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
    <sharedMessagesContainer :comments='messageStore.messages' :productId='route?.params?.id'/>
</template>

<script setup lang='ts'>
    import {useProductStore} from '../../../lib/services/productStore'
    import {useCartStore} from '../../../lib/services/cartStore'
    import {useMessageStore} from '../../../lib/services/messageStore'


    const route = useRoute()

    const selectedProducts = await (async () => {
        return await $fetch('/api/product?data='+JSON.stringify({sortBy: {isMostFavorites: true}, take: 5, skip: 0, type: 'products'})).then(res => {
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
    })})()
    const productStore = useProductStore()

    const cartStore = useCartStore()
    const messageStore = useMessageStore()


    useSeoMeta({
        title: `${productStore.product?.name} - localizado Proximo ao km32, jardim paraíso`,
        ogTitle: productStore.product?.name || '',
        description: productStore.product?.description + ' Estamos localizados em nova iguaçu, Jardim paraíso. Proximo ao km32.' || 'Esse produto ira te auxiliar a tratar o que te incomoda em sua aparência fisica.',
        ogImage: productStore.product?.img || '',
        keywords: productStore.product?.category_name?.join(', ') || '',
    })
    definePageMeta({
        validate: async (router) => {
            const productStoreValidate = useProductStore()

            // Check if the id is made up of digits
            await productStoreValidate.getProduct(String(router.params.id))
            return productStoreValidate.product ? true : false
        }
    })
    await useAsyncData("messages", async () => messageStore.getMessages(route?.params?.id).then(() => true), {lazy: true})

</script>


<style>
    .responsive_card{
        position: relative;
        min-width: 85%;
        position: relative;
        min-height: 65vh;
        max-height: 75vh;
        
        @media (max-width: 960px) {
            width:100%;
            height: fit-content;
            max-height: 120vh;

        }


    }

    .responsive_img{
        min-width: 50%;
        max-width: 70%;

        @media (max-width: 960px) {
            min-width: 100%;
            min-height: fit-content;
        }

    }

    .responsive-item{
        height: 75%;
        @media (max-width: 400px) {
            max-width: 65vw;
            height: 90%;
        }
    }



</style>