<template>
    <v-row class="flex-grow-1" tag="section" style="min-height: 50vh;">
        <template v-if="!loading">

            <v-col cols="12" md="4" sm="6" v-if="$slots.default">
                <slot name="default" />

            </v-col>
            <v-col cols="12" md="4" sm="6" v-for="product in products">
                <sharedItem v-if="!edit || !edit.find(item => item.value === product.id && item.isForm)" :category_name="product.category_name" :loading='product.loading' :id="product.id" :sessions="product.sessions" :body_part="product.body_part" :name="product.name" :description="product.description" :img="product.img" :title="product.title" :price="product.price" :quantity="product.quantity" :is_available="product.is_available" width="300px" height="400px">
                    <slot name="icon-slot" />
                </sharedItem>
                <template v-else> 
                    <sharedProductStepper :isEdit='true' @stepperClose="edit = edit.map(item => {
                        
                        return item.value === product.id ? {value: product.id, isForm: false} : item
                    })" :properties="{isForm: edit.find(item => item.value === product.id).isForm, id:product.id, sessions: product.sessions, body_part: product.body_part,  name:product.name, description:product.description, img:product.img, title: product.title, price: product.price, quantity: product.quantity, category_name: product.category_name}"/>
                </template>
            </v-col>
        </template>
        <template v-else>
            <span class="flex-grow-1 flex-shrink-1 d-flex justify-center align-center">
                <v-progress-circular indeterminate size="50"/>
            </span>
        </template>
    </v-row>

</template>

<script setup lang="ts">
interface productInterface {
    products: {
        id: string,
        createdAt?: string,
        updatedAt?:string,
        name: string,
        description: string,
        title: string
        price: number,
        img?: string,
        quantity: number
        is_available: boolean,
        category_name: any[],
        sessions?: number,
        body_part?: string,
    }[]
}
const props = defineProps<{
    storeFunc: () => Promise<any>,
    watchVariable?: any,
    take?: number,
    skip?: number,
    loading: boolean,
    edit?: {value: boolean, isForm: boolean},
} & productInterface>()
const watchVariableProp = ref(props.watchVariable)

watchVariableProp.value && watch(watchVariableProp.value, async () => {
    await props.storeFunc(watchVariableProp.value, props.take || undefined, props.skip || undefined)
})
</script>
