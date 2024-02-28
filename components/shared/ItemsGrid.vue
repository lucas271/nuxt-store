<template>
        <v-row>
            <v-col cols="12" md="4" sm="6" v-if="$slots.default">
                <slot/>
            </v-col>
            
            <v-col cols="12" md="4" sm="6" v-for="i in itemStore.items">
                <sharedItem :id="i.id" :name="i.name" :description="i.description" :title="i.title" :price="i.price" :quantity="i.quantity" :is_available="i.is_available" />
            </v-col>
        </v-row>
        {{ filter }}
</template>

<script setup lang="ts">
    import {useItemStore} from '../../lib/services/piniaStore.ts'
    const filter = useFilterState()

    const itemStore = useItemStore()
    watch(filter.value, async () => {
        itemStore.getAllItems(filter.value)
    })
    console.log(itemStore.items)
</script>