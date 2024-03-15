<template>
    <v-container class="d-flex flex-column" style="min-height: 100%;">

        <h2 class="text-left mt-4 mb-8"></h2>
        <v-header class="w-100 h-50">
            <sharedItemFilter/>
            <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <v-btn
                    color="primary"
                    v-bind="props"
                    class="mx-sm-6 mt-3 mt-sm-0"
                    >
                    Nova Categoria
                    </v-btn>
                </template>  
                <v-card height="400px" width="230px" >
                    <v-form class="w-100 h-100 d-flex flex-column align-center justify-center ga-6" @submit="$event => {
                        $event.preventDefault()
                        categoryStore.addCategory(categoryName, categoryDescription)
                    }">
                        <div class="w-100">
                            <v-text-field class="w-75 mx-auto" :rules="categoryNameRules" v-model="categoryName" label="Nome da nova categoria" density="compact"/>
                        </div>
                        <div class="w-100">
                            <v-text-field class="w-75 mx-auto" :rules="categoryDescriptionRules" v-model="categoryDescription" label="Nome da nova categoria" density="compact"/>

                        </div >
                        <div class="w-100">
                            <v-file-input class="w-75 mx-auto" density="compact" label="Imagem da categoria"/>
                        </div>
                        <v-btn density="comfortable" class="text-body-2" type="submit">Lançar nova categoria</v-btn>
                    </v-form>
                </v-card>          
            </v-menu>
            <h2 class="my-6">Tratamentos {{ isForm }}</h2>
            <v-card class="bg-red p-4 mb-4 d-flex justify-space-around flex-column" v-if="productStore.errors.length > 0" height="200px">
                
                <v-card-title class="text-h5">Erro</v-card-title>
                <template v-if="!productStore.loading">
                    <v-list class="bg-transparent flex-grow-1 flex-shrink-1 overflow-auto">
                        <v-card-subtitle v-for="error in productStore.errors" class="text-subtitle-1 mb-3"> {{ error }} </v-card-subtitle>
                    </v-list>
                    <v-card-actions>
                        <v-btn variant="tonal" @click="productStore.getAllProducts(filter)"> Tentar novamente </v-btn>
                    </v-card-actions>
                </template>
                <template v-else>
                    <span class="flex-grow-1 flex-shrink-1 d-flex justify-center align-center">
                        <v-progress-circular indeterminate size="50"/>
                    </span>
                </template>
            </v-card>
        </v-header>


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
                                
                                <v-stepper-item :value="index + 1" :error="step === index + 1 && isCurrentStepError"  :complete="step > index + 1" :editable="step > index + 1 && !isCurrentStepError">
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
                                        />

                                        <sharedCategorySelect v-if="item[input].type === 'select'" :rules="item[input].rules" :placeholder="item[input].placeholder" :name="input" :label="item[input].label" v-model="categorySelect" />
                                        <v-file-input 
                                            v-if="item[input].type === 'file'"                                              
                                            :label="item[input].label" 
                                            :rules="item[input].rules" 
                                            :name="input" 
                                            :placeholder="item[input].placeholder" 
                                        />
                                    </template>
                                    <div class="pa-2 d-flex justify-space-between align-center">
                                        <v-btn text @click="changeStep('prev', index)">Retroceder</v-btn>
                                        <v-btn v-if="index + 1 < 3"  @click="changeStep('next', index)">Avançar</v-btn>
                                        <v-btn v-else color="success" @click="sendAddProductRequest()">Concluir</v-btn>
                                    </div>


                                </v-form>
                            </v-stepper-window-item>
                            
                        </v-stepper-window>
                    </v-stepper>
                </v-card>

            
            </v-sheet>

        </sharedItemsGrid>
    </v-container>
    {{ categoryStore.categories }}
</template>

