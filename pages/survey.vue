<template>
  <div>
    <div v-for="question of shuffledData" v-bind:key="question.id">
      <Question :content="question"></Question>
    </div>
    <div class="mt-5 flex justify-center flex-row">
      <AtomsButton :tag="'button'" :variant="'gradient'" @click="submitForm">
        Abschicken
        <!-- <span class="flex justify-center items-center ml-2">
          <Icon name="heroicons:paper-airplane" class="bg-white" />
        </span> -->
      </AtomsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import surveyData from "~/contents/survey.json";
import { v4 as uuidv4 } from "uuid";

const userId = useState("userId", () => uuidv4());
console.log("userId survey", userId.value);

function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the array to avoid mutating the original array
  const shuffledArray = [...array];

  // Use the Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
}

const shuffledData = shuffleArray(surveyData);
console.log(shuffledData);

const surveyScheme = surveyData.reduce((acc, question) => {
  acc[question.id] = {
    question: question.question,
    selectedSummary: "",
  };
  return acc;
}, {});
const surveyResponse = useState("surveyResponse", () => surveyScheme);

const submitForm = () => {
  console.log("surveyResponse", surveyResponse);
};

// TODO: age, gender, education
// TOOD: slider
// TODO: required machen. noch keines ausgewählt bei Question x
// TODO: GDPR
// TODO: SurveyScheme type
</script>
