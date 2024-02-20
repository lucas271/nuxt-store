<template>
    <v-main class="h-screen w-screen pa-0 ma-0">
        <div class="w-100 h-100 d-flex justify-center align-center">
            <v-window class="w-75 h-100">
                <v-window-item class="h-100 w-100">
                    <v-form class="h-100 w-100 bg-teal-lighten-3">
                        <div class="h-100 w-100 d-flex justify-center align-center rounded-lg">

                            <div class="w-50 h-100 pa-4 rounded-lg">
                                <v-card-title>Entre na sua conta</v-card-title>
                                <v-text-field placeholder="email"></v-text-field>
                                <v-text-field placeholder="Senha"></v-text-field>
                                
                                <v-card-actions>
                                    <v-btn variant="tonal">Entrar</v-btn>
                                </v-card-actions>
                            </div>

                            <div class="w-50 h-100 pa-4 d-flex justify-space-between align-center flex-column login-form-bg-image text-white bg-yellow">
                                <v-card-subtitle class="text-h4">Life Cris</v-card-subtitle>
                                <v-card-actions>
                                    <v-card-text class="text-center">Não tem uma conta? <br/><v-btn variant="tonal mt-3">Registre!</v-btn></v-card-text>
                                </v-card-actions>
                            </div>


                        </div>
                    </v-form>
                </v-window-item>
                <v-window-item class="h-100 w-100">
                    <v-card class="h-100 w-75 bg-black">
                        <v-card-title>Regitro</v-card-title>


                        <v-text-field placeholder="Email"></v-text-field>
                        <v-text-field placeholder="Senha"></v-text-field>
                        <v-text-field placeholder="repetir senha"></v-text-field>

                        <v-card-actions>
                            <v-btn>Entrar</v-btn>
                        </v-card-actions>

                        <v-subtitle>
                            já tem uma conta? <span>entre!</span>

                        </v-subtitle>
                    </v-card>
                </v-window-item>
            </v-window>
        </div>

    </v-main>
</template>