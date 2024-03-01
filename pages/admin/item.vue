<template>
    <v-container>
        <h2 class="text-left mt-4 mb-8"></h2>
        <v-header class="w-100 h-50">
            <sharedItemFilter/>
        </v-header>
        <h2 class="my-6">Tratamentos {{ isForm }}</h2>
        <sharedItemsGrid>
            <v-sheet class="w-100 h-100">
                <v-hover v-if="!isForm">
                    <template v-slot:default="{isHovering, props}">
                        <v-card @click="isForm = !isForm" v-bind="props" :class="`cursor-pointer w-100 h-100 d-flex ${isHovering || isForm ? 'bg-teal-lighten-2' : 'bg-white'} justify-center align-center rounded-lg`" >
                            <v-icon :class="`text-h2 ${isHovering ? 'text-white': 'text-teal-lighten-2'} `">mdi-plus</v-icon>
                        </v-card>
                    </template>
                </v-hover>
                <v-card class="h-100 w-100" v-if="isForm">
                    <v-stepper class="h-100 w-100" v-model="step" non-linear>
                        <v-stepper-header>
                            <template v-for="(item, index) in steps" key="index">
                                
                                <v-stepper-item :value="index + 1"   :complete="step > 1" :editable="step > 1">
                                </v-stepper-item>
                                <v-divider v-if="index + 1 !== steps.length"/>
                            </template>
                        </v-stepper-header>
                        <v-stepper-window>
                            <v-stepper-window-item :value='index + 1' v-for="(item, index) in steps" :key="index ">
                                <v-form >
                                    <template v-for="input in Object.keys(item)">
                                        <v-text-field 
                                            v-if="item[input].type === 'text' || item[input].type === 'number'"
                                            :label="item[input].label" 
                                            :rules="item[input].rules" :name="input" 
                                            :placeholder="item[input].placeholder" 
                                            :type="item[input].type"
                                        />
                                        <v-file-input 
                                            v-if="item[input].type === 'file'"                                         
                                            :label="item[input].label" 
                                            :rules="item[input].rules" :name="input" 
                                            :placeholder="item[input].placeholder" 
                                        />
                                    </template>
                                </v-form>
                            </v-stepper-window-item>
                        </v-stepper-window>
                        <v-stepper-actions prev-text="Voltar"  @click:next="changeStep('next')" @click:prev="changeStep('prev')" next-text="Avançar"/>
                        
                    </v-stepper>
                </v-card>

               
            </v-sheet>


        </sharedItemsGrid>
    </v-container>

</template>

<script lang="ts" setup>
    const step = ref<1 | 2 | 3>(1)
    const isForm = ref<boolean>(false)
    const name = ref<string>('')
    const category = ref<string>('')
    const price = ref<string>('')
    const title = ref<string>('')
    const description = ref<string>('')
    const quantity = ref<string>('')
    const file = ref<string>('')

    const changeStep = (type: 'next' | 'prev') => {
        //this avoids any possible bug
        if (type === 'next') {
            
            return step.value = step.value === 0 && 1 || step.value === 1 && 2 || step.value
        }
        if (type === 'prev') return step.value = step.value === 1 ? 0 : step.value === 2 && 1 || step.value
    }

    const steps = [
        {
            name: {
                rules: [
                    () => {
                    return !name.value ? false : true
                    }, 
                    () => {
                        return name.value.match(/^[A-Za-z]+$/) ? true : false
                    },
                    () => {
                        return name.value.length > 40 ? false : true
                    }
                ],
                label: 'Nome do produto',
                placeholder: '',
                type: 'text',
                valid: true
            },
            category: {
                rules: [],
                label: 'categoria do produto',
                placeholder: '',
                type: 'text'
            },
            price: {
                rules: [
                    () => {
                        return !price.value ? false : true
                    },
                    () => {
                        return !Number(price.value) ? false : true
                    },
                ],
                type: 'number',
                label: 'Preço do produto',
                placeholder: ''
            }
        }, {
                
            title: {
                rules: [],
                label: 'Titulo do Produto',
                type: 'text',
                placeholder: ''
            },
            description: {
                rules: [],
                label: 'Descrição do produto',
                type: 'text',
                placeholder: ''
            },
            quantity: {
                rules: [],
                label: 'Quantidade do produto',
                placeholder: '',
                type: 'number'
            }
        }, {
            itemImg: {
                rules: [],
                label: '',
                placeholder: '',
                type: 'file'
            }
        }]

</script>