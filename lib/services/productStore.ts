import { defineStore } from 'pinia'
import type { filterInterface} from '../../composables/states'
import {ref} from 'vue'

export interface productInterface {
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
    category?: string,
}


export const useProductStore = defineStore('product', () => {
    const product = ref<productInterface | null>(null)
    const products = ref<productInterface[]>([])
    const productCount = ref<number | null>(null)
    const loading = ref<boolean>(true)
    const errors= ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()

    async function getAllProducts(filter: filterInterface, take: number, skip: number){
        try {
            start()
            const response = await $fetch('/api/product?data='+JSON.stringify({ ...filter, take, skip, type: 'products'})).then(res => res).catch(res => {
                console.log(res)
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            console.log(response)
            if(response?.product?.products?.length  < 1) {
                products.value = []
                throw {errors: ['Nenhum produto disponivel']}
             }

            productCount.value = response.product.productCount
            return products.value = response.product.products
        } catch (error: any) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar os produtos'])
        }
    }
    async function addProduct(productInfo: productInterface){
        try {
            start()
            const response = await $csrfFetch('/api/product', {method: 'POST',body: { ...productInfo, category_name: productInfo.category}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            productCount.value = productCount.value || 0 + 1
            return products.value.push(response.product)
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function removeProduct(productId: string){
        try {
            start()
            const response = await $csrfFetch('/api/product', {method: 'delete', body: {productId: productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res?.data?.message).errors}
            })
            reset()
            productCount.value = productCount.value || 0 - 1

            return products.value = products.value.filter(product => product.id !== response.product.id) 
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }

    async function updateProduct(productId: string, updateInfo: productInterface){
        try {
            start()
            const response = await $csrfFetch('/api/product', {method: 'put', body: {type: 'updateProduct', productId, ...updateInfo}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })

            const productIndex = products.value.map(product => product.id).indexOf(response.product.id)
            reset()

            return products.value[productIndex >= 0 ? productIndex : products.value.length] = response.product
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }

    }

    async function getProduct(productId: string){
        try {

            start()
            const response = await $fetch('/api/product?data='+JSON.stringify({productId, type: 'product'})).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            return product.value = response.product
        } catch (error) {

            console.log(error)
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar os produtos'])
        }


    }

    function start(){
        loading.value = true
    }
    function reset(){
        errors.value = []
        loading.value = false
    }
    return {products, product, getAllProducts, productCount, loading, errors, addProduct, removeProduct, updateProduct, getProduct}
})
