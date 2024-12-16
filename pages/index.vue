<template>
  <div class="flex flex-col items-center w-full">
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
      <AtomsHeadline level="h2">Emotionale Kapazität</AtomsHeadline>
      <div class="flex flex-col mb-10">
        <label
          for="generalEmotionalCapacity"
          class="flex flex-row justify-center"
          id="emotional-capacity-label"
          ><AtomsHeadline level="h3" class="mb-4"
            >Wie viel emotionale Kapazität hatten Sie
            <span class="underline">im letzten Monat</span>, um mit politischen
            Nachrichten umzugehen? *</AtomsHeadline
          ></label
        >
        <div
          class="text-small text-center mb-2 flex items-center justify-center"
          v-if="generalEmotionalCapacity === -1"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2"
            aria-hidden="true"
          />
          <span id="emotional-capacity-error">Bitte auswählen</span>
        </div>
        <div class="flex flex-row justify-center">
          <span class="mr-2 sm:mr-4" id="general-emotional-capacity-range-start"
            >sehr wenig</span
          >
          <div class="w-48 md:w-60">
            <input
              type="range"
              min="0"
              max="4"
              class="range range-primary range-sm sm:range-md"
              :class="{ 'range-error': generalEmotionalCapacity === -1 }"
              step="1"
              id="generalEmotionalCapacity"
              name="generalEmotionalCapacity"
              v-model="generalEmotionalCapacity"
              @input="chooseGeneralEmotionalCapacity"
              :aria-valuemin="0"
              :aria-valuemax="4"
              :aria-valuenow="generalEmotionalCapacity"
              aria-labelledby="emotional-capacity-label"
              :aria-describedby="`general-emotional-capacity-range-start general-emotional-capacity-range-end ${
                generalEmotionalCapacity === -1
                  ? `emotional-capacity-error`
                  : 'emotional-capacity-label'
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
          <span class="ml-2 sm:ml-4" id="general-emotional-capacity-range-end"
            >sehr viel</span
          >
        </div>
      </div>
      <div class="flex flex-col mb-6">
        <label
          for="currentEmotionalCapacity"
          class="flex flex-row justify-center"
          id="emotional-capacity-label"
          ><AtomsHeadline level="h3" class="mb-3"
            >Wie viel emotionale Kapazität haben Sie
            <span class="underline"> gerade</span>, um mit politischen
            Nachrichten umzugehen? *</AtomsHeadline
          ></label
        >
        <div
          class="text-small text-center mb-2 flex items-center justify-center"
          v-if="currentEmotionalCapacity === -1"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2"
            aria-hidden="true"
          />
          <span id="emotional-capacity-error">Bitte auswählen</span>
        </div>
        <div class="flex flex-row justify-center">
          <span class="mr-2 sm:mr-4" id="emotional-capacity-range-start"
            >sehr wenig</span
          >
          <div class="w-48 md:w-60">
            <input
              type="range"
              min="0"
              max="4"
              class="range range-primary range-sm sm:range-md"
              :class="{ 'range-error': currentEmotionalCapacity === -1 }"
              step="1"
              id="currentEmotionalCapacity"
              name="currentEmotionalCapacity"
              v-model="currentEmotionalCapacity"
              @input="chooseCurrentEmotionalCapacity"
              :aria-valuemin="0"
              :aria-valuemax="4"
              :aria-valuenow="currentEmotionalCapacity"
              aria-labelledby="emotional-capacity-label"
              :aria-describedby="`emotional-capacity-range-start emotional-capacity-range-end ${
                currentEmotionalCapacity === -1
                  ? `emotional-capacity-error`
                  : 'emotional-capacity-label'
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
          <span class="ml-2 sm:ml-4" id="emotional-capacity-range-end"
            >sehr viel</span
          >
        </div>
      </div>
    </div>

    <div class="section">
      <AtomsHeadline level="h2">Artikelversionen</AtomsHeadline>
      <AtomsText class="text-center" v-if="currentEmotionalCapacity !== -1">
        Sie bekommen nun von {{ shuffledData.length }} Artikeln drei
        verschiedene Versionen gezeigt. Bitte geben Sie zu jeder Frage an,
        welche Version am besten zur Ihrer emotionalen Kapaztität passt.
      </AtomsText>
      <div v-else class="text-center text-error">
        Bitte füllen Sie oben die Informaiton zu Ihrer emotionalen Kapazität
        aus.<br />
        Die folgenden Fragen sind von Ihrer Antwort abhängig.
      </div>
    </div>
    <div
      v-if="currentEmotionalCapacity !== -1"
      class="flex items-center flex-col"
    >
      <div
        v-for="question of shuffledData"
        v-bind:key="question.id"
        class="section"
      >
        <Question :content="question"></Question>
      </div>
    </div>
    <div class="section">
      <div
        v-if="!isValid"
        class="text-error text-center"
        id="form-error-msg"
        role="alert"
      >
        Bitte füllen Sie alle Fragen aus.
      </div>
      <div class="mt-5 flex justify-center flex-row">
        <AtomsButton
          tag="button"
          variant="gradient"
          @click="submitForm"
          aria-describedby="form-error-msg"
          aria-label="Umfrage abschicken"
        >
          Abschicken
        </AtomsButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import surveyData from "~/contents/survey.json";

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

