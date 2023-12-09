<template>
  <div class="add-event">
    <input type="text" v-model="eventName" placeholder="Namn..." required>
    <button @click="() => newEvent(eventName)">Lägg till nytt event</button>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {newEvent} from "../api/firebase.js";

const eventName = ref('')
</script>

<style scoped>
.add-event {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  gap: 5px;
}

button {
  background-color: #747bff;
  color: white;
}

input {
  border-radius: 12px;
  font-size: 1.2em;
}
</style>