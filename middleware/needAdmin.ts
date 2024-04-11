export default defineNuxtRouteMiddleware(async () => {
    const user =  await useSupabaseUser()    
    if(user?.value?.role !== 'admin') return await navigateTo('/404')
})