<template>
    <v-card class="overflow-hidden full-height-minus-navheader d-flex">
        <v-container class="h-100 my-auto d-flex flex-sm-row flex-column overflow-hidden py-4 ga-6 justify-space-evenly">
            <div class="bg-white ga-6 overflow-hidden w-full" :style="{height: 'fit-content'}">
                <div class="d-flex h-100 flex-column overflow-hidden justify-space-between align-center ga-6 w-100 text-break word-break">
                    <article class="w-100  text-left">
                        <v-card-title class="text-sm-h2 text-h3 text-teal-darken-4 text-wrap mx-0 px-0 overflow-visible" tag="h3">
                            LifeCris
                        </v-card-title>
                        <v-card-subtitle tag="h4" class="mt-3 ml-1 text-sm-subtitle-1 text-subtitle-2 pa-0 ma-0 t text-teal-darken-3 text-wrap">
                           Clinica de estética com o melhor preço do mercado
                        </v-card-subtitle>
                    </article>
                    <div class="flex-grow-1 flex-shrink-1 w-100 overflow-hidden">
                        <v-img height='100%' cover width='100%' src="https://images.pexels.com/photos/8158947/pexels-photo-8158947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">

                        </v-img >
                    </div>
                </div>
            </div>
            <div class='h-100 overflow-hidden flex-shrink-1' :style="{position: 'relative'}">
                <div class="w-100 h-100 d-flex flex-column justify-space-between ">
                    <article>
                        <v-card-title tag="h3" class="font-weight-bold text-teal-darken-4 text-subtitle-1  text-wrap  text-sm-h5">Equilíbrio e harmonia em cada medida.</v-card-title>
                        <v-card-subtitle tag="span" class="font-weight-bold text-teal-darken-3 text-wrap text-subtitle-2">Cuide de você e encontre sua melhor versão.</v-card-subtitle>
                    </article>


                    <div class="w-100 mx-auto" :style="{position: 'relative'}">

                        <v-card-text class="w-100 d-flex justify-space-between text-teal-darken-4 text-uppercase font-weight-bold">
                            Confira nossos Procedimentos:
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column ga-4 flex-sm-row w-100 font-italic font-weight-bold">
                            <v-btn class="text-subtitle-2 w-100 flex-shrink-1 bg-teal-lighten-2" variant="tonal" >
                                Recomendados 
                            </v-btn>
                            <v-btn class="text-subtitle-2 w-100 flex-shrink-1 ma-0 flex-shrink-1" color="teal-lighten-1" variant="outlined" >
                                Todos
                            </v-btn>
                        </v-card-actions>
                    </div>

                    <div class="d-none d-sm-flex w-100 justify-space-between">
                        <v-btn class=" d-flex align-center justify-center ga-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                        <v-btn class="d-flex align-center justify-center ga-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                        <v-btn class="d-flex align-center d-sm-none d-md-inline justify-center ga-6 rounded-xl" variant="outlined" color="teal-darken-2">
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                    </div>

                </div> 
            </div>
        </v-container>
    </v-card>
    <v-card class="full-height-minus-navheader w-100 bg-teal-lighten-2 ">,
        <v-container class="w-100 h-100 d-flex flex-column justify-space-around align-center">
            <v-card-title class="text-h4">Mais vendidos</v-card-title>
            <v-slide-group class="w-100 h-100 pa-2 d-flex justify-center align-center ga-3">
                <v-slide-group-item v-for="i in [2, 2]" class="w-100 my-auto">
                    <div class="w-50 mx-2 h-100 flex-column d-flex ga-2 bg-white rounded-lg">
                        <v-img class="h-50 w-100 flex-shrink-1" cover src="https://duohaus.com.br/wp-content/uploads/2021/07/massagemodeladora1.jpeg"></v-img>
                        <div class='flex-grow-1 d-flex justify-space-around flex-column'>
                            <v-card-title class="font-italic">Drenagem linfatica</v-card-title>
                            <v-card-subtitle class="text-wrap">Cirurgia? A drenagem linfatica te ajuda! Sinta-se melhor logo.</v-card-subtitle>
                            <v-card-text>R$3000.00</v-card-text>
                            <v-card-actions >
                                <v-btn class="text-body-2" color='teal-lighten-3' variant="tonal">
                                    Ver mais
                                </v-btn>
                                <v-btn class="text-body-2"  color='teal-lighten-3'  variant="tonal" >
                                    + Carrinho
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                </v-slide-group-item>
            </v-slide-group>
        </v-container>

        
    </v-card>

    <v-card class="half-height-minus-navheader bg-white text-teal-darken-1">

        <v-container class="d-flex justify-space-between h-100">
            <v-img>
                
            </v-img>
            <div class="d-flex flex-column justify-space-between">
                <div>
                    <v-card-title>Não sabe o que quer?</v-card-title>
                    <v-card-subtitle class="text-wrap">Descubra algumas das possibilidades.</v-card-subtitle>
                </div>

                <div>
                    <v-card-text class="text-wrap">O teste irá te apresentar alguns dos tratamentos disponiveis para o seu caso</v-card-text>
                    <v-card-actions>
                        <v-btn variant="outlined">Fazer o teste</v-btn>
                    </v-card-actions>
                </div>
            </div>


        </v-container>
    </v-card>
    <div class="w-100 bg-teal-lighten-2">
        <v-container class="full-height-minus-navheader rounded-lg d-flex justify-center align-center">
            <v-card class="h-75 ma-auto w-100 overflow-hidden d-flex flex-column justify-space-evenly bg-white">
                <v-card-title class="text-center text-wrap">Veja O que dizem sobre nós</v-card-title>

                <div class="w-100 d-flex justify-center ga-5 flex-column align-center"> 
                    <v-avatar size="80"><v-img src="data:image/jpeg;base64,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"></v-img></v-avatar>

                    <div class="w-75 rounded-xl bg-teal-darken-3">
                        <v-card-text class="text-wrap overflow-hidden text-center">
                            this is not necessarially bad but its a good product the problem is not a product itself.
                        </v-card-text>
                    </div>

                    

                </div>
            </v-card>
        </v-container>
    </div>

    <v-card class="full-height-minus-navheader bg-white">
        <v-container class="h-100  d-flex flex-column ">
            <header><v-card-title class="text-center text-teal-darken-4 font-weight-bold">Localização</v-card-title></header>
            <div class="w-100 d-flex flex-column justify-space-evenly flex-grow-1 text-left ">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d257.982218283244!2d-43.60016040226533!3d-22.825515093954305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9be280ddbfd389%3A0x57ba482cf55c1838!2sR.%20Cruzeiro%20do%20Sul%20-%20Jardim%20Para%C3%ADso%2C%20Nova%20Igua%C3%A7u%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1708239035810!5m2!1spt-BR!2sbr" style="border:2px solid;" height="100%" width="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>               
                <v-card-subtitle class="pa-2 mt-4 text-teal-darken-4">Endereço</v-card-subtitle>          
                <v-card-text class="pa-2 text-teal-darken-4">
                    Rua cruzeiro do sul, lote 10, Q.J casa 1.
                </v-card-text>
            </div>

        </v-container>
    </v-card>
    <v-card tag="footer" class="half-height-minus-navheader bg-teal-lighten-2">
        <v-container >
            <v-row >
                <v-col cols='4'>
                    <v-list class="bg-transparent">
                        <v-list-item-title>daskdoasda</v-list-item-title>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                    </v-list>
                </v-col>
                <v-col cols='4'>
                    <v-list class="bg-transparent">
                        <v-list-item-title>daskdoasda</v-list-item-title>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>

                    </v-list>
                </v-col>
                <v-col cols='4'>
                    <v-list class="bg-transparent">
                        <v-list-item-title>daskdoasda</v-list-item-title>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                    </v-list>
                </v-col>
                <v-col cols='4'>
                    <v-list class="bg-transparent mx-0">
                        <v-list-item-title>Contato</v-list-item-title>
                        <v-list-item class="mx-0 px-0">telefone 032190321931</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                        <v-list-item class="mx-0 px-0">lalallalaa</v-list-item>
                    </v-list>
                </v-col>
            </v-row>

        </v-container>
    </v-card>
</template>
<script lang="ts">
</script>