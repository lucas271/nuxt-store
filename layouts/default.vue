

<template>
  <v-app>
    <layoutNavbar/>
    <NuxtLoadingIndicator :height='5'/>

    <v-main class='mb-sm-0 pb-sm-0'>
      <section class="main-min-height  ">
        <slot/>

      </section>
      <layoutFooter/>
      <layoutSocialIcons/>
      <layoutToTop/>
      <layoutWhatszapIcon/>
    </v-main>

    <layoutNavbarFooter/>

  </v-app>

</template>
<script lang="ts">
</script>