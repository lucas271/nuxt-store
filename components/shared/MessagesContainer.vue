<template>
    <v-container>
        <v-card>
            <template v-if='!comments?.find(comment => comment.userId === user?.id)'>
                <formsMessageForm :productId='productId'/>
            </template>
            <div class="bg-grey  mx-auto my-5  rounded-lg" style='width: 90%;' v-else>
                <v-card-title>
                    Seu comentário:
                </v-card-title>
                <div class="d-flex flex-column ga-2 pa-3" v-for='comment in comments?.filter(comment => comment?.userId === user?.id)'>
                    <sharedMessage :message='comment?.message' :updated_at="comment?.updated_at" :created_at="comment?.created_at" :userId='comment?.userId' :id='comment?.id' :userName='comment?.username' :rate='comment?.Rating?.rate'/>
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

    const user = useSupabaseUser()
    defineProps<{comments:{message: string, id?: string, rate: number, userName: string, userId: string, updated_at?: string, created_at: string}[], productId: string}>()
</script>