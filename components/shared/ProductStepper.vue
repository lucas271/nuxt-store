<template>
    <v-stepper class="h-100 w-100" v-model="currentStep" non-linear>
        <v-stepper-header>
            <template v-for="(item, index) in steps" key="index">
                
                <v-stepper-item :value="index + 1" :error="currentStep === index + 1 && isCurrentStepError"  :complete="currentStep > index + 1" :editable="currentStep > index + 1 && !isCurrentStepError">
                </v-stepper-item>
                <v-divider v-if="index + 1 !== steps.length"/>
            </template>
        </v-stepper-header>
        <v-stepper-window>
            
            <v-stepper-window-item :value='index + 1' v-for="(item, index) in steps" :key="index ">
                <v-form ref="formRef" :key="index">
                    <template v-for="input in Object.keys(item)">
                        <v-text-field 
                            v-if="item[input].type === 'text' || item[input].type === 'number'"
                            :label="item[input].label" 
                            :rules="item[input].rules" :name="input" 
                            :placeholder="item[input].placeholder" 
                            :type="item[input].type"
                            v-model="properties[input]"
                        />
                        <v-select
                            v-if="item[input].type === 'select'"
                            :label="item[input].label" 
                            :rules="item[input].rules" :name="input" 
                            :placeholder="item[input].placeholder" 
                            v-model="properties[input]"
                            :items="item[input]?.options"
                        />
                        <sharedCategorySelect v-if="item[input].type === 'selectAPI'" :rules="item[input].rules" :placeholder="item[input].placeholder" :name="input" :label="item[input].label" v-model="properties[input]"/>
                        <v-file-input 
                            v-if="item[input].type === 'file'"                                              
                            :label="item[input].label" 
                            :rules="item[input].rules" 
                            :name="input" 
                            :placeholder="item[input].placeholder" 
                        />
                    </template>
                    <div class="pa-2 d-flex justify-space-between align-center">
                        
                        <v-btn text @click="index + 1 > 1 ? changeStep('prev') : emit('stepperClose')">{{index + 1 > 1 ? "voltar" : 'cancelar'}}</v-btn>
                        <v-btn v-if="index + 1 < 3"  @click="changeStep('next', index)">Avançar</v-btn>
                        <v-btn v-else color="success" @click="sendRequest($event)">Enviar</v-btn>
                    </div>
                </v-form>
            </v-stepper-window-item>
            
        </v-stepper-window>
    </v-stepper>
</template>

