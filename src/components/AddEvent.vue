<template>
  <div class="add-event">
    <input type="text" v-model="eventName" placeholder="Namn..." required>
    <Button text="Lägg till nytt Event" @click="handleNewEvent"/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {newEvent} from "../api/firebase.js";
import Button from "./buttons/Button.vue";
const props = defineProps({
  extraFunction: {
    type: Function,
    required: false
  }
})

const eventName = ref('')

const handleNewEvent = () => {
  newEvent(eventName.value)
  props.extraFunction()
  eventName.value = ''
}
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