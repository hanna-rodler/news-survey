<template>
  <div class="section">
    <AtomsHeadline level="h2">Demographische Daten</AtomsHeadline>
    <div class="flex flex-row space-x-8 justify-center">
      <div class="my-4">
        <label
          class="form-control w-full max-w-xs mb-1 flex flex-row items-center"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2 hidden"
            aria-label="Bitte ausfüllen"
            data-error-icon="gender"
          />
          Geschlecht *
        </label>
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
        <label
          class="form-control w-full max-w-xs mb-1 flex flex-row items-center"
          for="age"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            size="18"
            class="mr-2 hidden"
            aria-label="Bitte ausfüllen"
            data-error-icon="age"
          />
          Alter *
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
</script>
