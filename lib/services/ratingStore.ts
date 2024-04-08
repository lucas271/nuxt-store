import { defineStore } from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

interface ratingInterface{
    id: string,
    rate: number,
    productId: string,
    userId: string,
}

export const useItemStore = defineStore('item', () => {
    const rating = ref<ratingInterface[]>([])
    const loading = ref<boolean>(true)
    const errors= ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()


    async function getProductRatings(productId: string){
        try {
            start()
            const response = await $fetch('/api/rating?data='+productId).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
            })
    
            reset()
            return rating.value = response.data.rating
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar as avaliações'])
        }
    }
    async function addRating(ratingValue: string, productId?: string, reviewId?: string){
        try {
            start()
            const response = await $csrfFetch('/api/rating', {method: 'post',body: {ratingValue: ratingValue, productId, reviewId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()

            return rating.value = [...response.data.rating, ...rating.value]
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function removeRating(productId: string, ratingId: string){
        try {
            start()
            const response = await $csrfFetch('/api/rating', {method: 'delete',body: {productId, ratingId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()

            return rating.value.filter(rate => rate.id !== response.data.rating.id) 
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function updateRating(ratingValue: string, productId: string, ratingId?: string){
        try {
            start()
            const response = await $csrfFetch('/api/rating', {method: 'put', body: {ratingValue, productId, ratingId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
        
            const reviewIndex = rating.value.map(rating => rating.id).indexOf(response.data.rating.id)
			rating.value[reviewIndex >= 0 ? reviewIndex : rating.value.length] = response.data.rating
            reset()
            return rating.value = [...response.data.rating, ...rating.value]
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
    return {rating, removeRating, getProductRatings, loading, errors, updateRating, addRating}
})
