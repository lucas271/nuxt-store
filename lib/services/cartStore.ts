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
        loading?: boolean,
        category_name: string[]
    },
    quantity: number,
    cartId?: string
}


export const useCartStore = defineStore('cart', () => {
    const cartProducts = ref<cartProductInterface[]>([])
    const loading = ref<boolean>(true)
    const errors= ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()


    async function getCart(){
        try {
            const isLogged = (await useSupabaseClient().auth.getSession()).data.session?.user ? true : false
            if(!isLogged) {
                const storageCart = localStorage.getItem('cart')
                if(!storageCart) localStorage.setItem('cart', JSON.stringify([]))
                reset()
                return cartProducts.value = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]))
            }
            start()
            const response = await $fetch('/api/cart').then(res => res).catch(res => {
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

            const isLogged = (await useSupabaseClient().auth.getSession()).data.session?.user ? true : false
            if(!isLogged) {
                let productsInCart: cartProductInterface[] = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]))
                if(!productsInCart) localStorage.setItem('cart', JSON.stringify([]))

                const response: any = await $fetch('/api/product?data='+JSON.stringify({productId, type: 'product'})).then(res => res).catch(res => {
                    throw {errors: JSON.parse(res.data.message).errors}
                }) 

                if(!response?.product)  throw {errors: ['produto não encontrado']}

                if(productsInCart.find(product => response.product.id === product.product.id)?.quantity === 1 && response.product) {
                    productsInCart = [...productsInCart.filter(product => response.product.id !== product.product.id)]
                    localStorage.setItem('cart', JSON.stringify(productsInCart))
                    reset()

                    return cartProducts.value = productsInCart
                }
            
                const productIndex = productsInCart.map(product => product.product.id).indexOf(response.product.id)
                productsInCart[productIndex >= 0 ? productIndex : 0] = {product: response.product, quantity: productsInCart[productIndex]?.quantity || 0 - 1}
                localStorage.setItem('cart', JSON.stringify(productsInCart))
                reset()
                return cartProducts.value[productIndex >= 0 ? productIndex : 0] = productsInCart[productIndex]
            }
            const response = await $csrfFetch('/api/cart', {method: 'PUT', body: {type: 'deleteSingleProductFromcart',  productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })    
            
                
            reset()
            if(cartProducts.value.find(product => response.cart.product.id === product.product.id)?.quantity === 1 && response.cart)  return cartProducts.value = [...cartProducts.value.filter(product => response.cart.product.id !== product.product.id)]
            
            const productIndex = cartProducts.value.map(product => product.product.id).indexOf(response.cart.product.id)
            return cartProducts.value[productIndex] = response.cart
        } catch (error) {
            console.log(error)
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function addProduct(productId: string){
        try {
            cartProducts.value = cartProducts.value.map(product => product.product.id === productId ? {...product, product: {...product.product, loading: true}} : product)
            if(!cartProducts.value.find(product => product.product.id === productId)) cartProducts.value.unshift({product: {id: productId, loading: true, price: '0'}, quantity: 0})
            const isLogged = (await useSupabaseClient().auth.getSession()).data.session?.user ? true : false
            if(!isLogged) {
                let productsInCart: cartProductInterface[] = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]))
                if(!productsInCart) localStorage.setItem('cart', JSON.stringify([]))

                const response: any = await $fetch('/api/product?data='+JSON.stringify({productId, type: 'product'})).then(res => res).catch(res => {
                    throw {errors: JSON.parse(res.data.message).errors}
                }) 

                if(!response?.product)  throw {errors: ['produto não encontrado']}
                const productIndex = productsInCart.map(product => product.product.id).indexOf(response.product.id)
                if(productIndex === -1) {
                    productsInCart.unshift({product: response.product, quantity: 1})
                    localStorage.setItem('cart', JSON.stringify(productsInCart))
                    return cartProducts.value = productsInCart        
                }

                productsInCart[productIndex >= 0 ? productIndex : 0] = {product: response.product, quantity: (productsInCart[productIndex >= 0 ? productIndex : 0]?.quantity || 0) + 1}
                localStorage.setItem('cart', JSON.stringify(productsInCart))
                

                reset()
                cartProducts.value[productIndex >= 0 ? productIndex : 0] = productsInCart[productIndex]
                return
            }
            const response = await $csrfFetch('/api/cart', {method: 'PUT', body: {type: 'addProduct', productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            const productIndex = cartProducts.value.map(product => product.product.id).indexOf(response.cart.product.id)
            if (productIndex < 0) return cartProducts.value.unshift(response.cart)
            return cartProducts.value[productIndex] = response.cart
        } catch (error) {
            console.log(error)

            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }

    async function deleteCartProduct(productId: string){
        try {
            const isLogged = (await useSupabaseClient().auth.getSession()).data.session?.user ? true : false
            if(!isLogged) {
                let productsInCart: cartProductInterface[] = JSON.parse(localStorage.getItem('cart') || JSON.stringify([]))
                if(!productsInCart) localStorage.setItem('cart', JSON.stringify([]))

                const response: any = await $fetch('/api/product?data='+JSON.stringify({productId, type: 'product'})).then(res => res).catch(res => {
                    throw {errors: JSON.parse(res.data.message).errors}
                }) 

                if(!response?.product)  throw {errors: ['produto não encontrado']}
        
                productsInCart = productsInCart.filter(product => product.product.id !== response.product.id) 
                localStorage.setItem('cart', JSON.stringify(productsInCart))
                reset()

                return cartProducts.value = productsInCart

            }

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
            const isLogged = (await useSupabaseClient().auth.getSession()).data.session?.user ? true : false

            if(!isLogged) {
                localStorage.setItem('cart', JSON.stringify([]))
                reset()
                return cartProducts.value = []
            }
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
