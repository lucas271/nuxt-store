import { defineStore } from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

interface MessageInterface{
    title: string,
    message: string,
    userId?: string,
    productId?: string,
    id?: string,
    userName?: string,
    Rating? : {rate: number}
}

export const useItemStore = defineStore('item', () => {
    const messages = ref<MessageInterface[]>([])
    const loading = ref<boolean>(true)
    const errors= ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()


    async function getMessages(productId: string){
        try {
            start()
            const response = await $fetch('/api/review?data='+JSON.stringify({productId: productId})).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()

            return messages.value = response.data.review
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel encontrar as mensagens')
        }
    }
    async function updateMessage(commentId: string, title: string, message: string, rating: string){
        try {
            start()
            const response = await $csrfFetch('/api/controllers/review', {method: 'put',body: { commentId, title, message, rate: rating}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })

            const reviewIndex = messages.value.map(review => review.id).indexOf(response.data.review.id)
			messages.value[reviewIndex >= 0 ? reviewIndex : messages.value.length] = response.data.review

            reset()

            return messages.value.push(response.data.review)
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function addMessage(review: MessageInterface & {rating: number}){
        try {
            start()
            const response = await $csrfFetch('/api/review', {method: 'post', body: {...review, rate: review.rating}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()

            return messages.value.push(response.data.review)
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function removeMessage(messageId: string){
        try {
            start()            
            const response = await $csrfFetch('/api/review', {method: 'delete', body: {commentId: messageId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()

            return messages.value.filter(message => message.id !== response.data.review.id) 
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
    return {updateMessage, messages, getMessages, loading, errors, removeMessage, addMessage}
})