const generalEmotionalCapacity = useState<emotionalCapacity>(
  "generalEmotionalCapacity",
  () => -1
);
const currentEmotionalCapacity = useState<emotionalCapacity>(
  "currentEmotionalCapacity",
  () => -1
);
const gender = useState<gender>("gender");
const age = useState<age>("age");

const isValid = computed(() => {
  return checkValidity(false);
});

const chooseGeneralEmotionalCapacity = () => {
  if (generalEmotionalCapacity.value === -1) {
    generalEmotionalCapacity.value = 0;
  }
};
const chooseCurrentEmotionalCapacity = () => {
  if (currentEmotionalCapacity.value === -1) {
    currentEmotionalCapacity.value = 0;
  }
};

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
  currentEmotionalCapacity: currentEmotionalCapacity.value,
  generalEmotionalCapacity: generalEmotionalCapacity.value,
};

const surveyResponse = useState<surveyResponseType>(
  "surveyResponse",
  (): surveyResponseType => responseScheme
);

const submitForm = () => {
  surveyResponse.value.age = age.value;
  surveyResponse.value.gender = gender.value;
  surveyResponse.value.currentEmotionalCapacity =
    currentEmotionalCapacity.value;
  surveyResponse.value.generalEmotionalCapacity =
    generalEmotionalCapacity.value;

  const submitValid = checkValidity(true);
  if (submitValid) {
    saveToDB();
  } else {
    console.error("errors occured");
  }
};

const saveToDB = async () => {
  console.log("survey Resposne", surveyResponse.value);
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
    currentEmotionalCapacity: false,
    generalEmotionalCapacity: false,
  };
  // validate age
  const ageInput = document.querySelector("input[name='age']");
  const ageError = useState("ageError");
  const ageErrorIcon = document.querySelector("[data-error-icon='age']");
  if (age.value === "" || age.value < 10 || age.value > 120) {
    if (showErrors) {
      ageInput?.classList.remove("input-info");
      ageInput?.classList.add("input-error");
      ageErrorIcon?.classList.remove("hidden");
      ageError.value = true;
    }
  } else {
    validity.age = true;
    ageInput?.classList.remove("input-error");
    ageInput?.classList.add("input-info");
    ageErrorIcon?.classList.add("hidden");
    ageError.value = false;
  }

  // validate gender
  const selectGender = document.querySelector("select[name='gender']");
  const genderErrorIcon = document.querySelector("[data-error-icon='gender']");
  const genderError = useState("genderError");
  if (gender.value === "") {
    if (showErrors) {
      selectGender?.classList.remove("select-info");
      selectGender?.classList.add("select-error");
      genderErrorIcon?.classList.remove("hidden");
      genderError.value = true;
    }
  } else {
    selectGender?.classList.add("select-info");
    selectGender?.classList.remove("select-error");
    genderErrorIcon?.classList.add("hidden");
    validity.gender = true;
    genderError.value = false;
  }

  if (currentEmotionalCapacity.value !== -1) {
    validity.currentEmotionalCapacity = true;
    // info: error already shown
  }
  if (generalEmotionalCapacity.value !== -1) {
    validity.generalEmotionalCapacity = true;
    // info: error already shown
  }

  // validate articles
  const articles = surveyResponse.value.articles;
  let articlesValid = true;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].selectedSummary === "") {
      if (showErrors) {
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
      // info: if selected is already shown for range
    }
  }

  if (articlesValid) {
    validity.articles = true;
  }

  const allValid = Object.values(validity).every((value) => value === true);

  return allValid;
}

// TODO: education?
// TODO: ausfüllen
// TODO: GDPR
// TODO: "Die Studie kann jederzeit wiederholt werden."
</script>
