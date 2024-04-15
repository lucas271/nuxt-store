

<template>
  <v-app>
    <layoutNavbar/>
    <v-main class="main-min-height mb-sm-0 pb-sm-0 ">
      <slot/>
      <layoutFooter/>
    </v-main>

    <layoutNavbarFooter/>
    <layoutSocialIcons/>
    <layoutToTop/>
    <layoutWhatszapIcon/>
  </v-app>

</template>
<script lang="ts">
</script>