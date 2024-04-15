

<template>
  <v-app>
    <layoutNavbar/>
    <v-main class='mb-sm-0 pb-sm-0'>
      <section class="main-min-height  ">
        <slot/>

      </section>
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