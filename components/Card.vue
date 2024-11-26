<template>
  <div
    class="border-2 bg-white shadow-md p-4 flex flex-col justify-between"
    :data-summary-type="type"
    :data-question-id="id"
    :class="getBorderColor"
    :style="getOrder"
  >
    <div>
      <AtomsHeadline v-if="!isQuestionSelected" :level="'h3'">{{
        content.headline
      }}</AtomsHeadline>
      <AtomsHeadline
        v-if="isQuestionSelected"
        :level="'h3'"
        :icon-name="'heroicons:check-circle-20-solid'"
        :icon-color="'bg-success'"
        >{{ content.headline }}</AtomsHeadline
      >
      <AtomsText :text="content.text"></AtomsText>
    </div>
    <div class="flex justify-end pt-4">
      <AtomsButton
        :tag="'button'"
        :variant="buttonVariant"
        class="justify-self-end"
        @click="selectCard"
      >
        {{ getButtonText }}
      </AtomsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SummaryContent, SummaryType } from "~/types/question.type";
const surveyResponse = useState("surveyResponse");

const props = defineProps<{
  content: SummaryContent;
  type: SummaryType;
  id: number;
  order?: number;
}>();

const isQuestionSelected = computed(() => {
  return surveyResponse.value[props.id].selectedSummary === props.type;
});

const buttonVariant = computed(() => {
  if (surveyResponse.value[props.id].selectedSummary === props.type) {
    return "success";
  } else {
    return "secondary";
  }
});

const getButtonText = computed(() => {
  if (surveyResponse.value[props.id].selectedSummary === props.type) {
    return "Ausgewählt";
  } else {
    return "Auswählen";
  }
});

const getBorderColor = computed(() => {
  if (surveyResponse.value[props.id].selectedSummary === props.type) {
    return "border-success";
  } else {
    return "border-primary rounded-md";
  }
});

const getOrder = computed(() => {
  const order =
    props.order === undefined ? "order: 0" : `order: ${props.order}`;
  return order;
});

const selectCard = () => {
  const selectedCard = props.id + props.type;
  surveyResponse.value[props.id].selectedSummary = props.type;
  console.log("survey id", props.id, surveyResponse.value[props.id]);
};
</script>
