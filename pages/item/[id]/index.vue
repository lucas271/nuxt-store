<template>
    <v-container class="less-height-minus-navheader d-flex align-center justify-center">
        <v-card class="bg-teal-lighten-1 d-flex  flex-sm-row flex-column h-100 w-100">
            <v-img class="h-100 w-100 flex-shrink-1 flex-grow-1" cover src="https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg"/>
            <div class=" d-flex justify-space-around flex-column h-100 pa-5">
                <article>
                    <v-card-title class="text-md-h4 text-sm-h5 text-h4 text-wrap py-1 px-0 ma-0">
                        {{route.params}} 
                    </v-card-title>
                    <v-card-subtitle class="text-md-subtitle-1 text-sm-subtitle-2 text-subtitle-1 pa-0 ma-0">R$2000.00</v-card-subtitle>
                    <v-chip-group>
                        <v-chip>retenção de liquidos</v-chip>
                        <v-chip>modelar o corpo</v-chip>
                        <v-chip>pós cirurgico</v-chip>

                    </v-chip-group>
                </article>

                <p class="pa-0 text-caption my-3 overflow-auto">A drenagem linfatica é um  procedimento ideal para o pós cirurgico porque auxilia na eliminação de liquidos</p>
                <v-card-actions class="pa-0 d-flex flex-wrap ga-2 justify-space-between align-center">
                    <v-btn variant="tonal" class="text-body-2">Adicionar ao carrinho</v-btn>
                    <v-btn variant="tonal" class="text-body-2 ma-0">Entrar em contato</v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </v-container>
    <v-sheet class="w-100 pa-8">
        <h3 >Outros items recomendados</h3>

        <v-slide-group>
            <v-slide-group-item v-for="i in 5">
                <v-card height="300px" width="210px" class="mx-2 d-flex flex-column bg-teal-lighten-1 overflow-hidden">
                    <v-img class="h-50 w-100 flex-grow-1" cover src="https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg"/>
                    <article class="flex-grow-1 flex-shrink-1 d-flex flex-column ga-2 overflow-auto">
                        <div class="flex-grow-1 flex-shrink-1 d-flex flex-column   overflow-auto">
                            <v-card-title>
                                Nome item
                            </v-card-title>
                            <v-card-text class="overflow-hidden">
                                esse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantantaesse item faz tantantnantnantnantanta
                            </v-card-text>
                        </div>


                        <v-card-subtitle class="">
                            R$25.90
                        </v-card-subtitle>
                    </article>

                    <v-card-actions class="w-100" >
                        <v-btn variant="tonal" density="compact" class="text-subtitle-2 text-uppercase">
                            Ver mais
                        </v-btn>
                        <v-btn variant="tonal" density="compact" class="text-subtitle-2  text-uppercase">
                            + carrinho
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
    <sharedMessagesContainer/>
</template>

<script setup lang='ts'>
    import {useProductStore} from '../../../lib/services/productStore.ts'

</script>