<template>
    <v-form class="pa-3" @submit="(e) => e.preventDefault()">
        <h3>Deixe sua avaliação</h3>
        <v-rating size="small"></v-rating>
        <v-textarea placeholder="escreva seu comentário aqui"></v-textarea>
        <v-btn type='submit'> Enviar </v-btn>
    </v-form>
</template>