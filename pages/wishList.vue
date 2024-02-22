<template>
    <header class="mx-sm-12 mx-4 d-flex justify-space-between py-2 align-center border-b-2 ">
        <h2 class="text-left  d-flex align-center ga-1 ga-sm-2 text-sm-h6 text-subtitle-2"><v-icon>mdi-heart-outline</v-icon> Meus Favoritos</h2>
        <v-btn density="comfortable" class="text-caption text-sm-subtitle-1">Apagar tudo</v-btn>
    </header>
    <v-divider thickness="3"></v-divider>
    <v-container>
        <sharedItemsGrid/>
    </v-container>
</template>