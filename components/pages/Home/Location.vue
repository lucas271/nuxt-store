<template>
    <v-card class="full-height-minus-navheader mt-auto bg-white my-auto" elevation="0">
        <v-container class="h-100  d-flex flex-column  justify-space-around" >
            <header><v-card-title class="text-center text-teal-darken-4 font-weight-bold">Localização</v-card-title></header>
            <div class="d-flex customSize mx-auto flex-column justify-space-evenly flex-grow-1 text-left " >
                <div class="customMapSize mx-auto">
                    <iframe title="Localização" name="mapa com a localização da clinica" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d257.982218283244!2d-43.60016040226533!3d-22.825515093954305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9be280ddbfd389%3A0x57ba482cf55c1838!2sR.%20Cruzeiro%20do%20Sul%20-%20Jardim%20Para%C3%ADso%2C%20Nova%20Igua%C3%A7u%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1708239035810!5m2!1spt-BR!2sbr" style="border:2px solid;" height="100%" width="100%" :allowfullscreen="false" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>               
                </div>
                <div class="d-flex justify-space-between flex-wrap">
                    <div>
                        <v-card-subtitle class="pa-2 mt-4 text-teal-darken-4">Endereço</v-card-subtitle>          
                        <v-card-text class="pa-2 text-teal-darken-4">
                            Rua cruzeiro do sul, lote 10, Q.J casa 1.
                        </v-card-text>
                    </div>
                    <div>
                        <v-card-subtitle class="pa-2 mt-4 text-teal-darken-4 text-sm-right">Complemento</v-card-subtitle>          
                        <v-card-text class="pa-2 text-teal-darken-4">
                            Portão de grade, final da rua.
                        </v-card-text>
                    </div>
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