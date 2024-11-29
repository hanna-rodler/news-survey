<template>
  <div>
    <AtomsHeadline :level="'h2'">Demographische Daten</AtomsHeadline>
    <div class="flex flex-row space-x-4">
      <div class="my-4">
        <label class="form-control w-full max-w-xs mb-1"> Geschlecht </label>
        <select
          class="select select-info select-bordered"
          name="gender"
          id="gender"
          v-model="gender"
        >
          <option value="female">weiblich</option>
          <option value="male">männlich</option>
          <option value="diverse">divers</option>
          <option value="no_indication">keine Angabe</option>
        </select>
      </div>
      <div class="my-4">
        <label class="form-control w-full max-w-xs mb-1" for="age">
          Alter
        </label>
        <input
          type="number"
          id="age"
          name="age"
          v-model="age"
          min="0"
          max="100"
          class="input input-info input-bordered max-w-xs"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { gender, age } from "~/types/survey.type";
const gender = useState<gender>("gender", () => "");
const age = useState<age>("age", () => "");
// const age = useState('age', ():number => -1);
// const surveyResponse = useState("surveyResponse");
// console.log("demographics", surveyResponse);
// surveyResponse.value.age = age.value;
// console.log("surveyResponse.age", surveyResponse.value.age);
</script>
