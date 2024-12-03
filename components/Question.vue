<template>
  <div class="flex flex-col section mb-6" :data-question-id="content.id">
    <div class="flex flex-row justify-center">
      <AtomsHeadline level="h3" class="max-w-4xl"
        >Sie haben angegeben im Moment
        <em>{{ getCapacityDescription }}</em> emotionale Kapaztität für
        politische Nachrichten. Welche der drei Artikelversionen passt am Besten
        zu dieser emotionalen Kapazität? *</AtomsHeadline
      >
    </div>
    <div
      class="hidden error-msg text-center italic mb-5 flex items-center justify-center"
      :data-question-id="content.id"
    >
      <Icon name="heroicons:exclamation-triangle" size="18" class="mr-2" />
      <span>Bitte diese Frage ausfüllen</span>
    </div>
    <div class="space-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:space-y-0">
      <Card
        :content="content.soft_summary"
        type="soft_summary"
        :id="content.id"
        :order="randomizedOrder[2]"
      ></Card>
      <Card
        :content="content.summary"
        type="summary"
        :id="content.id"
        :order="randomizedOrder[0]"
      ></Card>
      <Card
        :content="content.original"
        type="original"
        :id="content.id"
        :order="randomizedOrder[1]"
      ></Card>
    </div>
    <div class="mt-10 mb-6 text-center">
      <div class="mb-2">
        <div class="font-medium">
          <label for="interest">
            <AtomsHeadline level="h3"
              >Wie sehr interessiert Sie das Thema des Artikels?
              *</AtomsHeadline
            >
          </label>
        </div>
        <div
          class="text-small flex items-center justify-center"
          v-if="interest === -1"
        >
          <Icon name="heroicons:exclamation-triangle" size="18" class="mr-2" />
          <span>Bitte auswählen</span>
        </div>
      </div>
      <div class="flex flex-row justify-center">
        <span class="mr-4">sehr wenig</span>
        <div class="w-60">
          <input
            type="range"
            min="0"
            max="4"
            class="range range-info"
            :class="{ 'range-error': interest === -1 }"
            step="1"
            id="interest"
            name="interest"
            v-model="interest"
            @click="chooseInterest"
          />
          <div class="flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
        <span class="ml-4">sehr viel</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "~/types/question.type";
import type {
  emotionalCapacity,
  interest,
  surveyResponseType,
} from "~/types/survey.type";

const emotionalCapacity = useState<emotionalCapacity>("emotionalCapacity");
const surveyResponse = useState<surveyResponseType>("surveyResponse");
const interest = ref<interest>(-1);

console.log("interest", interest.value);

const capacityMapper = new Map([
  [0, "sehr wenig"],
  [1, "wenig"],
  [2, "eine mittlere"],
  [3, "viel"],
  [4, "sehr viel"],
]);

const getCapacityDescription = computed(() => {
  return capacityMapper.get(Number(emotionalCapacity.value));
});

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

const chooseInterest = () => {
  if (interest.value === -1) {
    interest.value = 0;
  }
  surveyResponse.value.articles[props.content.id].interest = Number(
    interest.value
  );
};
</script>
