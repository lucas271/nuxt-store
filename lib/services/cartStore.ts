import { defineStore } from 'pinia'
import type { filterInterface} from '../../composables/states'
import {ref} from 'vue'
import axios from 'axios'

export interface cartProductInterface {
    product: {
        name: string,
        description: string,
        title: string,
        price: string,
        img: string,
        quantity: number,
        is_available: boolean,
        id: string,
        loading?: boolean
    },
    quantity: number
}


export const useItemStore = defineStore('item', () => {
    const cartProducts = ref<cartProductInterface[]>([])
    const loading = ref<boolean>(true)
    const errors= ref<string[]>([])

    async function getCart(){
        try {
            start()
            const response = await axios.get('/api/cart?data='+JSON.stringify('')).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
			})            
            
            if(response.data.errors?.length > 0)  throw {errors: response.data.errors}
    
            reset()

            return cartProducts.value = response.data.product
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel encontrar os produtos')
        }
    }

    async function deleteSingleCartProduct(productId: string){
        try {
            start()
            const response = await axios.put('/api/cart', {type: 'deleteSingleProductFromcart',  productId}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })    
                
            const productsResponse = cartProducts.value.map(product => product.product.id === response.data.product.id ? {product: {...product.product, loading: false}, quantity: product.quantity} : product)
			const indexOfElementToBeReplaced = productsResponse.map(product => product.product.id).indexOf(response.data.product.id)
            productsResponse[indexOfElementToBeReplaced >= 0 ? indexOfElementToBeReplaced : productsResponse.length] = response.data.product
            reset()

            return cartProducts.value = productsResponse
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel realizar a ação')
        }
    }
    async function addProduct(productId: string){
        try {
            start()
            const response = await axios.put('/api/cart', {type: 'addProduct', productId}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
            reset()

            return cartProducts.value.push(response.data.product)
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel realizar a ação')
        }
    }

    async function deleteCartProduct(productId: string){
        try {
            start()
            const response = await axios.delete('/api/cart', {data: {type: 'deleteProductFromCart', productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
            reset()

            return cartProducts.value = cartProducts.value.filter(product => product.product.id !== response.data.product.id || product.quantity > 0) 

        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel realizar a ação')
        }

    }

    async function deleteCart(){
        try {
            start()
            const response = await axios.delete('/api/cart', {data: {type: 'deleteCart'}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })   //storing in a variable if I ever need to use it.
            reset()
            return cartProducts.value = []
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel realizar a ação')
        }


    }
    function reset(){
        errors.value = []
        loading.value = false
    }
    function start(){
        loading.value = true
    }
    return {loading, errors, deleteCart, deleteCartProduct, getCart, addProduct, deleteSingleCartProduct}
})
