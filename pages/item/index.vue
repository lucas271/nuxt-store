<template>
        
    <v-container>
        
        <h2 class="text-left mt-4 mb-8"></h2>
        <v-header class="w-100 h-50">
            <sharedItemFilter/>
        </v-header>
        <h2 class="my-6">Tratamentos</h2>
        <sharedItemsGrid/>
    </v-container>
</template>

<script lang="ts" setup>


const slider = ref<number>([0, 2000])
</script>