<template>
  <div class="max-w-7xl">
    <div class="section">
      <AtomsHeadline level="h1" class="text-center mb-4"
        >News Umfrage Titel</AtomsHeadline
      >
      <AtomsText class="text-center"
        >Ufmrage Einführungstext - Erklärung was kommt. Was beinhaltet
        politisch?</AtomsText
      >
    </div>
    <Demographics></Demographics>
    <div class="section">
      <AtomsHeadline level="h2"
        >Emotionale Kapazität & Artikelversionen</AtomsHeadline
      >
      <div class="flex flex-col mb-6">
        <label for="emotionalCapacity" class="flex flex-row justify-center"
          ><AtomsHeadline level="h3" class="mb-3"
            >Wie viel emotionale Kapazität haben Sie gerade, um mit politischen
            Nachrichten umzugehen? *</AtomsHeadline
          ></label
        >
        <div
          class="text-small text-center mb-2 flex items-center justify-center"
          v-if="emotionalCapacity === -1"
        >
          <Icon name="heroicons:exclamation-triangle" size="18" class="mr-2" />
          <span>Bitte auswählen</span>
        </div>
        <div class="flex flex-row justify-center">
          <span class="mr-4 text-bold">sehr wenig</span>
          <div class="w-60">
            <input
              type="range"
              min="0"
              max="4"
              class="range range-primary"
              :class="{ 'range-error': emotionalCapacity === -1 }"
              step="1"
              id="emotionalCapacity"
              name="emotionalCapacity"
              v-model="emotionalCapacity"
              @click="chooseEmotionalCapacity"
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
    </div>

    <div v-for="question of shuffledData" v-bind:key="question.id">
      <Question :content="question"></Question>
    </div>
    <div class="section">
      <div v-if="!isValid" class="text-error text-center">
        Bitte füllen Sie alle Fragen aus.
      </div>
      <div class="mt-5 flex justify-center flex-row">
        <AtomsButton tag="button" variant="gradient" @click="submitForm">
          Abschicken
          <!-- <span class="flex justify-center items-center ml-2">
            <Icon name="heroicons:paper-airplane" class="bg-white" />
          </span> -->
        </AtomsButton>
      </div>
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

let shuffledData = useNuxtApp().payload.data.shuffled;

if (shuffledData == undefined) {
  shuffledData = shuffleArray(surveyData);
  useNuxtApp().payload.data.shuffled = shuffledData;
}

const emotionalCapacity = useState<emotionalCapacity>(
  "emotionalCapacity",
  () => -1
);
const gender = useState<gender>("gender");
const age = useState<age>("age");

const isValid = computed(() => {
  return checkValidity(false);
});

const chooseEmotionalCapacity = () => {
  if (emotionalCapacity.value === -1) {
    emotionalCapacity.value = 0;
  }
};

const userId = useState("userId", () => uuidv4());

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

function getReducedData(): [articleSelection] {
  const reducedData = [];
  for (let i = 0; i < shuffledData.length; i++) {
    reducedData[shuffledData[i].id] = {
      id: shuffledData[i].id,
      selectedSummary: "",
      interest: -1,
    };
  }
  return reducedData;
}

const responseScheme: surveyResponseType = {
  articles: getReducedData(),
  age: age.value,
  gender: gender.value,
  emotionalCapacity: emotionalCapacity.value,
  userId: userId.value,
};

const surveyResponse = useState<surveyResponseType>(
  "surveyResponse",
  (): surveyResponseType => responseScheme
);

const submitForm = () => {
  surveyResponse.value.age = age.value;
  surveyResponse.value.gender = gender.value;
  surveyResponse.value.emotionalCapacity = emotionalCapacity.value;

  const submitValid = checkValidity(true);
  if (submitValid) {
    console.log("surveyResponse", surveyResponse);
    saveToDB();
  } else {
    console.error("errors occured");
  }
};

const saveToDB = async () => {
  const { data, error: fetchError } = await useFetch(
    "/api/saveSurveyResponse",
    {
      method: "POST",
      body: surveyResponse.value,
    }
  );
  if (data.value) {
    console.log("successful. redirect");
    navigateTo("./success");
  } else {
    console.error("Unsuccessful. Error:", fetchError.value);
  }
};

function checkValidity(showErrors: boolean) {
  const validity = {
    age: false,
    gender: false,
    articles: false,
    emotionalCapacity: false,
  };
  // validate age
  const ageInput = document.querySelector("input[name='age']");
  const ageErrorIcon = document.querySelector("[data-error-icon='age']");
  console.log("age error", ageErrorIcon);
  if (age.value === "" || age.value < 5 || age.value > 120) {
    if (showErrors) {
      ageInput?.classList.remove("input-info");
      ageInput?.classList.add("input-error");
      ageErrorIcon?.classList.remove("hidden");
    }
  } else {
    validity.age = true;
    ageInput?.classList.remove("input-error");
    ageInput?.classList.add("input-info");
    ageErrorIcon?.classList.add("hidden");
  }

  // validate gender
  const selectGender = document.querySelector("select[name='gender']");
  const genderErrorIcon = document.querySelector("[data-error-icon='gender']");
  if (gender.value === "") {
    if (showErrors) {
      selectGender?.classList.remove("select-info");
      selectGender?.classList.add("select-error");
      genderErrorIcon?.classList.remove("hidden");
    }
  } else {
    selectGender?.classList.add("select-info");
    selectGender?.classList.remove("select-error");
    genderErrorIcon?.classList.add("hidden");
    validity.gender = true;
  }

  if (emotionalCapacity.value !== -1) {
    validity.emotionalCapacity = true;
    // info: if selected is already shown for range
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
        const errorMsg = document.querySelector(
          `[data-question-id='${i}'].error-msg`
        );
        errorMsg?.classList.remove("hidden");
      }
      articlesValid = false;
    }
    if (articles[i].interest === -1) {
      articlesValid = false;
      console.log("question i", i, "has no selected intterest");
      // info: if selected is already shown for range
    }
  }

  if (articlesValid) {
    validity.articles = true;
  }

  const allValid = Object.values(validity).every((value) => value === true);

  return allValid;
}

// TODO: success page
// TODO: education?
// TODO: test DB errors & success Message
// TODO: aria label
// TODO: unnötiges wie console.logs weggeben
// TODO: ausfüllen
// TODO: bessere Formulierung für "mittlere"
// TODO: GDPR
</script>
