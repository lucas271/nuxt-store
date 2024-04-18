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
      return titleChunk ? `${titleChunk} - Life cris` : 'Life cris - Os Melhores tratamentos de estetica';
    },
    description: 'Estamos localizados em nova iguaçu, Jardim paraíso na rua cruzeiro do sul! Fica proximo ao km32. Aqui você encontrará diversos tratamentos esteticos como pump-up, bioestimuladores, drenagem pós operatória, tratamentos para celulite, estrias, entre outros.',
    keywords: 'drenagem, drenagem pós operatorio, celulite, flacidez, estrias, biosestimuladores, limpeza de pele',
})
</script>