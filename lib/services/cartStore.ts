import { defineStore } from 'pinia'
import {ref} from 'vue'

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
    cartId: string
}


export const useCartStore = defineStore('cart', () => {
    const cartProducts = ref<cartProductInterface[]>([])
    const loading = ref<boolean>(false)
    const errors= ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()

    async function getCart(){
        try {
            console.log('as')
            start()
        
            const response = await $fetch('/api/cart').then(res => res).catch(res => {
                console.log('ikdiasjdijasidjias', res)
                throw {errors: JSON.parse(res.response.statusText).errors}
			})            
            console.log(response.data || response)
            if(response.data.errors?.length > 0)  throw {errors: response.data.errors}
            console.log(response.data, 'idjsauidhuashdua')
            reset()
            console.log(response.data, 'blalbalba')
            return cartProducts.value = response.data
        } catch (error) {
            console.log(error)
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar os produtos'])
        }
    }

    async function deleteSingleCartProduct(productId: string){
        try {
            start()
            const response = await $csrfFetch('/api/cart', {method: 'PUT', body: {type: 'deleteSingleProductFromcart',  productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })    
                
            const productsResponse = cartProducts.value.map(product => product.product.id === response.data.product.id ? {product: {...product.product, loading: false}, quantity: product.quantity} : product)
			const indexOfElementToBeReplaced = productsResponse.map(product => product.product.id).indexOf(response.data.product.id)
            productsResponse[indexOfElementToBeReplaced >= 0 ? indexOfElementToBeReplaced : productsResponse.length] = response.data.product
            reset()

            return cartProducts.value = productsResponse
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function addProduct(productId: string){
        try {
            start()
            const response = await $csrfFetch('/api/cart', {method: 'PUT', body: {type: 'addProduct', productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            console.log(response.data.product, response)
            reset()

            return cartProducts.value.push(response.data.product)
        } catch (error) {
            reset()
            console.log(error.errors)
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }

    async function deleteCartProduct(productId: string){
        try {
            start()
            const response = await $csrfFetch('/api/cart', {method: 'DELETE', body: {data: {type: 'deleteProductFromCart', productId}}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
            reset()

            return cartProducts.value = cartProducts.value.filter(product => product.product.id !== response.data.product.id || product.quantity > 0) 

        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }

    }

    async function deleteCart(){
        try {
            start()
            const response = await $csrfFetch('/api/cart', {method: 'DELETE', body: {data: {type: 'deleteCart', cartId}}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })   //storing in a variable if I ever need to use it.
            reset()
            return cartProducts.value = []
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }


    }
    function reset(){
        errors.value = []
        loading.value = false
    }
    function start(){
        loading.value = true
    }
    return {loading, errors, cartProducts, deleteCart, deleteCartProduct, getCart, addProduct, deleteSingleCartProduct}
})
