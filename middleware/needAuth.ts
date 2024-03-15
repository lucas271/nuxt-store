export default defineNuxtRouteMiddleware(async () => {
    const user = useSupabaseUser()

    if (!user.value) {
        console.log(user)

        return await navigateTo('/auth')
    }
})