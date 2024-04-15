<template>
    <v-container class=" d-flex align-center justify-center overflow-hidden">
        <v-card class="bg-teal-lighten-1 responsive_card d-flex flex-column w-100 h-100 overflow-hidden  flex-md-row flex-column">
            <sharedDefaultProductIcons y='top' x="left" :id='route?.params?.id'/>
            <div>
                
            </div>
            <v-img class="text-start responsive_img " cover :src="productStore.product?.img"/>
            <div class="ga-3 flex-column flex-shrink-1 justify-center flex-grow-1 pa-sm-5 pa-6">
                <article class="d-flex flex-column w-100 ga-3">
                    <v-card-title v-if='productStore.product?.name' class="text-sm-h4 text-h6 font-weight-bold text-wrap py-1 px-0 ma-0">
                        {{productStore.product?.name}}
                    </v-card-title>
                    <v-card-subtitle class="pa-0 text-sm-subtitle-1 text-subtitle-2 flex-shrink-1 overflow-auto text-wrap">{{productStore.product?.title}}</v-card-subtitle>

                    <v-chip-group>
                        <v-chip class="text-sm-body-2 text-caption"> {{ productStore.product?.sessions }} {{productStore.product?.sessions && productStore.product?.sessions > 1 ? 'sessões' : 'sessão'}} </v-chip>
                        <v-chip class="text-sm-body-2 text-caption"> {{productStore.product?.body_part}} </v-chip>
                        <v-chip class="text-sm-body-2 text-caption"> {{productStore.product?.category_name}} </v-chip>

                    </v-chip-group>
                </article>

                <div class="flex-shrink-1   bg-grey-darken-1 rounded-xl overflow-auto">
                    <p class="text-caption text-wrap text-sm-subtitle-1  pa-3 overflow-auto"> {{productStore.product?.description}} </p>

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
        <h3 class="mb-5 text-teal-darken-3">Outros items recomendados</h3>

        <v-slide-group>

            <v-slide-group-item v-for="i in 5" class="d-flex align-center justify-center">
                <div class="w-25 mr-4"> 
                    <sharedItem     
                        :id='productStore.product?.id'
                        :name='productStore.product?.name'
                        :description='productStore.product?.description'
                        :title='productStore.product?.title'
                        :price='productStore.product?.price'
                        :img='productStore.product?.img'
                        :quantity='productStore.product?.quantity'
                        :category_name='productStore.product?.category_name'
                        :loading='productStore.loading'
                        :sessions="productStore.product?.sessions"
                        :body_part="productStore.product?.body_part" 
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


    const productStore = useProductStore()
    const cartStore = useCartStore()
    const messageStore = useMessageStore()

    messageStore.getMessages(route?.params?.id)

    onMounted(() => {
        productStore.getProduct(route?.params?.id).then(() => !productStore?.product && navigateTo('/404'))
    })
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



</style>