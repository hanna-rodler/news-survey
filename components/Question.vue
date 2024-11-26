<template>
  <div class="pb-10">
    <AtomsHeadline :level="'h2'">{{ content.question }}</AtomsHeadline>
    <div class="space-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:space-y-0">
      <Card
        :content="content.soft_summary"
        :type="'soft_summary'"
        :id="content.id"
        :order="randomizedOrder[2]"
      ></Card>
      <Card
        :content="content.summary"
        :type="'summary'"
        :id="content.id"
        :order="randomizedOrder[0]"
      ></Card>
      <Card
        :content="content.original"
        :type="'original'"
        :id="content.id"
        :order="randomizedOrder[1]"
      ></Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "~/types/question.type";

const props = defineProps<{
  content: Question;
}>();

const randomizedOrder = computed(() => {
  let rand1 = Math.floor(Math.random() * 3);
  if (rand1 === 0) {
    rand1 = -1;
  }
  let rand2 = Math.floor(Math.random() * 3);
  let rand3 = Math.floor(Math.random() * 3);
  const ranOrders = [rand1, rand2, rand3];
  return ranOrders;
});
</script>
