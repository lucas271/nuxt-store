<template>
    <v-card tag="span" class="bg-red d-flex justify-space-around flex-column w-100" v-if="errors.length > 0" height="200px">
        
        <v-card-title class="text-h5">Erro</v-card-title>
        <template v-if="!loading">
            <v-list class="bg-transparent flex-grow-1 flex-shrink-1 overflow-auto">
                <v-card-subtitle v-for="error in errors" class="text-subtitle-1 mb-3"> {{ error }} </v-card-subtitle>
            </v-list>
            <v-card-actions>
                <v-btn variant="tonal" @click="async () => await refreshFunc(filter || undefined)"> Tentar novamente </v-btn>
            </v-card-actions>
        </template>
        <template v-else>
            <span class="flex-grow-1 flex-shrink-1 d-flex justify-center align-center">
                <v-progress-circular indeterminate size="50"/>
            </span>
        </template>
    </v-card>
</template>

<script setup lang="ts">

    defineProps<{errors: string[], refreshFunc: () => Promise<any>, filter?: any, loading: boolean}>()
</script>