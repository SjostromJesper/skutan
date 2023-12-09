<template>
  <div class="add-person">
    <input type="text" v-model="passengerName" placeholder="Namn..." required>
    <button @click="handleAddNewPassenger">lägg till person</button>
  </div>
</template>

<script setup>
import {addNewPassenger} from "../api/firebase.js";
import {ref} from "vue";
import {usePassengerStore} from "../stores/passengerStore.js";

const passengerStore = usePassengerStore()

const passengerName = ref('')
const error = ref(false)

const handleAddNewPassenger = async () => {

  if (passengerName.value.length > 0) {
    await addNewPassenger(passengerName.value, passengerStore.eventId)
    await passengerStore.getPassengerList(passengerStore.eventId)
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.add-person {
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