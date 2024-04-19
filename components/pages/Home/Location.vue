<template>
    <v-card tag="section" class="full-height-minus-navheader mt-auto bg-white my-auto" elevation="0">
        <v-container class="h-100  d-flex flex-column  justify-space-around" >
            <header><v-card-title tag="h2" class="text-center text-teal-darken-4 font-weight-bold">Localização</v-card-title></header>
            <div class="d-flex customSize mx-auto flex-column justify-space-evenly flex-grow-1 text-left " >
                <div class="customMapSize mx-auto">
                    <iframe title="Localização" name="mapa com a localização da clinica" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d257.982218283244!2d-" style="border:2px solid;" height="100%" width="100%" :allowfullscreen="false" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>               
                </div>
                <div class="d-flex justify-space-between flex-wrap">
                    <article>
                        <v-card-subtitle class="pa-2 mt-4 text-teal-darken-4" tag="h3">Endereço</v-card-subtitle>          
                        <v-card-text tag="p" class="pa-2 text-teal-darken-4">
                            endereço blalblalballballbvalblalba
                        </v-card-text>
                    </article>
                    <article>
                        <v-card-subtitle tag="h3" class="pa-2 mt-4 text-teal-darken-4 text-sm-right">Complemento</v-card-subtitle>          
                        <v-card-text tag="p" class="pa-2 text-teal-darken-4">
                            completemento blablalbalblalbalblalba
                        </v-card-text>
                    </article>
                </div>

            </div>

        </v-container>
    </v-card>
</template>

<style>

.customSize{
    width: 75%;
    height: 100%;
    @media (max-width: 700px) {
        width: 90%;
    }
}

.customMapSize{
    width: 100%;
    height: 75%;
    @media (max-width: 700px) {
        height: 50%;
    }
}

</style>