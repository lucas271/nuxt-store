<template>

    <v-main class="h-screen w-screen d-flex align-center justify-center pa-0 ma-0 bg-teal-darken-2">
        
            <v-btn icon="mdi-arrow-left" density="comfortable" position="absolute" :style="{top: '1%', left: '0.5%', zIndex: '100'}" @click="async () => await changeRoute()"></v-btn>
            <v-window class="mx-auto h-100 w-100 responsive-width my-auto" v-model="step">
                <v-window-item class="h-100 w-100"  :value="1">
                    <v-form class="h-100 w-100" @submit="e => handleAuth(e, 'signIn')">
                        <v-card class="h-100 w-100 d-flex justify-center bg-teal-darken-1 align-center">
                            <div class="w-50 h-100 pa-4 flex-column d-none d-sm-flex justify-space-evenly align-center">
                                <v-card-title class="text-uppercase font-weight-bold">Entre na sua conta</v-card-title>
                                <div class="w-100">
                                    <v-alert v-if='apiErrors.length > 0' class='text-caption pa-1 px-4 pa-sm-4 text-sm-body-2' type='error' v-for='error in apiErrors'> {{error}} </v-alert>
                                    <v-alert v-if='isSuccess' class='text-caption pa-1 px-4 pa-sm-4 text-sm-body-2' type='success'> Operação bem sucedida</v-alert>

                                    <v-text-field placeholder="email" :disabled="authStore.loading" :rules='emailValidation' v-model="email"></v-text-field>
                                    <v-text-field placeholder="Senha" :disabled="authStore.loading" :rules='passWordValidation' v-model="password"></v-text-field>
                                </div>

                                
                                <v-card-actions>
                                    <v-btn variant="tonal" type="submit" class="font-weight-bold">
                                        <template v-if="!authStore.loading">
                                                entrar
                                        </template>    
                                        <v-progress-circular indeterminate v-else/>    
                                    </v-btn>
                                </v-card-actions>
                            </div>


                            <div class="w-50 h-100  login-form-bg-image flex-grow-1">
                                <v-sheet position="absolute" class="bg-overlay">

                                </v-sheet>

                                <div class="remove-overlay d-flex justify-space-between align-center flex-column pa-4 h-100 w-100 text-white">
                                    <v-card-subtitle tag="h1" class="text-h4 text-uppercase font-weight-bold bg-teal-darken-4 pa-3 rounded-lg text-wrap text-center" :style="{lineHeight: '1.5'}">Life Cris - Login</v-card-subtitle>
                                    <div class="w-100 h-100 pa-4 flex-column d-flex d-sm-none justify-space-evenly align-center">
                                        <div class="w-100">
                                            <v-alert v-if='apiErrors.length > 0' class='text-caption pa-1 px-4 pa-sm-4 text-sm-body-2' type='error' v-for='error in apiErrors'> {{error}} </v-alert>
                                            <v-alert v-if='isSuccess' class='text-caption pa-1 px-4 pa-sm-4 text-sm-body-2' type='success'> Operação bem sucedida</v-alert>
                                            <v-text-field placeholder="email" :disabled="authStore.loading" :rules='emailValidation' v-model="email"></v-text-field>
                                            <v-text-field placeholder="Senha" :disabled="authStore.loading" :rules='passWordValidation' v-model="password"></v-text-field>
                                        </div>
                                    </div>
                                    <v-card-actions class="d-flex flex-column ga-3">
                                        <v-btn variant="tonal" type="submit" class="font-weight-bold d-sm-none">
                                            <template v-if="!authStore.loading">
                                                Entrar
                                            </template>    
                                            <v-progress-circular indeterminate v-else/>
                                        </v-btn>
                                        <v-card-subtitle class="text-center bg-teal-darken-4 rounded-lg pa-4">Não tem uma conta? <br/><v-btn variant="tonal" :disabled="authStore.loading"  @click="step = 2">Crie!</v-btn></v-card-subtitle>
                                    </v-card-actions>
                                </div>
                            </div>
                        </v-card>
                    </v-form>
                </v-window-item>
                <v-window-item class="h-100 w-100" :value="2">
                    <v-form class="h-100 w-100" @submit="e => handleAuth(e, 'signUp')">
                        <v-card class="h-100 w-100 d-flex justify-center bg-teal-darken-1 align-center">

                            <div class="w-50 h-100 pa-4 flex-column d-none d-sm-flex justify-space-evenly align-center">
                                <v-card-title class="text-uppercase font-weight-bold">Crie sua conta</v-card-title>
                                <div class="w-100">
                                    <v-alert v-if='apiErrors.length > 0' class='mb-6' type='error' v-for='error in apiErrors'> {{error}} </v-alert>
                                    <v-text-field :disabled="authStore.loading" placeholder="Nome de usuário" :rules="[(value) => !value && 'Campo vazio' || Number(value[0]) && 'Nome não pode começar com um numero']" v-model='username'></v-text-field>
                                    <v-text-field :disabled="authStore.loading" placeholder="email" :rules='emailValidation' v-model="email"></v-text-field>
                                    <v-text-field :disabled="authStore.loading" placeholder="Senha" :rules='passWordValidation' v-model="password"></v-text-field>
                                    <v-text-field :disabled="authStore.loading" placeholder="Repetir senha" :rules="[(value) => !value && 'Campo vazio', (value) => value !== password && 'Senhas não são iguais.']" v-model='repeatPassword'></v-text-field>
                                </div>

                                
                                <v-card-actions>
                                    <v-btn type='submit' variant="tonal" class="font-weight-bold">
                                        <template v-if="!authStore.loading">
                                                Criar
                                        </template>    
                                                <v-progress-circular indeterminate v-else/>
                                        </v-btn>
                                </v-card-actions>
                            </div>

                            <div class="w-50 h-100  register-form-bg-image flex-grow-1">
                                <v-sheet position="absolute" class="bg-overlay">

                                </v-sheet>

                                <div class="remove-overlay d-flex justify-space-between align-center flex-column pa-4 h-100 w-100 text-white">

                                    <v-card-subtitle tag="h1" class="text-h6 text-uppercase font-weight-bold bg-teal-darken-4 pa-3 rounded-lg text-wrap text-center" :style="{lineHeight: '1.5'}">Life Cris - Registrar</v-card-subtitle>

                                    <div class="w-100 h-100 pa-4 flex-column d-flex d-sm-none justify-space-evenly align-center">
                                        <v-alert v-if='apiErrors.length > 0' class='text-caption pa-1 px-4 pa-sm-4 text-sm-body-2' type='error' v-for='error in apiErrors'> {{error}} </v-alert>
                                        <v-alert v-if='isSuccess' class='text-caption pa-1 px-4 pa-sm-4 text-sm-body-2' type='success'> Operação bem sucedida</v-alert>

                                        <div class="w-100">
                                            <v-text-field :disabled="authStore.loading" placeholder="Nome de usuário" :rules="[(value) => !value && 'Campo vazio' || Number(value[0]) && 'Nome não pode começar com um numero']" v-model='username'></v-text-field>
                                            <v-text-field :disabled="authStore.loading" placeholder="email" :rules='emailValidation' v-model="email"></v-text-field>
                                            <v-text-field :disabled="authStore.loading" placeholder="Senha" :rules='passWordValidation' v-model="password"></v-text-field>
                                            <v-text-field :disabled="authStore.loading" placeholder="Repetir senha" :rules="[(value) => !value && 'Campo vazio' || !(value === password) && 'Senhas não são iguais.']" v-model='repeatPassword'></v-text-field>
                                        </div>
                                 
                                    </div>
                                    <v-card-actions class="d-flex flex-column ga-3">
                                        <v-btn type='submit' variant="tonal" class="font-weight-bold d-sm-none">
                                            <template v-if="!authStore.loading">
                                                Criar
                                            </template>    
                                            <v-progress-circular indeterminate v-else/>
                                        </v-btn>
                                        <v-card-subtitle class="text-center bg-teal-darken-4 rounded-lg pa-sm-4 pa-2">Já tem uma conta? <br/><v-btn variant="tonal" :disabled="authStore.loading"  @click="step = 1">Entre!</v-btn></v-card-subtitle>
                                    </v-card-actions>
                                </div>

                            </div>


                        </v-card>
                    </v-form>
                </v-window-item>
            </v-window>
             
    </v-main>
