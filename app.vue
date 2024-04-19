<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>

useSeoMeta({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Nome local` : 'Nome local - Os Melhores tratamentos';
    },
    description: 'Estamos localizados Aqui você encontrará diversos tratamentos esteticos como pump-up, bioestimuladores, drenagem pós operatória, tratamentos para celulite, estrias, entre outros.',
    keywords: 'drenagem, drenagem pós operatorio, celulite, flacidez, estrias, biosestimuladores, limpeza de pele',
})
</script>