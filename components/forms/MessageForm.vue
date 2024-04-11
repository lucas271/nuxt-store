<template>
    <v-form class="pa-3" @submit="submitForm">
        <v-rating size="small" v-model='rate'></v-rating>
        <v-textarea placeholder="escreva seu comentário aqui" v-model='message'></v-textarea>
        <v-btn type='submit'> Enviar </v-btn>
    </v-form>
</template>

<script setup lang='ts'>
    import {useRatingStore} from '../../lib/services/ratingStore'
    import {useMessageStore} from '../../lib/services/messageStore'
    import {useProductStore} from '../../lib/services/productStore'
    import {useAuthStore} from '../../lib/services/authStore'

    const user = useSupabaseClient().auth?.user
    const apiError = ref<string[]>()
    const productStore = useProductStore()
    const authStore = useAuthStore()

    const rate = ref<number | null>(null)
    const message = ref<string>('')
    const props = defineProps<{productId: string}>()

    const submitForm = async (e) => {
        e.preventDefault()
        if(!productStore.product) return alert('produto não recebido')

        await authStore.getActiveUser()
        await messageStore.addMessage(props.productId, authStore.user.username, message.value, rate.value)

    }


    const ratingStore = useRatingStore()
    const messageStore = useMessageStore()

</script>