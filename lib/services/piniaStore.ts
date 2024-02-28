import { defineStore } from 'pinia'
import {filterInterface} from '../../composables/states'

export interface ItemInterface {
    id: string,
    createdAt?: string,
    updatedAt?:string,
    name: string,
    description: string,
    title: string
    price: number,
    img?: string,
    quantity: number
    is_available: boolean,
    categoryName?: string
}


export const useItemStore = defineStore('item', () => {
    const selectedItem: ItemInterface | null = null
    const items = ref<ItemInterface[]>([])
    let loading: boolean = false
    const errors: string[] = []

    async function getAllItems(filter: filterInterface){
        loading = true
        items.value.push({
                id: 'blabla',
                name: 'primeiro item',
                description: 'first description',
                title: 'title',
                price: 22.90,
                quantity: 2,
                is_available: true,
                categoryName: 'flacidez'
        })
       items.value = items.value.filter(item => filter.typesSelected.includes(item.categoryName))
    }

    return {items, selectedItem, getAllItems, loading, errors}
})
