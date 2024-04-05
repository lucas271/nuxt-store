<template>
    <div class="bg-grey d-flex flex-column pa-2 d-flex rounded-lg">
        <header class="d-flex justify-space-between w-100">
            <v-card-subtitle class="ma-0 pa-0">Pessoa que comentou</v-card-subtitle>
            <div>
                <v-card-caption>2015</v-card-caption>
            </div>
        </header>
        <div class="flex-grow-1 flex-shrink-1 w-100">
            <v-card-text class="pa-0 ma-1 overflow-auto" :style="{minHeight: '8vh', maxHeight: '15vh'}">
            </v-card-text>
        </div>
    </div>
</template>


<script setup lang='ts'>


</script>