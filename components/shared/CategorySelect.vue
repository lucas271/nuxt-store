<template>
    <v-select :items="categoryStore.categories.length > 0 ? categoryStore.categories.map(category => {
        return category.name
    }) : []
    " v-bind:value="select"  @change="$emit('update:select', $event)" multiple name="selecionador de categorias">

    </v-select>
</template>

<script setup lang="ts">
    import {useCategoryStore} from '../../lib/services/categoryStore'
    const categoryStore = useCategoryStore()
    defineProps<{select?: string[]}>();
</script>