<script lang="ts" setup>
    import {useProductStore} from '../../lib/services/productStore'
    const emit = defineEmits(['stepperClose'])
    interface PropertiesInterface{
        isForm: boolean,
        title?: string,
        img?: string,
        price?: number | null,
        description?: string,
        id?: string, 
        quantity?: number | null,
        name?: string,
        category_name?: any[]
        sessions?: number,
        bodyPart?: string,
    }


    const props = defineProps<{properties?: PropertiesInterface, isEdit?: boolean}>()
    const properties = ref<{properties: PropertiesInterface}>({isForm: false, title: '', img: '', category_name: [], name: '', quantity: null, id: '', description: '', price: null, sessions: 1, type:''})
    onMounted(() => {
        properties.value = props.properties ? {...props.properties, category_name: props.properties?.category_name?.map(category => category.name)} : properties.value
    })

    const currentStep = ref<1 | 2 | 3>(1)
    const productStore = useProductStore()
    const formRef = ref(null)
    const isCurrentStepError = ref(false)


    async function sendRequest(e){
        e.preventDefault();
        const areFormsValidPromises = formRef.value.map(async ref => await ref.validate());
        const areFormsValid = await Promise.all(areFormsValidPromises).then(results => results.filter(result => !result.valid))
        
        if(areFormsValid.length > 0) return isCurrentStepError.value = true
        const formInputs = formRef.value.map(ref =>  ref.querySelectorAll('input'))
        const combinedFormInputs = formInputs.reduce((pv, cv) => [...pv, ...cv], [])
        const productRequestParamsArray = await Promise.all(combinedFormInputs.map(async (element) => {
            if(element.name === 'category_name') return { [element.name]: properties.value[element.name]}
            if (element.name === 'img') {
                const file = element.files[0];
                const base64File = await new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        resolve(reader.result);
                    };

                    reader.onerror = error => {
                        reject(error);
                    };

                    reader.readAsDataURL(file);
                });
                return { [element.name]: base64File };
            }
            return { [element.name]: element.value };
        }))
        const productRequestParamsObj = productRequestParamsArray.reduce((pv, cv) => {return {...pv, ...cv}}, {})
        !props.isEdit ? productStore.addProduct(productRequestParamsObj) : productStore.updateProduct(props.properties.id, productRequestParamsObj)
    }
    const changeStep = async (type: 'next' | 'prev', index: number) => {
        
        if (type === 'next') {
            if(!(await formRef.value[index].validate()).valid) return isCurrentStepError.value = true
            return currentStep.value = currentStep.value === 1 && 2 || currentStep.value === 2 && 3 || currentStep.value
        }
        if (type === 'prev') return currentStep.value = currentStep.value === 2 ? 1 : currentStep.value === 3 && 2 || currentStep.value
    }

    const steps = [
        {
            name: {
                rules: [
                    (e) => {
                        return !e ? "Campo vazio" : true
                    }, 
                    (e) => {
                        return e.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/) ? true : "nome invalido"
                    },
                    (e) => {
                        return e.length > 30 ? "Nome pode ter no maximo 30 letras" : true
                    },
                ],
                label: 'Nome do produto',
                placeholder: 'Digite o nome do produto',
                type: 'text',
                valid: true
            },
            category_name: {
                rules: [(e) => {
                    return !e || e.length < 1 ? false : true
                }],
                label: 'categoria do produto',
                placeholder: 'selecione a categoria',
                type: 'selectAPI'
            },
            price: {
                rules: [
                    (e) => {
                        return !e ? "campo vazio" : true
                    },
                    (e) => {
                        return !Number(e) ? 'Valor não é um numero' : true
                    },
                    (e) => {
                        return String(e).length > 4 ? 'Preço não pode conter mais de 4 digitos' : true
                    }
                ],
                type: 'number',
                label: 'Preço do produto',
                placeholder: 'Digite o preço'
            }
        }, {
                
            title: {
                rules: [  
                    (e) => {
                        return !e ? "campo vazio" : true
                    }, 
                    (e) => {
                        return e.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/) ? true : "Titulo invalido"
                    },
                    (e) => {
                        return e.length > 75 ? "Titulo não pode ter mais de 70 caracters" : true
                }],
                label: 'Titulo do Produto',
                type: 'text',
                placeholder: 'Digite o titulo do produto'
            },
            description: {
                rules: [
                    (e) => {
                        return !e ? "campo vazio" : true
                    }, 
                    (e) => {
                        return e.length > 150 ? "Descrição pode ter no maximo 150 caracteres" : true
                    }
                ],
                label: 'Descrição do produto',
                type: 'text',
                placeholder: 'Digite A descrição do produto'
            },
            quantity: {
                rules: [
                    (e) => {
                        return !e ? "campo vazio" : true
                    },
                    (e) => {
                        return !Number(e) ? "valor não é um numero" : true
                    }
                ],
                label: 'Quantidade do produto',
                placeholder: 'Quant produtos disponiveis',
                type: 'number'
            }
        },
        {
            body_part: {
                rules: [

                    (e) => {
                        return !e ? "campo vazio" : true
                    },
                    (e) => {
                        return e !== 'corpo' && e !== 'rosto' ? "Invalido" : true
                    }
                ],
                label: 'parte do corpo',
                placeholder: 'Rosto ou Corpo',
                type: 'select',
                options: ['rosto', 'corpo']
            },
            sessions: {
                rules: [
                    (e) => {
                        return !e ? 'nenhuma opção selecionada' : true
                    },
                    (e) => {
                        return Number(e) !== 1 && Number(e) !== 5 && Number(e) !== 10 ? "Valor invalido" : true
                    }
                ],
                options: [1, 5, 10],
                label: 'Numero de sessões',
                placeholder: 'selecione o numero de sessões',
                type: 'select'
            },
            img: {
                rules: [
                    async (fileArray: File[]): Promise<boolean | string> => {
                        if (fileArray.length < 1) return "Arquivo não encontrado";
                        const file = fileArray[0]
                        // Check if the file is an image
                        const fileType = file.type.split('/')[0];
                        if (fileType !== 'image') return "Arquivo não é uma imagem";

                        const img = new Image();
                        img.src = URL.createObjectURL(file);
                        return await new Promise((resolve) => {
                            img.onload = () => {
                                ((img.width / img.height) * 100  >= 100 && (img.width / img.height) * 100 <= 130) || (img.height / img.width) * 100  >= 100 && (img.height / img.width) * 100 <= 110 ? resolve(true) : resolve("Proporções invalidas")
                            };
                        });   
                    }
                ],
                label: 'Selecione uma imagem',
                placeholder: 'Imagem a ser selecionada',
                type: 'file'
            }
        }
    ]


</script>