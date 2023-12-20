<template>
    <div class="wrapper">
      <Modal v-if="newEventModal" modal-title="Nytt event" :close-modal="closeNewEventModal">
        <div class="new-event">
          <AddEvent :extra-function="closeNewEventModal"/>
        </div>
      </Modal>

      <div class="event-wrapper" v-if="!passengerStore.eventId">
        <h1>Skutan</h1>

        <div class="event-list">
          <template v-for="event in eventStore.eventList">
            <Button @click="chooseEvent(event)" :text="event.data.name" />
          </template>
        </div>

        <Button text="Lägg till nytt event" @click="newEventModal = true"/>
      </div>

      <div v-else class="event">
        <div class="return" @click="passengerStore.setEventId('')">
          <img src="../public/assets/icons/back.png" height="25" width="25"/>
          tillbaka
        </div>

        <div class="headers">
          <div class="header">
            <img src="../public/assets/icons/paddler.png" height="75" width="75"/>
            <p>Namn</p>
          </div>

          <div class="header">
            <img src="../public/assets/icons/boat.png" height="75" width="75"/>
            <p>Båt 700</p>
          </div>

          <div class="header">
            <img src="../public/assets/icons/boat.png" height="75" width="75"/>
            <p>Båt 1000</p>
          </div>

          <div class="header">
            <img src="../public/assets/icons/beer.png" height="75" width="75"/>
            <p>Öl</p>
          </div>

          <div class="header">
            <img src="../public/assets/icons/cocktail.png" height="75" width="75"/>
            <p>Drink</p>
          </div>

          <div class="header">
            <img src="../public/assets/icons/wine.png" height="75" width="75"/>
            <p>Vin</p>
          </div>

          <div class="header">

            <img src="../public/assets/icons/energy-drink.png" height="75" width="75"/>
            <p>Läsk</p>
          </div>

          <div class="header">
            <img src="../public/assets/icons/dollar-bill.png" height="75" width="75"/>
            <p>Totalt</p>
          </div>
        </div>

        <div class="passengers">
          <template v-for="passenger in passengerStore.passengerList">
            <Passenger :passengerData="passenger.data" :passengerId="passenger.id"/>
          </template>
        </div>

        <Modal v-if="addPersonModal" :close-modal="closeAddPersonModal" modal-title="Lägg till ny person">
          <AddPerson :extra-function="closeAddPersonModal"/>
        </Modal>

        <Button text="Lägg till person" @click="addPersonModal = true"/>


      </div>
    </div>
</template>

<script setup>
import {getAllEvents} from "./api/firebase.js";
import Passenger from "./components/Passenger.vue";
import {onMounted, ref} from "vue";
import {usePassengerStore} from "./stores/passengerStore.js";
import {useEventStore} from "./stores/eventStore.js";
import AddPerson from "./components/AddPerson.vue";
import AddEvent from "./components/AddEvent.vue";
import Modal from "./components/Modal.vue";
import Button from "./components/buttons/Button.vue";

const passengerStore = usePassengerStore()
const eventStore = useEventStore()

const eventList = ref([])
const currentEvent = ref(null)

const chooseEvent = async (event) => {
  currentEvent.value = event.id
  passengerStore.setEventId(event.id)

  await passengerStore.getPassengerList(event.id)
}

onMounted(async () => {
  eventList.value = await getAllEvents()
})

const newEventModal = ref(false)
const closeNewEventModal = () => {
  newEventModal.value = false
}

const addPersonModal = ref(false)
const closeAddPersonModal = () => {
  addPersonModal.value = false
}
</script>

<style scoped>
.wrapper {
  padding: 20px;
  width: 100vw;
  max-width: 800px;
  border: 1px solid black;
  border-radius: 12px;
}

.event {
  display: flex;
  flex-direction: column;
}

.return {
  display: flex;
  align-items: center;
  gap: 10px;

  width: fit-content;
  margin: 0 0 40px 0;
  border: 1px solid black;
  border-radius: 8px;
  padding: 4px 10px;

  cursor: pointer;
}


.headers, .passengers {
  display: flex;
  justify-content: space-evenly;
}

.header {
  width: 75px;
  display: flex;
  flex-direction: column;
}

.passengers {
  flex-direction: column;
}

.event-list {
  display: flex;
  gap: 4px;
}

button {
  align-self: flex-end;
}

.event-wrapper {
  display: flex;
  flex-direction: column;
}

</style>
