<template>
    <v-container>
        <v-card>
            <formsMessageForm/>


            <v-card-title>Comentários ({{comments.length}})</v-card-title>
            <div class="d-flex flex-column ga-2 pa-3" v-for='comment in comments.filter(comment => comment.userId !== user)'> 
                <sharedComment :title='title' :message='string' :userId='userId' :id='id' :userName='userName' :rate='rate'/>
            </div>
        </v-card>
    </v-container>
</template>

<script setup lang='ts'>

    const user = useSupabaseClient().auth?.user?.id || null
    defineProps<{comments: { title: string, message: string, userId?: string, productId?: string, id?: string, userName?: string, rate: number}[]}>()
</script>