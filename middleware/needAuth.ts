export default defineNuxtRouteMiddleware(async () => {
    console.log(user)
    const user = useSupabaseUser()
    console.log(user)

    if (!user.value) {
        console.log(user)

        return await navigateTo('/auth')
    }
})