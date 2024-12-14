<template>
  <div
    class="flex flex-col mb-6"
    :data-question-id="content.id"
    role="region"
    :aria-labelledby="`question-${content.id}-title`"
  >
    <div class="flex flex-row justify-center">
      <AtomsHeadline
        level="h3"
        class="max-w-4xl"
        :id="`question-${content.id}-title`"
        :aria-describedby="`question-${content.id}-error`"
        >Sie haben angegeben im Moment
        <span class="underline">{{ getCapacityDescription }}</span> emotionale
        Kapaztität für politische Nachrichten zu haben. Welche der drei
        Artikelversionen passt am Besten zu dieser emotionalen Kapazität?
        *</AtomsHeadline
      >
    </div>
    <div
      class="hidden error-msg text-center italic mb-5 flex items-center justify-center"
      :data-question-id="content.id"
      :id="`question-${content.id}-error`"
      role="alert"
    >
      <Icon
        name="heroicons:exclamation-triangle"
        size="18"
        class="mr-2"
        aria-hidden="true"
      />
      <span>Bitte eine der drei Versionen auswählen</span>
    </div>
    <div
      class="space-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:space-y-0"
      role="radiogroup"
      :aria-labelledby="`question-${content.id}-title`"
    >
      <Card
        v-for="(type, index) in shuffledArray"
        :key="type"
        :content="content[type]"
        :type="type"
        :id="content.id"
        :index="index"
      ></Card>
    </div>
    <div
      class="mt-10 mb-6 text-center"
      aria-labelledby="interest-label"
      role="group"
    >
      <div class="mb-2">
        <div class="font-medium">
          <label for="interest" id="interest-label">
            <AtomsHeadline
              level="h3"
              class="mb-4"
              :aria-described-by="`question-${content.id}-interest-error`"
              >Wie sehr interessiert Sie das Thema des Artikels?
              *</AtomsHeadline
            >
          </label>
        </div>
        <div
          class="text-small flex items-center justify-center"
          v-if="interest === -1"
          :id="`question-${content.id}-interest-error`"
          role="alert"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2"
            aria-hidden="true"
          />
          <span>Bitte auswählen</span>
        </div>
      </div>
      <div class="flex flex-row justify-center">
        <span class="ml-2 sm:mr-4" id="range-start">sehr wenig</span>
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
            :aria-valuemin="0"
            :aria-valuemax="4"
            :aria-valuenow="interest"
            aria-labelledby="interest-label"
            :aria-describedby="`range-start range-end ${
              interest === -1 ? `question-${content.id}-interest-error` : ''
            }`"
          />
          <div class="flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
        <span class="ml-2 sm:ml-4" id="range-end">sehr viel</span>
      </div>
    </div>
    <div class="mt-3 flex flex-row justify-center">
      <label class="form-control w-96" :for="`question-${content.id}-textarea`">
        <div class="label">
          <AtomsHeadline level="h3" class="mb-1">
            Haben Sie zusätzliche Anmerkungen?
          </AtomsHeadline>
          {{ remark }}
        </div>
        <textarea
          class="textarea textarea-bordered h-24"
          :id="`question-${content.id}-textarea`"
          v-model="remark"
          name="remark"
          @input="debouncedSave"
        ></textarea>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import type { Question, SummaryType } from "~/types/question.type";
import type {
  emotionalCapacity,
  interest,
  surveyResponseType,
} from "~/types/survey.type";

const currentEmotionalCapacity = useState<emotionalCapacity>(
  "currentEmotionalCapacity"
);
const surveyResponse = useState<surveyResponseType>("surveyResponse");
const interest = ref<interest>(-1);
const remark = ref<string>("");

const capacityMapper = new Map([
  [-1, "keine"],
  [0, "sehr wenig"],
  [1, "wenig"],
  [2, "eine mittlere"],
  [3, "viel"],
  [4, "sehr viel"],
]);

const getCapacityDescription = computed(() => {
  return capacityMapper.get(Number(currentEmotionalCapacity.value));
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

surveyResponse.value.articles[props.content.id].order = {
  0: shuffledArray[0],
  1: shuffledArray[1],
  2: shuffledArray[2],
};

const debouncedSave = useDebounceFn(() => {
  if (remark.value !== "") {
    surveyResponse.value.articles[props.content.id].remark = remark.value;
    console.log(surveyResponse.value.articles[props.content.id]);
  }
}, 300);
</script>
