

<template>
    <v-app-bar :elevation="2" rounded height="60" class="text-teal-darken-4">
        <template v-slot:prepend >
            <v-app-bar-title @click="navigateTo('/')" class="cursor-pointer">LifeCris</v-app-bar-title>
        </template>
        <v-spacer />
            <v-text-field
                class="d-sm-inline-block d-none"
                density="compact"
                variant="solo"
                label="Procurar tratamentos"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details

            ></v-text-field>
        <v-spacer />
        <template v-slot:append>
            <div class="d-none d-sm-flex">
                <v-btn @click="navigateTo('/wishList')">
                    <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">

                            <v-badge floating tag="span" offset-y="28" offset-x="10" content="100">
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <layoutCartPreview/>
                </v-menu>
                <v-btn @click="data.session ? handleSignOut() : navigateTo('/auth')"}>
                    <v-icon>{{data.session ? "mdi-exit-run" : "mdi-account-outline"}}</v-icon>
                </v-btn>
            </div>

            <v-app-bar-nav-icon class="d-sm-none" @click="isOpen = !isOpen"/>
        </template>
    </v-app-bar>
    <div class="d-sm-none">
        <v-navigation-drawer
        location="top"  
        v-model="isOpen"
        temporary
        >
        </v-navigation-drawer>
    </div>

</template>

<script lang="ts" setup >
    import { ref } from 'vue'

    const isOpen = ref(false)
    const client = useSupabaseClient()
    const router = useRouter()
    const { data, error } = await client.auth.getSession()

    const handleSignOut = async () => {
    try {
      await client.auth.signOut({redirectTo: '/'})
      return await reloadNuxtApp() 
    } catch (err) {
    }
  }
</script>