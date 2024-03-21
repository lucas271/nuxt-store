<template>
    <v-container class="d-flex flex-column" style="min-height: 100%;">
        <v-header class="w-100 h-50 my-7">
            <h2 class="my-6">Nossos Tratamentos </h2>

            <!-- Item filter and sorting -->
            <sharedItemFilter/>

            <!-- CATEGORY DROPDOWN MENU -->
            <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <v-btn
                    color="primary"
                    v-bind="props"
                    class="mx-sm-6 mt-3 mt-sm-0"
                    >
                    Nova Categoria
                    </v-btn>
                </template>  
                <v-card height="400px" width="230px" >
                    <formsAddCategory/>
                </v-card>          
            </v-menu>

            <!-- Error handling component -->
            <div class="w-100 mt-6">
                <sharedDisplayErrors v-if="productStore.errors.length > 0 " :errors="productStore.errors" :filter="filter" :refreshFunc="productStore.getAllProducts" :loading="productStore.loading"/>
            </div>
        </v-header>


        <sharedItemsGrid :products="productStore.products" :storeFunc="productStore.getAllProducts" :watchVariable="filter">
            <v-sheet class="w-100 h-100">
                <v-hover v-if="!isForm">
                    <template v-slot:default="{isHovering, props}">
                        <v-card @click="isForm = !isForm" v-bind="props" :class="`cursor-pointer w-100 h-100 d-flex ${isHovering || isForm ? 'bg-teal-lighten-2' : 'bg-white'} justify-center align-center rounded-lg`" >
                            <v-icon :class="`text-h2 ${isHovering ? 'text-white': 'text-teal-lighten-2'} `">mdi-plus</v-icon>
                        </v-card>
                    </template>
                </v-hover>
                <v-card class="h-100 w-100" v-if="isForm">
                    <sharedProductStepper/>
                </v-card>
            </v-sheet>
        </sharedItemsGrid>
    </v-container>
</template>

<script lang="ts" setup>
    import {useProductStore} from '../../lib/services/productStore.ts'

    const filter = useFilterState()

    const isForm = ref<boolean>(false)
    const productStore = useProductStore()
    await productStore.getAllProducts()
</script>   