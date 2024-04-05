<template>
    <v-text-field placeholder="Pesquisar tratamento" class="w-100" v-model="filter.startsWith"></v-text-field>

    <div class="d-flex ga-3 w-100  flex-sm-row flex-column align-end">
        <div class="d-flex flex-column w-100 h-100 w-100 flex-grow-1 ga-3">
            <div class="w-100 h-25">
                <v-select
                :items="['Menor valor', 'Maior valor', 'Mais vendidos', 'Mais Novos']"
                density="compact"
                v-model="sortBySelected"
                label="Ordenar por"
                />
            </div>
            <div class="w-100 h-75">
                <v-combobox placeholder="selecione o numero de sessões" :items="['1 sessão', '5 sessões', '10 sessões']" v-model="filter.numberOfSessionsSelected" chips  class="w-100" multiple>

                </v-combobox>

            </div>
        </div>

        <div class="h-100 w-100 d-flex flex-grow-1 flex-shrink-1 flex-column ga-3">
                <div  class="h-25 w-100">
                    <v-range-slider
                        v-model="filter.priceRange"
                        thumb-label
                        min="0"
                        :max="maxPrice"
                        thumb-size="15"
                    ></v-range-slider>
                </div>

                <div class="h-75 text-subtitle-2">
                    <div class="w-100 flex-grow-1">
                        <v-combobox placeholder="Ex: flacidez" :items="categoryStore.categories.length > 0 ? categoryStore.categories.map(category => {
        return category.name
    }) : []" chips v-model="filter.categoriesSelected" class="w-100" multiple>

                        </v-combobox>
                    </div>
                </div>
            </div>
        </div>
        <v-btn>Resetar filtros</v-btn>
</template>

<script lang="ts" setup>
    import {useCategoryStore} from '../../lib/services/categoryStore.ts'

    import {watch} from 'vue'
    const maxPrice = await $fetch('/api/product?data='+JSON.stringify({type: 'maxPrice'})).then(res => res.value ).catch(res => {
        return 'a'
    })
    const sortBySelected = ref<'Menor valor' | 'Maior valor' | 'Mais vendidos' | 'Mais Novos'>('Mais vendidos')
    const filter = useFilterState()
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
    //Mano, eu gosto muito da historia do n1ss1n e ele parece ser uma otima pessoa. Mas vamos ser honestos: A PAIN PRECISA de um star player, melhoraria o time absurdamente. Só escolher qualquer um entre LUCAOZY, SNOWZIN E DUMAU (ATÉ possivelmente um VENOMZERA, mas, como a contratação dele é recente, a multa dele com a red deve ser GIGANTESCA). Lucaozy já tá tem um tempao no fluxo (pensando no curto prazo é a melhor opção, o mlk é um monstro, mas já tem 22 anos), dumau um tempao na legacy (minha visão ele é o meio termo entre futuro e curto prazo), e snowzin praticamente nasceu na case (Obviamente teria problemas com escola e por ele ser muito jovem, mas esse garoto COM CERTEZA é o proximo KSCERATO). Não é possivel que a multa de algum deles seria tão absurda (pois creio eu que estão em final de contrato). Desde que o SKULLZ saiu do time, claramente falta um star player consistente no time, e, honestamente, eu acho que a unica coisa que separa essa pain do top 20 é esse star player.
</script>

