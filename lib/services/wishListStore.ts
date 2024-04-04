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


export const useWishListStore = defineStore('wishList', () => {
    const wishList = ref<wishListInterface[]>([])
    const loading = ref<boolean>(true)
    const errors = ref<string[]>([])


    async function removeFromWishList(wishListItemId: string){
        try {
            start()
            const response = await axios.delete('/api/controllers/wishList', {data: { wishListItemId, type: 'product'}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
    
            reset()
            return wishList.value = wishList.value.filter(product => product.product.id !== response.data.product.id)
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar os produtos'])
        }
    }
    async function removeAllFromWishList(wishListItemId: string){
        try {
            start()
            const response = await axios.delete('/api/wishList', {data: {wishListItemId, type: 'product'}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
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
            const response = await axios.get('/api/wishList?data='+JSON.stringify({productId, type: 'item'})).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })

            reset()
            return wishList.value = response.data.product
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }

    }

    async function addToWishList(productId: string){
        try {
            start()
            const response = await axios.post('/api/wishList', {productId}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })

            reset()
            return wishList.value.push(response.data.product)
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
