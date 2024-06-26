<template>
    <v-container class="d-flex flex-column" style="min-height: 100%;">
        <header class="w-100 h-50 my-7">
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
        </header>
        <sharedItemsGrid :products="productStore.products" :loading="productStore.loading" :edit='edit'  :take="take" :skip="(cvPage - 1) * take" :storeFunc="productStore.getAllProducts" :watchVariable="filter">
            <v-sheet class="w-100 h-100">
                <v-hover v-if="!isForm">
                    <template v-slot:default="{isHovering, props}">
                        <v-card @click="isForm = !isForm" v-bind="props" :class="`cursor-pointer w-100 h-100 d-flex ${isHovering || isForm ? 'bg-teal-lighten-2' : 'bg-white'} justify-center align-center rounded-lg`" >
                            <v-icon :class="`text-h2 ${isHovering ? 'text-white': 'text-teal-lighten-2'} `">mdi-plus</v-icon>
                        </v-card>
                    </template>
                </v-hover>
                <v-card class="h-100 w-100" v-if="isForm">
                    <sharedProductStepper :properties="{isForm: isForm}" @stepperClose='isForm = false'/>
                </v-card>
            </v-sheet>
            <template v-slot:icon-slot>
                <sharedAdminProductIcons @editProduct='e => edit = edit.find(product => product.value === e.value) ? [...edit.filter(product => product.value !== e.value), e] : [...edit, e] '/>
            </template>
        </sharedItemsGrid>
        <v-pagination v-model="cvPage" :take="take" :length="Math.ceil(productStore.productCount / take)"></v-pagination>
    </v-container>
</template>

<script lang="ts" setup>
    import {useProductStore} from '../../lib/services/productStore'

    const edit = ref<{isForm: boolean, value: string[]}[]>([])
    const filter = useFilterState()
    const cvPage = ref<number>(1)
    const take = ref<number>(5)
    const router = useRouter();

    const isForm = ref<boolean>(false)
    const productStore = useProductStore()
    watch(cvPage, async () => {
        await useAsyncData('products', async () => (await productStore.getAllProducts(filter.value, take.value, (cvPage.value - 1) * take.value)).then(() => {
            return productStore.products
        }))
    })
    await useAsyncData('products', async () => (await productStore.getAllProducts(filter.value, take.value, (cvPage.value - 1) * take.value)).then(() => {
        return productStore.products
    }))
    useHead({
        meta: [
            {
            hid: 'robots',
            name: 'robots',
            content: 'noindex',
            },
        ],
    })
    
    definePageMeta({
        middleware: 'need-admin'
    })
</script>   