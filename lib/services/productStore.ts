import { defineStore } from 'pinia'
import type { filterInterface} from '../../composables/states'
import {ref} from 'vue'

export interface ItemInterface {
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
    categoryName?: string
}


export const useProductStore = defineStore('item', () => {
    const product = ref<ItemInterface | null>(null)
    const products = ref<ItemInterface[]>([])
    const loading = ref<boolean>(true)
    const errors= ref<string[]>([])
    

    async function getAllProducts(filter: filterInterface){
        try {
            start()
            const response = await $fetch('/api/product?data='+JSON.stringify({ filter, type: 'products'})).then(res => res).catch(res => {
                console.log(res.data.message)
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            if(response?.product?.length  < 1) throw {errors: ['Nenhum produto disponivel']}

            return products.value = response.product
        } catch (error: any) {
            console.log(error)
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar os produtos'])
        }
    }
    async function addProduct(product: ItemInterface){
        try {
            start()
            const response = await axios.post('/api/product', {...product}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
            reset()

            return products.value.push(response.data.product)
        } catch (error) {
            reset()


            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel realizar a ação')
        }
    }
    async function removeProduct(productId: string){
        try {
            start()
            const response = await axios.delete('/api/product', {data: {type: 'deleteProductFromCart', productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
            reset()

            return products.value.filter(product => product.id !== response.data.product.id) 
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel realizar a ação')
        }
    }

    async function updateProduct({productId, updateInfo}: {productId: string, updateInfo: ItemInterface}){
        try {
            start()
            const response = await axios.put('/api/controllers/product', {type: 'updateProduct', productId, ...updateInfo}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })

            const productIndex = products.value.map(product => product.id).indexOf(response.data.product.id)
            reset()

            return products.value[productIndex >= 0 ? productIndex : products.value.length] = response.data.product
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel realizar a ação')
        }

    }

    async function getProduct(productId: string){
        try {
            start()
            const response = await axios.get('/api/product?productCredencials='+JSON.stringify({productId, type: 'product'})).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
            reset()

            return product.value = response.data.product
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel encontrar os produtos')
        }


    }

    function start(){
        loading.value = true
    }
    function reset(){
        errors.value = []
        loading.value = false
    }
    return {products, product, getAllProducts, loading, errors, addProduct, removeProduct, updateProduct, getProduct}
})
