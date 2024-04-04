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


    async function getMessages(productId: string){
        try {
            start()
            const response = await axios.get('/api/review?data='+JSON.stringify({productId: productId})).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
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
            const response = await axios.put('/api/controllers/review', { commentId, title, message, rate: rating}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
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
            const response = await axios.post('/api/review', {...review, rate: review.rating}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
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
            start()            const response = await axios.delete('/api/review', {data: {commentId: messageId}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.response.statusText).errors}
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
