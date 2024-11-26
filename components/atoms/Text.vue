<template>
  <div class="my-3">{{ text }}</div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
