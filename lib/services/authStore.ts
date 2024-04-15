import { defineStore } from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

interface UserInterface{
    username?: string,
    userId: string,
}

export const useAuthStore = defineStore('authStore', () => {
    const user = ref<UserInterface | null>(null)
    const loading = ref<boolean>(false)
    const errors = ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()


    async function getActiveUser(){
        try {
            start()
            const response = await $fetch('/api/auth').then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })   

            if(!response.user) throw {errors: ['Informações adicionais do usuário não encontradas']}
            reset()
            return user.value = response.user
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar as categorias'])        }


        
    }

    async function loginUser(email: string, password: string){
        try {
            start()
            const response = await $csrfFetch('/api/auth', {method: 'post', body: {type: "signIn", email, password}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            if(!response.user) throw {errors: ['usuário não encontrado']}

            reset()
            return user.value = response.user
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar as categorias'])
        }
    }
    async function addUser(username: string, email: string, password: string){
        try {

            start()
            console.log('odksaodkaokdas')
            const response = await $csrfFetch('/api/auth', {method: 'post', body: {type: "signUp", username, password, email}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            console.log(response)
            if(!response.user) throw {errors: ['erro no servidor']}

            reset()
            return user.value = response.user
        } catch (error) {
            reset()
            console.log(error)
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
    return {user, getActiveUser,loginUser, loading, errors, addUser}
})
