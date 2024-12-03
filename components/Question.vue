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
        :content="content[shuffledArray[0]]"
        :type="shuffledArray[0]"
        :id="content.id"
      ></Card>
      <Card
        :content="content[shuffledArray[1]]"
        :type="shuffledArray[1]"
        :id="content.id"
      ></Card>
      <Card
        :content="content[shuffledArray[2]]"
        :type="shuffledArray[2]"
        :id="content.id"
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
        <span class="ml-2 sm:mr-4">sehr wenig</span>
        <div class="w-48 md:w-60">
          <input
            type="range"
            min="0"
            max="4"
            class="range range-info range-sm md:range-md"
            :class="{ 'range-error': interest === -1 }"
            step="1"
            id="interest"
            name="interest"
            v-model="interest"
            @input="chooseInterest"
          />
          <div class="flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
        <span class="ml-2 sm:ml-4">sehr viel</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question, SummaryType } from "~/types/question.type";
import type {
  emotionalCapacity,
  interest,
  surveyResponseType,
} from "~/types/survey.type";

const emotionalCapacity = useState<emotionalCapacity>("emotionalCapacity");
const surveyResponse = useState<surveyResponseType>("surveyResponse");
const interest = ref<interest>(-1);

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

const summaryTypes: [SummaryType, SummaryType, SummaryType] = [
  "soft_summary",
  "softer_summary",
  "original",
];
const shuffledArray = shuffleArray(summaryTypes);

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

const chooseInterest = () => {
  if (interest.value === -1) {
    interest.value = 0;
  }
  surveyResponse.value.articles[props.content.id].interest = interest.value;
};
</script>