</template>

<script lang="ts" setup>
import {useAuthStore} from '../lib/services/authStore'
async function changeRoute(path?: string) {
  window.location.href = '/';
}

const step = ref<number>(1)
const apiErrors = ref<string[]>([])
const authStore = useAuthStore()

const password = ref<string>('')
const repeatPassword = ref<string>('')
const errorMsg = ref<string>('')
const successMsg = ref<string>('')
const email = ref<string>('')
const username = ref<string>('')
const isSuccess = ref<boolean>(false)
const router = useRouter()

watch(step, () => {
    isSuccess.value = false
    email.value = ''
    repeatPassword.value = ''
    password.value = ''
    errorMsg.value = ''
    successMsg.value = ''
    username.value = ''
    apiErrors.value = []
})

const emailValidation = [
    (value) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !!value || 'email é necessário' && emailRegex.test(value) || 'email invalido';
    }, 
]

const passWordValidation = [
    (value) => {
        if (!value || value.length < 6 || value.length > 60) {
            return 'Senha deve ter no minimo 6 caracteres.';
        }

        if (value.length > 60) {
            return 'Senha deve ter no máximo 60 caracteres.';
        }

        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);

        if (!hasUppercase || !hasLowercase || !hasNumber) {
            return 'Senha deve conter uma letra maiuscula, uma minuscula e um numero.';
        }

        return true; // Valid password
    }
]


const client = useSupabaseClient()
const handleAuth = async (e, type) => {
    e.preventDefault()

    apiErrors.value = []
    isSuccess.value  = false


    if(!email.value || !password.value) return errorMsg.value = 'Informações faltando'
    if(type === 'signIn'){
        await authStore.loginUser(email.value, password.value)
        if(authStore.errors.length > 0) return apiErrors.value = authStore.errors
        
        isSuccess.value = authStore.user?.userId ? true : false
        await authStore.user && await client.auth.signInWithPassword({email: email.value, password: password.value}) && await changeRoute()
    }

    if(password.value !== repeatPassword.value && type === 'signUp') return errorMsg.value = 'Senhas não são iguais.'
    if(type === 'signUp'){
        await authStore.addUser(username.value, email.value, password.value)
        if(authStore.errors.length > 0) return apiErrors.value = authStore.errors
        isSuccess.value = authStore.user?.userId ? true : false
        authStore.user && await client.auth.signInWithPassword({email: email.value, password: password.value}) && await changeRoute()
    }
}


useSeoMeta({
    title: `Autenticação`,
    ogTitle: `Autenticação`,
    description: "Faça login na pagina estetica life cris e desbloqueie novas funcionalidades",
    keywords: 'bioestimuladores, drenagem, pump_up, celulite, pós operatório, limpeza de pele',
})
definePageMeta({
    layout: 'empty',
    middleware: 'need-no-user'
})
</script>