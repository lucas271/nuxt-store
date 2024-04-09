<template>
    <v-card class="bg-white text-teal-darken-1">

        <v-container class="d-flex justify-space-between ga-4 align-center flex-sm-row flex-column h-100 responsive-height">
            <v-avatar rounded="0" class="h-100 w-100 flex-grow-1 flex-shrink-1">
                <v-img height="100%"  src="https://img.freepik.com/free-photo/girl-deciding-what-product-better-look-up-thoughtful-touch-chin-thinking-smiling-shopping-alone-making-choice-considering-proposals_176420-44746.jpg">
                    
                </v-img>
            </v-avatar>
            <div class="d-flex flex-column justify-space-evenly" :style="{minWidth: '45%',}">
                <div>
                    <v-card-title class='text-h6 text-wrap text-sm-h5'>Não sabe o que quer?</v-card-title>
                    <v-card-subtitle class="text-wrap text-subtitle-2 text-sm-subtitle-1">Descubra algumas das possibilidades.</v-card-subtitle>
                </div>

                <div>
                    <v-card-text class="text-wrap text-caption">O teste irá te apresentar alguns dos tratamentos disponiveis para o seu caso</v-card-text>
                    <v-card-actions>
                        <v-btn variant="outlined" @click='overlay = true'>Fazer o teste</v-btn>
                        <v-overlay v-model='overlay' class='d-flex justify-center align-center'>
                            <v-card height='85vh' width='75vw' class=' bg-teal-darken-3 d-flex flex-column ga-2'>
                                <v-btn @click='' position='absolute' style='right: 1.5%; top:1.5%' icon='mdi-close' variant='tonal' density='comfortable'> </v-btn>
                                <div class='text-center mt-5 mb-5'>
                                    <v-card-title class='text-h4'> Questionario </v-card-title>
                                    <v-card-subtitle class='text-subtitle-1'> Descubra o tratamento ideal para você! </v-card-subtitle>

                                    <div>
                                    </div>
                                </div>
          
                                <v-window v-model="step" class='flex-grow-1 flex-shrink-1 d-flex justify-space-evenly'>
                                    <v-window-item class='d-flex flex-column h-100' :value="1">
                                        <v-card-text class='text-h4 font-weight-bold text-uppercase text-center'> Qual área você deseja tratar? </v-card-text>
                                        <div class='flex-grow-1 d-flex ga-6 h-100 justify-center align-center'>
                                            <div class='h-100 w-50'>
                                                
                                                <v-img class='w-100 h-50' cover src='https://img.freepik.com/vetores-gratis/ilustracao-de-desenho-de-rosto-desenhado-a-mao_23-2150523274.jpg'/>
                                            </div>

                                            <div class='h-100 w-50'>
                                                <h6> Corpo </h6>
                                                <v-img class='w-100 h-50' cover src="https://img.freepik.com/vetores-gratis/desenho-de-linha-de-arte-feminina-feminina-em-fundo-cinza_53876-120588.jpg"/>
                                            </div>
                                        </div>
                                        
                                    </v-window-item>

                                    <v-window-item :value="2">

                                    </v-window-item>

                                    <v-window-item :value="3">

                                    </v-window-item>
                                </v-window>
                                <v-divider/>
                                <v-card-actions>
                                    <v-btn variant='tonal' v-if='step.currentStep > 1'> Voltar </v-btn>
                                    <v-spacer/>

                                    <v-btn variant='tonal'> {{step.currentStep < numberOfSteps ? 'proximo' : 'Enviar'}} </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-overlay>
                    </v-card-actions>
                </div>
            </div>

        </v-container>
    </v-card>
</template>

<script setup lang='ts'>
    const overlay = ref<boolean>(false)
    const step = ref<{currentStep: 1 | 2 | 3, numberOfSteps: 3}>(1)

    const step1Options = ['rosto' | 'corpo' ]
    const step2FaceOptions = ['rugas', 'olheiras', 'Acne', 'pele oleosa', 'bioestimuladores']
    const step2BodyOptions = ['bumbum', 'flacidez', 'gordura localizada', 'estrias', 'celulite', 'pós operatório']
    interface optionsInterface{

    }

    const selectedOptions = ref<optionsInterface>([{ 

    }])
</script>