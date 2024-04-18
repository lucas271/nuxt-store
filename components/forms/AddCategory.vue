<template>
    <v-form class="w-100 h-100 d-flex flex-column align-center justify-center ga-6" @submit="$event => {
        $event.preventDefault()
        categoryStore.addCategory(categoryName, categoryDescription)
    }">
        <div class="w-100">
            <v-text-field name="nome" id="name" class="w-75 mx-auto" :rules="categoryNameRules" v-model="categoryName" label="Nome da nova categoria" density="compact"/>
        </div>
        <div class="w-100">
            <v-text-field class="w-75 mx-auto" name="descrição" id="description" :rules="categoryDescriptionRules" v-model="categoryDescription" label="Descrição da categoria" density="compact"/>
        </div >
        <div class="w-100">
            <v-file-input class="w-75 mx-auto" name="imagem" id="image" density="compact" label="Imagem da categoria"/>
        </div>
        <v-btn density="comfortable" class="text-body-2" type="submit">Lançar nova categoria</v-btn>
    </v-form>
</template>

<script setup lang="ts">
    import {useCategoryStore} from '../../lib/services/categoryStore'
    const categoryStore = useCategoryStore()

    const categoryName = ref<string>('')
    const categoryDescription = ref<string>('')
    const categoryNameRules = [
        () => {
            return !categoryName.value ? false : true
        },
        () => {
            return !categoryName.value?.match(/^[a-zA-Z]+$/) ? false : true
        },
        () => {
            categoryName.value.length > 30 ? 'maximo de 30 caracters' : true
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