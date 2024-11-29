<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <AtomsHeadline :level="'div'" :level-style="'gradient-headline'"
      >News Umfrage</AtomsHeadline
    >
    <div class="my-5">
      <AtomsButton :tag="'button'" :variant="'primary'" @click="startSurvey"
        >Umfrage starten</AtomsButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const startSurvey = () => {
  navigateTo("./survey");
};
</script>
