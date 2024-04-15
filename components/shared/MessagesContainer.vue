<template>
    <v-container>
        <v-card>
            <template v-if='!comments?.find(comment => comment.userId === user?.id)'>
                <template v-if="user?.id">
                    <formsMessageForm :productId='productId'/>
                </template>
                <template v-else>
                    <v-sheet class="bg-grey d-flex justify-center align-center pa-6 ga-4">
                        <h4>Voce precisa ter uma conta para postar um comentário:</h4>
                        <v-btn variant='tonal' @click="navigateTo('/auth')">Entrar</v-btn>
                    </v-sheet>
                </template>
            </template>
            <div class="bg-grey  mx-auto my-5  rounded-lg" style='width: 90%;' v-else>

                <div class="d-flex flex-column ga-2 pa-3" v-for='comment in comments?.filter(comment => comment?.userId === user?.id)'>
                    <div class="d-flex justify-space-between flex-wrap w-100 align-center px-6">
                        <v-card-title>
                            Seus comentários:
                        </v-card-title>
                        <v-card-actions v-if="!isEditComment">
                            <v-btn class="text-subtitle-2" variant="tonal" icon="mdi-pencil-outline" density="comfortable" @click="isEditComment = true"></v-btn>
                            <v-btn class="text-subtitle-2" variant="tonal" icon="mdi-trash-can-outline" density="comfortable" @click="comment.id && deleteComment(comment.id)"></v-btn>
                        </v-card-actions>
                    </div>
                    <template v-if="!isEditComment">
                        <sharedMessage :message='comment?.message' :updated_at="comment?.updated_at" :created_at="comment?.created_at" :userId='comment?.userId' :id='comment?.id' :userName='comment?.username' :rate='comment?.Rating?.rate'/>
                    </template>
                    <template v-else>
                        <formsMessageForm :productId='productId' type="edit" :pvMessage="comment?.message" :pvRate="comment?.Rating?.rate" :commentId="comment?.id" @close-form="isEditComment = false">
                            <v-btn class="text-subtitle-2" variant="tonal" icon="mdi-close" density="comfortable" @click="isEditComment = false"></v-btn>
                        </formsMessageForm>
                    </template>
                </div>
            </div>
            <v-card-title>Comentários ({{comments?.length || 0}})</v-card-title>
            <div class="d-flex flex-column ga-2 pa-3" v-for='comment in comments?.filter(comment => comment?.userId !== user?.id)'> 
                <sharedMessage :message='comment?.message' :updated_at="comment?.updated_at" :created_at="comment?.created_at" :userId='comment?.userId' :id='comment?.id' :userName='comment?.username' :rate='comment?.Rating?.rate'/>
            </div>

        </v-card>
    </v-container>
</template>

<script setup lang='ts'>
    import {useMessageStore} from '../../lib/services/messageStore'

    const messageStore = useMessageStore()
    const isEditComment = ref<boolean>(false)
    const user = useSupabaseUser()

    const deleteComment = async (messageId: string) => {
        const isSure = confirm("Tem certeza que deseja excluir o comentário?")
        isSure && await messageStore.removeMessage(messageId)
    }
    defineProps<{comments:{message: string, id?: string, Rating: {rate: number, "review_id": string, "product_id": string, "user_id": string, "id": string}, username: string, userId: string, updated_at?: string, created_at: string}[], productId: string}>()

</script>