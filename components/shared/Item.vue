<template>
    <v-card class="w-100 h-100 flex-column d-flex ga-2 bg-teal-lighten-2 rounded-lg">
        <v-img class="h-50 w-100 flex-shrink-1" cover :src="img ? img : 'https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg'">
            <v-btn variant="" class="text-subtitle-2 text-red-darken-1 bg-red-lighten-3" icon="mdi-heart" density="comfortable" position="absolute" :style="{top: '5%', right: '5%'}"></v-btn>

        </v-img>
        <div class='flex-grow-1 d-flex justify-space-around flex-column'>
            <v-card-title class="font-italic">{{name}}</v-card-title>
            <v-card-subtitle class="text-wrap">{{title}}</v-card-subtitle>
            <v-card-text>R${{ price.toFixed(2).replace('.', ',') || '' }}</v-card-text>
            <v-card-actions >
                <v-btn class="text-body-1"  variant="tonal">
                    Ver mais
                </v-btn>
                <v-btn class="text-body-1"  variant="tonal" >
                    + Carrinho
                    
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
    {{  }}
</template>

<script setup lang="ts">
interface ItemInterface {
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
defineProps<ItemInterface>()
</script>