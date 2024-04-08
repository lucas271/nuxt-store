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
            start()
            const response = await $fetch('/api/cart').then(res => res).catch(res => {
                console.log('ikdiasjdijasidjias', res)
                throw {errors: JSON.parse(res.data.message).errors}
			})            
            if(response.data?.errors?.length > 0)  throw {errors: response.data.errors}
            reset()
            return cartProducts.value = response.cart
        } catch (error) {
            console.log(error)
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar os produtos'])
        }
    }

    async function deleteSingleCartProduct(productId: string){
        try {
            cartProducts.value = cartProducts.value.map(product => product.product.id === productId ? {...product, product: {...product.product, loading: true}} : product)
            const response = await $csrfFetch('/api/cart', {method: 'PUT', body: {type: 'deleteSingleProductFromcart',  productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })    
            
                
            reset()
            if(cartProducts.value.find(product => response.cart.product.id)?.quantity === 1 && response.cart)  return cartProducts.value = [...cartProducts.value.filter(product => response.cart.product.id !== product.product.id)]
            return cartProducts.value.find(product => response.cart.product.id === product.product.id) ? cartProducts.value = [...cartProducts.value.filter(product => response.cart.product.id !== product.product.id), response.cart] : ''
        } catch (error) {
            console.log(error)
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function addProduct(productId: string){
        try {
            cartProducts.value = cartProducts.value.map(product => product.product.id === productId ? {...product, product: {...product.product, loading: true}} : product)
            const response = await $csrfFetch('/api/cart', {method: 'PUT', body: {type: 'addProduct', productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            return cartProducts.value.find(product => response.cart.product.id === product.product.id) ? cartProducts.value = [...cartProducts.value.filter(product => response.cart.product.id !== product.product.id), response.cart] : cartProducts.value.push(response.cart) 
        } catch (error) {
            reset()
            console.log(error.errors)
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }

    async function deleteCartProduct(productId: string){
        try {
            cartProducts.value = cartProducts.value.map(product => product.product.id === productId ? {...product, product: {...product.product, loading: true}} : product)
            const response = await $csrfFetch('/api/cart', {method: 'DELETE', body: {data: {type: 'deleteProductFromCart', productId}}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            return cartProducts.value = cartProducts.value.filter(product => product.product.id !== response.cart.id || product.quantity > 0) 

        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }

    }

    async function deleteCart(){
        try {
            start()
            const response = await $csrfFetch('/api/cart', {method: 'DELETE', body: {data: {type: 'deleteCart', cartId}}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
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
