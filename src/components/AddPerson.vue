<template>
  <div class="add-person">
    <input type="text" v-model="passengerName" placeholder="Namn..." required>
    <Button @click="handleAddNewPassenger" text="lägg till person" />
  </div>
</template>

<script setup>
import {addNewPassenger} from "../api/firebase.js";
import {ref} from "vue";
import {usePassengerStore} from "../stores/passengerStore.js";
import Button from "./buttons/Button.vue";

const passengerStore = usePassengerStore()

const props = defineProps({
  extraFunction: {
    type: Function,
    required: false,
    default: null
  }
})

const passengerName = ref('')
const error = ref(false)

const handleAddNewPassenger = async () => {
  if (passengerName.value.length > 0) {
    await addNewPassenger(passengerName.value, passengerStore.eventId)
    await passengerStore.getPassengerList(passengerStore.eventId)
    props.extraFunction()
    passengerName.value = ''
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

input {
  border-radius: 12px;
  font-size: 1.2em;
}
</style>