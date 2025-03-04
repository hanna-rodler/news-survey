<template>
  <div
    class="form-card border-2 bg-white shadow-md p-4 flex flex-col justify-between"
    :data-summary-type="type"
    :class="getBorderColor"
    :data-id="id"
    role="radio"
    :aria-checked="isQuestionSelected"
  >
    <div>
      <AtomsHeadline
        v-if="!isQuestionSelected"
        level="h4"
        :id="`card-${id}-${type}-title`"
        >{{ content.headline }}</AtomsHeadline
      >
      <AtomsHeadline
        v-if="isQuestionSelected"
        level="h4"
        icon-name="heroicons:check-circle-20-solid"
        icon-color="bg-success"
        :aria-label="`selected-${content.headline}`"
        :id="`card-${id}-${type}-title`"
        >{{ content.headline }}</AtomsHeadline
      >
      <AtomsText :id="`card-${id}-${type}-content`">{{
        content.text
      }}</AtomsText>
    </div>
    <div class="flex justify-end pt-4">
      <AtomsButton
        tag="button"
        :variant="buttonVariant"
        class="justify-self-end"
        @click="selectCard"
        :aria-labelledby="`card-${id}-${type}-title card-${id}-${type}-content`"
      >
        {{ getButtonText }}
      </AtomsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SummaryContent, SummaryType } from "~/types/question.type";
import type { surveyResponseType } from "~/types/survey.type";
const surveyResponse = useState<surveyResponseType>("surveyResponse");

const props = defineProps<{
  content: SummaryContent;
  type: SummaryType;
  id: number;
}>();

const isQuestionSelected = computed(() => {
  return surveyResponse.value.articles[props.id].selectedSummary === props.type;
});

const buttonVariant = computed(() => {
  if (surveyResponse.value.articles[props.id].selectedSummary === props.type) {
    return "success";
  } else {
    return "secondary";
  }
});

const getButtonText = computed(() => {
  if (surveyResponse.value.articles[props.id].selectedSummary === props.type) {
    return "Ausgewählt";
  } else {
    return "Auswählen";
  }
});

const getBorderColor = computed(() => {
  if (surveyResponse.value.articles[props.id].selectedSummary === props.type) {
    return "border-success";
  } else {
    return "border-info rounded-md";
  }
});

const selectCard = () => {
  const question = document.querySelector(`[data-question-id='${props.id}']`);
  question?.classList.remove("form-error");
  const errorMsg = document.querySelector(
    `[data-question-id='${props.id}'].error-msg`
  );
  errorMsg?.classList.add("hidden");
  surveyResponse.value.articles[props.id].selectedSummary = props.type;
  surveyResponse.value.articles[props.id].id = props.id;
};
</script>
