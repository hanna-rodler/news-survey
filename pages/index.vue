<template>
  <div>
    <div>
      <AtomsHeadline level="h1" class="text-center mb-4"
        >Umfrage Titel</AtomsHeadline
      >
      <AtomsText class="text-center"
        >Ufmrage Einführungstext - Erklärung was kommt</AtomsText
      >
    </div>
    <Demographics class="mb-8"></Demographics>
    <AtomsHeadline level="h2"
      >Emotionale Kapazität & Artikelversionen</AtomsHeadline
    >
    <div class="flex flex-col mb-8">
      <label for="emotionalCapacity" class="h3"
        ><AtomsHeadline level="h3"
          >Wie viel emotionale Kapazität haben Sie gerade, um mit Nachrichten
          umzugehen?:</AtomsHeadline
        ></label
      >
      <div class="flex flex-row justify-center">
        <span class="mr-4 text-bold">sehr wenig</span>
        <div class="w-60">
          <input
            type="range"
            min="0"
            max="100"
            class="range range-info"
            step="25"
            id="emotionalCapacity"
            name="emotionalCapacity"
            v-model="emotionalCapacity"
          />
          <div class="flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
        <span class="ml-4 text-bold">sehr viel</span>
      </div>
    </div>

    <div v-for="question of shuffledData" v-bind:key="question.id">
      <Question :content="question"></Question>
    </div>
    <div v-if="!isValid" class="text-error text-center">
      Bitte füllen Sie alle Fragen aus.
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
import type {
  surveyResponseType,
  gender,
  age,
  emotionalCapacity,
  articleSelection,
} from "~/types/survey.type";

console.log("payload", useNuxtApp().payload.data);
console.log("shuffled payload", useNuxtApp().payload.data.shuffled);
let shuffledData = useNuxtApp().payload.data.shuffled;

if (shuffledData == undefined) {
  console.log("shuffle array data");
  shuffledData = shuffleArray(surveyData);
  useNuxtApp().payload.data.shuffled = shuffledData;
  console.log(
    "payload after adding shuffled",
    useNuxtApp().payload.data.shuffled
  );
}

const emotionalCapacity = ref<emotionalCapacity>(50);
const gender = useState<gender>("gender");
const age = useState<age>("age");

const isValid = computed(() => {
  return checkValidity(false);
});

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

console.log("payload", useNuxtApp().payload.data);

function getReducedData(): [articleSelection] {
  const reducedData = [];
  for (let i = 0; i < shuffledData.length; i++) {
    reducedData[shuffledData[i].id] = {
      id: shuffledData[i].id,
      selectedSummary: "",
    };
  }
  return reducedData;
}

const responseScheme: surveyResponseType = {
  articles: getReducedData(),
  age: age.value,
  gender: gender.value,
  emotionalCapacity: emotionalCapacity.value,
  id: userId,
};

console.log("survey scheme articles", responseScheme.articles);

const surveyResponse = useState(
  "surveyResponse",
  (): surveyResponseType => responseScheme
);

const submitForm = () => {
  console.log("emotional Capacity", emotionalCapacity.value);
  surveyResponse.value.age = age.value;
  surveyResponse.value.gender = gender.value;
  surveyResponse.value.emotionalCapacity = emotionalCapacity.value;
  console.log("surveyResponse", surveyResponse.value);
  const submitValid = checkValidity(true);
  if (submitValid) {
    navigateTo("./success");
  } else {
    console.error("errors occured");
  }
};

function checkValidity(showErrors: boolean) {
  const validity = {
    age: false,
    gender: false,
    articles: false,
  };
  // validate age
  const ageInput = document.querySelector("input[name='age']");
  if (age.value === "") {
    if (showErrors) {
      ageInput?.classList.remove("input-info");
      ageInput?.classList.add("input-error");
    }
  } else {
    validity.age = true;
    ageInput?.classList.remove("input-error");
    ageInput?.classList.add("input-info");
  }

  // validate gender
  const selectGender = document.querySelector("select[name='gender']");
  if (gender.value === "") {
    if (showErrors) {
      selectGender?.classList.remove("select-info");
      selectGender?.classList.add("select-error");
    }
  } else {
    selectGender?.classList.add("select-info");
    selectGender?.classList.remove("select-error");
    validity.gender = true;
  }

  // validate articles
  const articles = surveyResponse.value.articles;
  let articlesValid = true;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].selectedSummary === "") {
      if (showErrors) {
        console.log("question i", i, " is missing: ", articles[i]);
        const question = document.querySelector(`[data-question-id='${i}']`);
        question?.classList.add("form-error");
      }
      articlesValid = false;
    }
  }

  if (articlesValid) {
    validity.articles = true;
  }

  const allValid = Object.values(validity).every((value) => value === true);

  return allValid;
}

// TODO: education?
// TODO: GDPR
// TODO: aria label
// TODO: dB anbindung
</script>
