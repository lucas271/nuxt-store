import { defineStore } from 'pinia'
import type { filterInterface} from '../../composables/states'
import {ref} from 'vue'
import axios from 'axios'

export interface wishListInterface {
    product: {
        name: string,
        description: string,
        title: string,
        price: number,
        img?: string,
        quantity: number,
        id?: string,
    },
    id: string
}


export const useWishListStore = defineStore('wishlist', () => {
    const wishList = ref<wishListInterface[]>([])
    const loading = ref<boolean>(true)
    const errors = ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()


    async function removeFromWishList(wishListItemId: string){
        try {
            start()
            const response = await $csrfFetch('/api/wishlist', {method: 'delete', body: { wishListItemId: wishList.value.find(product => product.product.id === wishListItemId)?.id, type: 'product'}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
    
            reset()
            return wishList.value = wishList.value.filter(product => product.product.id !== response.wishList.product.id)
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar os produtos'])
        }
    }
    async function removeAllFromWishList(wishListItemId: string){
        try {
            start()
            const response = await $csrfFetch('/api/wishlist', {method: 'delete', body: {wishListItemId, type: 'deleteAll'}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })

            if(response.errors) throw {errors: [...response.errors]}
            reset()
            return wishList.value = []
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }

    async function getAllWishListProducts(productId: string){
        try {
            start()
            const response = await $fetch('/api/wishlist?data='+JSON.stringify({productId, type: 'items'})).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })

            if(response?.wishList?.length  < 1) throw {errors: ['Nenhum item nos favoritos']}
            reset()
            return wishList.value = response.wishList
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }

    }

    async function addToWishList(productId: string){
        try {
            start()
            const response = await $csrfFetch('/api/wishlist', {method: 'post', body: {productId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            return wishList.value.push(response.wishList)
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
    return {loading, errors, wishList, addToWishList, getAllWishListProducts, removeAllFromWishList, removeFromWishList}
})
