<template>
    <v-select :items="categoryStore.categories.length > 0 ? categoryStore.categories.map(category => {
        return category.name
    }) : []
    " v-bind:value="select" v-on:input="$emit('update:select', $event.target.value)" name="category">

    </v-select>
</template>

<script setup lang="ts">
    import {useCategoryStore} from '../../lib/services/categoryStore.ts'
    const categoryStore = useCategoryStore()
    defineProps<{select: string[]}>();
</script>