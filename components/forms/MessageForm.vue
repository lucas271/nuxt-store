<template>
    <v-form :class="`pa-3 ${type === 'edit' && 'bg-white rounded-lg'}`" @submit="submitForm">
        <h2 v-if="type === 'edit'">Edite sua avaliação</h2>
        <v-alert type="error" v-if="messageStore.errors?.length > 0" v-for="error in messageStore?.errors" :text='error'/>

        <div class="d-flex justify-space-between">
            <v-rating size="small" color="yellow-darken-3" name="mensagem" id="message" v-model='rate'></v-rating>
            <slot/>
        </div>
        <v-textarea placeholder="escreva seu comentário aqui" name="mensagem" id="message"v-model='message'></v-textarea>
        <v-btn type='submit'> Enviar </v-btn>
    </v-form>
</template>

<script setup lang='ts'>
    import {useRatingStore} from '../../lib/services/ratingStore'
    import {useMessageStore} from '../../lib/services/messageStore'
    import {useProductStore} from '../../lib/services/productStore'
    import {useAuthStore} from '../../lib/services/authStore'
    import { onMounted } from 'vue';

    const user = useSupabaseClient().auth?.user
    const apiError = ref<string[]>()
    const productStore = useProductStore()
    const authStore = useAuthStore()
    const ratingStore = useRatingStore()
    const messageStore = useMessageStore()
    const rate = ref<number | null>(null)
    const message = ref<string>('')
    const props = defineProps<{productId: string, type?: 'edit', pvMessage?: string, pvRate?: string, commentId?: string}>()
    const emit = defineEmits(['close-form'])

    const submitForm = async (e) => {
        console.log('abelha')
        e.preventDefault()
        if(!productStore.product) return alert('produto do comentário não recebido')
        if(props.type === 'edit') {
            console.log('abelinha')
            props.commentId ? await messageStore.updateMessage(props.commentId, message.value, rate.value ) : apiError.value.push('nao foi possivel encontrar o id do comentário')
            messageStore.errors.length < 1 && emit("close-form")
            return apiError.value = messageStore.errors?.length > 0 ? messageStore.errors : apiError.value
        }
        await authStore.getActiveUser()
        if(authStore.errors?.length > 0) return apiError.value = authStore.errors?.length > 0 ? authStore.errors : apiError.value

        authStore.user?.username ? await messageStore.addMessage( props.productId, authStore.user.username, message.value, rate.value) : apiError.value.push('nome de usuário nao recebido')
        messageStore.errors.length < 1 && emit("close-form")
        apiError.value = messageStore.errors?.length > 0 ? messageStore.errors : apiError.value
    }
    onMounted(() => {
        rate.value = props?.pvRate || rate.value
        message.value = props?.pvMessage || message.value
    })



</script>