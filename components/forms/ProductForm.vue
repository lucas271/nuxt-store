
<template>
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
</template>

<script setup lang="ts">
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
</script>