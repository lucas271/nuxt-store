import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await (await serverSupabaseClient(event)).auth.getUser()

    if(event.method === 'GET') {
        event.context.userId = client.data.user?.id || undefined
        return
    }
    const url = getRequestURL(event)
    if(url.pathname.includes('/auth') && client?.data?.user) throw createError({
        statusCode: 400,
        message: JSON.stringify({errros: ["Voce não pode estar logado para realizar essa ação"]}),
    })
    if(url.pathname.includes('/auth')) return 

    if((event.method === 'POST' || event.method === 'DELETE' || event.method === 'PUT') && !client?.data?.user) {throw createError({
        statusCode: 400,
        message: JSON.stringify({errors: ["Voce precisa estar logado para realizar essa operação."]}),
    })}else{
        if(
        (url.pathname.includes('/product') || url.pathname.includes('/category')) && 
        (event.method === 'DELETE' || event.method === 'PUT' || event.method === 'POST') &&
        (client.data.user?.role !== 'admin') || !client.data.user?.id) throw createError({
            statusCode: 400,
            message: JSON.stringify({errors: ["Voce precisa ser um usuario autorizado para realizar essa ação."]}),
        }) 
        event.context.userId = client.data.user.id
    }
})