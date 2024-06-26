import { defineStore } from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

interface MessageInterface{
    message: string,
    userName?: string,
    Rating?: {
        rate: number,
        review_id: string,
        product_id: string,
        user_id: string,
        id: string,
    },
    id: string,
    userId: string,
}

export const useMessageStore = defineStore('item', () => {
    const messages = ref<MessageInterface[]>([])
    const loading = ref<boolean>(false)
    const errors= ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()


    async function getMessages(productId: string){
        try {
            start()
            const response = await $fetch('/api/review?data='+JSON.stringify({productId: productId})).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            console.log(response.review)
            return messages.value = response.review
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || 'não foi possivel encontrar as mensagens')
        }
    }
    async function updateMessage(commentId: string, message: string, rating: number){
        try {
            start()
            const response = await $csrfFetch('/api/review', {method: 'put',body: { commentId, message, rate: rating}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })

            const reviewIndex = messages.value.map(review => review.id).indexOf(response.review.id)
            reset()

            return messages.value[reviewIndex >= 0 ? reviewIndex : messages.value.length] = response.review
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function addMessage(productId: string, username: string, message: string, rate: number){
        try {
            start()
            const response = await $csrfFetch('/api/review', {method: 'post', body: {productId, username, message, rate}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            return messages.value.push(response.review)
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

            return messages.value = messages.value.filter(message => message.id !== response.review.id) 
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
