<template>
  <div>
    <h1>Insert Data into MongoDB</h1>
    <button @click="insertData">Insert Data</button>
    <div v-if="response">
      <h2>Response:</h2>
      <pre>{{ response }}</pre>
    </div>
    <div v-if="error">
      <h2>Error:</h2>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const response = ref(null);
const error = ref(null);

const dataToInsert = {
  articles: [
    { id: 0, selectedSummary: "summary" },
    { id: 1, selectedSummary: "soft_summary" },
    { id: 2, selectedSummary: "soft_summary" },
  ],
  age: 25,
  gender: "diverse",
  emotionalCapacity: "75",
  userId: "75c87e32-e8f6-4371-9e65-1c9776017181",
};

const insertData = async () => {
  const { data, error: fetchError } = await useFetch(
    "/api/saveSurveyResponse",
    {
      method: "POST",
      body: dataToInsert,
    }
  );
  if (data.value) {
    response.value = data.value;
    error.value = null;
  } else {
    response.value = null;
    error.value = fetchError.value;
  }
};
</script>
