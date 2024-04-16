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
                            <v-card height='85vh' width='90vw' class=' bg-teal-darken-3 d-flex flex-column ga-2' >
                                <v-btn @click='' position='absolute' style='right: 1.8%; top:1.5%' class="text-caption" icon='mdi-close' variant='tonal' density='comfortable'> </v-btn>
                                <div class='text-center my-sm-5 mt-2'>
                                    <v-card-title class='text-sm-h4 text-subtitle-1 font-weight-bold text-break pa-sm-3 pa-0'> Questionario </v-card-title>

                                    <p class='text-caption text-sm-subtitle-2 text-grey-lighten-2 text-break d-none d-sm-inline'> Descubra o tratamento ideal para você! </p>

                                    <div>
                                    </div>
                                </div>
          
                                <v-window v-model="step.currentStep" class="h-100  flex-shrink-1 flex-grow-1 ">
                                    <v-window-item :key="1" class="h-100">
                                        <div class="d-flex flex-column h-100 overflow-hidden justify-space-evenly align-center">
                                            <span class="text-sm-h4 text-body-2 mx-0 pa-sm-0 pb-3 text-wrap w-100 text-center font-weight-bold">
                                                Qual área você deseja tratar?
                                            </span>
                                            <div class="d-flex flex-grow-1 responsiveWidth justify-center align-center flex-sm-row flex-column ga-3 flex-shrink-1 overflow-hidden mx-auto">
                                                <template v-for="item in (step1Options)" >
                                                    <v-hover v-slot="{ isHovering, props }" open-delay="100">
                                                        <v-card  
                                                            class="h-75 bg-teal-darken-2 d-flex w-75 flex-column mx-2 overflow-hidden" 
                                                            :style="item.name === selectedOptions.step1 && { backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '3px solid #01B573'}"
                                                            v-bind="props"
                                                            :elevation="isHovering ? 24 : 2"
                                                            v-ripple
                                                            @click="selectedOptions.step1 = item.name"
                                                        >
                                                            <h4 class="text-sm-subtitle-1 text-subtitle-2 text-center d-sm-inline d-none">{{ item.name }}</h4>
                                                            <v-img class="w-100 flex-grow-1 flex-shrink-1" cover :src="item.img"/>
                                                            <v-btn variant="tonal" :ripple="false" class="text-subtitle-2 text-sm-subtitle-1">clique para selecionar</v-btn>
                                                        </v-card>
                                                    </v-hover>
                                                </template>
                                            </div>


                                            <span class="text-center text-sm-h6 text-subtitle-2 mx-0 pa-sm-0 pt-3 " >
                                                Area selecionada: <span class="font-weight-bold font-italic">{{ selectedOptions.step1 }}</span>
                                            </span>
                                        </div>
                                            
                                        
                                    </v-window-item>
                                    <v-window-item :key="1" class="h-100">
                                        <div class="d-flex flex-column h-100 overflow-hidden justify-space-evenly align-center">
                                            <v-card-title class="text-sm-h4 text-subtitle-2 mx-0 pa-0 text-wrap w-100 text-center font-weight-bold">
                                                Que tipo de tratamento você quer? 
                                            </v-card-title>
             
                                            <v-container class="d-flex  ga-3 w-75 h-75 flex-shrink-1 justify-center align-center overflow-x-hidden flex-wrap overflow-auto">
                                                <v-row align="end" >
                                                    <v-col v-if="selectedOptions.step1 === 'rosto' || selectedOptions.step1 === 'corpo'" v-for="item in selectedOptions.step1 === 'rosto' ? step2FaceOptions : step2BodyOptions">
                                                        <v-hover v-slot="{ isHovering, props }"  open-delay="100" >
                                                            <v-card
                                                                :style="{...(item.name === selectedOptions[selectedOptions.step1 === 'rosto' ? 'step2Face' : 'step2Body']  ?  {backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '3px solid #01B573'} : {border: '3px solid transparent'})}"
                                                                class="bg-teal-darken-2 d-flex flex-column "
                                                                v-bind="props"
                                                                :elevation="isHovering ? 24 : 2"
                                                                v-ripple
                                                                @click="selectedOptions[selectedOptions.step1 === 'rosto' ? 'step2Face' : 'step2Body'] = item.name"
                                                            >
                                                                <h4 class="text-sm-subtitle-1 text-subtitle-2 text-center text-break">{{ item.name }}</h4>
                                                                <v-btn variant="tonal" class="text-sm-h6 text-subtitle-2 font-weight-bold text-break" :ripple="false">clique para selecionar</v-btn>
                                                            </v-card>
                                                        </v-hover>
                                                    </v-col>

                                                </v-row>
                                               
                  
                                            </v-container>
                                            <span class="text-center text-sm-h6 text-subtitle-2 text-break w-75" >
                                                Tipo selecionado: <span class="font-weight-bold font-italic">{{ selectedOptions[selectedOptions.step1 === 'rosto' ? 'step2Face' : 'step2Body'] }}</span>
                                            </span>
                                        </div>
                                    </v-window-item>
                                    <v-window-item :key="1" class="h-100">
                                        <div class="d-flex flex-column h-100 overflow-hidden justify-space-evenly align-center">
                                            <v-card-title class="text-h4 font-weight-bold text-uppercase">
                                                Qual área você deseja tratar? {{ step.currentStep }}
                                            </v-card-title>
             
                                            <div class="d-flex ga-6 w-100 h-75 flex-shrink-1 justify-center align-center overflow-hidden">

                                                <v-hover v-slot="{ isHovering, props }" open-delay="100" v-for="item in step1Options" >
                                                    <v-card
                                                        :style="item.name === selectedOptions.step1 && { backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '3px solid #01B573'}"
                                                        class="w-50 h-75 bg-teal-darken-2 d-flex flex-column"
                                                        v-bind="props"
                                                        :elevation="isHovering ? 24 : 2"
                                                        v-ripple
                                                        @click="selectedOptions.step1 = item.name"
                                                    >
                                                        <h4 class="text-subtitle-1 text-center">{{ item.name }}</h4>
                                                        <v-btn variant="tonal" :ripple="false">clique para selecionar</v-btn>
                                                    </v-card>
                                                </v-hover>
                  
                                            </div>
                                            <span class="text-center text-h6" >
                                                Area selecionada: <span class="font-weight-bold font-italic">{{ selectedOptions.step1 }}</span>
                                            </span>
                                        </div>
                                            
                                        
                                    </v-window-item>
                                </v-window>
                                <v-divider/>
                                <v-card-actions>
                                    <v-btn variant='tonal' v-if='step.currentStep > 0' @click='step.currentStep > 0 && step.currentStep--'> Voltar </v-btn>
                                    <v-spacer/>
                                    <v-btn variant='tonal' @click="(step.currentStep + 1 === 1 ? selectedOptions.step1 : step.currentStep + 1 === 2 && (selectedOptions?.step2Face || selectedOptions?.step2Body)) && (step.currentStep + 1 < step.numberOfSteps && step.currentStep++)"> {{step.currentStep + 1 < step.numberOfSteps ? 'proximo' : 'Enviar'}} </v-btn>
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
    const step = ref<{currentStep: 0 | 1 | 2, numberOfSteps: number}>({currentStep: 0, numberOfSteps: 3})

    const step1Options = [
        {name: 'rosto', img: 'https://img.freepik.com/vetores-gratis/ilustracao-de-desenho-de-rosto-desenhado-a-mao_23-2150523274.jpg'},
        {name: 'corpo', img: 'https://img.freepik.com/vetores-gratis/desenho-de-linha-de-arte-feminina-feminina-em-fundo-cinza_53876-120588.jpg'} ]
    const step2FaceOptions = [
        {name: 'rugas', id: '' },
        {name: 'olheiras', id: ''},
        {name: 'Acne', id: ''},
        {name: 'pele oleosa', id: ''},
        {name: 'bioestimuladores', id: ''},
        {name: 'lallalala', id: ''}
    ]
    const step2BodyOptions = [
        {name: 'bumbum', id: ''},
        {name: 'gordura localizada', id: ''},
        {name: 'estrias', id: ''},
        {name: 'celulite', id: ''},
        {name: 'pós operatório', id: ''},
        {name: 'lallalala', id: ''}
    ]
    interface optionsInterface{
        step1: 'rosto' | 'corpo' | undefined,
        step2Face: "rugas" | "olheiras" | "Acne" | "pele oleosa" | "bioestimuladores" | undefined,
        step2Body: "bumbum" | "flacidez" | "gordura localizada" | "estrias" | "celulite" | "pós operatório" | undefined
    }

    const selectedOptions = ref<optionsInterface>({
        step1: undefined,
        step2Face: undefined,
        step2Body: undefined
    })
</script>

<style>
    .responsiveWidth{
        width: 90%;
        height: fit-content;

        @media (min-width: 800px) {
            width: 70%;
            height: 100%;
        }

    }
</style>