<script lang="ts" setup>
    import {useProductStore} from '../../lib/services/productStore.ts'
    import {useCategoryStore} from '../../lib/services/categoryStore.ts'
    const filter = useFilterState()


    const step = ref<1 | 2 | 3>(1)
    const isForm = ref<boolean>(false)
    const productStore = useProductStore()
    const categorySelect = ref<string | string[]>()
    const categoryStore = useCategoryStore()
    const isRuleValid = ref<boolean>(true)
    await categoryStore.getAllCategories()
    const formRef = ref(null)
    const isCurrentStepError = ref(false)

    async function sendAddProductRequest(){
        const areFormsValidPromises = formRef.value.map(async ref => await ref.validate());
        const areFormsValid = await Promise.all(areFormsValidPromises).then(results => results.filter(result => !result.valid))
        
        if(areFormsValid.length > 0) return isCurrentStepError.value = true
        const formInputs = formRef.value.map(ref =>  ref.querySelectorAll('input'))
        const combinedFormInputs = formInputs.reduce((pv, cv) => [...pv, ...cv], [])
        const productRequestParamsArray = await Promise.all(combinedFormInputs.map(async (element) => {
            if(element.name === 'category') return { [element.name]: categorySelect.value}
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
                console.log(base64File)
                return { [element.name]: base64File };
            }
            return { [element.name]: element.value };
        }))
        const productRequestParamsObj = productRequestParamsArray.reduce((pv, cv) => {return {...pv, ...cv}}, {})
        productStore.addProduct(productRequestParamsObj)
    }
    const changeStep = async (type: 'next' | 'prev', index) => {
        
        if (type === 'next') {
            if(!(await formRef.value[index].validate()).valid) return isCurrentStepError.value = true
            return step.value = step.value === 1 && 2 || step.value === 2 && 3 || step.value
        }
        if (type === 'prev') return step.value = step.value === 2 ? 1 : step.value === 3 && 2 || step.value
    }

    const steps = [
        {
            name: {
                rules: [
                    (e) => {
                        return !e ? false : true
                    }, 
                    (e) => {
                        console.log(e)
                        return e.match(/^[A-Za-z]+$/) ? true : false
                    },
                    (e) => {
                        return e.length > 40 ? false : true
                    }
                ],
                label: 'Nome do produto',
                placeholder: 'Digite o nome do produto',
                type: 'text',
                valid: true
            },
            category: {
                rules: [(e) => {
                    return !e ? false : true
                }],
                label: 'categoria do produto',
                placeholder: 'selecione a categoria',
                type: 'select'
            },
            price: {
                rules: [
                    (e) => {
                        return !e ? false : true
                    },
                    (e) => {
                        return !Number(e) ? false : true
                    },
                ],
                type: 'number',
                label: 'Preço do produto',
                placeholder: 'Digite o preço'
            }
        }, {
                
            title: {
                rules: [  
                    (e) => {
                        return !e ? false : true
                    }, 
                    (e) => {
                        return e.match(/^[A-Za-z]+$/) ? true : false
                    },
                    (e) => {
                        return e.length > 40 ? false : true
                }],
                label: 'Titulo do Produto',
                type: 'text',
                placeholder: 'Digite o titulo do produto'
            },
            description: {
                rules: [
                    (e) => {
                        return !e ? false : true
                    }, 
                    (e) => {
                        return e.length > 200 ? false : true
                    }
                ],
                label: 'Descrição do produto',
                type: 'text',
                placeholder: 'Digite A descrição do produto'
            },
            quantity: {
                rules: [
                    (e) => {
                        return !e ? false : true
                    },
                    (e) => {
                        return !Number(e) ? false : true
                    }
                ],
                label: 'Quantidade do produto',
                placeholder: 'Quant produtos disponiveis',
                type: 'number'
            }
        }, {
            img: {
                rules: [
                    (file: File[] | undefined): boolean => {
                        if (file.length < 1) return false;
                        file = file[0]
                        // Check if the file is an image
                        const fileType = file.type.split('/')[0];
                        if (fileType !== 'image') return false;

                        const img = new Image();
                        img.src = URL.createObjectURL(file);
                        return new Promise((resolve) => {
                            img.onload = () => {
                                img.width > img.height ? resolve(true) : resolve(false)
                            };
                        });   
                    }
                ],
                label: '',
                placeholder: '',
                type: 'file'
            }
        }
    ]

    const categoryName = ref<string>('')
    const categoryDescription = ref<string>('')
    const categoryNameRules = [
        () => {
            return !categoryName.value ? false : true
        },
        () => {
            return !categoryName.value?.match(/^[a-zA-Z]+$/) ? false : true
        }
    ];
    const categoryDescriptionRules = [
        () => {
        return !categoryDescription.value ? false : true
        },
        () => {
            return categoryDescription.value?.length > 350 ? false : true
        }
    ]
</script>   