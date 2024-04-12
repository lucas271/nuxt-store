<template>
    <div class="bg-white ma-2 d-flex flex-column pa-2 d-flex rounded-lg">

        <header class="w-100 d-flex flex-column ga-2">
            <div class="d-flex justify-space-between align-center ga-1 text-subtitle-2">
                <div class="d-flex align-center ga-1 text-subtitle-2">
                    <v-icon class="text-yellow-darken-2">{{rate > 2.5 && "mdi-star" || rate < 2.5 && "mdi-star-half" || rate < 1 && "mdi-star-outline"}}</v-icon>
                    <span class="text-grey-darken-1">{{rate}}</span>
                </div>

                <div>
                    <v-card-subtitle>{{updated_at !== created_at ? '* ' + convertAndFormatTime(updated_at) : convertAndFormatTime(created_at)}}</v-card-subtitle>
                </div>
            </div>
            <div class="d-flex  justify-space-between w-100">
                <v-card-subtitle class="ma-0 pa-0">{{userName}}</v-card-subtitle>

            </div>

        </header>
        <div class="flex-grow-1 flex-shrink-1 w-100">
            <v-card-text class="pa-0 ma-1 overflow-auto" :style="{minHeight: '8vh', maxHeight: '15vh'}">
                {{message}}
            </v-card-text>
        </div>
    </div>
</template>


<script setup lang='ts'>
    function convertAndFormatTime(dateTimeString) {
        const dateTime = new Date(dateTimeString)
        console.log(dateTime)
        const now = Date.now();

        const timeDiff = now - dateTime.getTime();

        let formattedDiff;
        if (timeDiff < 60000) {
            formattedDiff = `${Math.floor(timeDiff / 1000)} segundos atrás`;
        } else if (timeDiff < 3600000) {
            const minutes = Math.floor(timeDiff / 60000);
            formattedDiff = `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
        } else if (timeDiff < 86400000) {
            const hours = Math.floor(timeDiff / 3600000);
            formattedDiff = `${hours} hora${hours > 1 ? 's' : ''} atrás`;
        } else {
            const days = Math.floor(timeDiff / 86400000);
            formattedDiff = `${days} dia${days > 1 ? 's' : ''} atrás`;
        }

        return formattedDiff;
    }
    const props = defineProps<{message: string, id?: string, rate: number, userName: string, userId: string, updated_at?: string, created_at: string}>()
</script>