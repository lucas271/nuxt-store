<template>
    <div>
        <v-bottom-navigation class="d-sm-none d-flex justify-center items-center ga-3 bg-teal-lighten-5 text-teal-lighten-3" height="55" fixed shift tag="footer">
            <v-btn value="recent" class="h-100">
                <v-badge floating tag="span" offset-y="32" offset-x="12" content="100">
                    <v-icon>mdi-cart-outline</v-icon>
                </v-badge>
            </v-btn>

            <v-btn value="favorites" class="h-100">
                <v-icon>mdi-account-outline</v-icon>
            </v-btn>

            <v-btn value="nearby" class="h-100">
                <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>

</template>