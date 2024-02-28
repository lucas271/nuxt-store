<template>
    <v-text-field placeholder="Pesquisar tratamento" class="w-100" v-model="filter.searchQuery"></v-text-field>

    <div class="d-flex ga-3 w-100  flex-sm-row flex-column align-end">
        <div class="d-flex flex-column w-100 h-100 w-100 flex-grow-1 ga-3">
            <div class="w-100 h-25">
                <v-select
                :items="['Menor valor', 'Maior valor', 'Mais vendidos']"
                density="compact"
                v-model="filter.sortBy"
                label="Ordenar por"
                />
            </div>

            <div class="w-100 h-75">
                <h3 class="text-subtitle-1">Numero de sessões</h3>
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
                        max="2000"
                        thumb-size="15"
                    ></v-range-slider>
                </div>

                <div class="h-75 text-subtitle-2">
                    <h3 class="text-subtitle-">Tipo de tratamento</h3>
                    <div class="w-100 flex-grow-1">
                        <v-combobox placeholder="Ex: flacidez" :items="['flacidez', 'gordura localizada', 'celulite']" chips v-model="filter.typesSelected" class="w-100" multiple>

                        </v-combobox>
                    </div>
                </div>
            </div>
        </div>
        <v-btn>Resetar filtros</v-btn>
</template>

<script lang="ts" setup>
    const filter = useFilterState()
</script>