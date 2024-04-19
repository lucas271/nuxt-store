<template>
    <section class="h-100 w-100">
        <v-text-field tag="h2" placeholder="Pesquisar tratamento" name="Pesquisar tratamento" class="w-100" id="startsWith" v-model="filter.startsWith"></v-text-field>

        <div class="d-flex ga-3 w-100  flex-sm-row flex-column align-end">
            <div class="d-flex flex-column w-100 h-100 w-100 flex-grow-1 ga-3">
                <div class="w-100 h-25">
                    <v-select
                    :items="['Menor valor', 'Maior valor', 'Mais vendidos', 'Mais Novos']"
                    density="compact"
                    v-model="sortBySelected"
                    label="Ordenar por"
                    name="Ordenar Por"
                    id="orderBy"
                    />
                </div>
                <div class="w-100 h-75">
                    <v-combobox id="sessions" placeholder="selecione o numero de sessões" name="selecionador numero de sessões" :items="['1 sessão', '5 sessões', '10 sessões']" v-model="filter.sessions" chips  class="w-100" multiple>

                    </v-combobox>

                </div>
            </div>

            <div class="h-100 w-100 d-flex flex-grow-1 flex-shrink-1 flex-column ga-3">
                    <div  class="h-25 w-100">
                        <v-range-slider
                            id="priceSlider"
                            v-model="filter.priceRange"
                            thumb-label
                            min="0"
                            name="range de preço"
                            :max="maxPrice"
                            thumb-size="15"
                        ></v-range-slider>
                    </div>

                    <div class="h-75 text-subtitle-2">
                        <div class="w-100 flex-grow-1">
                            <v-combobox id="categorySelect" placeholder="Ex: flacidez" name="selecionador de categorias" :items="categoryStore.categories.length > 0 ? categoryStore.categories.map(category => {
                                return category.name
                            }) : []" chips v-model="filter.categoriesSelected" class="w-100" multiple>

                            </v-combobox>
                        </div>
                 </div>
            </div>
        </div>
        <v-btn @click="resetFilter">Resetar filtros</v-btn>
    </section>
    
</template>

<script lang="ts" setup>
    import {useCategoryStore} from '../../lib/services/categoryStore.ts'
    import {watch} from 'vue'
    const filter = useFilterState()

    const resetFilter = () => {
        const isReset = confirm('Tem certeza que quer resetar o filtro?')
        if(isReset){
            filter.value.sortBy = {
                isPriceAscending: null,
                isMostFavorites: null,
                isNewest: null,
            },
            filter.value.priceRange = null
            filter.value.sessions = []
            filter.value.categoriesSelected = []
            filter.value.startsWith = ''
        }
    }
    const maxPrice = await $fetch('/api/product?data='+JSON.stringify({type: 'maxPrice'})).then(res => res.value ).catch(res => {
        return 'a'
    })
    const sortBySelected = ref<'Menor valor' | 'Maior valor' | 'Mais vendidos' | 'Mais Novos'>('Mais vendidos')
    const categoryStore = useCategoryStore()

    await categoryStore.getAllCategories()

    watch(sortBySelected, (currentValue) => {
        if(currentValue !== 'Menor valor' || currentValue !== 'Maior valor') filter.value.sortBy.isPriceAscending = null
        if(currentValue !== 'Mais novos') filter.value.sortBy.isNewest = null
        if(currentValue !== 'Mais relevantes') filter.value.sortBy.isMostFavourites = null

        if(currentValue === 'Menor valor') filter.value.sortBy.isPriceAscending = true
        if(currentValue === 'Maior valor') filter.value.sortBy.isPriceAscending = false
        if(currentValue === 'Mais novos') filter.value.sortBy.isNewest = true
        if(currentValue === 'Mais Relevantes') filter.value.sortBy.isMostFavorites = true
    })
</script>

