import { defineStore } from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

interface CategoryInterface{
    name: string,
    description: string,
    image: string,
    product: any[],
    is_active: boolean
}

export const useCategoryStore = defineStore('category', () => {
    const category = ref<CategoryInterface | null>(null)
    const categories = ref<CategoryInterface[]>([])
    const loading = ref<boolean>(true)
    const errors= ref<string[]>([])
    const { $csrfFetch } = useNuxtApp()


    async function getAllCategories(){
        try {
            start()
            const response = await $fetch('/api/category?data='+JSON.stringify({type: 'getAll'})).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            return categories.value = response.category
        } catch (error) {
            reset()
            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel encontrar as categorias'])
        }
    }
    async function addCategory(name: string, description?: string, image?: string){
        try {
            start()
            const response = await $csrfFetch('/api/category', {metohd: 'post', body: {name, description, image}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()
            return categories.value.push(response.data.product)
        } catch (error) {
            reset()

            errors.value.push(...(error?.errors?.length > 0 && error?.errors) || ['não foi possivel realizar a ação'])
        }
    }
    async function removeCategory(name: string){
        try {
            start()
            const response = await $csrfFetch('/api/category', {method: 'delete', body: {name}}).then(res => res).catch(res => {
                throw {errors: JSON.parse(res.data.message).errors}
            })
            reset()

            return categories.value.filter(category => category.name !== response.data.category.name) 
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
    return {categories, category, getAllCategories, loading, errors, removeCategory, addCategory}
})
