<template>
    <v-container class="less-height-minus-navheader d-flex align-center justify-center">
        <v-card class="bg-teal-lighten-1 d-flex flex-column  flex-sm-row flex-column h-75 w-75" style='position: relative;'>
            <sharedDefaultProductIcons y='top' :id='route?.params?.id'/>

            <v-img class="h-100 w-100 flex-shrink-1" cover :src="productStore.product?.img"/>
            <div class=" d-flex justify-space-around flex-column flex-shrink-1 h-100 w-75 pa-5">
                <article>
                    <v-card-title v-if='productStore.product?.name' class="text-md-h4 text-sm-h5 text-h4 text-wrap py-1 px-0 ma-0">
                        {{productStore.product?.name}}
                    </v-card-title>
                    <v-chip> {{productStore.product?.category_name}} </v-chip>
                </article>

                <p class="pa-0 text-caption my-3 overflow-auto">{{productStore.product?.title}}</p>
                <div>
                    <p> {{productStore.product?.description}} </p>

                </div>
                <div>
                    <v-card-subtitle class="text-md-subtitle-1 text-sm-subtitle-2 text-subtitle-1 pa-0 ma-0 my-5 font-weight-bold text-uppercase">R${{productStore.product?.price?.toFixed(2).replace('.', ',')}}</v-card-subtitle>
                    <v-card-actions class="pa-0 d-flex flex-wrap ga-2 justify-space-between align-center">
                        <v-btn variant="tonal" class="text-body-2" @click="cartStore.addProduct(route.params?.id || undefined)">Adicionar ao carrinho</v-btn>
                        <v-btn variant="tonal" class="text-body-2 ma-0">Entrar em contato</v-btn>
                    </v-card-actions>
                </div>

            </div>
        </v-card>
    </v-container>
    <v-sheet class="w-100 pa-8">
        <h3 >Outros items recomendados</h3>

        <v-slide-group>
            <v-slide-group-item v-for="i in 5" class="d-flex align-center justify-center">
                <div class="mx-2"> 
                    <sharedItem     
                        :id='productStore.product?.id'
                        :name='productStore.product?.name'
                        :description='productStore.product?.description'
                        :title='productStore.product?.title'
                        :price='productStore.product?.price'
                        :img='productStore.product?.img'
                        :quantity='productStore.product?.quantity'
                        :categoryName='productStore.product?.category_name'
                        :loading='productStore.loading'
                        height='400px'
                    />
                </div>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
    <sharedMessagesContainer :comments='messageStore.messages' :productId='route?.params?.id'/>
</template>

<script setup lang='ts'>
    import {useProductStore} from '../../../lib/services/productStore.ts'
    import {useCartStore} from '../../../lib/services/cartStore.ts'
    import {useMessageStore} from '../../../lib/services/messageStore.ts'


    const route = useRoute()


    const productStore = useProductStore()
    const cartStore = useCartStore()
    const messageStore = useMessageStore()

    messageStore.getMessages(route?.params?.id)

    onMounted(() => {
        productStore.getProduct(route?.params?.id).then(() => !productStore?.product && navigateTo('/404'))
    })
</script>