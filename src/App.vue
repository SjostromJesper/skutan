<template>
    <div class="wrapper">

      <div v-if="!currentEvent">
        <h1>Skutan</h1>
        <pre>{{currentEvent}}</pre>

        <div class="event-list">
          <template v-for="event in eventList">
            <p>{{ event.data.name }}</p>
            <button @click="chooseEvent(event)">välj</button>
          </template>
        </div>

        <div>
          <input type="text" v-model="eventName">
          <button @click="() => newEvent(eventName)">nytt event</button>
        </div>
      </div>

      <div v-else>
        <button class="return" @click="currentEvent = ''">backa</button>
        <div class="headers">
          <p class="header">Namn</p>
          <p class="header">Båt</p>
          <p class="header">Öl</p>
          <p class="header">Drink</p>
          <p class="header">Vin</p>
          <p class="header">Läsk</p>
        </div>

        <div class="passengers">
          <template v-for="passenger in passengerStore.passengerList">
            <Passenger :passengerData="passenger.data" :passengerId="passenger.id"/>
          </template>
        </div>
        <button @click="handleAddNewPassenger">lägg till person</button>
        <input type="text" v-model="newPassengerName">
      </div>
    </div>
</template>

<script setup>
import {newEvent, getAllEvents, addNewPassenger, getPassengers} from "./api/firebase.js";
import Passenger from "./components/Passenger.vue";
import {onMounted, ref} from "vue";
import {usePassengerStore} from "./stores/passengerStore.js";

const passengerStore = usePassengerStore()

const eventName = ref('')
const eventList = ref([])

const currentEvent = ref(null)

const newPassengerName = ref('')

const chooseEvent = async (event) => {
  currentEvent.value = event.id

  // passengerList.value = await getPassengers(event.id)
  await passengerStore.getPassengerList(event.id)
}

onMounted(async () => {
  eventList.value = await getAllEvents()
})

const handleAddNewPassenger = async () => {
  await addNewPassenger(newPassengerName.value, currentEvent.value)
  await passengerStore.getPassengerList(currentEvent.value)
}

</script>

<style scoped>
.wrapper {
  border: 1px solid red;
  padding: 20px;
  width: 100vw;
  max-width: 800px;
}

.headers, .passengers {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid red;
}

.passengers {
  flex-direction: column;
}

.event-list {
  display: flex;
}
</style>
