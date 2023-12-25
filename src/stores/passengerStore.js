import {defineStore} from "pinia";
import {ref} from "vue";
import {getPassengers, removePassenger as rmPassenger} from "../api/firebase.js";

export const usePassengerStore = defineStore('passengerData', () => {
    const passengerList = ref(null)
    const eventId = ref(null)

    const setEventId = (id) => {
        eventId.value = id
    }

    const getPassengerList = async (eventID) => (
        passengerList.value = await getPassengers(eventID)
    )

    const removePassenger = async (passengerID) => {
        console.log()
        await rmPassenger(passengerID)
        await getPassengerList(eventId.value)
    }

    return {
        passengerList,
        eventId,
        getPassengerList,
        setEventId,
        removePassenger
    }
})