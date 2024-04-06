import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await (await serverSupabaseClient(event)).auth.getUser()


    console.log(client)
    if(!client) throw {errors: 'usuario não autenticado'}
    const url = getRequestURL(event)
    if((event.method === 'POST' || event.method === 'DELETE' || event.method === 'PUT') && !client) throw {errors: 'unauthenticated'}
    
    if((url.pathname.includes('/product') || url.pathname.includes('/category')) && 
    (event.method === 'DELETE' || event.method === 'PUT' || event.method === 'POST') &&
    client.data.user?.role !== 'admin') throw {errors: "You're not an admin"}
})