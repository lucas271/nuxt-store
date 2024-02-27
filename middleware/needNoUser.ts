export default defineNuxtRouteMiddleware(async () => {
    const user =  useSupabaseUser()    
    if (user.value) {
        return await navigateTo('/')
    }
})