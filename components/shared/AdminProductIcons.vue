<template>
    <div 
    ref='divRef' 
    class="text-subtitle-2 d-flex ga-3" 
    :style="{position: 'absolute', [x === 'left' ? 'left' : 'right']: '5%', [y === 'top' ? 'top': 'bottom']: '5%'}">
            <v-btn class="text-subtitle-2 text-blue-grey-darken-1 bg-blue-grey-lighten-3" icon="mdi-pencil-outline" density="comfortable" @click='editProduct'></v-btn>
            <v-btn class="text-subtitle-2 text-blue-grey-darken-1 bg-blue-grey-lighten-3" icon="mdi-trash-can-outline" density="comfortable" @click='removeProduct'></v-btn>
    </div>
</template>

<script setup lang='ts'>
    import {useProductStore} from '../../lib/services/productStore.ts'
    const productStore = useProductStore()
    const divRef = ref(null) 
    const emit = defineEmits(['editProduct'])



    async function removeProduct(){
       const isSure = confirm("Tem certeza que deseja deletar o produto")
        if(isSure) productStore.removeProduct(divRef.value.parentElement.parentElement.attributes.name.value)
    }

    async function editProduct(){
        emit('editProduct', {isForm: true, value: divRef.value.parentElement.parentElement.attributes.name.value})
    }
    defineProps<{x?: 'left' | 'right', y?: 'top' | 'bottom'}>()

</script>